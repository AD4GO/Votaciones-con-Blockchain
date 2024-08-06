// Importa el enrutador desde Express
import { Router } from "express";
// Importa el objeto Controllers que contiene funciones controladoras para manejar las rutas
import { Controllers } from "../controllers/Controller.js";

// Crea una instancia de Router
const router = Router();

// Definición de rutas y asignación de funciones controladoras correspondientes

// Ruta para obtener todos los registros de una tabla
router.get('/:tabla', Controllers.all);

// Ruta para obtener un registro por su ID de una tabla específica
router.get('/:tabla/:id', Controllers.forId);

// Ruta para guardar nuevos datos en la base de datos
router.post('/guardar', Controllers.into);

// Ruta para eliminar un registro por su ID de una tabla específica
router.delete('/eliminar/:tabla/:id', Controllers.remove);

// Ruta para actualizar datos por su ID
router.put('/actualiza/:id', Controllers.update);

// Ruta para guardar datos de un censo
router.post('/censo', Controllers.saveCenso);

// Ruta para manejar operaciones de inicio de sesión
router.post('/login', Controllers.login);

// Ruta para obtener datos de dos tablas relacionadas
router.get('/tablas/:tab1/:tab2', Controllers.dosTablas);

// Ruta para obtener candidatos por convocatoria e identificación
router.get('/get/candidatos/:idCon/:ident', Controllers.candidatos);

// Ruta para obtener candidatos por elección
router.get('/candidatos/elecciones/:id', Controllers.candidatosByE);

// Ruta para obtener notificaciones de una tabla específica, tipo y ID
router.get('/:tabla/:tipo/:id', Controllers.notificaciones);

// Exporta el enrutador configurado con las rutas y controladores
export const Route = router;
