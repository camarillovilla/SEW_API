const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CVWorkExperienceService {
  constructor() { }

  async create(data) {
    const newWorkExperience = await models.CVWorkExperience.create(data);

    return newWorkExperience;
  }

  async getAll() {
    const workExperiences = await models.CVWorkExperience.findAll();

    return workExperiences;
  }

  async getOne(id) {
    const workExperience = await models.CVWorkExperience.findByPk(id);

    if (!workExperience) {
      throw boom.notFound('Work Experience not found!');
    }

    return workExperience;
  }

  async update(id, data) {
    const cvWorkExperience = await this.getOne(id);
    const updatedCVWorkExperience = await cvWorkExperience.update(data);

    return updatedCVWorkExperience;
  }

  async delete(id) {
    const cvWorkExperience = await this.getOne(id);
    await cvWorkExperience.destroy();
  }
}

module.exports = CVWorkExperienceService;
