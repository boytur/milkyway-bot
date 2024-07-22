import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.TOKEN) {
  throw new Error('JWT secret is not defined in environment variables');
}

export class Encrypt {
  static async getAccessToken(user = {}) {
    try {
      const token = jwt.sign(user, process.env.TOKEN!, { expiresIn: '1d' });
      return token;
    } catch (err) {
      console.log('Error generating access token:', err);
      throw new Error('Failed to generate JWT');
    }
  }

  static async getRefreshToken(user = {}) {
    try {
      const token = jwt.sign(user, process.env.TOKEN!, { expiresIn: '7d' });
      return token;
    } catch (err) {
      console.log('Error generating refresh token:', err);
      throw new Error('Failed to generate JWT');
    }
  }

  static async verifyToken(token: string) {
    try {
      const user = jwt.verify(token, process.env.TOKEN!);
      return user;
    } catch (err) {
      console.log('Error verifying token:', err);
      throw new Error('Failed to verify JWT');
    }
  }

  static async getUserData(token: string) {
    try {
      const user = jwt.decode(token);
      return user;
    } catch (err) {
      console.log('Error decoding token:', err);
      throw new Error('Failed to decode JWT');
    }
  }
}

export default Encrypt;
