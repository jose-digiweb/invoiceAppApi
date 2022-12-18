// Import dependencies
import { Request, Response, NextFunction } from 'express';

// Import modules
import mainPromise from '../../../utils/mainPromise';
import globalError from '../../../utils/globalError';
import DB from '../../database';

// This function implements the delete user functionality
export default mainPromise(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get the user id
    const id: number = parseInt(req.params.id, 10);

    // Check if we have an id
    if (!id) {
      return next(new globalError(400, 'User id not provided'));
    }

    // Check if the user exists
    const user = await DB.user.findUnique({ where: { id } });

    // The users does not exists?
    // Then send an error message to the client
    if (!user) {
      return next(new globalError(404, 'No user found with the specified id'));
    }

    // Delete the user
    await DB.user.delete({ where: { id } });

    // Send the success response back
    res.status(200).json({ status: 'success' });
  }
);
