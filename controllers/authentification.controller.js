const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
var jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
exports.seconnecter = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).send({ message: "User Not found !!!!" });
            }
            var passwordIsValid = (user.mdp === req.body.mdp);
            if (!passwordIsValid) {
                return res.status(202).send({
                    accessToken: null,
                    message: "Invalid Password! user.email == " + user.email + "user.motPasse == " + user.mdp + "  req.body.mdp  ==  " + req.body.mdp,
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            return res.status(200).send({
                accessToken: token,
                nom:user.nom,
                email:user.email,
                prenom:user.prenom,
                num_tel:user.num_tel,
                mdp:user.mdp,
                id: user.id,
                updatedAt:user.updatedAt,
                createdAt:user.createdAt,
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        });
};
