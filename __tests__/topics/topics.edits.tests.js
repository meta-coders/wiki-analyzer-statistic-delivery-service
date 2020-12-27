'use strict';

const app = require('../../app')();

describe(`Topics GET - API - Get topics by edits`, () => {
  describe('GET /topics/edits', () => {
    afterAll(() => app.pg.pool.end());

    test('200 OK - get topics sorted in descending order', async () => {
      const expectedTopics = [
        { topic: 'Topic 1', edits: 4 },
        { topic: 'Topic 2', edits: 1 },
      ];
      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/topics/edits?sort=desc&limit=5',
      });
      expect(statusCode).toEqual(200);
      const { topics } = JSON.parse(body);
      expect(topics).toBeDefined();
      expect(topics).toEqual(expectedTopics);
      console.log(topics);
    });

    test('200 OK - get topics sorted in ascending order', async () => {
      const expectedTopics = [
        { topic: 'Topic 2', edits: 1 },
        { topic: 'Topic 1', edits: 4 },
      ];
      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/topics/edits?sort=asc&limit=5',
      });
      expect(statusCode).toEqual(200);
      const { topics } = JSON.parse(body);
      expect(topics).toBeDefined();
      expect(topics).toEqual(expectedTopics);
    });

    test('200 OK - get topics limited', async () => {
      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/topics/edits?limit=1',
      });
      expect(statusCode).toEqual(200);
      const { topics } = JSON.parse(body);
      expect(topics).toBeDefined();
      expect(topics.length).toEqual(1);
    });

    test('400 Bad request - invalid limit', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/topics/edits?limit=limit',
      });
      expect(statusCode).toEqual(400);
    });

    test('400 Bad request - invalid sort', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/topics/edits?sort=1',
      });
      expect(statusCode).toEqual(400);
    });
  });
});
