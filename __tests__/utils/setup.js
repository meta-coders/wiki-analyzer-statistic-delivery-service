'use strict';

const { Client } = require('pg');
const dotenv = require('dotenv');

const setup = async () => {
  dotenv.config();
  const client = new Client({ connectionString: process.env.TEST_DB_URL });
  await client.connect();
  await client.query(`TRUNCATE table users CASCADE`);
  await client.query(
    `INSERT INTO users(user_id, username) VALUES(1, 'user 1'), (2, 'user 2'), (3, 'user 3')`
  );
  await client.query(
    `INSERT INTO contributions(timestamp, topic, user_id, contribution_type)
       VALUES
              ('2019-06-22 19:10:25+03', 'Topic 1', 1, 'typo_editting'),
              ('2019-06-25 19:10:25+03', 'Topic 1', 2, 'typo_editting'),
              ('2019-07-20 13:10:25+03', 'Topic 2', 2, 'content_addition'),
              ('2019-08-10 15:10:25+03', 'Topic 2', 3, 'content_addition'),
              ('2019-08-10 15:10:25+03', 'Topic 1', 3, 'typo_editting'),
              ('2019-08-20 13:10:25+03', 'Topic 2', 2, 'content_addition'),
              ('2019-08-10 15:10:25+03', 'Topic 1', 2, 'typo_editting'),
              ('2019-08-10 15:10:25+03', 'Topic 2', 2, 'typo_editting')
       `
  );
  await client.end();
};

module.exports = setup;
