// Función para limpiar caracteres especiales de una cadena
function clear(txt){
    return typeof txt === "string" ? txt.replace(/['"\\(){},;?¡¿!|\/`]/g, '') : txt;
}

// Consulta para obtener todos los registros de una tabla
const getAll = (tabla) => {
    return 'SELECT * FROM '+clear(tabla);
};

// Consulta para obtener un registro por su ID
const getId = (id, data) => {
    return `SELECT * FROM ${clear(data.tabla)} WHERE ${clear(data.keyId)} = ${id}`;
};

// Genera la consulta para insertar datos en una tabla
const setData = (data) => {
    return (data.tabla=="usuario" || data.tabla=="estudiante") ? 
    // Consulta para insertar una lista de datos
    `INSERT INTO ${clear(data.tabla)} (${data.keys.map(key => `\`${clear(key)}\``).join(', ')}) VALUES ${data.values.map(row => Object.values(row).map((value, i) => typeof value === 'string' ? `'${clear(value)}'` : `${i == ''  ? '(' : '' }${clear(value)}`).join(', ') ).join('), ')})`
    // Consulta para insertar una fila de datos
    : `INSERT INTO ${clear(data.tabla)} (${data.keys.map(key => `\`${clear(key)}\``).join(', ')}) VALUES (${Object.values(data.values).map(value => typeof value === 'string' ? `'${clear(value)}'` : clear(value)).join(', ')})`;
};

// Genera la consulta para actualizar datos en una tabla por su ID
const setUpdate = (id, data) => {
    const values = Object.values(data.values);
    data.keys.splice(0,1);
    values.splice(0,1);
    return `UPDATE ${clear(data.tabla)} SET ${data.keys.map((key, index) => `\`${clear(key)}\` = ${typeof values[index] === 'string' ? `'${clear(values[index])}'` : clear(values[index])}`).join(', ')} WHERE ${clear(data.keyId)} = ${id}`;
};

// Genera la consulta para eliminar un registro por su ID
const getRemove = (id, data) => {
    return `DELETE FROM ${clear(data.tabla)} WHERE ${clear(data.keyId)} = ${id}`;
};

// Consulta para realizar un JOIN NATURAL entre dos tablas
const getNatural = (tb1, tb2) => {
    return 'SELECT * FROM '+clear(tb1)+' tb1 NATURAL JOIN '+clear(tb2)+' tb2';
};

// Consulta para obtener candidatos por convocatoria e identificación
const getCandidatos = (idCon, ident) => {
    return `SELECT * FROM (SELECT * FROM (SELECT * FROM Candidato WHERE idConvocatoria = ${idCon})al1 INNER JOIN estudiante WHERE identificacion = ${ident == 1 ? 'al1.idEstudiante1' : 'al1.idEstudiante2'})al2 NATURAL JOIN usuario;`
}

// Consulta para obtener candidatos por elección utilizando un procedimiento almacenado
const getCandidatoByEleccion = (id) => {
    return `CALL getCandidatosByEleccion(${id})`;
}

// Exporta un objeto con funciones para realizar operaciones CRUD en la base de datos
export const DAO = {
    all: getAll,
    forId: getId,
    into: setData,
    update: setUpdate,
    remove: getRemove,
    dosTablas: getNatural,
    candidatos: getCandidatos,
    candidatosByE: getCandidatoByEleccion,
}
