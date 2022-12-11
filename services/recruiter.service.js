const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');
const UserService = require('./user.service');
const serviceUser = new UserService();

class RecruiterService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    data.user.password = hash;
    const newUser = await models.User.create(data.user);
    const newRecruiter = await models.Recruiter.create({
      ...data,
      userId: newUser.id
    });

    delete newRecruiter.dataValues.password;

    return newRecruiter;
  }

  async getAll() {
    const recruiters = await models.Recruiter.findAll();

    return recruiters;
  }

  async getOne(id) {
    const recruiter = await models.Recruiter.findByPk(id, {
      include: [{
        model: models.User,
        as: 'user',
        attributes: ['id', 'email', 'rfc', 'role']
      }]
    });

    if (!recruiter) {
      throw boom.notFound('Recruiter not found!');
    }

    delete recruiter.dataValues.userId;

    return recruiter;
  }

  async update(userId, id, changes) {
    const user = await models.User.findByPk(userId);
    const recruiter = await this.getOne(id);
    let changesUser = {};

    if (recruiter.user.id === user.id) {
      if (changes.email) {
        changesUser.email = changes.email;
      }

      if (changes.rfc) {
        changesUser.rfc = changes.rfc;
      }

      if (changesUser) {
        await serviceUser.update(user.id, changesUser);
      }

      const updatedRecruiter = await recruiter.update(changes);

      return updatedRecruiter;
    } else {
      throw boom.unauthorized();
    }
  }

  async delete(id) {
    const recruiter = await this.getOne(id);
    const user = await models.User.findByPk(recruiter.user.id);
    await user.destroy();
  }

  async createFollower(data) {
    const follower = await models.RecruiterFollower.create(data);

    return follower;
  }

  async deleteFollower(id) {
    const follower = await models.RecruiterFollower.findByPk(id);

    if (!follower) {
      throw boom.notFound('Follower not found!');
    }

    await follower.destroy();
  }
}

module.exports = RecruiterService;
