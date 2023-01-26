/* eslint-disable no-undef */
import { UserStore } from '../../src/api/models/user';
import {
  UserType,
  UserReturnType,
  UserAuthType
} from '../../src/api/interfaces/user';

// @ts-ignore
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();
const pepper = process.env.BCRYPT_PASSWORD;

fdescribe('User Model', () => {
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

  const user: UserType = {
    firstname: 'Elon',
    lastname: 'Musk',
    password: 'SpaceX21'
  };

  let userAuth: UserAuthType = {
    id: 1,
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
    resUser = await store.create(user);
    console.log(` TEST User Model:: before all user ${JSON.stringify(user)} `);
    console.log(
      ` TEST User Model:: before all resUser ${JSON.stringify(resUser)} `
    );
    // //@ts-ignore
    // let token = jwt.sign({ user: user }, process.env.TOKEN_SECRET);
    expect(resUser.firstname).toEqual(user.firstname);
    expect(resUser.lastname).toEqual(user.lastname);

    expect(
      bcrypt.compareSync(user.password + pepper, resUser.password_digest)
    ).toBeTrue();
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();

    expect(result).not.toBe([]);
  });

  it('show method should return the correct user', async () => {
    const result = await store.show(resUser.id);
    expect(result.firstname).toEqual(resUser.firstname);
    expect(result.lastname).toEqual(resUser.lastname);
    expect(result.id).toEqual(resUser.id);

    expect(
      bcrypt.compareSync(user.password + pepper, result.password_digest)
    ).toBeTrue();
  });

  it('authenticate method should return correct user', async () => {

    const result  = await store.authenticate(user.firstname, user.lastname, user.password);
    console.log(` TEST User Model:: authenticate result ${JSON.stringify(result)} `);
    console.log(
      ` TEST User Model:: before all user ${JSON.stringify(user)} `
    );
    // //@ts-ignore
    // let token = jwt.sign({ user: user }, process.env.TOKEN_SECRET);
    expect(result).toBeTruthy()
    //@ts-ignore
    expect(result.firstname).toEqual(user.firstname);
    //@ts-ignore
    expect(result.lastname).toEqual(user.lastname);

    expect(
      //@ts-ignore
      bcrypt.compareSync(user.password + pepper, result.password_digest)
    ).toBeTrue();
  })

  it('update method should return the correct user', async () => {
    userAuth = {
      id: resUser.id,
      firstname: 'Leo',
      lastname: 'Messi',
      password: 'barca'
    };
    resUser = {
      id: resUser.id,
      firstname: userAuth.firstname,
      lastname: userAuth.lastname,
      password_digest: ''
    };

    const result = await store.update(userAuth);
    console.log(` TEST user update  ${JSON.stringify(result)} `);
    expect(result.id).toEqual(userAuth.id);
    expect(result.firstname).toEqual(userAuth.firstname);
    expect(result.lastname).toEqual(userAuth.lastname);

    expect(
      bcrypt.compareSync(userAuth.password + pepper, result.password_digest)
    ).toBeTrue();
  });

  afterAll(async () => {
    const delResult = await store.delete(resUser.id);
    console.log(` TEST user update  ${JSON.stringify(delResult)} `);

    expect(delResult.id).toEqual(resUser.id);
    expect(delResult.firstname).toEqual(resUser.firstname);
    expect(delResult.lastname).toEqual(resUser.lastname);
    expect(
      bcrypt.compareSync(userAuth.password + pepper, delResult.password_digest)
    ).toBeTrue();
  });
});
