'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model');
const { EmployeeSchema, EMPLOYEE_TABLE } = require('./../models/employee.model');
const { RecruiterSchema, RECRUITER_TABLE } = require('./../models/recruiter.model');
const { AddressSchema, ADDRESS_TABLE } = require('./../models/address.model');
const { RecruiterFollowerSchema, RECRUITER_FOLLOWER_TABLE } = require('./../models/recruiter-follower.model');
const { EmployeeInterestSchema, EMPLOYEE_INTEREST_TABLE } = require('./../models/employee-interest.model');
const { EmployeeLaborFieldSchema, EMPLOYEE_LABOR_FIELD_TABLE } = require('./../models/employee-labor-field.model');
const { CVSchema, CV_TABLE } = require('./../models/cv.model');
const { CVAcademicTrainingSchema, CV_ACADEMIC_TRAINING_TABLE } = require('./../models/cv-academic-training.model');
const { CVCertificationSchema, CV_CERTIFICATION_TABLE } = require('./../models/cv-certification.model');
const { CVLenguageSchema, CV_LENGUAGE_TABLE } = require('./../models/cv-lenguage.model');
const { CVSkillSchema, CV_SKILL_TABLE } = require('./../models/cv-skill.model');
const { CVWorkExperienceSchema, CV_WORK_EXPERIENCE_TABLE } = require('./../models/cv-work-experience.model');
const { GroupSchema, GROUP_TABLE } = require('./../models/group.model');
const { JobApplicationSchema, JOB_APPLICATION_TABLE } = require('./../models/job-application.model');
const { OfferSchema, OFFER_TABLE } = require('./../models/offer.model');
const { ComentSchema, COMENT_TABLE } = require('./../models/coment.model');
const { PublicationSchema, PUBLICATION_TABLE } = require('./../models/publication.model');
const { RecruiterGroupSchema, RECRUITER_GROUP_TABLE } = require('./../models/recruiter-group.model');

module.exports = {
  up: async  (queryInterface) => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(EMPLOYEE_TABLE, EmployeeSchema);
    await queryInterface.createTable(RECRUITER_TABLE, RecruiterSchema);
    await queryInterface.createTable(ADDRESS_TABLE, AddressSchema);
    await queryInterface.createTable(EMPLOYEE_INTEREST_TABLE, EmployeeInterestSchema);
    await queryInterface.createTable(EMPLOYEE_LABOR_FIELD_TABLE, EmployeeLaborFieldSchema);
    await queryInterface.createTable(RECRUITER_FOLLOWER_TABLE, RecruiterFollowerSchema);
    await queryInterface.createTable(CV_TABLE, CVSchema);
    await queryInterface.createTable(CV_ACADEMIC_TRAINING_TABLE, CVAcademicTrainingSchema);
    await queryInterface.createTable(CV_CERTIFICATION_TABLE, CVCertificationSchema);
    await queryInterface.createTable(CV_LENGUAGE_TABLE, CVLenguageSchema);
    await queryInterface.createTable(CV_SKILL_TABLE, CVSkillSchema);
    await queryInterface.createTable(CV_WORK_EXPERIENCE_TABLE, CVWorkExperienceSchema);
    await queryInterface.createTable(OFFER_TABLE, OfferSchema);
    await queryInterface.createTable(JOB_APPLICATION_TABLE, JobApplicationSchema);
    await queryInterface.createTable(GROUP_TABLE, GroupSchema);
    await queryInterface.createTable(PUBLICATION_TABLE, PublicationSchema);
    await queryInterface.createTable(COMENT_TABLE, ComentSchema);
    await queryInterface.createTable(RECRUITER_GROUP_TABLE, RecruiterGroupSchema);
  },

  down: async (queryInterface)  => {
    await queryInterface.dropTable(RECRUITER_FOLLOWER_TABLE);
    await queryInterface.dropTable(EMPLOYEE_INTEREST_TABLE);
    await queryInterface.dropTable(EMPLOYEE_LABOR_FIELD_TABLE);
    await queryInterface.dropTable(ADDRESS_TABLE);
    await queryInterface.dropTable(CV_ACADEMIC_TRAINING_TABLE);
    await queryInterface.dropTable(CV_CERTIFICATION_TABLE);
    await queryInterface.dropTable(CV_LENGUAGE_TABLE);
    await queryInterface.dropTable(CV_SKILL_TABLE);
    await queryInterface.dropTable(CV_WORK_EXPERIENCE_TABLE);
    await queryInterface.dropTable(CV_TABLE);
    await queryInterface.dropTable(JOB_APPLICATION_TABLE);
    await queryInterface.dropTable(OFFER_TABLE);
    await queryInterface.dropTable(RECRUITER_GROUP_TABLE);
    await queryInterface.dropTable(COMENT_TABLE);
    await queryInterface.dropTable(PUBLICATION_TABLE);
    await queryInterface.dropTable(GROUP_TABLE);
    await queryInterface.dropTable(EMPLOYEE_TABLE);
    await queryInterface.dropTable(RECRUITER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
