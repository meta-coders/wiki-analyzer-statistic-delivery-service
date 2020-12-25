'use strict';

const path = require('path');
const dotenv = require('dotenv');

const fastify = require('fastify')({ logger: true });
const fastifyCors = require('fastify-cors');
const fastifyPg = require('fastify-postgres');
const AutoLoad = require('fastify-autoload');
const fastifySwagger = require('fastify-swagger');

const swaggerSchema = require('./src/schemas/swagger');

dotenv.config();

fastify.register(fastifyPg);
fastify.register(fastifyCors, { origin: true });
fastify.register(fastifySwagger, swaggerSchema);

fastify.register(AutoLoad, { dir: path.join(__dirname, 'src', 'plugins') });
fastify.register(AutoLoad, { dir: path.join(__dirname, 'src', 'services') });

const port = process.env.PORT || 3001;

fastify.listen(port, '0.0.0.0').then(() => fastify.swagger());
