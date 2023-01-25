import express, { Request, Response } from 'express';
import { UserStore } from '../models/user';
import { UserType, UserAuthType } from '../interfaces/user';
import { verifyAuthToken } from '../middleware/authenticate';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  const user: UserType = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };
  try {
    const newUser = await store.create(user);
    // @ts-ignore
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    res.json({ newUser, token });
  } catch (err) {
    res.status(401);
    // @ts-ignore
    res.json(err + user);
  }
};

const update = async (req: Request, res: Response) => {
  const user: UserAuthType = {
    id: parseInt(req.params.id),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  };
  try {
    const updatedUser = await store.update(user);
    // @ts-ignore
    const token = jwt.sign({ user: updatedUser }, process.env.TOKEN_SECRET);
    res.json({ updatedUser, token });
  } catch (err) {
    res.status(401);
    // @ts-ignore
    res.json(err + user);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(parseInt(req.params.id));
    res.json(deleted);
  } catch (err) {
    res.status(400);
    // @ts-ignore
    res.json(err);
  }
};

// const authenticate = async (req: Request, res: Response) => {
//     const u: UserType = {
//         firstname: req.body.firstname,
//         lastname: req.body.lasname,
//         password: req.body.password,
//     }
//     console.log(`authenticate user: ${u}`)
//     try {
//         const user = await store.authenticate(u.firstname, u.lastname, u.password)
//         //@ts-ignore
//         let token = jwt.sign({ user: user }, (process.env.TOKEN_SECRET));
//         res.json({user, token})
//     } catch(error) {
//         res.status(401)
//         res.json({ error })
//     }
// }

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index);
  app.get('/users/:id', verifyAuthToken, show);
  app.put('/users/:id', verifyAuthToken, update);
  app.post('/users', verifyAuthToken, create);
  app.delete('/users/:id', verifyAuthToken, destroy);
};

export default userRoutes;
