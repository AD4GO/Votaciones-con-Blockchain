// Importa la función createApp de Vue para crear la aplicación
import { createApp } from 'vue';

// Importa el componente principal de la aplicación
import App from './App.vue';

// Importa el enrutador de la aplicación
import router from './router';

// Importa Vuetify para la integración con Vue
import vuetify from './plugins/vuetify';

// Importa la función loadFonts desde el módulo webfontloader para cargar fuentes web
import { loadFonts } from './plugins/webfontloader';

// Importa VueAxios para integrar Axios en Vue
import VueAxios from 'vue-axios';
import axios from 'axios';

// Configura una instancia de Axios con la base URL, esta es donde se ejecuta el servidor
const instance = axios.create({ baseURL: 'http://localhost:4000' });

// Importa VueSweetalert2 para integrar alertas en la aplicación
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Carga las fuentes web utilizando la función loadFonts
loadFonts();

// Crea la aplicación Vue
const app = createApp(App);

// Usa el enrutador en la aplicación
app.use(router);

// Usa Vuetify en la aplicación
app.use(vuetify);

// Usa VueSweetalert2 en la aplicación
app.use(VueSweetalert2);

// Usa VueAxios con la instancia de Axios configurada
app.use(VueAxios, instance);

// Monta la aplicación en el elemento HTML con el ID 'app'
app.mount('#app');

