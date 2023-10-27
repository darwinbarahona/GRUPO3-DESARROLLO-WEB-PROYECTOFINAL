const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos
const db = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', 
  username: 'root', 
  password: '', 
  database: 'gestion_vehiculos', 
  define: {
    timestamps: false 
  },
  query: {
    cache: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Verificar la conexión a la base de datos
try {
  db.authenticate();
  console.log('Conexión a la base de datos establecida correctamente.');
} catch (error) {
  console.error('No se pudo conectar a la base de datos:', error);
}

module.exports = db;
