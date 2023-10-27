const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('../config/passportConfig');

const Auth = {
  showRegisterPage: (req, res) => {
    res.render('register');
  },
  showLoginPage: (req, res) => {
      res.render('login');
    },
  showRegisterPage: (req, res) => {
      res.render('register');
    },
  login: async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        return res.render('login', {
          user: req.user,
          isAuthenticated: req.isAuthenticated(),
          errorMessage: info.message
        });
      }
  
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
  
        return res.redirect('/profile'); // Redirect to profile page after successful login
      });
    })(req, res, next);
  },
  register: async (req, res) => {

    const { username, email, password, type } = req.body;

    try {
      // Hashea la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crea un nuevo usuario en la base de datos
      await User.create({
        username,
        email,
        password: hashedPassword,
        type
        // Otros campos de registro (nombre, apellido, etc.)
      });

      // Iniciar sesión después del registro
      return res.redirect('/login');

    } catch (error) {
      console.error(error);
      res.redirect('/register');
    }
  },
  logout: (req, res) => {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });// Redirige al usuario a la página de inicio u otra página
  }
};

module.exports = Auth;