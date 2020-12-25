'use strict';

const fp = require('fastify-plugin');

const addErrors = async (fastify, options) => {
  const errorMessages = {
    userNotExists: 'User does not exist',
  };

  fastify.decorate('errorMessages', errorMessages);
};

module.exports = fp(addErrors);
