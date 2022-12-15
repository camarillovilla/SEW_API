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
  * CRUD Offers
*/

  describe('POST /', () => {
    test('Status Code: 200 (OK). Get all Recruiter Offers',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            recruiterId: 1
        });
      expect(response.statusCode).toBe(200);
    });
  
    test('Status Code: 401 (Unauthorized). Get all Recruiter Offers withouth access token',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers')
        .send({
            recruiterId: 1
        });
      expect(response.statusCode).toBe(401);
    });
  
    test('Status Code: 401 (Unauthorized). Get all Recruiter Offers with invalid access token',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers')
        .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
        .send({
            recruiterId: 1
        });
  
        expect(response.statusCode).toBe(401);
    });      

    test('Status Code: 400 (Bad Request). Get all Recruiter Offers with invalid id format',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            recruiterId: "id"
        });
  
        expect(response.statusCode).toBe(400);
    });      
  
    test('Status Code: 200 (OK). Get a Empty Recruiter Offers by id with invalid id',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            recruiterId: faker.datatype.number()
        });
  
      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST /offersNumber', () => {
    test('Status Code: 200 (OK). Get all Recruiter Offers Number',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/offersNumber')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            recruiterId: 1
        });
      expect(response.statusCode).toBe(200);
    });
  
    test('Status Code: 401 (Unauthorized). Get Recruiter Offers Number withouth access token',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/offersNumber')
        .send({
            recruiterId: 1
        });
      expect(response.statusCode).toBe(401);
    });
  
    test('Status Code: 401 (Unauthorized). Get all Recruiter Offers Number with invalid access token',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/offersNumber')
        .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
        .send({
            recruiterId: 1
        });
  
        expect(response.statusCode).toBe(401);
    });      

    test('Status Code: 400 (Bad Request). Get all Recruiter Offers Number with invalid id format',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/offersNumber')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            recruiterId: "id"
        });
  
        expect(response.statusCode).toBe(400);
    });      
  
    test('Status Code: 200 (OK). Get a Empty Recruiter Offers Number by id with invalid id',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/offersNumber')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
            recruiterId: faker.datatype.number()
        });
  
      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST /offersCategory', () => {
    test('Status Code: 200 (OK). Get all Offers By Category',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/offersCategory')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          category: "Tecnología y telecomunicaciones"
        });
      expect(response.statusCode).toBe(200);
    });
  
    test('Status Code: 401 (Unauthorized). Get Offers By Category withouth access token',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/offersCategory')
        .send({
          category: "Servicios"
        });
      expect(response.statusCode).toBe(401);
    });

    test('Status Code: 401 (Unauthorized). Get Offers By Category with invalid access token',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/offersCategory')
        .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
        .send({
          category: "Servicios"
        });

        expect(response.statusCode).toBe(401);
    });
  
    test('Status Code: 400 (Bad Request). Get all Offers By Category with invalid category format',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/offersCategory')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          category: 1
        });
  
        expect(response.statusCode).toBe(400);
    });
  
    test('Status Code: 200 (OK). Get a Empty Offers By Category with invalid category',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/offersCategory')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          category: faker.random.word()
        });
  
      expect(response.statusCode).toBe(200);
    });
  });

  describe('POST /oneOffer', () => {
    test('Status Code: 200 (OK). Get one offer by id',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/oneOffer')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          id: 3
        });
      expect(response.statusCode).toBe(200);
    });
  
    test('Status Code: 401 (Unauthorized). Get one offer by id withouth access token',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/oneOffer')
        .send({
          id: 3
        });
      expect(response.statusCode).toBe(401);
    });

    test('Status Code: 401 (Unauthorized). Get one offer by id with invalid access token',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/oneOffer')
        .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
        .send({
          id: 3
        });
  
        expect(response.statusCode).toBe(401);
    });
  
    test('Status Code: 400 (Bad Request). Get one offer by id with invalid id format',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/oneOffer')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          id: "id"
        });
  
        expect(response.statusCode).toBe(400);
    });

    test('Status Code: 404 (Not Found). Get one offer by id with invalid id',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/oneOffer')
        .set('Authorization', `Bearer ${accessToken}`)
         .send({
          id: faker.datatype.number()
        });

      expect(response.statusCode).toBe(404);
    });      
  });

  describe('POST /createOffer', () => {
    test('Status Code: 400 (Bad Request). Empty body',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/createOffer')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({});
  
      expect(response.statusCode).toBe(400);
    });
  
    test('Status Code: 400 (Bad Request). Missing fields',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/createOffer')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          offerData: {
            title: "Back end prueba",
            workday: "4 horas a la semana",
            description: "desarrollador back end con express js",            
          } 
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test('Status Code: 201 (Created). Create a new Offer',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/createOffer')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          offerData: {
            title: "Back end supertest",
            workday: "4 horas a la semana",
            description: "desarrollador back end con express js",
            experience: "2 años de experiencia",
            category: "Servicios",
            status: "Pendiente",
            score: 0,
            reportsNumber: 0,
            recruiterId: 1
          }
        });
  
      expect(response.statusCode).toBe(201);      
    });      
  });

  describe('GET /offers', () => {
    test('Status Code: 200 (OK). Get all offers',
    async () => {
      const response = await request(app)
        .get('/api/v1/offers')
        .set('Authorization', `Bearer ${accessToken}`);
  
      expect(response.statusCode).toBe(200);
    });
  
    test('Status Code: 401 (Unauthorized). Get all offers withouth access token',
    async () => {
      const response = await request(app)
        .get('/api/v1/offers');
  
      expect(response.statusCode).toBe(401);
    });
  
    test('Status Code: 401 (Unauthorized). Get all offers with invalid access token',
    async () => {
      const response = await request(app)
        .get('/api/v1/offers')
        .set('Authorization', `Bearer ${faker.datatype.uuid()}`);
  
        expect(response.statusCode).toBe(401);
    });
  });

  describe('PATCH /offers', () => {
    test('Status Code: 200 (OK). Update a offer',
    async () => {
      const response = await request(app)
        .patch('/api/v1/offers')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          id: 3,
          changes: {
            title: "Back end supertest update",            
          }
        });
  
      expect(response.statusCode).toBe(200);
    });
  
    test('Status Code: 400 (Bad Request). Update Offer by id with token and non existent fields',
    async () => {
      const response = await request(app)
        .patch('/api/v1/offers')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          nonExistentField: faker.lorem.paragraph(),
        });
  
      expect(response.statusCode).toBe(400);
    });
  
    test('Status Code: 400 (Bad Request). Update Offer by id with long fields',
    async () => {
      const response = await request(app)
        .patch('/api/v1/offers')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({          
          id: 3,
          changes: {
            title: faker.lorem.paragraphs().repeat(100),
          }
        });
  
        expect(response.statusCode).toBe(400);
    });
  
    test('Status Code: 401 (Unauthorized). Update a Offer withouth access token',
    async () => {
      const response = await request(app)
        .patch(`/api/v1/offers`)
        .send({
          id: 3,
          changes: {
            title: "Back end supertest update",            
          }
        });
  
      expect(response.statusCode).toBe(401);
    });
  
    test('Status Code: 401 (Unauthorized). Update a Offer with invalid access token',
    async () => {
      const response = await request(app)
        .patch(`/api/v1/offers`)
        .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
        .send({
          id: 3,
          changes: {
            title: "Back end supertest update",            
          }
        });
  
      expect(response.statusCode).toBe(401);
    });
  });

  const idOffer = 25; 
  describe('DELETE /deleteOffer', () => {
    test('Status Code: 204 (Deleted). Delete a Offer',
    async () => {
      const response = await request(app)
        .delete(`/api/v1/offers/deleteOffer/${idOffer}`)
        .set('Authorization', `Bearer ${accessToken}`);
  
      expect(response.statusCode).toBe(204);
    });
  
    test('Status Code: 401 (Unauthorized). Delete a Offer withouth access token',
    async () => {
      const response = await request(app)
        .delete(`/api/v1/offers/deleteOffer/${idOffer}`)
  
      expect(response.statusCode).toBe(401);
    });
  
    test('Status Code: 401 (Unauthorized). Delete a Offer with invalid access token',
    async () => {
      const response = await request(app)
        .delete(`/api/v1/offers/deleteOffer/${idOffer}`)
        .set('Authorization', `Bearer ${faker.datatype.uuid()}`);
  
      expect(response.statusCode).toBe(401);
    });
  
    test('Status Code: 404 (Not Found). Delete a Offer with invalid id',
    async () => {
      const response = await request(app)
        .delete(`/api/v1/offers/deleteOffer/${faker.datatype.number()}`)
        .set('Authorization', `Bearer ${accessToken}`);
  
      expect(response.statusCode).toBe(404);
    });
  });
  
  describe('POST /getOffersTitle', () => {
    test('Status Code: 200 (OK). Get all Offers By Title',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/getOffersTitle')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: "Back end supertest"
        });
      expect(response.statusCode).toBe(200);
    });
  
    test('Status Code: 401 (Unauthorized). Get Offers By Title withouth access token',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/getOffersTitle')
        .send({
          title: "Back end supertest"
        });
      expect(response.statusCode).toBe(401);
    });

    test('Status Code: 401 (Unauthorized). Get Offers By Title with invalid access token',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/getOffersTitle')
        .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
        .send({
          title: "Back end supertest"
        });

        expect(response.statusCode).toBe(401);
    });
  
    test('Status Code: 400 (Bad Request). Get all Offers By Title with invalid title format',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/getOffersTitle')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: 1
        });
  
        expect(response.statusCode).toBe(400);
    });
  
    test('Status Code: 200 (OK). Get a Empty Offers By Title with invalid title',
    async () => {
      const response = await request(app)
        .post('/api/v1/offers/getOffersTitle')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          title: faker.random.word()
        });
  
      expect(response.statusCode).toBe(200);
    });
  });

