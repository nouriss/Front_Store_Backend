// @ts-ignore
import Client from '../../database';
import { UserType, UserReturnType, UserAuthType } from '../interfaces/user';
// @ts-ignore
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

// export type User = {
//     id: number,
//     firstname: string,
//     lastname: string,
//     password: string
// }

export class UserStore {
  async index(): Promise<UserReturnType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users;';

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could not get users Error: ${error}`);
    }
  }

  async show(id: number): Promise<UserReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1);';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find user ${id} Error: ${error}`);
    }
  }

  async create(u: UserType): Promise<UserReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *;';

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      conn.release();

      const user: UserReturnType = result.rows[0];

      return user;
    } catch (error) {
      throw new Error(
        `Could not add a new user  ${u.firstname}  Error: ${error}`
      );
    }
  }

  async update(u: UserAuthType): Promise<UserReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'UPDATE users SET firstname=($2), lastname=($3), password_digest=($4) WHERE id=($1) RETURNING *;';
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      );
      const result = await conn.query(sql, [
        u.id,
        u.firstname,
        u.lastname,
        hash
      ]);

      conn.release();
      const user: UserReturnType = result.rows[0];

      return user;
    } catch (error) {
      throw new Error(`Could not update user ${u.firstname}  Error: ${error}`);
    }
  }

  async delete(id: number): Promise<UserReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *;';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete user  ${id} Error: ${error}`);
    }
  }

  async authenticate(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<UserReturnType | null> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE firstname=($1) AND lastname=($2);';

      const result = await conn.query(sql, [firstname, lastname]);

      //console.log(password + pepper);

      if (result.rows.length) {
        const user: UserReturnType = result.rows[0];

        console.log(user);

        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          return user;
        }
      }

      return null;
    } catch (error) {
      throw new Error(
        `Could not authenticate user  ${firstname} Error: ${error}`
      );
    }
  }
}
