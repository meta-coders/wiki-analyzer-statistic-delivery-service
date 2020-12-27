'use strict';

const path = require('path');
const dotenv = require('dotenv');

const fastify = require('fastify');
const fastifyCors = require('fastify-cors');
const fastifyPg = require('fastify-postgres');
const AutoLoad = require('fastify-autoload');
const fastifySwagger = require('fastify-swagger');

const swaggerSchema = require('./src/schemas/swagger');

const run = () => {
  dotenv.config();
  const { NODE_ENV, DB_URL, TEST_DB_URL } = process.env;
  const isTestEnv = NODE_ENV === 'test';
  const app = fastify({ logger: !isTestEnv });

  app.register(fastifyCors, { origin: true });
  app.register(fastifySwagger, swaggerSchema);
  app.register(fastifyPg, {
    connectionString: isTestEnv ? TEST_DB_URL : DB_URL,
  });

  app.register(AutoLoad, { dir: path.join(__dirname, 'src', 'plugins') });
  app.register(AutoLoad, { dir: path.join(__dirname, 'src', 'services') });

  return app;
};

module.exports = run;
