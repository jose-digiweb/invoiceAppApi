// Import dependencies
import 'dotenv/config';

// Import modules
import { app } from './index';

// The port our server will be listening on
const port: number = parseInt(<string>process.env.PORT, 10);

// Start the server
app.listen(port, () => console.log(`App running on port ${port}`));
