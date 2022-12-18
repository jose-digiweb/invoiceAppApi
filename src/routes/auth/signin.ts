// import dependencies
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

// Import modules
import mainPromise from '../../../utils/mainPromise';
import globalError from '../../../utils/globalError';
import signToken from '../../../utils/signToken';
import DB from '../../database';

// This function implements the signin functionality
export default mainPromise(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get the user credentials
    const { email, password }: { email: string; password: string } = req.body;

    // Do we have all the credentials?
    if (!(email && password)) {
      // Send an error message
      return next(new globalError(400, 'Email or password is missing'));
    }

    // Get the user from the database
    const user = await DB.user.findUnique({ where: { email } });

    // Does the user exists?
    if (!user) {
      // send an error message
      return next(new globalError(404, 'No user found with that email address'));
    }

    // Validate the password
    const validPassword: boolean = await bcrypt.compare(password, user.password);

    // Is the password valid?
    if (!validPassword) {
      // send an error message
      return next(new globalError(401, 'Password is not valid'));
    }

    // Generate the jwt token
    const token: string = signToken(user.id, user.email);

    // Construct the cookie options
    // Will expire in 3 days
    const cookieOptions: { expires: Date; httpOnly: boolean } = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // Send the user data together with the token
    // Add the token in the cookies as well
    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .json({ status: 'success', token });
  }
);
