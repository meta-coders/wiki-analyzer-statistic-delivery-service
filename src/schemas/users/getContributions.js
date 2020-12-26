'use strict';

const getContributionsSchema = {
  description: `Get user's contributions`,
  tags: ['users'],
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string' } },
  },
  querystring: {
    type: 'object',
    required: ['timescale'],
    properties: {
      timescale: { type: 'string', enum: ['day', 'week', 'month', 'year'] },
    },
  },
  response: {
    200: {
      type: 'object',
      required: ['contributions'],
      properties: {
        contributions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
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

module.exports = getContributionsSchema;
