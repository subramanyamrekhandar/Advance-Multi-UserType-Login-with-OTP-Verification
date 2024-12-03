const { version, name, description } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',

  info: {
    title: name,
    description,
    version,
    license: {
      name: 'PRIVATE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/v1`,
    },
  ],
};

module.exports = swaggerDef;
