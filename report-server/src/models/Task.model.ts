import { DataTypes, Model, Optional } from 'sequelize';
import User from './User.model';
import { sequelize } from '../connection/connect';

interface TaskAttributes {
  task_id: number;
  task_name: string;
  task_type: string;
  work_date: string;
  date: string;
  is_done: boolean;
  is_check: boolean;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'task_id'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public task_id!: number;
  public task_name!: string;
  public task_type!: string;
  public work_date!: string;
  public date!: string;
  public is_done!: boolean;
  public is_check!: boolean;
}

Task.init(
  {
    task_id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
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
  },
  {
    sequelize,
    tableName: 'tasks',
  }
);

// Define association
Task.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default Task;
