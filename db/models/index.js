// Data Serialization
const { User, UserSchema } = require('./user.model');
const { Employee, EmployeeSchema } = require('./employee.model');
const { Recruiter, RecruiterSchema } = require('./recruiter.model');
const { Address, AddressSchema } = require('./address.model');
const { RecruiterFollower, RecruiterFollowerSchema } = require('./recruiter-follower.model');
const { EmployeeInterest, EmployeeInterestSchema } = require('./employee-interest.model');
const { EmployeeLaborField, EmployeeLaborFieldSchema } = require('./employee-labor-field.model');

const { CV, CVSchema } = require('./cv.model');
const { CVAcademicTraining, CVAcademicTrainingSchema } = require('./cv-academic-training.model');
const { CVCertification, CVCertificationSchema } = require('./cv-certification.model');
const { CVLenguage, CVLenguageSchema } = require('./cv-lenguage.model');
const { CVSkill, CVSkillSchema } = require('./cv-skill.model');
const { CVWorkExperience, CVWorkExperienceSchema } = require('./cv-work-experience.model');
const { Group, GroupSchema } = require('./group.model');
const { JobApplication, JobApplicationSchema } = require('./job-application.model');
const { Offer, OfferSchema } = require('./offer.model');
const { Publication, PublicationSchema } = require('./publication.model');
const { RecruiterGroup, RecruiterGroupSchema } = require('./recruiter-group.model');
const { Coment, ComentSchema } = require('./coment.model');

function setupModels(sequelize) {
  // Configuration Scheme
  User.init(UserSchema, User.config(sequelize));
  Address.init(AddressSchema, Address.config(sequelize));
  Employee.init(EmployeeSchema, Employee.config(sequelize));
  Recruiter.init(RecruiterSchema, Recruiter.config(sequelize));
  RecruiterFollower.init(RecruiterFollowerSchema, RecruiterFollower.config(sequelize));
  EmployeeInterest.init(EmployeeInterestSchema, EmployeeInterest.config(sequelize));
  EmployeeLaborField.init(EmployeeLaborFieldSchema, EmployeeLaborField.config(sequelize));

  CV.init(CVSchema, CV.config(sequelize));
  CVAcademicTraining.init(CVAcademicTrainingSchema, CVAcademicTraining.config(sequelize));
  CVCertification.init(CVCertificationSchema, CVCertification.config(sequelize));
  CVLenguage.init(CVLenguageSchema, CVLenguage.config(sequelize));
  CVSkill.init(CVSkillSchema, CVSkill.config(sequelize));
  CVWorkExperience.init(CVWorkExperienceSchema, CVWorkExperience.config(sequelize));
  Group.init(GroupSchema, Group.config(sequelize));
  JobApplication.init(JobApplicationSchema, JobApplication.config(sequelize));
  Offer.init(OfferSchema, Offer.config(sequelize));
  Publication.init(PublicationSchema, Publication.config(sequelize));
  RecruiterGroup.init(RecruiterGroupSchema, RecruiterGroup.config(sequelize));
  Coment.init(ComentSchema, Coment.config(sequelize));

  // Asociations
  User.associate(sequelize.models);
  Address.associate(sequelize.models);
  Employee.associate(sequelize.models);
  Recruiter.associate(sequelize.models);
  RecruiterFollower.associate(sequelize.models);
  EmployeeInterest.associate(sequelize.models);
  EmployeeLaborField.associate(sequelize.models);

  CV.associate(sequelize.models);
  CVAcademicTraining.associate(sequelize.models);
  CVCertification.associate(sequelize.models);
  CVLenguage.associate(sequelize.models);
  CVSkill.associate(sequelize.models);
  CVWorkExperience.associate(sequelize.models);
  Group.associate(sequelize.models);
  JobApplication.associate(sequelize.models);
  Offer.associate(sequelize.models);
  Publication.associate(sequelize.models);
  RecruiterGroup.associate(sequelize.models);
  Coment.associate(sequelize.models)
}

module.exports = setupModels;
