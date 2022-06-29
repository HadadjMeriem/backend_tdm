const db = require("../models");
const Reservation = db.Reservation;
const Parking = db.Parking;
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
exports.getReservationCourante = (req, res) => {
    const today = new Date();
    Reservation.findAll({
        where: {
            idUser: req.body.idUser,
            jour: {
                [Op.gte]: today
            }
        }
    }).then(
        data => {
            if (!data) {
                return res.status(404).send({ message: "aucune réservation en cours trouvée" })

            }
            res.status(200).send(data);
        }
    ).catch(err => {
        res.status(500).send({ message: err.message })
    });
}
exports.getReservationEffectue = (req, res) => {
    const today = new Date();
    Reservation.findAll({
        where: {
            idUser: req.body.idUser,
            jour: {
                [Op.lt]: today
            }
        }
    }).then(
        data => {
            if (!data) {
                return res.status(404).send({ message: "aucune réservation en cours trouvée" })

            }
            res.status(200).send(data);
        }
    ).catch(err => {
        res.status(500).send({ message: err.message })
    });
}


exports.creer = (req, res) => {
    Parking.findOne({
            where: {
                id: req.body.idParking,
            }
        }).then(
            parking => {
                if (parking.nbPlace > 0) {
                    const today = new Date();
                    const date = new Date(req.body.jour)
                    if (date >= today) {
                        const dayIndex = date.getDay();
                        console.log(dayIndex);
                        const getDayName = (dayIndex) => {
                            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                            return days[dayIndex];
                        }
                        const dayName = getDayName(dayIndex)
                        if (parking[dayName] == false) {
                            res.status(401).send({ message: "le parking est fermé en ce jour" });
                        } else {
                            if (Date.parse('01/01/2011 ' + req.body.start + ':45') > Date.parse('01/01/2011 ' + parking.HeureDebut + ':45')) {
                                console.log("true1");
                                if (Date.parse('01/01/2011 ' + req.body.end + ':45') < Date.parse('01/01/2011 ' + parking.HeureFin + ':45')) {
                                    console.log("juste");
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
                                    )
                                } else {
                                    res.status(404).send({ message: "le parking est fermé à cet heure" })
                                }

                            } else {
                                res.status(203).send({ message: "le parking est fermé à cet heure" })
                            }
                        }


                    } else {
                        res.status(201).send({ message: "la date doit etre supérieure à la journée en cours" });
                    }

                } else {
                    res.status(202).send({ message: "pas de places disponibles" })
                }
            }
        )
        .catch(err => {
            res.status(500).send({ message: err.message })
        });
}