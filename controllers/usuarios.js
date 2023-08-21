const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGet = async(req, res = response) => {

    const { limite = 20, desde = 0 } = req.query;
    const query = { estado: true }
    // const usuarios = await Usuario.find( query )
    //                               .skip(Number( desde ))
    //                               .limit(Number( limite ));

    // const total = await Usuario.countDocuments( query );  
    
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
               .skip(Number( desde ))
               .limit(Number( limite ))
    ]);

    res.json({
        msg: 'get API - controlador',
        total, 
        usuarios 
    });
}
 
const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si existe correo


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        //msg: 'post API - controlador',
        usuario
    });
}
 
const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );                
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API - controlador',
        usuario
    });
}
 
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}
 
const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Borar definitivamente
    //const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json({
        msg: 'delete API - controlador',
        usuario
    });
}
 
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}