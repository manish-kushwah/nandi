'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SenderTag extends Model {
        toJSON() {
            return { ...this.get(), id: undefined, createdAt: undefined, updatedAt: undefined }
        }
    };
    SenderTag.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: 'unique_uuid'
        },
        tag: {
            type: DataTypes.STRING(6),
            allowNull: false,
            unique: 'unique_tag',
            validate: {
                len: {
                    args: [3, 6],
                    msg: 'Length should be 3 to 6 letters!'
                },
            }
        }
    }, {
        sequelize,
        tableName: 'sender_tag',
        modelName: 'SenderTag',
    });
    return SenderTag;
}