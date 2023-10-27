const express = require('express');
const session = require('express-session');
const passport = require('./config/passportConfig');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));


// Configuración del motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'xxx', // Cambiar por una cadena de caracteres segura
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware para manejar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Importar el archivo de rutas
const routes = require('./routes');
// Usar las rutas
app.use(routes);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
