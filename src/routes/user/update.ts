// Import dependencies
import { Request, Response, NextFunction } from 'express';

// Import modules
import mainPromise from '../../../utils/mainPromise';
import globalError from '../../../utils/globalError';
import DB from '../../database';

// This function implements the update user functionality
export default mainPromise(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get the new user data
    const {
      firstName,
      lastName,
    }: {
      firstName: string;
      lastName: string;
    } = req.body;

    // Get the id from the params
    const id: number = parseInt(req.params.id, 10);

    // We don't have all the data?
    // Then send an error message
    if (!(firstName && lastName)) {
      return next(new globalError(400, 'All fields are required'));
    }

    // Get the user
    const user = await DB.user.findUnique({ where: { id } });

    // The user does not exist?
    // Then send an error message
    if (!user) {
      return next(new globalError(404, 'User not found'));
    }

    // Update the user info
    const updatedUser = await DB.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
      },
    });

    // Send the response with the updated user data
    res.status(200).json({ status: 'success', data: updatedUser });
  }
);
