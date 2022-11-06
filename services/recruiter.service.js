const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

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

  async update(id, changes) {
    const recruiter = await this.getOne(id);
    const updatedRecruiter = await recruiter.update(changes);

    return updatedRecruiter;
  }

  async delete(id) {
    const recruiter = await this.getOne(id);
    const user = await models.User.findByPk(recruiter.user.id);
    await user.destroy();
  }
}

module.exports = RecruiterService;
