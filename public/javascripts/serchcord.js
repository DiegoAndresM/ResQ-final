const express = require('express');
const router = express.Router();
const path = require("path");
const mongoose = require('mongoose');

const Conn = require('../../server')
const Cord = require('../../models/cord');

router.get('/map', async (req, res) => {
  const cname = req.query.cname; // Obtén el nombre del dispositivo de la consulta

  try {
    // Buscar el robot por su código
    const cord = await Cord.findOne({ cname }); // Buscar las coordenadas dependiendo del nombre exigido

    // Si no se encuentra el dispositivo
    if (!cord) {
      return res.status(404).json({ error: 'Dispositivo no encontrado' });
    }

    const { x, y } = cord.location; // Extraer las coordenadas sin modificar

    res.json({ x, y }); // Responder con las coordenadas

  } catch (error) {
    console.error('Error al obtener las coordenadas del dispositivo:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
  }
});

module.exports = router;