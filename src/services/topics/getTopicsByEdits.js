'use strict';

const getTopicsByEdits = (fastify) => async (request, reply) => {
  const { sort, limit } = request.query;
  const pgClient = await fastify.pg.connect();
  const topicsResult = await pgClient.query(
    `SELECT topic,
            COUNT(*) AS edits
       FROM contributions
      WHERE contribution_type = 'typo_editting'
   GROUP BY topic
   ORDER BY edits ${sort}
      LIMIT ${limit}`
  );

  pgClient.release();
  reply.send({ topics: topicsResult.rows });
};

module.exports = getTopicsByEdits;
