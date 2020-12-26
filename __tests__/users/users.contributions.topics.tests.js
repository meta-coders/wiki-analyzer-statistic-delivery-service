'use strict';

const app = require('../../app')();

describe(`Users GET - API - Get user's contributions grouped by topics`, () => {
  describe('GET /users/:id/contributions/topics', () => {
    test('200 OK - get contributions sorted in descending order', async () => {
      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions/topics?sort=desc&limit=5',
      });
      expect(statusCode).toEqual(200);
      const { contributions } = JSON.parse(body);
      expect(contributions).toBeDefined();
      expect(contributions.length).toEqual(2);
      expect(contributions[0].topic).toEqual('Topic 2');
      expect(contributions[0].contributions).toEqual(3);
      expect(contributions[1].topic).toEqual('Topic 1');
      expect(contributions[1].contributions).toEqual(2);
    });

    test('200 OK - get contributions sorted in ascending order', async () => {
      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions/topics?sort=asc&limit=5',
      });
      expect(statusCode).toEqual(200);
      const { contributions } = JSON.parse(body);
      expect(contributions).toBeDefined();
      expect(contributions.length).toEqual(2);
      expect(contributions[1].topic).toEqual('Topic 2');
      expect(contributions[1].contributions).toEqual(3);
      expect(contributions[0].topic).toEqual('Topic 1');
      expect(contributions[0].contributions).toEqual(2);
    });

    test('200 OK - get contributions limited', async () => {
      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions/topics?limit=1',
      });
      expect(statusCode).toEqual(200);
      const { contributions } = JSON.parse(body);
      expect(contributions).toBeDefined();
      expect(contributions.length).toEqual(1);
    });

    test('404 Not found - user not found', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/4/contributions/topics',
      });
      expect(statusCode).toEqual(404);
    });

    test('400 Bad request - invalid user id', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/id/contributions/topics',
      });
      expect(statusCode).toEqual(400);
    });

    test('400 Bad request - invalid limit', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions/topics?limit=limit',
      });
      expect(statusCode).toEqual(400);
    });

    test('400 Bad request - invalid sort', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions/topics?sort=1',
      });
      expect(statusCode).toEqual(400);
    });
  });
});
