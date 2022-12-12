const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class JobApplicationService {
  constructor() { }

  async getOneJobApplication(id){

    const jobApplication = await models.JobApplication.findOne({
      where: { 
        id: id
      },      
    });

    if (!jobApplication) {
      throw boom.notFound('Job Application not found!');
    }

    return jobApplication;
  }

  async getOneJobApplicationEmployee(employeeId, offerId){

    const jobApplication = await models.JobApplication.findOne({
      where: { 
        employeeId: employeeId,
        offerId: offerId
      },      
    });    

    return jobApplication;
  }

  async getOfferJobApplications(offerId){

    const jobApplications = await models.JobApplication.findAll({
      where: { offerId },        
    });    
    
    return jobApplications;
  }

  async getOfferStatusJobApplications(offerId, status){

    const jobApplications = await models.JobApplication.findAll({
      where: { offerId: offerId, status: status },        
    });    
    
    return jobApplications;
  }

  async getEmployeeJobApplications(employeeId){
    const jobApplications = await models.JobApplication.findAll({
      where: { employeeId },        
    });
    
    return jobApplications;
  }
  
  async createJobApplication(status, employeeId, offerId){    

    const application = await models.JobApplication.findOne({
      where: { 
        employeeId: employeeId,
        offerId: offerId
      },      
    });

    if (application) {
      throw boom.notFound('That Job Application Already Exists!');
    }

    const newJobApplication = await models.JobApplication.create({
      status: status,
      employeeId: employeeId,
      offerId: offerId
    });

    return (newJobApplication);
  }  

  async deleteJobApplication(employeeId, offerId){
    const jobApplication = await this.getOneJobApplicationEmployee(employeeId, offerId);     
    if (!jobApplication) {
      throw boom.notFound('Job Application not found!');
    }
    
    await jobApplication.destroy();         
  }

  async updateJobApplication(id, changes) {
    
    const jobApplication = await this.getOneJobApplication(id);
    const updatedOffer = await jobApplication.update(changes);

    return updatedOffer;
  }

}

module.exports = JobApplicationService;

