const db = require("../models");
const geolib = require('geolib');
const Parking = db.Parking;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.recuperer_parking = (req, res) => {

    Parking.findAll().then(data => {
        res.status(200).send(data)
    }).catch(err => {
        res.status(500).send({ message: err.message })
    });
}
exports.getParkingProche = (req, res) => {
    //   myData.push("1");
    var position = { latitude: req.body.latitude, longitude: req.body.longitude };
    var i = 0,
        parcDist, d;

    (Parking.findAll()

        .then(parking => {
            var myData = [];
            for (var i = 0; i < parking.length; i++) {
                parkingDist = { latitude: parking[i].latitude, longitude: parking[i].longitude };
                //myData.push("1");
                d = geolib.getPreciseDistance(position, parkingDist);
                console.log(d);
                if (d < 3000.0) //  30000m
                {
                    //  console.log(parking[i]);
                    myData.push(parking[i]);

                }
            }
            res.json(myData)
        }))
    .catch(err => {
        return res.status(500).send({ message: err.message })
    });
}
exports.recherche = (req, res) => {
    var position = { latitude: req.body.latitude, longitude: req.body.longitude };
    var i = 0,
        parcDist, d;

    (Parking.findAll()

        .then(parking => {
            var myData = [];
            for (var i = 0; i < parking.length; i++) {
                parkingDist = { latitude: parking[i].latitude, longitude: parking[i].longitude };
                //myData.push("1");
                d = geolib.getPreciseDistance(position, parkingDist);
                console.log(d);
                if (d < req.body.distance && parking[i].tarifHoraire <= req.body.prix) //  30000m
                {
                    //  console.log(parking[i]);
                    myData.push(parking[i]);

                }
            }
            res.json(myData)
        }))
    .catch(err => {
        return res.status(500).send({ message: err.message })
    });
}
exports.getParkingById = (req, res) => {
    Parking.findOne({
        where: {
            id: req.body.id,
        }
    }).then(
        parking => {
            res.status(200).send(parking);
        }
    ).catch(err => {
        return res.status(500).send({ message: err.message })
    });
}