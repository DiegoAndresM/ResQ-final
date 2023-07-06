var express = require('express');
var router = express.Router();
const Worker = require('../models/workers'); // Importar el modelo de usuario
const bcrypt = require('bcrypt');

router.get('/', async function(req, res, next) {
  try {
    const workers = await Worker.find(); // Obtener todos los usuarios de la base de datos
    res.render('workers', { workers }); // Renderizar la vista 'users' y pasar los usuarios como datos
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
});
router.post('/', async function (req, res, next) {
  const { username, email, password, bloodtype, age, weight, height, status } = req.body; // Obtener los datos del formulario

  try {
    // Verificar si el correo electrónico ya existe en la base de datos
    const existingWorker = await Worker.findOne({ email });

    if (existingWorker) {
      req.flash('signupMessage', 'The Email is already taken.');
      return res.redirect('/');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);


    // Crear un nuevo objeto de usuario y asignar los valores
    const newWorker = new Worker({
      username,
      email,
      password: encryptedPassword,
      bloodtype,
      age,
      weight,
      height,
      status
    });

    // Guardar el nuevo usuario en la base de datos
    await newWorker.save();

    // Redirigir a la página de éxito o a otra ruta según sea necesario
    res.redirect('/workers');
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso de registro
    console.error(error);
    res.redirect('/workers');
  }
});

module.exports = router;