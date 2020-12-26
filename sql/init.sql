CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TYPE CONTRIBUTION_TYPE AS ENUM('typo_editting', 'content_addition');

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE
);

CREATE TABLE contributions (
  timestamp         TIMESTAMPTZ NOT NULL,
  topic             TEXT NOT NULL,
  user_id           INTEGER REFERENCES users NOT NULL,
  contribution_type CONTRIBUTION_TYPE NOT NULL
);

SELECT create_hypertable('contributions', 'timestamp');
