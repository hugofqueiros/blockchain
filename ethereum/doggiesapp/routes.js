const routes = require('next-routes')();

routes
  .add('/doggies/new', '/doggies/new')
  .add('/doggies/:address', '/doggies/show');

module.exports = routes;