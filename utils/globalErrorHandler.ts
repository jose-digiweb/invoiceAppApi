import { Request, Response, NextFunction } from 'express';
import globalError from './globalError';

/**
 * This function implements the global error handler
 */
export default (
  error: globalError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Is this an operational and trusted error?
  if (error.isOperational) {
    // Then send the error message to the client
    res
      .status(error.statusCode)
      .json({ status: error.status, message: error.message });

    // Is this an unknown error?
  } else {
    // Log the error to the console
    console.error('Error: ', error);

    // Send a generic error message to the client
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong, please try again later.',
    });
  }
};
