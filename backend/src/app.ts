import express, { Application } from 'express';
import cors from "cors";
import morgan from 'morgan';

const app: Application = express();

import authRoutes from './routes/auth.routes';
import postsRoutes from './routes/posts.routes';


app.set('port', 3000);

//middleware
app.use(cors({exposedHeaders: ['auth-token']}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/v1/auth', authRoutes);
app.use('/v1/posts', postsRoutes);

export default app;