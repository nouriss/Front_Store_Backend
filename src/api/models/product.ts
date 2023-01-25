// @ts-ignore
import Client from '../../database';
import { ProductType, ProductReturnType } from '../interfaces/product';

// export type Product = {
//     id: number,
//     name: string,
//     price: number,
//     category: string
// }

export class ProductStore {
  async index(): Promise<ProductReturnType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products;';

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could nor get products Error: ${error}`);
    }
  }

  async show(id: number): Promise<ProductReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1);';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find product ${id} Error: ${error}`);
    }
  }

  async create(p: ProductType): Promise<ProductReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *;';

      const result = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();

      const product = result.rows[0];
      return product;
    } catch (error) {
      throw new Error(
        `Could not add a new product  ${p.name}  Error: ${error}`
      );
    }
  }

  async update(p: ProductReturnType): Promise<ProductReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'UPDATE products SET name=($2), price=($3), category=($4) WHERE id=($1) RETURNING *;';

      const result = await conn.query(sql, [p.id, p.name, p.price, p.category]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update product ${p.name}  Error: ${error}`);
    }
  }

  async delete(id: number): Promise<ProductReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *;';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete product  ${id} Error: ${error}`);
    }
  }
}
