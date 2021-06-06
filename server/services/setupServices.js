const { sequelize } = require('../models');

module.exports = {
    reset: () => sequelize.sync({ force: true }),
    alter: () => sequelize.sync({ alter: true }),
    drop: () => sequelize.drop()
}