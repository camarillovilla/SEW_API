const app = require('../../app');
const request = require('supertest');
const faker = require('faker');

const employee = {
  fullName: faker.name.findName(),
  phone: faker.phone.phoneNumber('##########'),
  user: {
    rfc: faker.random.alphaNumeric(13),
    role: 'Employee',
    email: faker.internet.email(),
    password: 'Limoncito1A.',
    provider: 'Local',
  }
};
let responseEmployee = undefined;
let accessToken = undefined;

describe('POST /employees', () => {
  test('Status Code: 201 (Created). Create a new employee',
  async () => {
    const response = await request(app)
      .post('/api/v1/employees')
      .send(employee);

    expect(response.statusCode).toBe(201);
    responseEmployee = response.body;
  });

  test('Status Code: 400 (Bad Request). Empty body',
  async () => {
    const response = await request(app)
      .post('/api/v1/employees')
      .send({});

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Invalid fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/employees')
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

  test('Status Code: 409 (Conflict). Employee already exists',
  async () => {
    const response = await request(app)
      .post('/api/v1/employees')
      .send(employee);

    expect(response.statusCode).toBe(409);
  });
});

describe('POST /auth/login', () => {
  test('Status Code: 200 (OK). Login as employee',
  async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: employee.user.email,
        password: employee.user.password,
      });

    expect(response.statusCode).toBe(200);
    accessToken = response.body.token;
  });

  test('Status Code: 400 (Bad Request). Empty body on Login',
  async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({});

    expect(response.error)
    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Invalid fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: faker.random.word(),
        password: faker.random.word(),
      });

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

describe('GET /employees', () => {
  test('Status Code: 200 (OK). Get all employees',
  async () => {
    const response = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get all employees without token',
  async () => {
    const response = await request(app)
      .get('/api/v1/employees');

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Get all employees with invalid token',
  async () => {
    const response = await request(app)
      .get('/api/v1/employees')
      .set('Authorization', `Bearer ${faker.random.alphaNumeric(20)}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 200 (OK). Get employee by id with token',
  async () => {
    const response = await request(app)
      .get(`/api/v1/employees/${responseEmployee.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get employee by id without token',
  async () => {
    const response = await request(app)
      .get(`/api/v1/employees/${responseEmployee.id}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Get employee by id with invalid token',
  async () => {
    const response = await request(app)
      .get(`/api/v1/employees/${responseEmployee.id}`)
      .set('Authorization', `Bearer ${faker.random.alphaNumeric(20)}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Get employee by id with invalid id',
  async () => {
    const response = await request(app)
      .get(`/api/v1/employees/${faker.random.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});

describe('GET Employee /profile', () => {
  let rfc = undefined;

  test('Status Code: 200 (OK). Get employee profile by token',
  async () => {
    const response = await request(app)
      .get('/api/v1/profile')
      .set('Authorization', `Bearer ${accessToken}`);
    expect(response.statusCode).toBe(200);
    rfc = response.body.rfc;
  });

  test('Status Code: 401 (Unauthorized). Get employee profile without token',
  async () => {
    const response = await request(app)
      .get('/api/v1/profile');

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 200 (OK). Get employee profile by rfc',
  async () => {
    const response = await request(app)
      .get(`/api/v1/profile/user/${rfc}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });
});

describe('PATCH /employees', () => {
  test('Status Code: 200 (OK). Update employee by id with token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/employees/${responseEmployee.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        fullName: faker.name.findName(),
        phone: faker.phone.phoneNumber('##########'),
      });

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 400 (Bad Request). Update employee by id with token and non existent fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/employees/${responseEmployee.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.name.findName(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Update employee by id with token and long fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/employees/${responseEmployee.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        fullName: faker.name.findName().repeat(10),
        phone: faker.phone.phoneNumber('##########').repeat(10),
        email: faker.internet.email().repeat(10),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Update employee by id without token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/employees/${responseEmployee.id}`)
      .send({
        fullName: faker.name.findName(),
        phone: faker.phone.phoneNumber('##########'),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Update employee by id with invalid token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/employees/${responseEmployee.id}`)
      .set('Authorization', `Bearer ${faker.random.alphaNumeric(20)}`)
      .send({
        fullName: faker.name.findName(),
        phone: faker.phone.phoneNumber('##########'),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Update employee by id with invalid id',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/employees/${faker.random.number()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        fullName: faker.name.findName(),
        phone: faker.phone.phoneNumber('##########'),
      });

    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE /employees', () => {
  test('Status Code: 200 (OK). Delete employee by id with token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/employees/${responseEmployee.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);
  });

  test('Status Code: 401 (Unauthorized). Delete employee by id without token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/employees/${responseEmployee.id}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Delete employee by id with invalid token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/employees/${responseEmployee.id}`)
      .set('Authorization', `Bearer ${faker.random.alphaNumeric(20)}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Delete employee by id with invalid id',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/employees/${faker.random.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});
