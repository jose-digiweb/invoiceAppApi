// Import Dependencies
import { Router } from 'express';
import homePage from './homePage';

// Initializing the home page router
const router: Router = Router();

// Add the home page route
router.get('/', homePage);

// Export the homepage router
export default router;
