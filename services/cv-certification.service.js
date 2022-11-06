const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CVCertificationService {
  constructor() { }

  async create(data) {
    const newCertification = await models.CVCertification.create(data);

    return newCertification;
  }

  async getAll() {
    const certifications = await models.CVCertification.findAll();

    return certifications;
  }

  async getOne(id) {
    const certification = await models.CVCertification.findByPk(id);

    if (!certification) {
      throw boom.notFound('Certification not found!');
    }

    return certification;
  }

  async update(id, certification) {
    const cvCertification = await this.getOne(id);

    const updatedCVCertification = await cvCertification.update(certification);

    return updatedCVCertification;
  }

  async delete(id) {
    const cvCertification = await this.getOne(id);
    await cvCertification.destroy();
  }
}

module.exports = CVCertificationService;
