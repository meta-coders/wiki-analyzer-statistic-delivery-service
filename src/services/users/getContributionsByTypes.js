'use strict';

const getContributionsByTypes = (fastify) => async (request, reply) => {
  const { id } = request.params;
  const pgClient = await fastify.pg.connect();
  const userExistsResult = await pgClient.query(
    `SELECT user_id FROM users WHERE user_id = $1`,
    [id]
  );

  if (userExistsResult.rowCount === 0) {
    reply.code(404);
    reply.send({
      code: 404,
      message: fastify.errorMessages.userNotExists,
    });
    return;
  }

  const contributionsResult = await pgClient.query(
    `SELECT contribution_type AS type,
            COUNT(*) AS contributions
       FROM contributions
      WHERE user_id = $1
   GROUP BY contribution_type`,
    [id]
  );

  pgClient.release();
  reply.send({ contributions: contributionsResult.rows });
};

module.exports = getContributionsByTypes;
