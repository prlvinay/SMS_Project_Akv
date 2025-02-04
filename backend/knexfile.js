const dotenv=require('dotenv');
dotenv.config();
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database,
    }
  },
};
