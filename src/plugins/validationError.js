'use strict';

const fp = require('fastify-plugin');
const Joi = require('joi');

const setValidationErrorHandler = async (fastify, options) => {
  fastify.setErrorHandler((error, request, reply) => {
    if (error.validation || error instanceof Joi.ValidationError) {
      reply.code(400);
      reply.send({
        code: 400,
        message: error.message,
      });
    } else {
      reply.code(500);
      if (error.message) {
        reply.send({
          code: 500,
          message: error.message,
        });
      }
    }
  });
};

module.exports = fp(setValidationErrorHandler);
