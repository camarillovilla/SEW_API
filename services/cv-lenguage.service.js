const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CVLenguageService {
  constructor() { }

  async create(data) {
    const newLenguage = await models.CVLenguage.create(data);

    return newLenguage;
  }

  async getAll() {
    const lenguages = await models.CVLenguage.findAll();

    return lenguages;
  }

  async getOne(id) {
    const lenguage = await models.CVLenguage.findByPk(id);

    if (!lenguage) {
      throw boom.notFound('Lenguage not found!');
    }

    return lenguage;
  }

  async update(id, data) {
    const cvLenguage = await this.getOne(id);
    const updatedCVLenguage = await cvLenguage.update(data);

    return updatedCVLenguage;;
  }

  async delete(id) {
    const cvLenguage = await this.getOne(id);
    await cvLenguage.destroy();
  }
}

module.exports = CVLenguageService;
