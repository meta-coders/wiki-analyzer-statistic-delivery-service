'use strict';

const getContributionsByTypesSchema = {
  description: `Get user's contributions count by types`,
  tags: ['users'],
  params: {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'number' } },
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
              type: { type: 'string' },
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

module.exports = getContributionsByTypesSchema;
