const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class JobApplicationService {
  constructor() { }

  // async getOneJobApplication(employeeId, offerId){

  //   const jobApplication = await models.JobApplication.findOne({
  //     where: { 
  //       employeeId: employeeId,
  //       offerId: offerId
  //     },      
  //   });

  //   return jobApplication;
  // }

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
    await jobApplication.destroy();         
  }

  async updateJobApplication(id, changes) {
    const jobApplication = await this.getOneOffer(id);
    const updatedOffer = await offer.update(changes);

    return updatedOffer;
  }

}

module.exports = JobApplicationService;

