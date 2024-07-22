import { DataTypes, Model, Optional } from 'sequelize';
import User from './User.model';
import { sequelize } from '../connection/connect';

// Define the attributes for the Task model
interface TaskAttributes {
  task_id: number;
  task_name: string;
  task_type: string;
  work_date: string;
  date: string;
  is_done: boolean;
  is_check: boolean;
  user_id: number;
}

// Define the optional attributes for the Task model
interface TaskCreationAttributes extends Optional<TaskAttributes, 'task_id'> {}

// Define the Task model class
class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public task_id!: number;
  public task_name!: string;
  public task_type!: string;
  public work_date!: string;
  public date!: string;
  public is_done!: boolean;
  public is_check!: boolean;
  public user_id!: number; // Added this to match the foreign key
}

// Initialize the Task model
Task.init(
  {
    task_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    task_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    work_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    is_done: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_check: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
  }
);

// Define associations
Task.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default Task;
