// Importa funciones de enrutamiento de Vue.js
import { createRouter, createWebHistory } from 'vue-router';

// Importa componentes de las vistas
import InicioView from '../views/InicioView.vue';

// Define las rutas de la aplicación
const routes = [
  {
    path: '/',
    name: 'home',
    component: InicioView
  },
  {
    path: '/admin',
    name: 'InicioAdmin',
    component: () => import('../views/InicioAdminView.vue'),
    meta: { requiresAuth: true } // Metaetiqueta para indicar que se requiere autenticación
  },
  {
    path: '/usuario',
    name: 'InicioUsuario',
    component: () => import('../views/InicioUserView.vue'),
    meta: { requiresAuth: true } // Metaetiqueta para indicar que se requiere autenticación
  },
  {
    path: '/convocatorias',
    name: 'Convocatorias',
    component: () => import('../views/ConvocatoriasView.vue'),
  },
  {
    path: '/convocatorias/:id',
    name: 'ConvocatoriaInfo',
    component: () => import('../views/ParticipaConvocatoria.vue'),
    meta: { requiresAuth: true } // Metaetiqueta para indicar que se requiere autenticación
  },
  {
    path: '/postulados/:idCon',
    name: 'VerPostulados',
    component: () => import('../views/PostuladosView.vue'),
    meta: { requiresAuth: true } // Metaetiqueta para indicar que se requiere autenticación
  },
  {
    path: '/elecciones',
    name: 'Elecciones',
    component: () => import('../views/EleccionesView.vue'),
  },
  {
    path: '/elecciones/:id',
    name: 'VerEleccion',
    component: () => import('../views/VerEleccion.vue'),
    meta: { requiresAuth: true } // Metaetiqueta para indicar que se requiere autenticación
  },
];

// Crea el enrutador
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Función que se ejecuta antes de cada navegación
router.beforeEach(async (to, from, next) => {
  const log = await { ...JSON.parse(localStorage.getItem("log"))};
  const isAuthenticated = log.log;
  const type = log.type;

  // Redirige a la página de inicio si no está autenticado y la ruta requiere autenticación
  if(to.meta.requiresAuth && !isAuthenticated) next('/');
  // Redirige a la página correspondiente según el tipo de usuario al intentar acceder a la página de inicio
  else if (to.path=="/" && isAuthenticated) next('/' + type);
  else {
    // Redirige al usuario si intenta acceder a una página no permitida según su tipo
    if(type=="usuario" && to.path == "/admin") next('/usuario');
    else next();
  }
});

// Exporta el enrutador para su uso en la aplicación
export default router;

