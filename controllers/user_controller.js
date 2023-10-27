const User = require('../models/user');
const bcrypt = require('bcrypt');
const Profile = require('../models/profile');

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { email, password, userType, /* otros campos de perfil */ } = req.body;
      
      // Verificar si el correo electrónico ya está registrado
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
      }

      // Hash de la contraseña antes de guardarla en la base de datos
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear un nuevo usuario
      const newUser = await User.create({
        email,
        password: hashedPassword,
        userType,
        /* otros campos de perfil */
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error al registrar al usuario:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  },
  showProfilePage: async (req, res) => {
    // Obtener el userType según el usuario autenticado (puede ser 'user' o 'company')
    const userId = req.user.dataValues.id;
    const userName = req.user.dataValues.username;
    try {
      let profile = await Profile.findOne({ where: { user_id: userId } });
  
      if (!profile) { 
        // Si el usuario no tiene perfil, crea uno
        profile = await Profile.create({ user_id: userId, firstName: userName });
      }

      res.render('profile', { user: req.user, isAuthenticated: req.isAuthenticated(), profile });
    } catch (error) {
      console.error(error);
    }
  },
  getProfileByUserId: async (req, res) => {
    const userId = req.user.dataValues.id; // Obtiene el ID del usuario de los parámetros de la ruta
  
    try {
      const profile = await Profile.findOne({ where: { user_id: userId } });
  
      if (!profile) {
        return res.status(404).json({ message: 'Perfil no encontrado' });
      }
  
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el perfil del usuario' }); 
    }
  },
  updateProfile: async (req, res) => {    
    const userId = req.params.id;
    const updatedProfileData = req.body;

    try {
      // Buscar el perfil existente por el ID de usuario
      let profile = await Profile.findOne({ where: { user_id: userId } });
  
      if (!profile) {
        return res.status(404).json({ message: 'Perfil no encontrado' });
      }
  
      // Actualizar los campos del perfil con los nuevos datos
      profile = await profile.update(updatedProfileData);

      res.redirect('/profile');// Devolver el perfil actualizado
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el perfil del usuario' });
    }
  }
  // Otros métodos del controlador de usuarios, como iniciar sesión, actualizar perfil, etc.
};



module.exports = UserController;
