// Importa el objeto DAO que contiene funciones para operaciones CRUD en la base de datos
import { DAO } from "./DAO.js";
// Importa las instancias de la conexión a la base de datos (db) y del servicio de correo electrónico (email)
import { db, email } from '../conection/db.js';

// Función para obtener todos los registros de una tabla
const getAll = (data, callback) => {
    const query = DAO.all(data.tabla);
    // Realiza la consulta a la base de datos utilizando la función query y llama a la devolución de llamada (callback) con los resultados
    db.query(query, callback);
};

// Función para obtener un registro por su ID
const getId = (id, data, callback) => {
    const query = DAO.forId(id, data);
    db.query(query, callback);
};

// Función para insertar datos en una tabla
const setData = (data, callback) =>{
    const query = DAO.into(data);
    // Realiza la consulta a la base de datos utilizando la función query y llama a la devolución de llamada (callback) con los resultados
    db.query(query, callback);         
};

// Función para actualizar datos en una tabla por su ID
const setUpdate = (id, data, callback) => {
    const query = DAO.update(id, data);
    db.query(query, callback);
};

// Función para eliminar un registro por su ID
const getRemove = (id, data, callback) =>{
    const query = DAO.remove(id, data);
    db.query(query, callback);
};

// Función para realizar un JOIN NATURAL entre dos tablas
const getDosTablas = (tb1, tb2, callback) => {
    const query = DAO.dosTablas(tb1, tb2);
    db.query(query, callback);
};

// Función para obtener candidatos por convocatoria e identificación
const candidatos = (idCon, ident, callback) => {
    const query = DAO.candidatos(idCon, ident);
    db.query(query, callback);
};

// Función para obtener candidatos por elección utilizando un procedimiento almacenado
const candidatosByE = (id, callback) => {
    const query = DAO.candidatosByE(id);
    db.query(query, callback);
};

// Función para enviar correos electrónicos
const sendEmail = (destino, asunto, msg) => {
    email.sendMail({
        from: 'bjimenezruiz53@correo.unicordoba.edu.co',
        to: destino,
        subject: asunto,
        html: msg
    }, (error, info) => {
        if (error) {
            // Manejo de errores si el envío de correo falla
            return console.log(error);
        }
        // Muestra un mensaje de éxito si el correo se envió correctamente
        console.log('Correo Enviado: '+ info.response);
    })
};

// Exporta un objeto Model que contiene funciones para interactuar con la base de datos y enviar correos electrónicos
export const Model = {
    all: getAll,
    forId: getId,
    into: setData,
    update: setUpdate,
    remove: getRemove,
    dosTablas: getDosTablas,
    getCandidatos: candidatos,
    getCanByE: candidatosByE,
    sendEmail: sendEmail
}
