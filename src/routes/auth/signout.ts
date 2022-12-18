// import dependencies
import { Request, Response, NextFunction } from 'express';

// Import modules
import mainPromise from '../../../utils/mainPromise';

// This function implements the sign out functionality
export default mainPromise(
  async (req: Request, res: Response, next: NextFunction) => {
    // Remove the token from the cookie
    res
      .cookie('token', 'logout', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
      })
      .status(200)
      .json({ status: 'success' });
  }
);
