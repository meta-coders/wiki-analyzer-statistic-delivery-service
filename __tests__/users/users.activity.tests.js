'use strict';

const app = require('../../app')();

describe(`Users GET - API - Get users by contributions activity`, () => {
  describe('GET /users/activity', () => {
    afterAll(() => app.pg.pool.end());

    test('200 OK - get users with activity scaled in days', async () => {
      const expectedUsers = [
        {
          user_id: 1,
          username: 'user 1',
          contributions: 1,
          period: '2019-06-22',
        },
        {
          user_id: 2,
          username: 'user 2',
          contributions: 1,
          period: '2019-06-25',
        },
        {
          user_id: 2,
          username: 'user 2',
          contributions: 1,
          period: '2019-07-20',
        },
        {
          user_id: 3,
          username: 'user 3',
          contributions: 2,
          period: '2019-08-10',
        },
        {
          user_id: 2,
          username: 'user 2',
          contributions: 2,
          period: '2019-08-10',
        },
        {
          user_id: 2,
          username: 'user 2',
          contributions: 1,
          period: '2019-08-20',
        },
      ];

      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/activity?timescale=day',
      });
      expect(statusCode).toEqual(200);
      const { users } = JSON.parse(body);
      expect(users).toBeDefined();
      expect(users).toEqual(expectedUsers);
    });

    test('200 OK - get users with activity scaled in weeks', async () => {
      const expectedUsers = [
        {
          user_id: 1,
          username: 'user 1',
          contributions: 1,
          period: '2019-06-17',
        },
        {
          user_id: 2,
          username: 'user 2',
          contributions: 1,
          period: '2019-06-24',
        },
        {
          user_id: 2,
          username: 'user 2',
          contributions: 1,
          period: '2019-07-15',
        },
        {
          user_id: 2,
          username: 'user 2',
          contributions: 2,
          period: '2019-08-05',
        },
        {
          user_id: 3,
          username: 'user 3',
          contributions: 2,
          period: '2019-08-05',
        },
        {
          user_id: 2,
          username: 'user 2',
          contributions: 1,
          period: '2019-08-19',
        },
      ];

      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/activity?timescale=week',
      });
      expect(statusCode).toEqual(200);
      const { users } = JSON.parse(body);
      expect(users).toBeDefined();
      expect(users).toEqual(expectedUsers);
    });

    test('200 OK - get users with activity scaled in months', async () => {
      const expectedUsers = [
        {
          user_id: 2,
          username: 'user 2',
          contributions: 1,
          period: '2019-06-01',
        },
        {
          user_id: 1,
          username: 'user 1',
          contributions: 1,
          period: '2019-06-01',
        },
        {
          user_id: 2,
          username: 'user 2',
          contributions: 1,
          period: '2019-07-01',
        },
        {
          user_id: 2,
          username: 'user 2',
          contributions: 3,
          period: '2019-08-01',
        },
      ];

      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/activity?timescale=month',
      });
      expect(statusCode).toEqual(200);
      const { users } = JSON.parse(body);
      expect(users).toBeDefined();
      expect(users).toEqual(expectedUsers);
    });

    test('200 OK - get users with activity scaled in years', async () => {
      const expectedUsers = [
        {
          user_id: 2,
          username: 'user 2',
          contributions: 5,
          period: '2019-01-01',
        },
      ];

      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/activity?timescale=year',
      });
      expect(statusCode).toEqual(200);
      const { users } = JSON.parse(body);
      expect(users).toBeDefined();
      expect(users).toEqual(expectedUsers);
    });

    test('200 OK - get users with activity sorted ascending', async () => {
      const expectedUsers = [
        {
          user_id: 1,
          username: 'user 1',
          contributions: 1,
          period: '2019-01-01',
        },
      ];

      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/activity?timescale=year&sort=asc',
      });
      expect(statusCode).toEqual(200);
      const { users } = JSON.parse(body);
      expect(users).toBeDefined();
      expect(users).toEqual(expectedUsers);
    });

    test('200 OK - get users with activity sorted descending', async () => {
      const expectedUsers = [
        {
          user_id: 2,
          username: 'user 2',
          contributions: 5,
          period: '2019-01-01',
        },
      ];

      const { body, statusCode } = await app.inject({
        method: 'GET',
        url: '/users/activity?timescale=year&sort=desc',
      });
      expect(statusCode).toEqual(200);
      const { users } = JSON.parse(body);
      expect(users).toBeDefined();
      expect(users).toEqual(expectedUsers);
    });

    test('400 Bad request - invalid sort', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/activity?sort=1',
      });
      expect(statusCode).toEqual(400);
    });

    test('400 Bad request - invalid timescale', async () => {
      const { statusCode } = await app.inject({
        method: 'GET',
        url: '/users/activity?timescale=invalid',
      });
      expect(statusCode).toEqual(400);
    });
  });
});
