const { SenderTag } = require('../models');

module.exports = {
    create: tag => SenderTag.create({ tag }),
    isExists: tag => SenderTag.findOne({ where: { tag } }),
    getAll: () => SenderTag.findAll(),
    update: (uuid, tag) => SenderTag.update({ tag }, { where: { uuid } }),
    delete: (uuid) => SenderTag.destroy({ where: { uuid } }),
}