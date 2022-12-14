const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');
const UserService = require('./user.service');
const serviceUser = new UserService();

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

  async getOneEmployeeUser(id) {
    const employee = await models.Employee.findByPk(id, {
      include: [{
        model: models.User,
        as: 'user',
        attributes: ['id', 'rfc', 'role']
      }]
    });

    if (!employee) {
      throw boom.notFound('Employee not found!');
    }  

    return employee;
  }

  async update(userId, id, changes) {
    const user = await models.User.findByPk(userId);
    const employee = await this.getOne(id);
    let changesUser = {};

    if (employee.user.id === user.id) {
      if (changes.email) {
        changesUser.email = changes.email;
      }

      if (changes.rfc) {
        changesUser.rfc = changes.rfc;
      }

      if (changesUser) {
        await serviceUser.update(user.id, changesUser);
      }

      const updatedEmployee = await employee.update(changes);

      return updatedEmployee;
    } else {
      throw boom.unauthorized();
    }
  }

  async delete(id) {
    const employee = await this.getOne(id);
    const user = await models.User.findByPk(employee.user.id);
    await user.destroy();
  }

  async getOneEmployee(id) {
    const employee = await models.Employee.findByPk(id, {
      include: ['offers']
    });    

    if (!employee) {
      throw boom.notFound('Employee not found!');
    }  
    
    return employee;
  }

}

module.exports = EmployeeService;
