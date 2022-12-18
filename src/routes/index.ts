// Import dependencies
import { Router } from 'express';
import homepageRouter from './homePage';
import documentationRouter from './documentation';

// Initialize the app router
const appRouter: Router = Router();

// Add the homepage router
appRouter.use(homepageRouter);

// Add the documentation router
appRouter.use(documentationRouter);

// Export the app router
export default appRouter;
