# NodeSequalizeAssociations

npm init -y
npm install express sequelize mysql2 typescript @types/express @types/node --save
npm install --save-dev ts-node nodemon sequelize-cli

# Generate a Seeder: You can use Sequelize CLI to generate a seeder. For example:
npx sequelize-cli seed:generate --name demo-users

# Run All Seeders: To execute all seeders defined in your project, run the following command:

npx sequelize-cli db:seed:all

# Run a Specific Seeder: If you want to run a specific seeder, use the following command (make sure to provide the correct path to the specific seeder):

npx sequelize-cli db:seed --seed <seeder_file_name>
# Example:
npx sequelize-cli db:seed --seed 20240101000000-demo-users



