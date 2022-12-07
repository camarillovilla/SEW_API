const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
// const EmployeeService = require('../services/employee.service');
// const employeeService = new EmployeeService();

class OfferService {
  constructor() { }

  async getRecruterOffers(recruiterId) {
    const offers = await models.Offer.findAll({
      where: { recruiterId },        
    });
    // const offers = await models.Offer.findAll();

    return offers;
  }

  async create(data) {
    const employee = await employeeService.getOne(data.employeeId);

    const employeeHasCV = await models.CV.findOne({
      where: { employeeId: employee.id }
    });

    if (employeeHasCV) {
      throw boom.conflict('Employee already has a CV!');
    }

    const newCV = await models.CV.create({
      description: data.description,
      employeeId: data.employeeId,
      lenguages: data.lenguages,
      workExperiences: data.workExperiences,
      academicTrainings: data.academicTrainings,
      certifications: data.certifications,
      skills: data.skills
    }, {
      include: ['skills', 'workExperiences', 'academicTrainings', 'certifications', 'lenguages'],
    });

    return (this.convertToJSON(newCV));
  }

  async getAll() {
    const cvs = await models.CV.findAll({
      include: [{
        model: models.Employee,
        as: 'employee',
        attributes: ['id', 'fullName', 'phone', 'userId']
      }, 'skills', 'workExperiences', 'academicTrainings', 'certifications', 'lenguages']
    });

    let cvsJSON = [];

    for (let cv of cvs) {
      cvsJSON.push(this.convertToJSON(cv));
    }

    return cvsJSON;
  }

  async getOne(id) {
    const cv = await models.CV.findOne({
      where: { id },
      include: [{
        model: models.Employee,
        as: 'employee',
        attributes: ['id', 'fullName', 'phone', 'userId']
      }, 'lenguages', 'workExperiences', 'academicTrainings', 'certifications', 'skills']
    });

    if (!cv) {
      throw boom.notFound('CV not found!');
    }

    return cv;
  }

  async getOneByUser(userId) {
    const cv = await models.CV.findOne({
      where: {
        '$employee.user.id$': userId
      },
      include: [
        {
          association: 'employee',
          include: ['user']
        },
      ]
    });

    if (!cv) {
      throw boom.notFound('CV not found!');
    }

    const cvAuxiliar = await this.getOne(cv.id);

    return this.convertToJSON(cvAuxiliar);
  }

  async update(id, changes) {
    const cv = await this.getOne(id);
    const updatedCV = await cv.update(changes);

    return updatedCV;
  }

  convertToJSON(cv) {
    const cvJSON = JSON.parse(JSON.stringify(cv));
    cvJSON.lenguages = cv.lenguages.map(object => object.lenguage);
    cvJSON.workExperiences = cv.workExperiences.map(object => object.workExperience);
    cvJSON.academicTrainings = cv.academicTrainings.map(object => object.academicTraining);
    cvJSON.certifications = cv.certifications.map(object => object.certification);
    cvJSON.skills = cv.skills.map(object => object.skill);

    return cvJSON;
  }
}

module.exports = OfferService;

