const Service = require('../models/Service');
const User = require('../models/user');

const ServiceController = {
  addService: async (req, res) => {
    try {
      const { title, description } = req.body;
      const userId = req.user.id; 

      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const newService = await Service.create({
        title,
        description,
        company_id: user.id
      });

      return res.render('add-service', { action: 'add', service: {}, user: req.user, isAuthenticated: req.isAuthenticated(), message: 'Servicio agregado exitosamente' });
    } catch (error) {
      console.error('Error al agregar el servicio:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  getAllServices: async (req, res) => {
    try {
      let services = {};
      if (req.user.type === 'company') {
        services = await Service.findAll({
          where: {
            company_id: req.user.id
          }
        });
        return res.status(200).json(services);
      }else{
        services = await Service.findAll();
      }
      return res.status(200).json(services);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  showServicesPage: async (req, res) => {
    let services = {};
    if (req.user.type === 'company') {
      services = await Service.findAll({
        where: {
          company_id: req.user.id
        }
      });
    }else{
      services = await Service.findAll();
    }
    res.render('services', { services, user: req.user, isAuthenticated: req.isAuthenticated() });
  },
  showAddServicePage: async (req, res) => {
    res.render('add-service', { action: 'add', service: {}, user: req.user, isAuthenticated: req.isAuthenticated() });
  },
  showUpdateServicePage: async (req, res) => {
    const service = await Service.findByPk(req.params.id_service);

    res.render('add-service', { action: 'update', service, user: req.user, isAuthenticated: req.isAuthenticated() });
  },
  updateService: async (req, res) => {
    try {
      const { title, description } = req.body;
      const serviceId = req.params.id;

      const service = await Service.findByPk(serviceId);
      if (!service) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      // Actualiza el servicio con los nuevos datos
      service.title = title;
      service.description = description;
      await service.save();

      // Redirige o muestra un mensaje de éxito
      return res.redirect('/services');
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  
};

module.exports = ServiceController;
