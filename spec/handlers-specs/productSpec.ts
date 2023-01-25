/* eslint-disable no-undef */
import app from '../../src/server';
import {
  ProductType,
  ProductReturnType
} from '../../src/api/interfaces/product';
import supertest from 'supertest';
import dotenv from 'dotenv';

dotenv.config();
const request = supertest(app);

fdescribe('Test endpoint responses for product handler ', () => {
  // @ts-ignore
  const query: ProductType = {
    name: 'Falcon Booster fx1002',
    price: 1000,
    category: 'rocket engine'
  };
  const resQuery: ProductReturnType = {
    id: 1,
    name: 'Falcon Booster fx1002',
    price: 1000,
    category: 'rocket engine'
  };
  beforeAll(async () => {
    const response = await request
      .post('/products')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
      .send(query);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(query.name);
    expect(response.body.price).toEqual(query.price);
    expect(response.body.category).toEqual(query.category);
    resQuery.id = response.body.id;
    // done();
  });

  it('Check invalid api endpoint request index', async () => {
    const response = await request.get('/products');

    expect(response.status).toBe(200);
    expect(response.body).not.toBe([]);
    // done();
  });

  it('Check invalid api endpoint request show', async () => {
    const response = await request.get(`/products/${resQuery.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(query.name);
    expect(response.body.price).toEqual(query.price);
    expect(response.body.category).toEqual(query.category);
    expect(response.body.id).toEqual(resQuery.id);
    // done();
  });

  it('Check invalid api endpoint request update', async () => {
    const queryUpdate: ProductType = query;
    queryUpdate.price = 2000;
    queryUpdate.name = ' Rolls-Royce Cx 5500';
    const response = await request
      .put(`/products/${resQuery.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
      .send(queryUpdate);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual(queryUpdate.name);
    expect(response.body.price).toEqual(queryUpdate.price);
    expect(response.body.category).toEqual(queryUpdate.category);
    expect(response.body.id).toEqual(resQuery.id);
    // done();
  });

  afterAll(async () => {
    const queryUpdate: ProductReturnType = resQuery;
    queryUpdate.price = 2000;
    const response = await request
      .delete(`/products/${resQuery.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
      .send({});

    expect(response.status).toBe(200);

    // done();
  });
});
