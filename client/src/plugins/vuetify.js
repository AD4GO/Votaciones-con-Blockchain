// Importa las fuentes de iconos y los estilos base de Vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Importa funciones específicas de Vuetify
import { createVuetify } from 'vuetify';

// Importa componentes específicos de Vuetify
import { VExpansionPanels, VExpansionPanel, VDataTable, VDataTableVirtual, VExpansionPanelTitle, VExpansionPanelText, VOtpInput } from 'vuetify/lib/components/index.mjs';

// Crea y exporta la instancia de Vuetify con la configuración personalizada
export default createVuetify({
  // Configura los componentes que se utilizarán en la aplicación
  components: {
    VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText, VOtpInput,
    VDataTable, VDataTableVirtual,
  },

  // Configura el tema de la aplicación
  theme: {
    themes: {
      light: {
        // Configura colores primarios y secundarios para el tema claro
        colors: {
          primary: '#008000',     // Color principal (verde)
          secondary: '#5CBBF6',   // Color secundario (azul claro)
        },
      },
    },
  },
});
