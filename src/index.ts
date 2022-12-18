// Import dependencies
import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Import modules
import appRouter from './routes';
import globalErrorHandler from '../utils/globalErrorHandler';

// Initialize the express application
export const app: Application = express();

// Set cors policy
app.use(cors());

// Set support for json
app.use(express.json());

// Configure url encoding
app.use(express.urlencoded({ extended: true }));

// Set the cookie parsing support
app.use(cookieParser());

// Set the morgan logger
app.use(morgan('tiny'));

// Initialize the app router
app.use('/api/v1', appRouter);

// Handle incorrect paths
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    message: `Route not found`,
    method: req.method,
    path: req.originalUrl,
  });
});

// Define the global errors handler middleware
app.use(globalErrorHandler);
