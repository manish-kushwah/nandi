'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        static associate(models){
            Message.belongsTo(models.RecipientNo, {
                foreignKey: 'mobileId', targetKey: 'id',
                onDelete: 'CASCADE', onUpdate: 'CASCADE'
            });
        }

        toJSON() {
            return { ...this.get(), id: undefined, createdAt: undefined }
        }
    };
    Message.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: 'unique_uuid'
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sender: {
            type: DataTypes.STRING(9),
            allowNull: false,
            set(val) {
                const arr = ['AD-', 'JM-', 'VM-', 'TM-', 'BP-', 'VK-', 'VX-', 'AX-', 'AY-', 'QP-'];
                const random = Math.floor(Math.random() * arr.length);
                this.setDataValue('sender', `${arr[random]}${val}`);
            }
        }
    }, {
        sequelize,
        tableName: 'message',
        modelName: 'Message',
        updatedAt: false,
        indexes: [
            {
                unique: false,
                fields: ['sender']
            }
        ]
    });
    return Message;
}