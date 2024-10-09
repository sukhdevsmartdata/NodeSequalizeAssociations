import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './Users';
import Comment from './Comments';

class Post extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public userId!: number;
}

Post.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Post',
  tableName: 'posts',
});

Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

export default Post;
