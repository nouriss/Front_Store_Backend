/* eslint-disable no-undef */
import app from '../../src/server';
import { UserType, UserReturnType } from '../../src/api/interfaces/user';
import supertest from 'supertest';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();
const pepper = process.env.BCRYPT_PASSWORD;

const request = supertest(app);

fdescribe('Test endpoint responses for user handler ', () => {
  // @ts-ignore
  const query: UserType = {
    firstname: 'zainedin',
    lastname: 'zidane zizou',
    password: 'worldCup98'
  };
  const resQuery: UserReturnType = {
    id: 1,
    firstname: 'zainedin',
    lastname: 'zidane zizou',
    password_digest: 'worldCup98'
  };
  beforeAll(async () => {
    const response = await request
      .post('/users')
      .set('Content-type', 'application/json')
      .send(query);

    // console.log(`Endpoint Test create user:: keys: ${Object.keys(response.body)}`)
    // console.log(`Endpoint Test create user::newUser values: ${response.body.newUser}`)
    // console.log(`Endpoint Test create user::token values: ${response.body.token}`)

    
    const token = jwt.sign(
      { user: response.body.newUser },
      // @ts-ignore
      process.env.TOKEN_SECRET
    );
    expect(response.status).toBe(200);
    expect(response.body.newUser.firstname).toEqual(query.firstname);
    expect(response.body.newUser.lastname).toEqual(query.lastname);
    expect(response.body.token).toEqual(token);
    expect(
      bcrypt.compareSync(
        query.password + pepper,
        response.body.newUser.password_digest
      )
    ).toBeTrue();
    resQuery.id = response.body.newUser.id;
    // console.log(`Endpoint Test create user::resQuery.id: ${resQuery.id}`)
    // done();
  });

  it('Check valid api endpoint request index', async () => {
    const response = await request
      .get('/users')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).not.toBe([]);
    // done();
  });

  it('Check valid api endpoint request show', async () => {
    const response = await request
      .get(`/users/${resQuery.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(200);

    expect(response.body.firstname).toEqual(query.firstname);
    expect(response.body.lastname).toEqual(query.lastname);
    expect(
      bcrypt.compareSync(query.password + pepper, response.body.password_digest)
    ).toBeTrue();
    // done();
  });

  it(' Check valid api endpoint request authentification', async () => {
    const response = await request
      .post('/users/auth')
      .set('Content-type', 'application/json')
      .send(query);

    // console.log(`Endpoint Test create user:: keys: ${Object.keys(response.body)}`)
    // console.log(`Endpoint Test create user::newUser values: ${response.body.newUser}`)
    // console.log(`Endpoint Test create user::token values: ${response.body.token}`)

    
    const token = jwt.sign(
      { user: response.body.user },
      // @ts-ignore
      process.env.TOKEN_SECRET
    );
    expect(response.status).toBe(200);
    expect(response.body.user.firstname).toEqual(query.firstname);
    expect(response.body.user.lastname).toEqual(query.lastname);
    expect(response.body.token).toEqual(token);
    expect(
      bcrypt.compareSync(
        query.password + pepper,
        response.body.user.password_digest
      )
    ).toBeTrue();
  })

  it('Check valid api endpoint request update', async () => {
    const queryUpdate: UserType = query;
    queryUpdate.firstname = 'leo';
    queryUpdate.firstname = 'messi';
    queryUpdate.password = 'helloParis';
    console.log(`Endpoint Test update user::resQuery.id: ${resQuery.id}`);
    const response = await request
      .put(`/users/${resQuery.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
      .send(queryUpdate);
    // @ts-ignore
    const token = jwt.sign(
      { user: response.body.updatedUser },
      // @ts-ignore
      process.env.TOKEN_SECRET
    );
    expect(response.status).toBe(200);
    expect(response.body.updatedUser.firstname).toEqual(queryUpdate.firstname);
    expect(response.body.token).toEqual(token);

    // done();
  });

  afterAll(async () => {
    const response = await request
      .delete(`/users/${resQuery.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
      .send({});

    expect(response.status).toBe(200);

    // done();
  });
});
