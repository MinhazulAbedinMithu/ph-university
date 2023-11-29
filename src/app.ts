import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { userRoutes } from './app/modules/user/user.route';
import notFoundHandler from './app/middlewares/notFoundHandler';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.json('App is live');
});

app.use(globalErrorHandler);
app.use(notFoundHandler);

export default app;
