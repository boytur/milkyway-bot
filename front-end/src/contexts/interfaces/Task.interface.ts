export interface Task {
  User: {
    user_fname: string;
    user_lname: string;
  };
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
