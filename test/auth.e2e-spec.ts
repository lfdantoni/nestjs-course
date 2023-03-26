import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as request from 'supertest';
import { Repository } from "typeorm";
import { AppModule } from "../src/app.module";
import { User } from "../src/users/user.entity";

describe('Authentication', () => {
  let app: INestApplication;
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // clear database
    const userRepo = app.get<Repository<User>>(getRepositoryToken(User)); 
    await userRepo.delete({});

    await app.init();
  });

  it('signup new user', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: 'asdasd@asdas.com',
        password: 'asdasd',
      })
      .expect(201);

    expect(body.id).toBeDefined();
    expect(body.email).toEqual('asdasd@asdas.com');
    expect(body.password).not.toEqual('asdasd');
  });
});	
