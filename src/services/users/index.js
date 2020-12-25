'use strict';

const getContributionsByTopic = require('./getContributionsByTopics');
const schemas = require('../../schemas');

const userService = async (fastify, options) => {
  fastify.get(
    '/:id/contributions/topics',
    { schema: schemas.users.getContributionsByTopics },
    getContributionsByTopic(fastify)
  );
};

module.exports = userService;
module.exports.autoPrefix = '/users';
