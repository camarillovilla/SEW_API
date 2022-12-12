const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class FollowerService {
  constructor() { }

  async getFollowersByRecluiter(recruiterId) {
    const followers = await models.RecruiterFollower.findAll({
      where: { recruiterId },        
    });

    return followers.length;
  }

}

module.exports = FollowerService;

