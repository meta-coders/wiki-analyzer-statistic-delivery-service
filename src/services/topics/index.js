'use strict';

const topicService = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {});
};

module.exports = topicService;
module.exports.autoPrefix = '/topics';
