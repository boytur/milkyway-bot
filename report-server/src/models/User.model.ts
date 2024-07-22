import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../connection/connect';


// Define the attributes for the User model
interface UserAttributes {
  user_id: number;
  discord_id: number;
  user_fname: string;
  user_lname: string;
  bot?: boolean;
  email?: string;
  avatar?: string;
}

// Define the optional attributes for the User model
interface UserCreationAttributes extends Optional<UserAttributes, 'user_id' | 'discord_id'> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: number;
  public discord_id!: number;
  public user_fname!: string;
  public user_lname!: string;
  public bot?: boolean;
  public email?: string;
  public avatar?: string;
}

// Initialize the User model
User.init(
  {
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    discord_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    user_fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bot: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
  }
);

export default User;
