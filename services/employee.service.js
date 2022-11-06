const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class EmployeeService {
  constructor() {}

  async create(data) {
    const hash =  await bcrypt.hash(data.user.password, 10);
    data.user.password = hash;
    const newUser =  await models.User.create(data.user);
    const newEmployee = await models.Employee.create({
      ...data,
      userId: newUser.id
    });

    delete newEmployee.dataValues.password;

    return newEmployee;
  }

  async getAll() {
    const employees = await models.Employee.findAll();

    return employees;
  }

  async getOne(id) {
    const employee = await models.Employee.findByPk(id, {
      include: [{
        model: models.User,
        as: 'user',
        attributes: ['id', 'email', 'rfc', 'role']
      }, {
        model: models.CV,
        as: 'cv',
        include: ['lenguages', 'workExperiences', 'academicTrainings', 'certifications', 'skills']
      }]
    });

    if (!employee) {
      throw boom.notFound('Employee not found!');
    }

    delete employee.dataValues.userId;

    return employee;
  }

  async update(id, changes) {
    const employee = await this.getOne(id);
    const updatedEmployee = await employee.update(changes);

    return updatedEmployee;
  }

  async delete(id) {
    const employee = await this.getOne(id);
    const user = await models.User.findByPk(employee.user.id);
    await user.destroy();
  }
}

module.exports = EmployeeService;
