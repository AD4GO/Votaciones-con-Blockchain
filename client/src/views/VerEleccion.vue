<template>
    <div class="about">
        <h2 class="title">{{ eleccion.titulo }}</h2>
        <v-parallax class="panel" src="../../public/img/fondo.png">
            <v-row>
                <v-col class="w-75 d-flex justify-center" >
                    <v-card class="w-50" title="Información de la elección" :subtitle="'Desde '+formatFecha(eleccion.fecha_ini)+' hasta '+formatFecha(eleccion.fecha_fin)" >
                        <v-card-title>
                            <v-btn @click="connectWallet" v-if="!conectado">Conectar a Metamask</v-btn>
                            <v-chip color="error" v-if="!conectado">Desconectado</v-chip>
                            <v-chip color="primary" v-if="conectado">Conectado: {{ shortAddress }}</v-chip>
                        </v-card-title>
                        <v-card-text>
                           <strong> {{ eleccion.descripcion }} </strong>
                        </v-card-text>
                        <v-card-text><v-chip v-if="conectado">Total votos actuales: {{ totalVotos }}</v-chip></v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row v-if="wallCheck">
                <cardVotar v-for="(candidato, i) in candidatos" :key="i" @cargar="cargarEleccion" :candidato="candidato" :voted="voted" :datos="candidatosBC[i]"/>
            </v-row>
        </v-parallax>
  </div>
</template>

<script>
import { ethers } from 'ethers';
import cardVotar from '../components/cardVotar.vue';

export default {
    components: { cardVotar },
    data() {
        return {
            conectado: false,
            wallCheck: false,
            usuario: {},
            shortAddress: '',
            wallets: [],
            eleccion: {},
            candidatos: [],
            candidatosBC: [],
            voted: false,
            idEle: this.$route.params.id,
        }
    },
    methods: {
        // Método para cargar la información de la elección
        async cargarEleccion(){
            // Realiza una petición GET para obtener la información de la elección
            await this.axios.get('/eleccion/' + this.idEle)
            .then(resp => {
                this.eleccion = resp.data[0];
            })
            .catch(err => {
                console.log(err);
            });
            // Llama al método para cargar la información de los candidatos
            await this.getCandidatos();
            // Llama al método para cargar la información general
            this.cargarInfo();
        },

        // Método para formatear la fecha en un formato legible
        formatFecha(fecha) {
            const dateObj = new Date(fecha);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            
            return `${day}/${month}/${year}`;
        },

        // Método para cargar la información general de la elección
        cargarInfo(){
            this.axios.get('/candidatos/elecciones/' + this.idEle)
            .then(resp => {
                this.candidatos = resp.data[0];
            })
            .catch(err => {
                console.error(err);
            });
        },

        // Método para conectar la billetera (Wallet)
        async connectWallet() {
            // Verifica si la extensión MetaMask está instalada
            if (!window.ethereum) {
                this.$swal.fire({
                    icon: 'info',
                    title: 'Extensión no Instalada',
                    html: '<a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related" target="__blank">Descargar aquí</a>'
                });
                this.conectado = false;
                return;
            }
            
            // Muestra un modal mientras se realiza la conexión
            await this.$swal.fire({
                title: "Conectando cuenta...",
                timerProgressBar: true,
                didOpen: async () => {
                    this.$swal.showLoading();
                    // Realiza la conexión y obtiene la dirección de la billetera
                    this.wallets = await window.ethereum.request({
                        method: "eth_requestAccounts"
                    });
                    this.conectado = true;
                    const firstPart = this.wallets[0].substring(0,6);
                    const secondPart = this.wallets[0].substring(38, 42);
                    this.shortAddress = `${firstPart}...${secondPart}`;
                    // Actualiza el modal indicando que la conexión fue exitosa
                    this.$swal.update({title: "Cuenta conectada", text: "Su cuenta de MetaMask conectada.", icon: "success", showConfirmButton: true});
                    this.$swal.hideLoading();
                }
            });
        },

        // Método para obtener el contrato inteligente (Smart Contract)
        async getContract() {
            try {
                // Crea una instancia del proveedor Ethereum
                const provider = await new ethers.BrowserProvider(window.ethereum);
                const contractAddress = '0x70BF1E63663d89B86Ad844115DC6B30B45622782';
                // Abierto (ABI) del contrato
                const contractABI = [
                    // ... definición del ABI ...
                ];
                // Crea una instancia del contrato
                const contract = new ethers.Contract(contractAddress, contractABI, provider);
                return contract;
            } catch (error) {
                console.log(error);
                console.log("connected contract not found");
                return null;
            }
        },

        // Método para obtener la información de los candidatos desde el contrato inteligente
        async getCandidatos(){
            try {
                const conect = await this.getContract();
                // Obtiene los registros de candidatos desde el contrato
                const registro = await conect.getProposalsByIdElection(this.idEle);
                // Mapea los registros a un formato más legible
                this.candidatosBC = registro.map(obj => ({nombre: obj[0], idCandidato: Number(obj[1]), idEleccion: Number(obj[2]), votos: Number(obj[3])}));
                // Verifica si el usuario ya votó
                await this.verificarVoto();
            } catch (error) {
                console.error(error);
            }
        },

        // Método para verificar si el usuario ya votó
        async verificarVoto(){
            try {
                const conect = await this.getContract();
                this.voted = await conect.voters(this.wallets[0]);
                console.log(this.voted[0]);
            } catch (error) {
                console.error(error);
            }
        },

        // Método para registrar la billetera del usuario
        async registraBilletera(){
            this.usuario = JSON.parse(localStorage.getItem("usuario"));
            console.log(this.usuario);
            console.log(this.wallets[0]);
            if(this.usuario.billetera === "" || this.usuario.billetera == null){
                // Si la billetera no está registrada en la base de datos, la registra
                const obj = {
                    identificacion: this.usuario.identificacion,
                    billetera: this.wallets[0]
                }
                const body = {
                    tabla: 'usuario',
                    keys: Object.keys(obj),
                    values: Object.values(obj)
                }
                await this.axios.put('/actualiza/' + obj.identificacion, body)
                .then(res => {
                    console.log(res);
                    this.wallCheck = true;
                    this.usuario.billetera = this.wallets[0];
                    localStorage.setItem("usuario", JSON.stringify(this.usuario));
                })
                .catch(err => {
                    console.log(err);
                });
            } else if(this.usuario.billetera !== this.wallets[0]){
                // Si la billetera registrada no coincide con la actual, muestra un mensaje de error
                this.wallCheck = false;
                this.$swal.fire({
                    icon: 'error',
                    title: 'Tu billetera no coincide',
                    text: 'La billetera con la que intentas votar no se encuentra enlazada con tu cuenta.'
                });
            } else {
                // Si la billetera está registrada y coincide, establece wallCheck como verdadero
                this.wallCheck = true;
            }
        }
    },
    computed:{
        // Calcula el total de votos de todos los candidatos
        totalVotos(){
            const votos = this.candidatosBC.map(obj => (obj.votos));
            let result = votos.reduce((acumulador, elemento) => acumulador + elemento, 0);
            return result;
        }
    },
    async mounted(){
        // Conecta la billetera y realiza las acciones correspondientes
        await this.connectWallet();
        // Registra la billetera del usuario y carga la información de la elección
        await this.registraBilletera();
        await this.cargarEleccion();
        // Muestra un modal de carga mientras se realiza la carga
        await this.$swal.fire({
            title: "Cargando...",
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                this.$swal.showLoading()
            }
        }).then((result) => {
            // Realiza acciones después de que se complete la carga
            if (result.dismiss === this.$swal.DismissReason.timer) {
                this.mostrar = true;
            }
        });
    }
}
</script>


<style scoped>
    .title{
        text-align: center;
        padding: 12px 0;
        margin: 0 30px;
        border-bottom: 3px solid #02a50d;
    }
    .panel{
        margin-top: 20px;
        margin-bottom: 50px;
        padding: 50px;
        max-width: 100%;
        background-size: cover;
        background-position: center; /* Centra la imagen en el contenedor */
        position: sticky;
        
    }
</style>