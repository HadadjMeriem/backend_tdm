const db = require("../models")
const User = db.User;
exports.sinscrire = (req, res) => {
  
        User.count({ where: { email: req.body.email } })
       .then(count => {
        if (count != 0) {
            return res.status(402).send("email exists");

        }
     else{
             User.create({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    mdp: req.body.mdp,
                    num_tel: req.body.num_tel,

                }).then(
                    user => {
                        res.status(200).send(user);
                    }
                )

            } 
        }
        
    ).catch(err => {
        res.status(500).send({ message: err.message })
    });
};
