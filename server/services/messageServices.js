const { SenderTag, RecipientNo, Message } = require('../models');

module.exports = {
    create: async (sender, mobile, text) => {
        try {
            const senderTag = await SenderTag.findOne({ where: { tag: sender } });
            if (!senderTag){
                return Promise.reject(Error('Invalid Sender!'));
            }

            const recipientNo = await RecipientNo.findOne({ where: { mobile } });
            if (!recipientNo) {
                return Promise.reject(Error('Invalid Mobile!'));
            }

            return await Message.create({ message: text, sender: senderTag.tag, mobileId: recipientNo.id});
        } catch (error) {
            return Promise.reject(Error(error.parent.sqlMessage));
        }       
    },
}