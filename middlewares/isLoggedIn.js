// Middleware para verificar si el usuario está autenticado
module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};