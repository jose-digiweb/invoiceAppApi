/**
 * Import required dependencies
 */
import jwt from 'jsonwebtoken';

/**
 * This function is responsible for generating a JWT Token
 */
export default (id: number, email: string) => {
  // Sign the token
  const token: string = jwt.sign(
    { id: id, email: email },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: '1d',
    }
  );

  // Output the token
  return token;
};
