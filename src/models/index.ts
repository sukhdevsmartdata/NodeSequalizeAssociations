import sequelize from '../config/database';
import User from './Users';
import Post from './Posts';
import Comment from './Comments';

// Sync database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // force: true will drop the tables if they exist
    console.log('Database synced!');
  } catch (error) {
    console.error('Unable to sync the database:', error);
  }
};

export { User, Post, Comment, syncDatabase };
