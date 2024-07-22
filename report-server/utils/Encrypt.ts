import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class Encrypt {
  static async getAccessToken(user = {}) {
    try {
      const token = jwt.sign(user, process.env.TOKEN!, { expiresIn: "1d" });
      return token;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to generate JWT");
    }
  }
  static async getRefreshToken(user = {}) {
    try {
      const token = jwt.sign(user, process.env.TOKEN!, { expiresIn: "1d" });
      return token;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to generate JWT");
    }
  }

  static async verifyToken(token: string) {
    try {
      const user = jwt.verify(token, process.env.TOKEN!);
      return user;
    } catch (err) {
      console.log(err);
      throw new Error("Failed to verify JWT");
    }
  }
}

export default Encrypt;
