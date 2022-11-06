const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UsersService {
  constructor() {}

  async createByGoogle(data) {
    const user = await models.User.create(data);

    delete user.dataValues.email;
    delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    delete user.dataValues.rfc;
    delete user.dataValues.createAt;

    return user;
  }

  async getAll() {
    const users = await models.User.findAll();

    return users;
  }

  async getOne(id) {
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('User not found!');
    }

    delete user.dataValues.password;

    return user;
  }

  async getByEmail(email) {
    const user = await models.User.findOne({
      where: { email }
    });

    delete user.dataValues.email;
    // delete user.dataValues.password;
    delete user.dataValues.recoveryToken;
    delete user.dataValues.rfc;
    delete user.dataValues.createAt;

    return user;
  }

  async update(id, data) {
    const user = await this.getOne(id);
    const updatedUser = await user.update(data);

    return updatedUser;
  }
}

module.exports = UsersService;
