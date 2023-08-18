const { response } = require('express');

const usuariosGet = (req, res = response) => {

    const { nombre = 'No name', apellido = 'No lastname', apikey, page = 10, limit = 20 } = req.query;

    res.json({
        msg: 'get API - controlador',
        nombre, apellido, apikey, page, limit
    });
}
 
const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}
 
const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
    });
}
 
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}
 
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}
 
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}