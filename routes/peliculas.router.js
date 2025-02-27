const express = require('express');
const { obtenerPeliculas, obtenerPelicula, guardarPelicula, editarPeliculas, eliminarPeliculas } = require('../controllers/peliculas.controller');
const router = express.Router();

router.get('/', obtenerPeliculas);

router.get('/:id', obtenerPelicula);

router.post('/', guardarPelicula);

router.put('/:id', editarPeliculas);

router.delete('/:id', eliminarPeliculas);

module.exports = router;