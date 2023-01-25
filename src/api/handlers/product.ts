import express, { Request, Response } from 'express';
import { ProductStore } from '../models/product';
import { ProductType, ProductReturnType } from '../interfaces/product';
import { verifyAuthToken } from '../middleware/authenticate';
import dotenv from 'dotenv';

dotenv.config();

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params.id));
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const product: ProductType = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(parseInt(req.params.id));
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't delelte product ${err}`);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const product: ProductReturnType = {
      id: parseInt(req.params.id),
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    const newProduct = await store.update(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', verifyAuthToken, create);
  app.put('/products/:id', verifyAuthToken, update);
  app.delete('/products/:id', verifyAuthToken, destroy);
};

export default productRoutes;
