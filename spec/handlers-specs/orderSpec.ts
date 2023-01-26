/* eslint-disable no-undef */
import app from '../../src/server';
import {
  OrderType,
  OrderReturnType,
  OrderProductType
} from '../../src/api/interfaces/oder';
import { ProductType } from '../../src/api/interfaces/product';
import { UserType, UserReturnType } from '../../src/api/interfaces/user';
import supertest from 'supertest';
import dotenv from 'dotenv';

dotenv.config();
const request = supertest(app);
const query: OrderType = {
  user_id: 3,
  status: 'active'
};

const resQuery: OrderReturnType = {
  id: 1,
  user_id: 1,
  status: 'active'
};

let queryUpdate: OrderType = {
  user_id: query.user_id,
  status: query.status
};
queryUpdate.status = 'complete';

const userQuery: UserType = {
  firstname: 'zainedin',
  lastname: 'zidane zizou',
  password: 'worldCup98'
};
const resUserQuery: UserReturnType = {
  id: 1,
  firstname: 'zainedin',
  lastname: 'zidane zizou',
  password_digest: 'worldCup98'
};

const productQuery: ProductType = {
  name: 'Falcon Booster fx1002',
  price: 1000,
  category: 'rocket engine'
};

const orderAddProductQuery: OrderProductType = {
  id: 1,
  product_id: 1,
  quantity: 6,
  user_id: 1,
  status: 'active'
};

beforeAll(async () => {
  const productResponse = await request
    .post('/products')
    .set('Content-type', 'application/json')
    .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
    .send(productQuery);

  expect(productResponse.status).toBe(200);
  orderAddProductQuery.product_id = productResponse.body.id;
  console.log(
    `Endpoint Test Order :: orderAddProductQuery.product_id : ${orderAddProductQuery.product_id}`
  );

  const userResponse = await request
    .post('/users')
    .set('Content-type', 'application/json')
    .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
    .send(userQuery);

  expect(userResponse.status).toBe(200);
  orderAddProductQuery.user_id = userResponse.body.newUser.id;
  resUserQuery.id = userResponse.body.newUser.id;
  console.log(`Endpoint Test Order :: resUserQuery.id : ${resUserQuery.id}`);

  query.user_id = resUserQuery.id;
  query.status = 'active';

  const response = await request
    .post('/orders')
    .set('Content-type', 'application/json')
    .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
    .send(query);

  console.log(
    `Endpoint Test Order :: oderResponse : ${JSON.stringify(response.body)}`
  );
  expect(response.status).toBe(200);
  expect(parseInt(`${response.body.user_id}`)).toEqual(query.user_id);
  expect(response.body.status).toEqual(query.status);
  resQuery.id = response.body.id;
  orderAddProductQuery.id = response.body.id;
  // done();
  queryUpdate = {
    user_id: query.user_id,
    status: query.status
  };
  queryUpdate.status = 'complete';
});

fdescribe('Test endpoint responses for order handler ', () => {
  it('Check invalid api endpoint request index', async () => {
    const response = await request
      .get('/orders')
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).not.toEqual([]);
    // done();
  });

  it('Check invalid api endpoint request show', async () => {
    console.log(` show resQuery.id :: ${resQuery.id}`);
    const response = await request
      .get(`/orders/${resQuery.id}`)
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`);

    expect(response.status).toBe(200);
    expect(parseInt(`${response.body.user_id}`)).toEqual(query.user_id);
    expect(response.body.status).toEqual(query.status);
    expect(response.body.id).toEqual(resQuery.id);

    // done();
  });
});

fdescribe('Test endpoint responses for join oder-product-user handler ', () => {
  it('Check valid api endpoint request addProduct to orders', async () => {
    orderAddProductQuery.quantity = 6;
    const response = await request
      .post(`/orders/${orderAddProductQuery.id}/products`)
      .set('Content-type', 'application/json')
      .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
      .send(orderAddProductQuery);

    expect(response.status).toBe(200);
    expect(parseInt(`${response.body.order_id}`)).toEqual(
      orderAddProductQuery.id
    );
    expect(parseInt(`${response.body.product_id}`)).toEqual(
      orderAddProductQuery.product_id
    );
    expect(parseInt(`${response.body.user_id}`)).toEqual(
      orderAddProductQuery.user_id
    );
    expect(response.body.quantity).toEqual(orderAddProductQuery.quantity);

    // done();
  });
});

afterAll(async () => {
  const response = await request
    .get(`/orders/users/${orderAddProductQuery.user_id}`)
    .set('Content-type', 'application/json')
    .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
    .send({
      orderId: orderAddProductQuery.id,
      orderStatus: 'active'
    });

  expect(response.status).toBe(200);

  expect(parseInt(`${response.body.id}`)).toEqual(orderAddProductQuery.id);
  expect(parseInt(`${response.body.product_id[0]}`)).toEqual(
    orderAddProductQuery.product_id
  );
  expect(parseInt(`${response.body.user_id}`)).toEqual(
    orderAddProductQuery.user_id
  );
  expect(response.body.quantity[0]).toEqual(orderAddProductQuery.quantity);
  expect(response.body.status).toEqual('active');
  // done();

  console.log(` update resQuery.id :: ${resQuery.id}`);
  const updateResponse = await request
    .put(`/orders/${resQuery.id}`)
    .set('Content-type', 'application/json')
    .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
    .send(queryUpdate);

  expect(updateResponse.status).toBe(200);
  expect(parseInt(`${updateResponse.body.user_id}`)).toEqual(query.user_id);
  expect(updateResponse.body.status).toEqual(queryUpdate.status);
  expect(updateResponse.body.id).toEqual(resQuery.id);

  console.log(` delete resQuery.id :: ${resQuery.id}`);
  const delResponse = await request
    .delete(`/orders/${resQuery.id}`)
    .set('Content-type', 'application/json')
    .set('Authorization', 'Bearer ' + `${process.env.TEST_TOKEN}`)
    .send({});

  expect(delResponse.status).toBe(200);
  expect(parseInt(`${delResponse.body.user_id}`)).toEqual(query.user_id);
  expect(delResponse.body.status).toEqual(queryUpdate.status);
  expect(delResponse.body.id).toEqual(resQuery.id);
});
