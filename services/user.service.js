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

  async getOne(id, role) {
    let user = undefined;

    if (role === 'Employee') {
      user = await models.User.findByPk(id, {
        include: [{
          model: models.Employee,
          as: 'employee',
          attributes: ['id', 'fullName', 'phone'],
          include: [{
            model: models.CV,
            as: 'cv',
            include: ['lenguages', 'workExperiences', 'academicTrainings', 'certifications', 'skills']
          }]
        }], attributes: ['id', 'rfc','email', 'role']
      });
    } else {
      user = await models.User.findByPk(id, {
        include: [{
          model: models.Recruiter,
          as: 'recruiter',
          attributes: ['id', 'fullName', 'phone', 'charge'],
          include: [{
            model: models.RecruiterFollower,
            as: 'followers',
          },
          {
            model: models.Group,
            as: 'groups',
          }
        ]}]
      });
    }

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

    if (!user) {
      throw boom.unauthorized();
    }

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
