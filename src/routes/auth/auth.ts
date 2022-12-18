// import dependencies
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Import modules
import mainPromise from '../../../utils/mainPromise';
import globalError from '../../../utils/globalError';
import DB from '../../database';

// This function implements the authentication middleware functionality
export default mainPromise(
  async (req: Request, res: Response, next: NextFunction) => {
    //   Get the token
    const token: string | undefined =
      req.cookies.token || req.headers.authorization?.replace('Bearer', '').trim();

    // No token? Then send an error message
    if (!token) return next(new globalError(401, 'The token was not provided'));

    // Verify the token
    jwt.verify(token, `${process.env.JWT_SECRET}`, async (error, payload: any) => {
      // Is the token not valid? Then send an error message
      if (error) return next(new globalError(401, 'Invalid token'));

      // Check if the user still exists
      const user = await DB.user.findUnique({ where: { id: payload.id } });

      // The user is no longer registered?
      // Then send an error message to the client
      if (!user) {
        return next(
          new globalError(
            401,
            'This user is no longer registered, please signup again'
          )
        );
      }

      // All good
      next();
    });
  }
);
