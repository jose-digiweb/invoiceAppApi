// Import dependencies
import { Router } from 'express';

// Import modules
import auth from './auth';
import signup from './signup';
import signin from './signin';
import signout from './signout';

// Initialize the auth router
const router: Router = Router();

// Add the signup route
router.post('/signup', signup);

// Add the signin route
router.post('/signin', signin);

// Add the signout route
router.get('/signout', auth, signout);

// Export the auth router
export default router;
