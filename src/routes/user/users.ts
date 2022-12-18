// Import dependencies
import { Request, Response, NextFunction } from 'express';

// Import modules
import mainPromise from '../../../utils/mainPromise';
import DB from '../../database';

// This function implements the get all users functionality
export default mainPromise(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get all the users
    const users = await DB.user.findMany();

    // Send the response with the users
    res.status(200).json({ status: 'success', data: users });
  }
);
