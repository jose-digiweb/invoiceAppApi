// Import dependencies
import express, { Request, Response, NextFunction, Application } from 'express';

import appRouter from './routes';

// Initialize the express application
export const app: Application = express();

// Initialize the app router
app.use(appRouter);
