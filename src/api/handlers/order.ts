import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import {
  OrderReturnType,
  OrderType,
  OrderProductType,
  OrderProductListType
} from '../interfaces/oder';
import { verifyAuthToken } from '../middleware/authenticate';
import dotenv from 'dotenv';

dotenv.config();

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index();
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const order = await store.show(parseInt(req.params.id));

    if (order === undefined) {
      res.status(400);
      res.json(`No registerd order with id ${req.params.id}`);
    }
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const order: OrderType = {
      user_id: req.body.user_id,
      status: req.body.status
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    // const order = await store.show(parseInt(req.params.id))
    await store.deleteOderProducts(parseInt(req.params.id));
    const deleted = await store.delete(parseInt(req.params.id));
    res.json(deleted);
  } catch (err) {
    res.status(400);
    // @ts-ignore
    res.json(err);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const updateOrder: OrderReturnType = {
      id: parseInt(req.params.id),
      status: req.body.status,
      user_id: req.body.user_id
    };
  
    const order = await store.update(updateOrder);

    if (order === undefined) {
      res.status(400);
      res.json(`No registerd order with id ${req.params.id}`);
    }
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  // let product = undefined
  // try{
  //     product = productShow({prams.id = productId}, {} )
  // }

  try {
    // @ts-ignore
    const Product2Order: OrderProductType = {
      id: parseInt(req.params.id),
      product_id: parseInt(req.body.product_id),
      quantity: parseInt(req.body.quantity),
      user_id: parseInt(req.body.user_id)
    };
  
    const addedProduct: OrderProductType = await store.addProduct(
      Product2Order
    );

    res.status(200);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getUserActiveOrder = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId);
  // @ts-ignore
  const Product2Order: OrderReturnType = {
    user_id: parseInt(req.params.userId),
    id: parseInt(req.body.orderId),
    status: req.body.orderStatus
  };

  try {
    const userActiveOrderArray = await store.getUserActiveOrder(Product2Order);
    if (userActiveOrderArray.length === 0) {
      throw new Error(`can retrieve active order for user id ${userId}`);
    }
    // @ts-ignore
    const userActiveOrder: OrderProductListType = {
      id: userActiveOrderArray[0].id,
      user_id: Product2Order.user_id,
      status: 'active',
      quantity: [],
      product_id: []
    };

    const groupedUserActiveOrderArray = userActiveOrderArray.reduce(
      (acc, curr, i, arr) => {
        // @ts-ignore
        acc[`${curr.product_id}`] =
          // @ts-ignore
          acc[`${curr.product_id}`] === undefined
            ? []
            : // @ts-ignore
              acc[`${curr.product_id}`];
        // @ts-ignore
        if (acc[`${curr.product_id}`].length === 0) {
          // @ts-ignore
          const userOrder: OrderProductType = {
            id: userActiveOrderArray[0].id,
            user_id: Product2Order.user_id,
            status: userActiveOrderArray[0].status,
            quantity: 0,
            product_id: curr.product_id
          };
          // @ts-ignore
          acc[`${curr.product_id}`].push(userOrder);
        }
        // @ts-ignore
        acc[`${curr.product_id}`][0].quantity += curr.quantity;
    
        if (i + 1 === arr.length) {
          return Object.values(acc);
          // return acc
        }

        return acc;
      },
      {}
    );
    // @ts-ignore
    groupedUserActiveOrderArray.map((curr) => {
      
      userActiveOrder.quantity.push(curr[0].quantity);
      userActiveOrder.product_id.push(curr[0].product_id);
      return curr;
    });


    res.json(userActiveOrder);
  } catch (err) {
    res.status(400);
    res.json(`can retrieve active order for user id ${userId} :: ${err}`);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', verifyAuthToken, create);
  app.put('/orders/:id', verifyAuthToken, update);
  app.delete('/orders/:id', destroy);
  // add product
  app.post('/orders/:id/products', verifyAuthToken, addProduct);
  // get user active order
  app.get('/orders/users/:userId', verifyAuthToken, getUserActiveOrder);
};

export default orderRoutes;
