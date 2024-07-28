import { User } from "./User.interface";

export interface Task extends User {
  user: User;
  task_id: number;
  task_name: string;
  task_type: string;
  work_date: string;
  date: string;
  is_done: boolean;
  is_check: boolean;
  user_id: number;
  createdAt: string;
  updatedAt: string;
}
