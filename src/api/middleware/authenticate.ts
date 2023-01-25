import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // console.log(` userStoreHandler:verifyAuthToken `)
    const authorizationHeader = req.headers.authorization;
    // @ts-ignore
    const token = authorizationHeader.split(' ')[1].replace(/['"]+/g, '');
    // console.log(` userStoreHandler:verifyAuthToken Autenticate token ${token}, Secret ${process.env.TOKEN_SECRET}`)
    // console.log(` userStoreHandler:verifyAuthToken body token ${req.body.token}, Secret ${process.env.TOKEN_SECRET}`)
    // jwt.verify(req.body.token, process.env.TOKEN_SECRET)
    // @ts-ignores
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log(` userStoreHandler:verifyAuthToken token ${token} verification done`)
    res.locals.userData = decoded;
    next();
  } catch (error) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
};
