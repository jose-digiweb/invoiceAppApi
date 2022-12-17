// Import dependencies
import { Request, Response } from 'express';

// This function implements the homepage functionality
export default (req: Request, res: Response) => {
  // Send the response
  res
    .status(200)
    .json({ status: 'success', message: 'Welcome to the Invoice app API!' });
};
