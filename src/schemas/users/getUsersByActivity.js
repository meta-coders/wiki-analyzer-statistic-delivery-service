'use strict';

const getUsersByActivitySchema = {
  description: `Get users by contributions activity`,
  tags: ['users'],
  querystring: {
    type: 'object',
    required: ['timescale'],
    properties: {
      sort: { type: 'string', enum: ['desc', 'asc'], default: 'desc' },
      timescale: { type: 'string', enum: ['day', 'week', 'month', 'year'] },
    },
  },
  response: {
    200: {
      type: 'object',
      required: ['users'],
      properties: {
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              user_id: { type: 'number' },
              username: { type: 'string' },
              contributions: { type: 'number' },
              period: {
                type: 'string',
                format: 'date',
              },
            },
          },
        },
      },
    },
  },
};

module.exports = getUsersByActivitySchema;
