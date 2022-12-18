// Import dependencies
import { Router } from 'express';

// Import modules
import auth from '../auth/auth';
import users from './users';
import user from './user';
import update from './update';
import deleteUser from './delete';

// Initialize the user router
const router: Router = Router();

// Add the get all users route
router.get('/', auth, users);

// Add the get  single user route
router.get('/:id', auth, user);

// Add the update user route
router.put('/:id', auth, update);

// Add the delete user route
router.delete('/:id', auth, deleteUser);

// Export the user router
export default router;
