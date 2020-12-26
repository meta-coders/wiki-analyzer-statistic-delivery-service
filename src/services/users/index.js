'use strict';

const getContributions = require('./getContributions');
const getContributionsByTopics = require('./getContributionsByTopics');
const getContributionsByTypes = require('./getContributionsByTypes');
const getUsersByActivity = require('./getUsersByActivity');
const schemas = require('../../schemas');

const userService = async (fastify, options) => {
  fastify.get(
    '/:id/contributions',
    { schema: schemas.users.getContributions },
    getContributions(fastify)
  );

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

  fastify.get(
    '/activity',
    { schema: schemas.users.getUsersByActivity },
    getUsersByActivity(fastify)
  );
};

module.exports = userService;
module.exports.autoPrefix = '/users';
