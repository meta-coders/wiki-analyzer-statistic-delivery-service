'use strict';

const getUsersByActivity = (fastify) => async (request, reply) => {
  const { sort, timescale } = request.query;
  const pgClient = await fastify.pg.connect();
  const usersResult = await pgClient.query(
    `WITH contributions_count AS (
      SELECT date_trunc('${timescale}', timestamp) period,
             user_id,
             COUNT(*) as contributions
        FROM contributions
    GROUP BY user_id, period
    ), ranked_conributions_count AS (
      SELECT user_id,
             DENSE_RANK() OVER (PARTITION BY period ORDER BY contributions ${sort}) as rank,
             period,
             contributions
        FROM contributions_count
    ) SELECT user_id,
             username,
             contributions,
             period
        FROM ranked_conributions_count
        JOIN users
       USING(user_id)
       WHERE rank = 1`
  );

  pgClient.release();
  reply.send({ users: usersResult.rows });
};

module.exports = getUsersByActivity;
