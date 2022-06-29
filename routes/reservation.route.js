const controller = require("../controllers/reservation.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
            "/reservation/creer",
            controller.creer
        ),
        app.post(
            "/reservation/user",
            controller.recuperer_Reservation_ById
        ),
        app.post(
            "/reservation/user/effectue",
            controller.getReservationEffectue
        ),
        app.post(
            "/reservation/user/courante",
            controller.getReservationCourante
        )

}