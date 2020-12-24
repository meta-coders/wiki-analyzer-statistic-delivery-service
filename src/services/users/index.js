'use strict';

const userService = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {});
};

module.exports = userService;
module.exports.autoPrefix = '/users';
