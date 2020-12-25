'use strict';

const getContributionsByTopics = require('./getContributionsByTopics');
const getContributionsByTypes = require('./getContributionsByTypes');
const schemas = require('../../schemas');

const userService = async (fastify, options) => {
  fastify.get(
    '/:id/contributions/topics',
    { schema: schemas.users.getContributionsByTopics },
    getContributionsByTopics(fastify)
  );

  fastify.get(
    '/:id/contributions/types',
    { schema: schemas.users.getContributionsByTypes },
    getContributionsByTypes(fastify)
  );
};

module.exports = userService;
module.exports.autoPrefix = '/users';
