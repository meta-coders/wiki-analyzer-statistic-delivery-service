'use strict';

const app = require('../../app')();

describe(`Users GET - API - Get user's contributions`, () => {
  describe('GET /users/:id/contributions', () => {
    afterAll(() => app.pg.pool.end());

    test('200 OK - get contributions scaled in days', async () => {
      const expectedContributions = [
        { contributions: 1, period: '2019-06-25' },
        { contributions: 1, period: '2019-07-20' },
        { contributions: 2, period: '2019-08-10' },
        { contributions: 1, period: '2019-08-20' },
      ];

      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions?timescale=day',
      });
      expect(statusCode).toEqual(200);
      const { contributions } = JSON.parse(body);
      expect(contributions).toBeDefined();
      expect(contributions).toEqual(expectedContributions);
    });

    test('200 OK - get contributions scaled in weeks', async () => {
      const expectedContributions = [
        { contributions: 1, period: '2019-06-24' },
        { contributions: 1, period: '2019-07-15' },
        { contributions: 2, period: '2019-08-05' },
        { contributions: 1, period: '2019-08-19' },
      ];

      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions?timescale=week',
      });
      expect(statusCode).toEqual(200);
      const { contributions } = JSON.parse(body);
      expect(contributions).toBeDefined();
      expect(contributions).toEqual(expectedContributions);
    });

    test('200 OK - get contributions scaled in months', async () => {
      const expectedContributions = [
        { contributions: 1, period: '2019-06-01' },
        { contributions: 1, period: '2019-07-01' },
        { contributions: 3, period: '2019-08-01' },
      ];

      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions?timescale=month',
      });
      expect(statusCode).toEqual(200);
      const { contributions } = JSON.parse(body);
      expect(contributions).toBeDefined();
      expect(contributions).toEqual(expectedContributions);
    });

    test('200 OK - get contributions scaled in years', async () => {
      const expectedContributions = [
        { contributions: 5, period: '2019-01-01' },
      ];
      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions?timescale=year',
      });
      expect(statusCode).toEqual(200);
      const { contributions } = JSON.parse(body);
      expect(contributions).toBeDefined();
      expect(contributions).toEqual(expectedContributions);
    });

    test('404 Not found - user not found', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/4/contributions',
      });
      expect(statusCode).toEqual(404);
    });

    test('400 Bad request - invalid user id', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/id/contributions',
      });
      expect(statusCode).toEqual(400);
    });

    test('400 Bad request - invalid timescale', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/2/contributions?timescale=invalid',
      });
      expect(statusCode).toEqual(400);
    });
  });
});
