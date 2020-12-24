'use strict';

const fp = require('fastify-plugin');

const addJoiSchemaCompiler = async (fastify, options) => {
  const joiOptions = {
    abortEarly: false,
    convert: true,
    allowUnknown: false,
    noDefaults: false,
  };

  const joiSchemaCompiler = ({ schema }) => (data) =>
    schema.validate(data, joiOptions);

  fastify.decorate('joiSchemaCompiler', joiSchemaCompiler);
};

module.exports = fp(addJoiSchemaCompiler);
