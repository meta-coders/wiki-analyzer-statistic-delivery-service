'use strict';

const getContributionsByTopicsSchema = {
  description: `Get user's contributions grouped by topics`,
  tags: ['users'],
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'number' } },
  },
  querystring: {
    type: 'object',
    properties: {
      sort: { type: 'string', enum: ['desc', 'asc'], default: 'desc' },
      limit: { type: 'number', minimum: 1, default: 1 },
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
              topic: { type: 'string' },
              contributions: { type: 'number' },
            },
          },
        },
      },
    },
    404: {
      type: 'object',
      properties: {
        code: { type: 'number' },
        message: { type: 'string' },
      },
    },
  },
};

module.exports = getContributionsByTopicsSchema;
