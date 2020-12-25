'use strict';

const getTopicsByEdits = require('./getTopicsByEdits');
const schemas = require('../../schemas');

const topicService = async (fastify, options) => {
  fastify.get(
    '/edits',
    { schema: schemas.topics.getTopicsByEdits },
    getTopicsByEdits(fastify)
  );
};

module.exports = topicService;
module.exports.autoPrefix = '/topics';
