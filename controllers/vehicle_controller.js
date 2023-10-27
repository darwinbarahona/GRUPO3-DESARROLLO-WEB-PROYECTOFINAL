const Vehicle = require('../models/Vehicle');
const User = require('../models/user');

const VehicleController = {
  addVehicle: async (req, res) => {
    try {
      const { plates, brand, model, motor } = req.body;
      const userId = req.user.id; 

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const newVehicle = await Vehicle.create({
        plates,
        brand,
        model,
        motor,
        user_id: user.id
      });

      return res.render('add-vehicle', { user: req.user, isAuthenticated: req.isAuthenticated(), message: 'Vehículo agregado exitosamente' });
    } catch (error) {
      console.error('Error al agregar el vehículo:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  showAddVehiclePage: (req, res) => {
    res.render('add-vehicle', { user: req.user, isAuthenticated: req.isAuthenticated() });
  },
  getVehiclesByUser: async (req, res) => {
    const user_id = req.user.id; 
    const vehicles = await Vehicle.findAll({ where: { user_id } });

    return res.json(vehicles);
  }
  
};


module.exports = VehicleController;
