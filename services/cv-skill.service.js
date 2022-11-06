const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CVSkillService {
  constructor() { }

  async create(data) {
    const newSkill = await models.CVSkill.create(data);

    return newSkill;
  }

  async getAll() {
    const skills = await models.CVSkill.findAll();

    return skills;
  }

  async getOne(id) {
    const skill = await models.CVSkill.findByPk(id);

    if (!skill) {
      throw boom.notFound('Skill not found!');
    }

    return skill;
  }

  async update(id, data) {
    const cvSkill = await this.getOne(id);
    const updatedCVSkill = await cvSkill.update(data);

    return updatedCVSkill;
  }

  async delete(id) {
    const cvSkill = await this.getOne(id);
    await cvSkill.destroy();
  }
}

module.exports = CVSkillService;
