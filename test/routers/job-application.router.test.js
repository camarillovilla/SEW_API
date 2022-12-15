const app = require('../../app');
const request = require('supertest');
const faker = require('faker');

let accessToken = undefined;

test('Status Code: 200 (OK). Login employee to get access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: "joserodrigosanchezmendez@gmail.com",
        password: "limoncito1A",
      });

    expect(response.statusCode).toBe(200);
    accessToken = response.body.token;
  });

/**
  * CRUD JobApplication
*/

const jobApplicationID = 81;

describe('POST /oneJobApplication', () => {
  test('Status Code: 200 (OK). Get one jobApplication by id',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/oneJobApplication')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: jobApplicationID
      });
    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get one jobApplication by id withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/oneJobApplication')
      .send({
        id: jobApplicationID
      });
    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Get one jobApplication by id with invalid access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/oneJobApplication')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        id: jobApplicationID
      });

      expect(response.statusCode).toBe(401);
  });

  test('Status Code: 400 (Bad Request). Get one jobApplication by id with invalid id format',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/oneJobApplication')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: "id"
      });

      expect(response.statusCode).toBe(400);
  });

  test('Status Code: 404 (Not Found). Get one jobApplication by id with invalid id',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/oneJobApplication')
      .set('Authorization', `Bearer ${accessToken}`)
       .send({
        id: faker.datatype.number()
      });

    expect(response.statusCode).toBe(404);
  });      
});

const employeeId = 1;
const offerId = 3;

describe('POST /oneJobApplicationEmployee', () => {
  test('Status Code: 200 (OK). Get one jobApplication by idEmployee and idOffer',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/oneJobApplicationEmployee')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        employeeId: employeeId,
        offerId: offerId
      });
    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get one jobApplication by idEmployee and idOffer withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/oneJobApplicationEmployee')
      .send({
        employeeId: employeeId,
        offerId: offerId
      });
    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Get one jobApplication by idEmployee and idOffer with invalid access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/oneJobApplicationEmployee')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        employeeId: employeeId,
        offerId: offerId
      });

      expect(response.statusCode).toBe(401);
  });

  test('Status Code: 400 (Bad Request). Get one jobApplication by idEmployee and idOffer with invalid idEmployee and idOffer format',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/oneJobApplicationEmployee')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        employeeId: "employeeId",
        offerId: "offerId"
      });

      expect(response.statusCode).toBe(400);
  });
});

describe('POST /offerJobApplications', () => {
  test('Status Code: 200 (OK). Get all Offer JobApplications',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerJobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        offerId: offerId
      });
    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get all Offer JobApplications withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerJobApplications')
      .send({
        offerId: offerId
      });
    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Get all Offer JobApplications with invalid access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerJobApplications')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        offerId: offerId
      });

      expect(response.statusCode).toBe(401);
  });      

  test('Status Code: 400 (Bad Request). Get all Offer JobApplications with invalid offerId format',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerJobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        offerId: "offerId"
      });

      expect(response.statusCode).toBe(400);
  });      

  test('Status Code: 200 (OK). Get a Empty Offer JobApplications by offerId with invalid offerId',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerJobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        offerId: faker.datatype.number()
      });

    expect(response.statusCode).toBe(200);
  });
});

const status = "Pendiente";

describe('POST /offerStatusJobApplications', () => {
  test('Status Code: 200 (OK). Get all Offer JobApplications by status',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerStatusJobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        offerId: offerId,
        status: status
      });
    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get all Offer JobApplications by status withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerStatusJobApplications')
      .send({
        offerId: offerId,
        status: status
      });
    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Get all Offer JobApplications by status with invalid access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerStatusJobApplications')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        offerId: offerId,
        status: status
      });

      expect(response.statusCode).toBe(401);
  });      

  test('Status Code: 400 (Bad Request). Get all Offer JobApplications by status with invalid offerId format',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerStatusJobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        offerId: "offerId",
        status: status
      });

      expect(response.statusCode).toBe(400);
  });      

  test('Status Code: 400 (Bad Request). Get all Offer JobApplications by status with invalid status format',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerStatusJobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        offerId: offerId,
        status: 1
      });

      expect(response.statusCode).toBe(400);
  });      

  test('Status Code: 200 (OK). Get a Empty Offer JobApplications by status with invalid offerId',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/offerStatusJobApplications')
      .set('Authorization', `Bearer ${accessToken}`)      
      .send({
        offerId: faker.datatype.number(),
        status: status
      });

    expect(response.statusCode).toBe(200);
  });
});

describe('POST /employeeJobApplications', () => {
  test('Status Code: 200 (OK). Get all Employee JobApplications',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/employeeJobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        employeeId: employeeId
      });
    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get all Employee JobApplications withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/employeeJobApplications')
      .send({
        employeeId: employeeId
      });
    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Get all Employee JobApplications with invalid access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/employeeJobApplications')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        employeeId: employeeId
      });

      expect(response.statusCode).toBe(401);
  });      

  test('Status Code: 400 (Bad Request). Get all Employee JobApplications with invalid employeeId format',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/employeeJobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        employeeId: "employeeId"
      });

      expect(response.statusCode).toBe(400);
  });      

  test('Status Code: 200 (OK). Get a Empty Employee JobApplications with invalid employeeId',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/employeeJobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        employeeId: faker.datatype.number()
      });

    expect(response.statusCode).toBe(200);
  });
});

describe('POST /createJobApplication', () => {
  test('Status Code: 400 (Bad Request). Empty body',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/createJobApplication')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({});

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Missing fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/createJobApplication')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: "Pendiente",
        employeeId: employeeId,        
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 409 (Conflict). JobApplication already exists',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/createJobApplication')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: "Pendiente",
        employeeId: employeeId,
        offerId: offerId  
      });

    expect(response.statusCode).toBe(409);
  });

  test('Status Code: 201 (Created). Create a new JobApplication',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/createJobApplication')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: "Pendiente",
        employeeId: 1,
        offerId: 32  
      });

    expect(response.statusCode).toBe(201);      
  });      
});

const employeeIdDelete = 1;
const offerIdDelete = 32;

describe('DELETE /deleteJobApplication', () => {
  test('Status Code: 204 (Deleted). Delete a JobApplication',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/jobApplications/deleteJobApplication/${employeeIdDelete}&${offerIdDelete}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);
  });

  test('Status Code: 401 (Unauthorized). Delete a JobApplication withouth access token',
  async () => {
    const response = await request(app)
    .delete(`/api/v1/jobApplications/deleteJobApplication/${employeeIdDelete}&${offerIdDelete}`)

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Delete a JobApplication with invalid access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/jobApplications/deleteJobApplication/${employeeIdDelete}&${offerIdDelete}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Delete a JobApplication with invalid ids',
  async () => {
    const response = await request(app)      
      .delete(`/api/v1/jobApplications/deleteJobApplication/${faker.datatype.number()}&${faker.datatype.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});

const offerIdUpdate = 103;

describe('PATCH /offers', () => {
  test('Status Code: 200 (OK). Update a JobApplication',
  async () => {
    const response = await request(app)
      .patch('/api/v1/jobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: offerIdUpdate,
        changes: {
          status: "Rechazada",                      
        }        
      });

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 400 (Bad Request). Update JobApplication by id with token and non existent fields',
  async () => {
    const response = await request(app)
      .patch('/api/v1/jobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Update jobApplications by id with long fields',
  async () => {
    const response = await request(app)
      .patch('/api/v1/jobApplications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({          
        id: offerIdUpdate,
        changes: {
          status: faker.lorem.paragraphs().repeat(100),
        }
      });

      expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Update a JobApplications withouth access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/jobApplications`)
      .send({
        id: offerIdUpdate,
        changes: {
          status: "Rechazada",                      
        }        
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Update a JobApplication with invalid access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/jobApplications`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        id: offerIdUpdate,
        changes: {
          status: "Rechazada",                      
        }        
      });

    expect(response.statusCode).toBe(401);
  });
});

describe('POST /getOneEmployee', () => {
  test('Status Code: 200 (OK). Get one employee by id',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/getOneEmployee')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: employeeIdDelete
      });
    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get one employee by id withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/getOneEmployee')
      .send({
        id: employeeIdDelete
      });
    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Get one employee by id with invalid access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/getOneEmployee')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        id: employeeIdDelete
      });

      expect(response.statusCode).toBe(401);
  });

  test('Status Code: 400 (Bad Request). Get one employee by id with invalid id format',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/getOneEmployee')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: "employeeIdDelete"
      });

      expect(response.statusCode).toBe(400);
  });

  test('Status Code: 404 (Not Found). Get one employee by id with invalid id',
  async () => {
    const response = await request(app)
      .post('/api/v1/jobApplications/getOneEmployee')
      .set('Authorization', `Bearer ${accessToken}`)
       .send({
        id: faker.datatype.number()
      });

    expect(response.statusCode).toBe(404);
  });      
});

