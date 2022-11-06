const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CVAcademicTrainingService {
  constructor() { }

  async create(data) {
    const newAcademicTraining = await models.CVAcademicTraining.create(data);

    return newAcademicTraining;
  }

  async getAll() {
    const academicTrainings = await models.CVAcademicTraining.findAll();

    return academicTrainings;
  }

  async getOne(id) {
    const academicTraining = await models.CVAcademicTraining.findByPk(id);

    if (!academicTraining) {
      throw boom.notFound('Academic training not found!');
    }

    return academicTraining;
  }

  async update(id, data) {
    const cvAcademicTraining = await this.getOne(id);
    const updatedCVAcademicTraining = await cvAcademicTraining.update(data);

    return updatedCVAcademicTraining;
  }

  async delete(id) {
    const cvAcademicTraining = await this.getOne(id);
    await cvAcademicTraining.destroy();
  }
}

module.exports = CVAcademicTrainingService;
