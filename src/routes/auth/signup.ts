// import dependencies
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';

// Import modules
import mainPromise from '../../../utils/mainPromise';
import globalError from '../../../utils/globalError';
import signToken from '../../../utils/signToken';
import DB from '../../database';

// This function implements the signup functionality
export default mainPromise(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get the new user data
    const {
      firstName,
      lastName,
      email,
      password,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    } = req.body;

    // Do we have all the data?
    if (!(firstName && lastName && email && password)) {
      // Send an error message
      return next(new globalError(400, 'All fields are required'));
    }

    // Check if the user already exists
    const existingUser = await DB.user.findUnique({ where: { email } });

    // Is the user already exists?
    if (existingUser) {
      // Send an error message
      return next(new globalError(400, 'User already exists, try to login instead'));
    }

    // Encrypt the password
    const encryptedPassword: string = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await DB.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: encryptedPassword,
      },
    });

    // Generate the jwt token
    const token: string = signToken(newUser.id, newUser.email);

    // Construct the cookie options
    // Will expire in 3 days
    const cookieOptions: { expires: Date; httpOnly: boolean } = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // Send the user data together with the token
    // Add the token in the cookies
    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .json({ status: 'success', token });
  }
);
