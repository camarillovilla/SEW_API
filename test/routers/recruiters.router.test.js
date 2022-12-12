const app = require('../../app');
const request = require('supertest');
const faker = require('faker');

const recruiter = {
  fullName: faker.name.findName(),
  phone: faker.phone.phoneNumber('##########'),
  user: {
    rfc: faker.random.alphaNumeric(13),
    role: 'Recruiter',
    email: faker.internet.email(),
    password: 'Limoncito1A.',
    provider: 'Local',
  }
}
let responseRecruiter = undefined;
let accessToken = undefined;

describe('POST /recruiters', () => {
  test('Status Code: 201 (Created). Create a new recruiter',
  async () => {
    const response = await request(app)
      .post('/api/v1/recruiters')
      .send(recruiter);

    expect(response.statusCode).toBe(201);
    responseRecruiter = response.body;
  });

  test('Status Code: 400 (Bad Request). Empty body',
  async () => {
    const response = await request(app)
      .post('/api/v1/recruiters')
      .send({});

    expect(response.error)
    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Invalid fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/recruiters')
      .send({
        fullName: faker.random.word(),
        phone: faker.phone.phoneNumber(),
        user: {
          rfc: faker.random.word(),
          role: faker.random.word(),
          email: faker.random.word(),
          password: faker.random.word(),
          provider: faker.random.word(),
        }
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 409 (Conflict). Recruiter already exists',
  async () => {
    const response = await request(app)
      .post('/api/v1/recruiters')
      .send(recruiter);

    expect(response.statusCode).toBe(409);
  })
});

describe('POST Recruiters /login', () =>  {
  test('Status Code: 200 (OK). Login Recruiter',
  async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: recruiter.user.email,
        password: recruiter.user.password
      });

    expect(response.statusCode).toBe(200);

    accessToken = response.body.token;
  });

  test('Status Code: 400 (Bad Request). Empty body on Login',
  async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({});

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Wrong credentials on Login',
  async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password()
      });

    expect(response.statusCode).toBe(401);
  });
});

describe('GET /recruiters', () => {
  test('Status Code: 200 (OK). Get all recruiters',
  async () => {

    const response = await request(app)
      .get('/api/v1/recruiters')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get all recruiters without token',
  async () => {
    const response = await request(app)
      .get('/api/v1/recruiters');

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 200 (OK). Get a recruiter by id with token',
  async () => {
    const response = await request(app)
      .get(`/api/v1/recruiters/${responseRecruiter.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get a recruiter by id without token',
  async () => {
    const response = await request(app)
      .get(`/api/v1/recruiters/${responseRecruiter.id}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Get a recruiter by id with invalid token',
  async () => {
    const response = await request(app)
      .get(`/api/v1/recruiters/${responseRecruiter.id}`)
      .set('Authorization', `Bearer ${faker.random.alphaNumeric(10)}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Get a recruiter by id with token and non existent id',
  async () => {
    const response = await request(app)
      .get(`/api/v1/recruiters/${faker.random.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});

describe('GET Recruiter /profile', () => {
  let rfc = undefined;

  test('Status Code: 200 (OK). Get a recruiter profile by token',
  async () => {
    const response = await request(app)
      .get('/api/v1/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    rfc = response.body.rfc;
  });

  test('Status Code: 401 (Unauthorized). Get a recruiter profile without token',
  async () => {
    const response = await request(app)
      .get('/api/v1/profile');

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 200 (OK). Get a recruiter profile by rfc with token',
  async () => {
    const response = await request(app)
      .get(`/api/v1/profile/user/${rfc}`)
      .set('Authorization', `Bearer ${accessToken}`);      ;

    expect(response.statusCode).toBe(200);
  });
});

describe('PATCH /recruiters', () => {
  test('Status Code: 200 (OK). Update a recruiter by id with token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/recruiters/${responseRecruiter.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        fullName: faker.name.findName(),
        phone: faker.phone.phoneNumber('##########'),
        email: faker.internet.email(),
      });

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 400 (Bad Request). Update a recruiter by id with token and non existent field',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/recruiters/${responseRecruiter.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonexistentField: faker.name.findName(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Update a recruiter by id with token and long fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/recruiters/${responseRecruiter.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        fullName: faker.name.findName().repeat(10),
        phone: faker.phone.phoneNumber('##########').repeat(10),
        email: faker.internet.email().repeat(10),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Update a recruiter by id without token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/recruiters/${responseRecruiter.id}`)
      .send({
        fullName: faker.name.findName(),
        phone: faker.phone.phoneNumber('##########'),
        email: faker.internet.email(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Update a recruiter by id with invalid token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/recruiters/${responseRecruiter.id}`)
      .set('Authorization', `Bearer ${faker.random.alphaNumeric(10)}`)
      .send({
        fullName: faker.name.findName(),
        phone: faker.phone.phoneNumber('##########'),
        email: faker.internet.email(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Update a recruiter by id with token and non existent id',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/recruiters/${faker.random.number()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        fullName: faker.name.findName(),
        phone: faker.phone.phoneNumber('##########'),
        email: faker.internet.email(),
      });

    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE /recruiters', () => {
  test('Status Code: 204 (Deleted). Delete a recruiter by id with token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/recruiters/${responseRecruiter.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);
  });

  test('Status Code: 401 (Unauthorized). Delete a recruiter by id without token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/recruiters/${responseRecruiter.id}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Delete a recruiter by id with invalid token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/recruiters/${responseRecruiter.id}`)
      .set('Authorization', `Bearer ${faker.random.alphaNumeric(10)}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Delete a recruiter by id with invalid id',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/recruiters/${faker.random.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});

