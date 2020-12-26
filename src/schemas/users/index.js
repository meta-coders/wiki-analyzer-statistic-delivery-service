'use strict';

const getContributions = require('./getContributions');
const getContributionsByTopics = require('./getContributionsByTopics');
const getContributionsByTypes = require('./getContributionsByTypes');
const getUsersByActivity = require('./getUsersByActivity');

module.exports = {
  getContributions,
  getContributionsByTopics,
  getContributionsByTypes,
  getUsersByActivity,
};
