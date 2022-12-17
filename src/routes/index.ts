// Import dependencies
import { Router } from 'express';
import homepageRoute from './homePage';

// Initialize the app router
const appRouter: Router = Router();

// Add the homepage route
appRouter.use(homepageRoute);

// Export the app router
export default appRouter;
