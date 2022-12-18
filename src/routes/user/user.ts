// Import dependencies
import { Request, Response, NextFunction } from 'express';

// Import modules
import mainPromise from '../../../utils/mainPromise';
import globalError from '../../../utils/globalError';
import DB from '../../database';

// This function implements the get a single user functionality
export default mainPromise(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get the id from the parameter
    const id: number = parseInt(req.params.id, 10);

    // Check if the user exists
    const user = await DB.user.findUnique({ where: { id } });

    // The user does not exist?
    // Then send and error message to the client
    if (!user) return next(new globalError(404, 'User not found'));

    // Send the response with the user data
    res.status(200).json({ status: 'success', data: user });
  }
);
