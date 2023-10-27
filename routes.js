// routes.js
const express = require('express');
const router = express.Router();

// Importar los controladores 
const userController = require('./controllers/user_controller');
const serviceController = require('./controllers/service_controller');
const vehicleController = require('./controllers/vehicle_controller');
const authController = require('./controllers/auth_controller');
const appointmentController = require('./controllers/appointment_controller');

// Importa los middlewares 
const isLoggedIn = require('./middlewares/isLoggedIn');


// Definir rutas para renderizar
router.get('/', (req, res) => {
    res.render('welcome', { user: req.user, isAuthenticated: req.isAuthenticated()});
  });
router.get('/login', authController.showLoginPage);

router.get('/register', authController.showRegisterPage);


router.get('/profile', isLoggedIn, userController.showProfilePage);
router.get('/add-vehicle', isLoggedIn, vehicleController.showAddVehiclePage);
router.get('/services', isLoggedIn, serviceController.showServicesPage);
router.get('/add-service', isLoggedIn, serviceController.showAddServicePage);

// Ruta para renderizar la vista de actualizar servicio
router.get('/update-service/:id_service', isLoggedIn, serviceController.showUpdateServicePage);

router.get('/schedule-appointment/:id_service', isLoggedIn, appointmentController.showAddAppointmentPage);
router.get('/active-appointments', isLoggedIn, appointmentController.showActiveAppointmentsPage);
  

// rutas para obtener datos
router.get('/profile/:id', isLoggedIn, userController.getProfileByUserId);

// rutas para procesar datos
router.post('/login', authController.login);

// Ruta para manejar el envío del formulario para registrar usuario
router.post('/register', authController.register);

// Ruta para manejar el envío del formulario para cerrar sesión
router.post('/logout', isLoggedIn, authController.logout);

// Ruta para manejar el envío del formulario para agregar vehículo
router.post('/add-vehicle', isLoggedIn, vehicleController.addVehicle);  

// Ruta para manejar el envío del formulario para agregar servicio
router.post('/add-service', isLoggedIn, serviceController.addService);

// Ruta para manejar el envío del formulario para actualizar servicio
router.post('/update-service/:id', isLoggedIn, serviceController.updateService);

// Ruta para manejar el envío del formulario para agregar cita
router.post('/schedule-appointment', isLoggedIn, appointmentController.addAppointment);
// Ruta para manejar el envío del formulario para marcar cita como completada
router.post('/complete-appointment/:id_pointment', isLoggedIn, appointmentController.completeAppointment);

//Ruta para manejar el envío del formulario para actualizar perfil
router.post('/profile/:id', isLoggedIn, userController.updateProfile);



module.exports = router;
