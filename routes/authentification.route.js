const controller = require("../controllers/authentification.controller");
module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(
        "/authentification/user",
        controller.seconnecter
    )
    app.get("/", (req, res) => {
    res.json({ message: "Welcome to our application tdm." });
});
}
