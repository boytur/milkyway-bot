import Task from "../models/Task.model";
import User from "../models/User.model";
import { Request, Response } from "express";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const tasks = await Task.findAndCountAll({
        include: [
          {
            model: User,
          },
        ],
      });

      let users: {
        discord_id: string;
        user_fname: string;
        user_lname: string;
        avatar: string;
        task_count: number;
      }[] = [];

      tasks.rows.forEach((task: any) => {
        const user = task.User;
        if (user) {
          const userIndex = users.findIndex(
            (u) => u.discord_id === user.discord_id
          );

          if (userIndex === -1) {
            users.push({
              discord_id: user.discord_id,
              user_fname: user.user_fname,
              user_lname: user.user_lname,
              avatar: user.avatar,
              task_count: 1,
            });
          } else {
            users[userIndex].task_count++;
          }
        }
      });

      return res.status(200).json({
        success: true,
        message: "Get users successfully!",
        users,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
