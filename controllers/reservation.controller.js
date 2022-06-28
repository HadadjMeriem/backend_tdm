const db = require("../models");
const Reservation = db.Reservation;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
exports.recuperer_Reservation_ById = (req, res) => {

    Reservation.findAll({
        where: {
            idUser: req.body.idUser
        }
    }).then(
        data => {
            if (!data) {
                res.status(404).send({ message: "aucune réservation trouvée" })
            }
            res.status(200).send(data);
        }
    )
}
exports.creer = (req, res) => {
    Reservation.create({
        idUser: req.body.idUser,
        idParking: req.body.idParking,
        tarif: req.body.tarif,
        jour: req.body.jour,
        start_at: req.body.start,
        end_at: req.body.end

    }).then(
        reservation => {
            res.status(200).send(reservation);
        }
    ).catch(err => {
        res.status(500).send({ message: err.message })
    });
}