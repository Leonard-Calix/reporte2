const Pelicula = require('../models/PeliculaSchema');

const { request, response } = require('express');


const obtenerPeliculas = async (req = request, res = response) => {
    try {

        const peliculas = await Pelicula.find();

        if (peliculas.length == 0 ) {
            return res.json(obtenerMensaje('No hay registros'));
        }

        return res.json(obtenerMensaje('Consulta exitosa', peliculas));

    } catch (error) {
        return res.status(500).json({ error })
    }
}

const obtenerPelicula = async (req = request, res = response) => {
    try {

        const { id } = req.params;

        const pelicula = await Pelicula.findById(id);

        if (!pelicula) {
            return res.json(obtenerMensaje('La pelicula no existe'));
        }

        return res.json(obtenerMensaje('Consulta exitosa', pelicula));

    } catch (error) {
        return res.status(500).json({ error })
    }
}

const guardarPelicula = async (req = request, res = response) => {
    try {

        const { nombre, descripcion, urlImagen, calificacion, fechaEstreno } = req.body;

        const validarCampos = validarCamposBody(req.body);

        if (validarCampos) {
            return res.status(400).json(validarCampos); 
        }

        const pelicula = await Pelicula.findOne({ nombre });

        if (pelicula) {
            return res.status(400).json({ mensaje: 'Pelicula ya esta registrada', pelicula: null })
        }

        const nuevaPelicula = new Pelicula({
            nombre,
            descripcion,
            urlImagen,
            calificacion,
            fechaEstreno
        });

        await nuevaPelicula.save();

        return res.json(obtenerMensaje('Registro exitoso', nuevaPelicula))

    } catch (error) {
        return res.status(500).json({ error })
    }
}

const editarPeliculas = async (req = request, res = response) => {
    try {

        const { id } = req.params;
        const { descripcion, urlImagen, calificacion, fechaEstreno } = req.body;

        const validarCampos = validarCamposBody(req.body);

        if (validarCampos) {
            return res.status(400).json(validarCampos); 
        }

        const pelicula = await Pelicula.findById(id);

        if (!pelicula) {
            return res.status(400).json(obtenerMensaje('La pelicula no existe'))
        }

        //pelicula.nombre = nombre;
        pelicula.descripcion = descripcion;
        pelicula.urlImagen = urlImagen;
        pelicula.fechaEstreno = fechaEstreno;
        pelicula.calificacion = calificacion;

        await pelicula.save();

        return res.json(obtenerMensaje('Registro actualizado con éxito', pelicula))

    } catch (error) {
        return res.status(500).json({ error })
    }
}

const eliminarPeliculas = async (req = request, res = response) => {
    try {

        const { id } = req.params;

        const pelicula = await Pelicula.findById(id);

        if (!pelicula) {
            return res.status(400).json(obtenerMensaje('La pelicula no existe'))
        }

        await pelicula.remove();

        return res.json(obtenerMensaje('Registro actualizado con éxito', pelicula));

    } catch (error) {
        return res.status(500).json({ error })
    }
}

const obtenerMensaje = (mensaje, data = null) => {
    return { mensaje, data }
}

const validarCamposBody = ({ nombre, descripcion, calificacion, fechaEstreno }) => {

    if (!nombre) {
        return { mensaje : 'Nombre no debe de ser vacia', data : null }
    }

    if (!descripcion) {
        return { mensaje : 'Descripcion no debe de ser vacia', data : null  }
    }

    if (!calificaion) {
        return { mensaje : 'Calificacion no debe de ser vacia', data : null  }
    }

    if (!fechaEstreno) {
        return { mensaje : 'Calificacion no debe de ser vacia', data : null  }
    }

    return null;
}

module.exports = {
    obtenerPeliculas,
    obtenerPelicula,
    guardarPelicula,
    editarPeliculas,
    eliminarPeliculas
}