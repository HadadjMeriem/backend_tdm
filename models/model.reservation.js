module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define("Reservation", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tarif: {
            type: Sequelize.DOUBLE,
        },
        jour: {
            type: Sequelize.DATE,
        },
        codeQR: {
            type: Sequelize.TEXT('long'),
        },
        start_at: {
            type: Sequelize.TIME,
        },
        end_at: {
            type: Sequelize.TIME,
        }

    });
    return Reservation;
};