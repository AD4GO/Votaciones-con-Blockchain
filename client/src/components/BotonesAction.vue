<template>
    <v-row>
        <v-col>
          <v-card
            class="mx-auto d-flex flex-column align-center justify-center opcion"
            width="300"
            height="300"
            @click="abrirConvocatorias"
          >
          <v-icon 
              size="70px"
              color="green-darken-2"
              icon="mdi-account-edit"></v-icon>
            <v-card-title>
              CONVOCATORIAS
            </v-card-title>

            <v-card-text class="texto">
              Convocatorias para ser Representante Estudiantil
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
            <v-card
              class="mx-auto d-flex flex-column align-center justify-center opcion"
              width="300"
              height="300"
              @click="abrirElecciones"
            >
            <v-icon 
                size="70px"
                color="green-darken-2"
                icon="mdi-archive"></v-icon>
              <v-card-title>
                ELECCIONES
              </v-card-title>

              <v-card-text class="texto">
                Elecciones para aspirante a Representante Estudiantil
              </v-card-text>
            </v-card>
        </v-col>
      </v-row>
</template>

<script>
export default {
    name: 'BotonesAction',
    data() {
      return {
      }
    },
    methods: {
      abrirConvocatorias(){
        this.$router.push("/convocatorias");
      },
      abrirElecciones(){
          this.$router.push("/elecciones");
      }
    },
}
</script>

<style scoped>
  .fila{
    margin: 20px 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    gap:20px;
  }

  .opcion{
    padding:60px 5px !important;
    cursor: pointer;
  }
  .opcion:hover{
    background-color: #f0f0f0;
  }
  .texto{
    color: #02a50d;
    text-align: center;
  }
</style>