const app = require('./app');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

dotenv.config();

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  console.log('Connected to PostgreSQL');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
});