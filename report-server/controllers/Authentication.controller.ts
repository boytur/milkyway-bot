import { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
import User from "../models/User.model";
import Encrypt from "../utils/Encrypt";
import { JwtPayload } from "jsonwebtoken";

export class Authentication {
  static async callback(req: Request, res: Response) {
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({ error: "No code provided" });
    }

    console.log(code);

    try {
      const data = `client_id=${process.env.CL_ID}&client_secret=${process.env.CL_SECRET}&grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REDIRECT_URI}&scope=identify%20email`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded",
      };

      const response = await axios.post(
        "https://discord.com/api/oauth2/token",
        data,
        { headers }
      );

      const tokenData = response.data;
      const userData = await axios.get("https://discord.com/api/users/@me", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });

      const user = await User.findOne({
        where: {
          discord_id: userData.data.id,
        },
        attributes: [
          "discord_id",
          "user_id",
          "user_fname",
          "user_lname",
          "email",
          "avatar",
        ],
      });

      if (!user || user.email !== "team3") {
        return res.status(403).json({
          success: false,
          message:
            "You are not allowed to access this resource you are not a team member",
        });
      }

      const payload = {
        discord_id: user.discord_id,
        user_id: user.user_id,
        user_fname: user.user_fname,
        user_lname: user.user_lname,
        email: user.email,
        avatar: user.avatar,
      };

      const accessToken = await Encrypt.getAccessToken(payload);
      const refreshToken = await Encrypt.getRefreshToken(payload);

      return res.status(200).json({
        success: true,
        message: "You are allowed to access this resource",
        user: user,
        acc_tk: accessToken,
        reff_tk: refreshToken,
      });
    } catch (error) {
      console.error("Error during callback:", error as Error | string);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async refresh(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ error: "No refresh token provided" });
      }

      const reff_tk = authHeader.split(" ")[1];

      const verified = await Encrypt.verifyToken(reff_tk);
      if (!verified) {
        return res.status(400).json({ error: "Invalid refresh token" });
      }

      const user = await User.findOne({
        where: {
          discord_id: (verified as JwtPayload).discord_id,
        },
        attributes: [
          "discord_id",
          "user_id",
          "user_fname",
          "user_lname",
          "email",
          "avatar",
        ],
      });

      if (!user || user.email !== "team3") {
        return res.status(403).json({
          success: false,
          message:
            "You are not allowed to access this resource you are not a team member",
        });
      }

      const payload = {
        discord_id: user.discord_id,
        user_id: user.user_id,
        user_fname: user.user_fname,
        user_lname: user.user_lname,
        email: user.email,
        avatar: user.avatar,
      };

      const accessToken = await Encrypt.getAccessToken(payload);

      return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        user: user,
        reff_tk: accessToken,
      });
    } catch (error) {
      console.error("Error during refresh:", error as Error | string);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
