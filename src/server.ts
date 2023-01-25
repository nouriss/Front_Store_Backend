import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './api/handlers/order';
import productRoutes from './api/handlers/product';
import userRoutes from './api/handlers/user';
import cors from 'cors';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(bodyParser.json());

// enable cors
const corsOption = {
    optionsSuccessStatus: 200 // for some lagacy browsers
  };
  app.use(cors(corsOption));

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

orderRoutes(app);
productRoutes(app);
userRoutes(app);

export default app;
