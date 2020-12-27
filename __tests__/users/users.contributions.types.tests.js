'use strict';

const app = require('../../app')();

describe(`Users GET - API - Get user's contributions count by types`, () => {
  describe('GET /users/:id/contributions/types', () => {
    afterAll(() => app.pg.pool.end());

    test('200 OK - get contributions count by types', async () => {
      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions/types',
      });
      expect(statusCode).toEqual(200);
      const { contributions } = JSON.parse(body);
      expect(contributions).toBeDefined();
      expect(contributions.length).toEqual(2);
      const typosEditsContributions = contributions.find(
        ({ type }) => type === 'typo_editting'
      );
      const contentAdditionContributions = contributions.find(
        ({ type }) => type === 'content_addition'
      );
      expect(typosEditsContributions).toBeDefined();
      expect(typosEditsContributions.contributions).toEqual(3);
      expect(contentAdditionContributions).toBeDefined();
      expect(contentAdditionContributions.contributions).toEqual(2);
    });

    test('404 Not found - user not found', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/4/contributions/types',
      });
      expect(statusCode).toEqual(404);
    });

    test('400 Bad request - invalid user id', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/id/contributions/types',
      });
      expect(statusCode).toEqual(400);
    });
  });
});
