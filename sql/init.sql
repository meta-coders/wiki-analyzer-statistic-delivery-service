CREATE EXTENSION IF NOT EXISTS timescaledb;

CREATE TYPE CONTRIBUTION_TYPE AS ENUM('typo_editting', 'content_addition', 'other');

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE
);

CREATE TABLE contributions (
  timestamp         TIMESTAMPTZ NOT NULL,
  event_id          TEXT NOT NULL UNIQUE,
  topic             TEXT NOT NULL,
  user_id           INTEGER REFERENCES users NOT NULL,
  contribution_type CONTRIBUTION_TYPE NOT NULL
);

SELECT create_hypertable('contributions', 'timestamp');
