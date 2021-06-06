const router = require('express').Router();
const resHandler = require('../lib/ResponseHandler')
const service = require('../services/messageServices')

module.exports = (app) => {
    router.get(
        '/send',
        async (req, res) => {
            try {
                const { sender, mobile, text } = req.query;
                await service.create(sender, mobile, text);
                return resHandler.successResponse(res, 'Given message sent!');
            } catch (error) {
                return resHandler.errorResponse(res, 500, error.message);
            }
        }
    );

    app.use(
        '/v1/message',
        router
    );
};