// Importa el framework Express para construir la aplicación web
import express from "express";
// Importa el middleware de registro de solicitudes HTTP (morgan)
import morgan from "morgan";
// Importa el middleware para habilitar el intercambio de recursos entre diferentes dominios (CORS)
import cors from "cors";
// Importa el middleware para analizar el cuerpo de las solicitudes en formato JSON
import bodyParser from "body-parser";
// Importa el objeto de rutas configuradas con Express
import { Route } from "./routes/Routes.js";

// Crea una instancia de la aplicación Express
const app = express();

// Configura middleware

// Habilita el intercambio de recursos entre diferentes dominios (CORS)
app.use(cors());

// Registra las solicitudes HTTP en la consola durante el desarrollo (morgan)
app.use(morgan("dev"));

// Configura bodyParser para analizar el cuerpo de las solicitudes en formato JSON y extendido
app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));

// Usa las rutas configuradas en el objeto Route
app.use(Route);

// Configura el puerto del servidor, utilizando el proporcionado por el entorno o el 4000 por defecto
const port = process.env.PORT || 4000;

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
    console.log("Servidor ejecutándose en: http://localhost:" + port);
});
