import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import User from "../models/User.model";
import Task from "../models/Task.model";

export class DashboardController {
  static async getReports(req: Request, res: Response) {
    try {
      const taskTypes = await Task.findAndCountAll({
        attributes: ["task_type"],
      });

      const typeCounts: { [key: string]: number } = {};

      taskTypes.rows.forEach((taskType: any) => {
        if (typeCounts[taskType.task_type]) {
          typeCounts[taskType.task_type]++;
        } else {
          typeCounts[taskType.task_type] = 1;
        }
      });

      let reports: { taskName: string; count: number }[] = [];

      reports.push({
        taskName: "งานทั้งหมด",
        count: taskTypes.count,
      });

      reports = reports.concat(
        Object.keys(typeCounts).map((taskType: string) => {
          return {
            taskName: taskType,
            count: typeCounts[taskType],
          };
        })
      );

      return res.status(200).json({
        success: true,
        reports,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
