module.exports = (sequelize, Sequelize) => {
    const Parking = sequelize.define("Parking", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom: {
            type: Sequelize.STRING
        },
        commune: {
            type: Sequelize.STRING
        },
        HeureDebut: {
            type: Sequelize.STRING,
        },
        HeureFin: {
            type: Sequelize.STRING,
        },
        etat: {
            type: Sequelize.ENUM,
            values: ['ouvert', 'ferme']
        },
        image: {
            type: Sequelize.STRING,
        },
        capacite: {
            type: Sequelize.INTEGER,
        },
        nbPlace: {
            type: Sequelize.INTEGER,
        },
        tarifHoraire: {
            type: Sequelize.INTEGER,
        },
        longitude: {
            type: Sequelize.FLOAT,
        },
        latitude: {
            type: Sequelize.FLOAT
        },
        Sunday: {
            type: Sequelize.BOOLEAN,
        },
        Monday: {
            type: Sequelize.BOOLEAN
        },
        Tuesday: {
            type: Sequelize.BOOLEAN
        },
        Wednesday: {
            type: Sequelize.BOOLEAN
        },
        Thursday: {
            type: Sequelize.BOOLEAN
        },
        Friday: {
            type: Sequelize.BOOLEAN
        },
        Saturday: {
            type: Sequelize.BOOLEAN
        }
    });
    return Parking;
};