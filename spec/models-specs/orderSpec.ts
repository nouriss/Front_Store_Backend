/* eslint-disable no-undef */
import { OrderStore } from '../../src/api/models/order';
import { OrderType, OrderReturnType } from '../../src/api/interfaces/oder';
import { UserStore } from '../../src/api/models/user';
import { UserType, UserReturnType } from '../../src/api/interfaces/user';

const userStore = new UserStore();
const store = new OrderStore();

fdescribe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  const order: OrderType = {
    user_id: 1,
    status: 'active'
  };

  let resOrder: OrderReturnType = {
    id: 1,
    user_id: 1,
    status: 'active'
  };

  const user: UserType = {
    firstname: 'Elon',
    lastname: 'Musk',
    password: 'SpaceX21'
  };
  let resUser: UserReturnType = {
    id: 1,
    firstname: 'Elon',
    lastname: 'Musk',
    password_digest: ''
  };

  beforeAll(async () => {
    // spyOn(UserStore.prototype, 'create').and.returnValue(
    //   Promise.resolve(resUser)
    // );
    resUser = await userStore.create(user);
    order.user_id = resUser.id;
    resOrder = await store.create(order);
    console.log(` TEST oder beforeAll  ${JSON.stringify(resOrder)} `);
    expect(resOrder.status).toEqual(order.status);
    expect(parseInt(`${resOrder.user_id}`)).toEqual(order.user_id);
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).not.toBe([]);
  });

  it('show method should return the correct order', async () => {
    const result = await store.show(resOrder.id);
    console.log(` TEST oderStore correct order  ${JSON.stringify(result)} `);
    expect(result.id).toEqual(resOrder.id);
    expect(result.status).toEqual(resOrder.status);
    expect(parseInt(`${result.user_id}`)).toEqual(
      parseInt(`${resOrder.user_id}`)
    );
  });

  it("'update method should return the updated order'", async () => {
    resOrder.status = 'complete';
    const result = await store.update(resOrder);
    expect(result.id).toEqual(resOrder.id);
    expect(result.status).toEqual(resOrder.status);
    expect(parseInt(`${result.user_id}`)).toEqual(
      parseInt(`${resOrder.user_id}`)
    );
  });

  afterAll(async () => {
    const delResult = await store.delete(resOrder.id);
    console.log(` TEST oder delete  ${JSON.stringify(delResult)} `);
    expect(delResult.id).toEqual(resOrder.id);
    expect(delResult.status).toEqual(resOrder.status);
    expect(parseInt(`${delResult.user_id}`)).toEqual(
      parseInt(`${resOrder.user_id}`)
    );

    await userStore.delete(resUser.id);
  });
});
