// Import Dependencies
import { Router } from 'express';
import homePage from './homePage';

// Initializing the home page router
const homePageRouter: Router = Router();

// Add the home page route
homePageRouter.get('/api/v1', homePage);

// Export the homepage router
export default homePageRouter;
