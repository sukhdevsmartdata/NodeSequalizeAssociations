import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Post from './Posts';
import User from './Users';

class Comment extends Model {
  public id!: number;
  public content!: string;
  public postId!: number;
  public userId!: number;
}

Comment.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  postId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
});

Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Comment;
