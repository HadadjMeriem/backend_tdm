const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
var sequelize
if (process.env.NODE_ENV == 'production') {
  // the application is executed on Heroku ... use the postgres         database
  console.log("\n\n\n\n\n we are connecting to pg db \n\n\n\n\n")
  sequelize =new Sequelize(
    process.env.DATABASE_URL,
    {
    dialect: "postgres",
    protocol: "postgres",
    //native: true,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    /*pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }*/
  });
  } 
else{
    // the application is executed on the local machine ... use mysql
sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Parking = require("./model.parking.js")(sequelize, Sequelize);
db.Reservation = require("./model.reservation.js")(sequelize, Sequelize);
db.User = require("./model.utilisateur.js")(sequelize, Sequelize);
// Association Reservation - idUser
db.User.hasOne(db.Reservation, { foreignKey: 'idUser' });
db.Reservation.belongsTo(db.User, { foreignKey: 'idUser' });
// Association Reservation - idParking
db.Parking.hasOne(db.Reservation, { foreignKey: 'idParking' });
db.Reservation.belongsTo(db.Parking, { foreignKey: 'idParking' });
module.exports = db;
