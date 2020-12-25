'use strict';

const getContributionsByTopics = require('./getContributionsByTopics');
const getContributionsByTypes = require('./getContributionsByTypes');
const getUsersByActivity = require('./getUsersByActivity');

module.exports = {
  getContributionsByTopics,
  getContributionsByTypes,
  getUsersByActivity,
};
