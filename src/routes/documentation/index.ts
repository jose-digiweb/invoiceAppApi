// Import dependencies
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';

// Initialize the documentation router
const router: Router = Router();

// Get the documentation file
const documentation = yaml.load('src/routes/documentation/configuration.yaml');

// Set the documentation route
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(documentation));

// Export the documentation router
export default router;
