/**
 * This class implements the global error handling functionality
 */
export default class globalError extends Error {
  // The status code
  statusCode: number;

  // The status
  status: string;

  // The operational flag
  isOperational: boolean;

  // The constructor
  constructor(statusCode: number, message: string) {
    // Call the parent class and pass the message directly to it
    super(message);

    // Assign the statusCode
    this.statusCode = statusCode;

    // Assign the status
    this.status = statusCode < 500 ? 'fail' : 'error';

    // Set the operational flag
    this.isOperational = true;

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}
