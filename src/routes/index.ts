// Import dependencies
import { Router } from 'express';
import homepageRouter from './homePage';
import authRouter from './auth';
import userRouter from './user';
import documentationRouter from './documentation';

// Initialize the app router
const appRouter: Router = Router();

// Add the homepage router
appRouter.use(homepageRouter);

// Add the documentation router
appRouter.use(documentationRouter);

// Add the auth router
appRouter.use('/auth', authRouter);

// Add the user router
appRouter.use('/users', userRouter);

// Export the app router
export default appRouter;
