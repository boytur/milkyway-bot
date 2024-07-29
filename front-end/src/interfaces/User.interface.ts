export interface User {
  discord_id: string;
  user_fname: string;
  user_lname: string;
  avatar: string;
}

export interface UserTaskCount extends User {
  user_id: Key | null | undefined;
  task_count: number;
}