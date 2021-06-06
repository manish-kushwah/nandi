'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RecipientNo extends Model {
        static associate(models) {
            RecipientNo.hasMany(models.Message, {
                foreignKey: { name: 'mobileId', allowNull: false }, sourceKey: 'id',
            });
        }

        toJSON() {
            return { ...this.get(), id: undefined, createdAt: undefined, updatedAt: undefined }
        }
    };
    RecipientNo.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: 'unique_uuid'
        },
        mobile: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: 'unique_mobile',
            validate: {
                isNumeric: {
                    msg: 'Only letters allow!'
                }
            }
        }
    }, {
        sequelize,
        tableName: 'recipient_no',
        modelName: 'RecipientNo',
    });
    return RecipientNo;
}