const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./models");
db.sequelize.sync();
/*var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));*/
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
// simple route

require('./routes/parking.route')(app);
require('./routes/inscription.route')(app);
require('./routes/authentification.route')(app);
require('./routes/reservation.route')(app);
const initRoutes = require("./routes/parking.route");
global.__basedir = __dirname;
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
// set port, listen for requests
const PORT = process.env.PORT || 8100;
app.listen(PORT, () => {
    console.log(`Your database ${db.Demande}.`);
    console.log(`Server is running on port ${PORT}.`);
});