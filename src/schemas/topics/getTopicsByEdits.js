'use strict';

const getTopicsByEditsSchema = {
  description: `Get topics by edits`,
  tags: ['topics'],
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
      required: ['topics'],
      properties: {
        topics: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              topic: { type: 'string' },
              edits: { type: 'number' },
            },
          },
        },
      },
    },
  },
};

module.exports = getTopicsByEditsSchema;
