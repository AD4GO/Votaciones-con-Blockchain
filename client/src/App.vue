<template>
  <!-- Componente principal que contiene la estructura básica de la aplicación -->
  <v-app>
    <!-- Componente de encabezado que recibe eventos de carga y propiedades de inicio de sesión y usuario -->
    <headerApp @cargar="cargar()" :log="log" :usuario="user"/>
    
    <!-- Contenedor principal para las vistas de enrutamiento -->
    <v-main>
      <!-- Router-view se utiliza para mostrar las vistas correspondientes a las rutas -->
      <router-view @cargar="cargar()"/>
    </v-main>
    
    <!-- Componente de pie de página -->
    <FooterApp />
  </v-app>
</template>

<script>
import headerApp from '@/components/headerApp.vue';
import FooterApp from '@/components/FooterApp.vue';

export default {
  // Nombre del componente
  name: 'App',
  
  // Componentes utilizados en este componente
  components: { headerApp, FooterApp },
  
  // Datos del componente
  data: () => ({
    log: {},  // Objeto para el estado de inicio de sesión
    user: {}, // Objeto para la información del usuario
  }),
  
  // Métodos del componente
  methods: {
    // Método para cargar datos desde el almacenamiento local
    cargar() {
      this.log = JSON.parse(localStorage.getItem("log"));
      this.user = JSON.parse(localStorage.getItem("usuario"));
    },
  },
  
  // Ciclo de vida del componente, se ejecuta después de que el componente se monta en el DOM
  mounted() {
    // Verifica si no hay un registro de inicio de sesión en el almacenamiento local y lo inicializa si es necesario
    if (localStorage.getItem("log") === null) localStorage.setItem("log", JSON.stringify({ log: false, type: "view" }));
    
    // Carga datos iniciales
    this.cargar();
  },
}
</script>
