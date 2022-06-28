const controller = require("../controllers/parking.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get(
        "/parking/getAllParking",
        controller.recuperer_parking
    );
    app.post(
        "/parking/getParkingProche",
        controller.getParkingProche
    );
    app.post(
        "/parking/getParking",
        controller.getParkingById
    )
}