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
let accessToken = undefined;
const cv = {
  description: faker.lorem.paragraph(),
  employeeId: undefined,
  lenguages: [
    {
      lenguage: faker.random.word(),
    },
  ],
  workExperiences: [
    {
      workExperience: faker.random.word(),
    },
  ],
  academicTrainings: [
    {
      academicTraining: faker.random.word(),
    },
  ],
  certifications: [
    {
      certification: faker.random.word(),
    },
  ],
  skills: [
    {
      skill: faker.random.word(),
    },
  ]
}
let responseCv = undefined;
let responseCvLenguage = undefined;
let responseCvWorkExperience = undefined;
let responseCvAcademicTraining = undefined;
let responseCvCertification = undefined;
let responseCvSkill = undefined;

describe('POST Employee CV /employees', () => {
  test('Status Code: 201 (Created). Create a new employee to assign your cv',
  async () => {
    const response = await request(app)
      .post('/api/v1/employees')
      .send(employee);

    expect(response.statusCode).toBe(201);
  });

  test('Status Code: 200 (OK). Login employee to get access token',
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

  test('Status Code: 200 (OK). Get employee profile',
  async () => {
    const response = await request(app)
      .get('/api/v1/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
    cv.employeeId = response.body.employee.id;
  });
});

describe('POST /cvs', () => {
  test('Status Code: 400 (Bad Request). Empty body',
  async () => {
    const response = await request(app)
      .post('/api/v1/cvs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({});

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Missing fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cvs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: faker.lorem.paragraph(),
        employeeId: cv.employeeId,
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 201 (Created). Create a new CV',
  async () => {
    const response = await request(app)
      .post('/api/v1/cvs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(cv);

    expect(response.statusCode).toBe(201);
    responseCv = response.body;
  });

  test('Status Code: 409 (Conflict). CV already exists',
  async () => {
    const response = await request(app)
      .post('/api/v1/cvs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(cv);

    expect(response.statusCode).toBe(409);
  });
});

describe('GET /cvs', () => {
  test('Status Code: 200 (OK). Get all cvs',
  async () => {
    const response = await request(app)
      .get('/api/v1/cvs')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 401 (Unauthorized). Get all cvs withouth access token',
  async () => {
    const response = await request(app)
      .get('/api/v1/cvs');

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Get all cvs with invalid access token',
  async () => {
    const response = await request(app)
      .get('/api/v1/cvs')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`);

      expect(response.statusCode).toBe(401);
  });

  test('Status Code: 200 (OK). Get a cv by id',
  async () => {
    const response = await request(app)
      .get(`/api/v1/cvs/${responseCv.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 404 (Not Found). Get a cv by id with invalid id',
  async () => {
    const response = await request(app)
      .get(`/api/v1/cvs/${faker.datatype.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});

describe('PATCH /cvs', () => {
  test('Status Code: 200 (OK). Update a CV',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cvs/${responseCv.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: 'Inglés | Competencia profesional completa',
      });

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 400 (Bad Request). Update CV by id with token and non existent fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cvs/${responseCv.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Update CV by id with long fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cvs/${responseCv.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        description: faker.lorem.paragraphs().repeat(100),
      });

      expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Update a CV withouth access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cvs/${responseCv.id}`)
      .send({
        description: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Update a CV with invalid access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cvs/${responseCv.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        description: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  // test('Status Code: 404 (Not Found). Update a CV with invalid id',
  // async () => {
  //   const response = await request(app)
  //     .patch(`/api/v1/cvs/${faker.datatype.number()}`)
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .send({
  //       description: faker.lorem.paragraph(),
  //     });

  //   expect(response.statusCode).toBe(404);
  // });
});

/**
  * CRUD CV Items [ Llenguages, WorkExperiences, AcademicTrainings, Certifications, Skills ]
*/

/**
 * CV Lenguages
 */

describe('POST Lenguages CV /cv-languages', () => {
  test('Status Code: 201 (Created). Create a new CV Language',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-lenguages')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        cvId: responseCv.id,
        lenguage: 'Español | Competencia bilingüe o nativa',
      });

    expect(response.statusCode).toBe(201);
    responseCvLenguage = response.body;
  })

  test('Status Code: 400 (Bad Request). Create a new CV Language with invalid fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-lenguages')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        cvId: responseCv.id,
        nonExistentField: faker.random.word(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Create a new CV Language with long fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-lenguages')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        cvId: responseCv.id,
        lenguage: faker.random.word().repeat(100),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Create a new CV Language withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-lenguages')
      .send({
        cvId: responseCv.id,
        lenguage: faker.random.word(),
      });

    expect(response.statusCode).toBe(401);
  });

  // test('Status Code: 404 (Not Found). Create a new CV Language with invalid cvId',
  // async () => {
  //   const response = await request(app)
  //     .post('/api/v1/cv-lenguages')
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .send({
  //       cvId: faker.datatype.number(),
  //       lenguage: faker.random.word(),
  //     });

  //   expect(response.statusCode).toBe(404);
  // });
});

describe('PATCH /cv-lenguages', () => {
  test('Status Code: 200 (Ok). Update a CV Language',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-lenguages/${responseCvLenguage.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        lenguage: 'Inglés | Competencia profesional completa',
      });

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 400 (Bad Request). Update a CV Language with invalid fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-lenguages/${responseCvLenguage.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.random.word(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Update a CV Language with long fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-lenguages/${responseCvLenguage.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        lenguage: faker.random.word().repeat(100),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Update a CV Language withouth access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-lenguages/${responseCvLenguage.id}`)
      .send({
        lenguage: faker.random.word(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Update a CV Language with invalid access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-lenguages/${responseCvLenguage.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        lenguage: faker.random.word(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Update a CV Language with invalid id',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-lenguages/${faker.datatype.number({ min: 1000000 })}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        lenguage: faker.random.word(),
      });

    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE /cv-lenguages', () => {
  test('Status Code: 204 (Deleted). Delete a CV Language',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-lenguages/${responseCvLenguage.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);
  });

  test('Status Code: 401 (Unauthorized). Delete a CV Language withouth access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-lenguages/${responseCvLenguage.id}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Delete a CV Language with invalid access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-lenguages/${responseCvLenguage.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Delete a CV Language with invalid id',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-lenguages/${faker.datatype.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});

/**
 * CV Skills
 */

describe('POST Skills CV /cv-skills', () => {
  test('Status Code: 201 (Created). Create a new CV Skill',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-skills')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        cvId: responseCv.id,
        skill: 'Desarrollo Web: HTML, CSS, JS'
      });

    expect(response.statusCode).toBe(201);
    responseCvSkill = response.body;
  });

  test('Status Code: 400 (Bad Request). Create a new CV Skill with invalid fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-skills')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.random.word(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Create a new CV Skill with long fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-skills')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        cvId: responseCv.id,
        skill: faker.random.word().repeat(100),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Create a new CV Skill withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-skills')
      .send({
        cvId: responseCv.id,
        skill: faker.random.word(),
      });

    expect(response.statusCode).toBe(401);
  });
});

describe('PATCH /cv-skills', () => {
  test('Status Code: 200 (OK). Update a CV Skill',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-skills/${responseCvSkill.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        skill: 'Diseño de Software: UML, Patrones de Diseño'
      });

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 400 (Bad Request). Update a CV Skill with invalid fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-skills/${responseCvSkill.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.random.word(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Update a CV Skill with long fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-skills/${responseCvSkill.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        skill: faker.random.word().repeat(100),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Update a CV Skill withouth access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-skills/${responseCvSkill.id}`)
      .send({
        skill: faker.random.word(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Update a CV Skill with invalid access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-skills/${responseCvSkill.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        skill: faker.random.word(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Update a CV Skill with invalid id',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-skills/${faker.datatype.number({ min: 1000000 })}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        skill: faker.random.word(),
      });

    expect(response.statusCode).toBe(404);
  });
});

describe('DELETE /cv-skills', () => {
  test('Status Code: 204 (No Content). Delete a CV Skill',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-skills/${responseCvSkill.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);
  });

  test('Status Code: 401 (Unauthorized). Delete a CV Skill withouth access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-skills/${responseCvSkill.id}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Delete a CV Skill with invalid access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-skills/${responseCvSkill.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Delete a CV Skill with invalid id',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-skills/${faker.datatype.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});

/**
 * CV Work Experiences
 */

describe('POST WorkExperiences /cv-work-experiences', () => {
  test('Status Code: 201 (Created). Create a new CV Work Experience',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-work-experiences')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        cvId: responseCv.id,
        workExperience: 'Tech Recruiter. junio 2015 - mayo 2017 | Reclutamiento '
          + 'perfiles especializados TI proyectos internos y externos.'
      });

    expect(response.statusCode).toBe(201);
    responseCvWorkExperience = response.body;
  });

  test('Status Code: 400 (Bad Request). Create a new CV Work Experience with invalid fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-work-experiences')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Create a new CV Work Experience with long fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-work-experiences')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        workExperience: faker.lorem.paragraph().repeat(100),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Create a new CV Work Experience withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-work-experiences')
      .send({
        cvId: responseCv.id,
        workExperience: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Create a new CV Work Experience with invalid access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-work-experiences')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        cvId: responseCv.id,
        workExperience: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  // test('Status Code: 404 (Not Found). Create a new CV Work Experience with invalid cvId',
  // async () => {
  //   const response = await request(app)
  //     .post('/api/v1/cv-work-experiences')
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .send({
  //       cvId: faker.datatype.number(),
  //       workExperience: faker.lorem.paragraph(),
  //     });

  //   expect(response.statusCode).toBe(404);
  // });
});

describe('PATCH /cv-work-experiences', () => {
  test('Status Code: 200 (OK). Update a CV Work Experience',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-work-experiences/${responseCvWorkExperience.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        workExperience: 'Tech Talent Acquisition Lead. abril 2022 - actualidad | '
          + 'Líder de la estrategia de atracción de talento tech y gestión del equipo'
          + 'de reclutamiento para ingeniería.'
      });

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 400 (Bad Request). Update a CV Work Experience with invalid fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-work-experiences/${responseCvWorkExperience.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Update a CV Work Experience with long fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-work-experiences/${responseCvWorkExperience.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        workExperience: faker.lorem.paragraph().repeat(100),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Update a CV Work Experience withouth access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-work-experiences/${responseCvWorkExperience.id}`)
      .send({
        workExperience: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Update a CV Work Experience with invalid access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-work-experiences/${responseCvWorkExperience.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        workExperience: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  // test('Status Code: 404 (Not Found). Update a CV Work Experience with invalid id',
  // async () => {
  //   const response = await request(app)
  //     .patch(`/api/v1/cv-work-experiences/${faker.datatype.number()}`)
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .send({
  //       workExperience: faker.lorem.paragraph(),
  //     });

  //   expect(response.statusCode).toBe(404);
  // });
});

describe('DELETE /cv-work-experiences', () => {
  test('Status Code: 204 (Deleted). Delete a CV Work Experience',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-work-experiences/${responseCvWorkExperience.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);
  });

  test('Status Code: 401 (Unauthorized). Delete a CV Work Experience withouth access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-work-experiences/${responseCvWorkExperience.id}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Delete a CV Work Experience with invalid access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-work-experiences/${responseCvWorkExperience.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Delete a CV Work Experience with invalid id',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-work-experiences/${faker.datatype.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});

/**
 * CV Academic Trainings
 */

describe('POST AcademicTraingins /cv-academic-trainings', () => {
  test('Status Code: 201 (Created). Create a new CV Academic Training',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-academic-trainings')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        cvId: responseCv.id,
        academicTraining: 'Colegio Preparatorio Vespertino de Xalapa. 2016 - '
          + '2019 | Capacitación para el trabajo en Informática'
      });

    expect(response.statusCode).toBe(201);
    responseCvAcademicTraining = response.body;
  });

  test('Status Code: 400 (Bad Request). Create a new CV Academic Training with invalid fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-academic-trainings')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Create a new CV Academic Training with long fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-academic-trainings')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        academicTraining: faker.lorem.paragraph().repeat(100),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Create a new CV Academic Training withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-academic-trainings')
      .send({
        academicTraining: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Create a new CV Academic Training with invalid access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-academic-trainings')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        academicTraining: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  // test('Status Code: 404 (Not Found). Create a new CV Academic Training with invalid cvId',
  // async () => {
  //   const response = await request(app)
  //     .post('/api/v1/cv-academic-trainings')
  //     .set('Authorization', `Bearer ${accessToken}`)
  //     .send({
  //       cvId: faker.datatype.number(),
  //       academicTraining: faker.lorem.paragraph(),
  //     });

  //   expect(response.statusCode).toBe(404);
  // });
});

describe('PATCH /cv-academic-trainings', () => {
  test('Status Code: 200 (OK). Update a CV Academic Training',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-academic-trainings/${responseCvAcademicTraining.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        academicTraining: 'Universidad Veracruza. 2019 - 2023 | Licenciatura en '
          + 'Ingeniería de Software '
      });

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 400 (Bad Request). Update a CV Academic Training with invalid fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-academic-trainings/${responseCvAcademicTraining.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Update a CV Academic Training with long fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-academic-trainings/${responseCvAcademicTraining.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        academicTraining: faker.lorem.paragraph().repeat(100),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Update a CV Academic Training withouth access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-academic-trainings/${responseCvAcademicTraining.id}`)
      .send({
        academicTraining: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Update a CV Academic Training with invalid access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-academic-trainings/${responseCvAcademicTraining.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        academicTraining: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });
});

describe('DELETE /cv-academic-trainings', () => {
  test('Status Code: 204 (Deleted). Delete a CV Academic Training',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-academic-trainings/${responseCvAcademicTraining.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);
  });

  test('Status Code: 401 (Unauthorized). Delete a CV Academic Training withouth access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-academic-trainings/${responseCvAcademicTraining.id}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Delete a CV Academic Training with invalid access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-academic-trainings/${responseCvAcademicTraining.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Delete a CV Academic Training with invalid id',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-academic-trainings/${faker.datatype.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});

/**
 * CV Certifications
 */

describe('POST Certifications /cv-certifications', () => {
  test('Status Code: 201 (Created). Create a new CV Certification',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-certifications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        cvId: responseCv.id,
        certification: 'Bootcamp de sustentabilidad "Innovando para el bien '
          + 'común"Bootcamp de sustentabilidad "Innovando para el bien común" '
          + 'Universidad VeracruzanaUniversidad Veracruzana Expedición: eneero'
          + ' 2022 · Sin fecha de vencimiento'
      });

    expect(response.statusCode).toBe(201);
    responseCvCertification = response.body;
  });

  test('Status Code: 400 (Bad Request). Create a new CV Certification with invalid fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-certifications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Create a new CV Certification with long fields',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-certifications')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        certification: faker.lorem.paragraph().repeat(100),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Create a new CV Certification withouth access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-certifications')
      .send({
        cvId: responseCv.id,
        certification: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Create a new CV Certification with invalid access token',
  async () => {
    const response = await request(app)
      .post('/api/v1/cv-certifications')
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        cvId: responseCv.id,
        certification: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });
});

describe('PATCH /cv-certifications', () => {
  test('Status Code: 200 (OK). Update a CV Certification',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-certifications/${responseCvCertification.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        certification: 'Estándar de Competencia | Youth Spark - Introducción a ASP.NET '
          + 'MVCCertificado de Competencia Laboral en el Estándar de Competencia. '
          + 'Expedición: noviembre 2021 · Sin fecha de vencimiento'
      });

    expect(response.statusCode).toBe(200);
  });

  test('Status Code: 400 (Bad Request). Update a CV Certification with invalid fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-certifications/${responseCvCertification.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        nonExistentField: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 400 (Bad Request). Update a CV Certification with long fields',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-certifications/${responseCvCertification.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        certification: faker.lorem.paragraph().repeat(100),
      });

    expect(response.statusCode).toBe(400);
  });

  test('Status Code: 401 (Unauthorized). Update a CV Certification withouth access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-certifications/${responseCvCertification.id}`)
      .send({
        certification: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Update a CV Certification with invalid access token',
  async () => {
    const response = await request(app)
      .patch(`/api/v1/cv-certifications/${responseCvCertification.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`)
      .send({
        certification: faker.lorem.paragraph(),
      });

    expect(response.statusCode).toBe(401);
  });
});

describe('DELETE /cv-certifications', () => {
  test('Status Code: 204 (Deleted). Delete a CV Certification',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-certifications/${responseCvCertification.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(204);
  });

  test('Status Code: 401 (Unauthorized). Delete a CV Certification withouth access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-certifications/${responseCvCertification.id}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 401 (Unauthorized). Delete a CV Certification with invalid access token',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-certifications/${responseCvCertification.id}`)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`);

    expect(response.statusCode).toBe(401);
  });

  test('Status Code: 404 (Not Found). Delete a CV Certification with invalid id',
  async () => {
    const response = await request(app)
      .delete(`/api/v1/cv-certifications/${faker.datatype.number()}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(404);
  });
});
