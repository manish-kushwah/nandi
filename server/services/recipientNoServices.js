const { RecipientNo } = require('../models');

module.exports = {
    create: mobile => RecipientNo.create({ mobile }),
    isExists: mobile => RecipientNo.findOne({ where: { mobile } }),
    getAll: () => RecipientNo.findAll(),
    update: (uuid, mobile) => RecipientNo.update({ mobile }, { where: { uuid } }),
    delete: (uuid) => RecipientNo.destroy({ where: { uuid } }),
}