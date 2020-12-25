'use strict';

module.exports = {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'wiki-analyzer-statistic-delivery',
      description: 'Wiki analyzer statistic delivery API documentation',
      version: '1.0.0',
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'users', description: 'Users related end-points' },
      { name: 'topics', description: 'Topics related end-points' },
    ],
  },
  exposeRoute: true,
};
