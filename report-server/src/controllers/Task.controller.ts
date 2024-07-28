import { Request, Response } from "express";
import Encrypt from "../utils/Encrypt";
import User from "../models/User.model";
import { JwtPayload } from "jsonwebtoken";
import Task from "../models/Task.model";
import { Op } from "sequelize";

export class TaskController {
  static async getUserTask(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({ error: "No token provided" });
      }

      const acc_tk = authHeader.split(" ")[1];
      const user = (await Encrypt.getUserData(acc_tk)) as JwtPayload;

      if (!user) {
        return res
          .status(403)
          .json({ error: "You are not allowed to access this resource" });
      }

      const tasks = await Task.findAll({
        order: [["date", "DESC"]],
        where: {
          user_id: user.user_id,
        },
      });

      return res
        .status(200)
        .json({ success: true, message: " Get tasks successfully!", tasks });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getTasks(req: Request, res: Response) {
    try {
      let date = req.query.date as string | undefined;
      let status = req.query.status as string | undefined;
      let showUnchecked = req.query.showUnchecked as string | undefined;

      let query: any = {};

      if (showUnchecked === "true") {
        query.is_check = false;
      } else {
        if (date) {
          if (!isValidDate(date)) {
            return res.status(400).json({ error: "Invalid date format" });
          }
          query.date = {
            [Op.eq]: date,
          };
        }

        if (status === "checked") {
          query.is_check = true;
        } else if (status === "unchecked") {
          query.is_check = false;
        }
      }

      const tasks = await Task.findAll({
        order: [["date", "DESC"]],
        where: query,
        include: [User],
      });

      return res.status(200).json({
        success: true,
        message: "Get tasks successfully!",
        date,
        tasks,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }

    function isValidDate(dateString: string) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(dateString);
    }
  }

  static async getTaskById(req: Request, res: Response) {
    try {
      const discord_id = req.params.discord_id;

      const taskRegex = /^\d+$/;
      if (!taskRegex.test(discord_id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid input",
        });
      }

      const user = await User.findOne({
        where: {
          discord_id: discord_id
        },
        attributes: ["user_id", "discord_id", "user_fname", "user_lname", "avatar"],
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const userId = user.user_id;

      const tasks = await Task.findAndCountAll({
        where: {
          user_id: userId,
        },
      });

      const userTasks = {
        user: user,
        tasks: tasks.rows,
      };

      return res.status(200).json({
        success: true,
        message: "Get task successfully!",
        tasks:userTasks,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateTask(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(403).json({ error: "No token provided" });
      }

      const acc_tk = authHeader.split(" ")[1];
      const user = (await Encrypt.getUserData(acc_tk)) as JwtPayload;

      if (!user) {
        return res
          .status(403)
          .json({ error: "You are not allowed to access this resource" });
      }

      const taskId = req.params.id;
      const { task_name, is_done, task_type, is_check, work_date } = req.body;

      // Validate task ID and updated data
      if (!taskId || !task_name || typeof is_done !== "boolean" || !task_type) {
        return res.status(400).json({ error: "Invalid input" });
      }

      // Find the task to update
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      // Update the task
      await Task.update(
        {
          task_name,
          is_done,
          task_type,
          is_check,
          work_date,
        },
        {
          where: {
            task_id: taskId,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: "Task updated successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
