// Import dependencies
import { Request, Response, NextFunction } from 'express';

interface expressFunction {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

export default (fn: expressFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
