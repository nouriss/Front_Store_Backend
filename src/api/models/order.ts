// @ts-ignore
import Client from '../../database';
import {
  OrderReturnType,
  OrderType,
  OrderProductType
} from '../interfaces/oder';

export class OrderStore {
  async index(): Promise<OrderReturnType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders;';

      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Could not get orders Error: ${error}`);
    }
  }

  async show(id: number): Promise<OrderReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1);';

      const result = await conn.query(sql, [id]);
      conn.release();

      const order: OrderReturnType = result.rows[0];
      return order;
    } catch (error) {
      throw new Error(`Could not find order ${id} Error: ${error}`);
    }
  }

  async create(o: OrderType): Promise<OrderReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *;';

      const result = await conn.query(sql, [o.user_id, o.status]);
      conn.release();

      const order = result.rows[0];
      return order;
    } catch (error) {
      throw new Error(
        `Could not add a new order  ${o.user_id}  Error: ${error}`
      );
    }
  }

  async update(o: OrderReturnType): Promise<OrderReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'UPDATE orders SET user_id=($2), status=($3) WHERE id=($1) RETURNING *;';

      const result = await conn.query(sql, [o.id, o.user_id, o.status]);

      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update order  ${o.user_id}  Error: ${error}`);
    }
  }

  async deleteOderProducts(id: number): Promise<OrderReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      const sql = 'DELETE FROM order_products WHERE order_id=($1) RETURNING *;';
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete order  ${id} Error: ${error}`);
    }
  }

  async delete(id: number): Promise<OrderReturnType> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *;';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete order  ${id} Error: ${error}`);
    }
  }

  async addProduct(o: OrderProductType): Promise<OrderProductType> {
    // get order to see if it is open
    try {
     
      const ordersql = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2);';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(ordersql, [o.id, o.user_id]);

      const order = result.rows[0];
      conn.release();
   
      if (order.status !== 'active') {
        throw new Error(
          `Could not add product ${o.product_id} to order ${o.id} because order status is ${order.status}`
        );
      }
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *;';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.quantity, o.id, o.product_id]);

      const order: OrderProductType = result.rows[0];

      conn.release();
      if (order !== undefined) {
        order.user_id = o.user_id;
      }
      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${o.product_id} to order ${o.id}: ${err}`
      );
    }
  }

  async getUserActiveOrder(
    reqU4O: OrderReturnType
  ): Promise<OrderProductType[]> {
    let order: OrderProductType;
    let userActiveOrder: OrderProductType[];
    // get order to see if it is open
    try {
      const ordersql =
        'SELECT * FROM orders WHERE user_id=($1) AND id=($2) AND status=($3);';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(ordersql, [
        reqU4O.user_id,
        reqU4O.id,
        reqU4O.status === undefined ? 'active' : reqU4O.status
      ]);

      order = result.rows[0];

      conn.release();
      if (order === null || order === undefined) {
        throw new Error(
          `Could not read user ${reqU4O.user_id} active orders because order status isn't active `
        );
      } else {
        console.log(
          ` ***getUserActiveOrder: order_id: ${order.id}, status: ${order.status}, user_id ${order.user_id} `
        );
      }
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql = 'SELECT * FROM order_products WHERE order_id=($1);';
      // @ts-ignore
      const conn = await Client.connect();
      // @ts-ignore
      const result = await conn.query(sql, [order.id]);

      userActiveOrder = result.rows;

      conn.release();
      if (userActiveOrder.length !== 0)
        userActiveOrder.map((item: OrderProductType) => {
          return (item.id = order.id as number);
        });

      return userActiveOrder;
    } catch (err) {
      throw new Error(
        `Could not retrive user ${reqU4O.user_id} active order: ${err}`
      );
    }
  }
}
