import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import * as xlsx from 'xlsx';
import { join } from 'path';

describe('CandidatesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/candidates (POST) should create a new candidate from XLSX', async () => {
    // Leer el archivo XLSX
    const workbook = xlsx.readFile(
      join(__dirname, '/candidate_files/test_candidate_file.xlsx'),
    );
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data: Array<{
      [key: string]: string | number | boolean;
    }> = xlsx.utils.sheet_to_json(sheet);

    // Convertir el primer registro a un buffer (simulando un archivo subido)
    const buffer = xlsx.write(workbook, { type: 'buffer' });

    return request(app.getHttpServer())
      .post('/candidates')
      .attach('file', buffer, 'test_candidate_file.xlsx')
      .field('name', 'John')
      .field('surname', 'Doe')
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('name');
        expect(res.body).toHaveProperty('surname');
        expect(res.body).toHaveProperty('availability');
        expect(res.body).toHaveProperty('years');
        expect(res.body).toHaveProperty('seniority');
        expect(res.body.name).toBe('John');
        expect(res.body.surname).toBe('Doe');
        expect(res.body.seniority).toBe(data[0].Seniority);
        expect(res.body.years).toBe(data[0]['Years of experience']);
        expect(res.body.availability).toBe(Boolean(data[0].Availability));
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
