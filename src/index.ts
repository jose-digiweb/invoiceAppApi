// Import dependencies
import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Import modules
import appRouter from './routes';

// Initialize the express application
export const app: Application = express();

// Set cors policy
app.use(cors());

// Set support for json
app.use(express.json());

// Set the cookie parsing support
app.use(cookieParser());

// Configure url encoding
app.use(express.urlencoded({ extended: true }));

// Set the morgan logger
app.use(morgan('tiny'));

// Initialize the app router
app.use(appRouter);
