const path = require('path');

module.exports = {
  resolvePath: (...args) => {
    return path.join(__dirname, ...args);
  }
};