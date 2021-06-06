const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const resHandler = require('../lib/ResponseHandler')
const service = require('../services/senderTagServices')

const tagValidation = check("tag")
    .not().isEmpty().withMessage("Sender tag can't be empty!")
    .isLength({ min: 3, max: 6 }).withMessage("Sender tag length should be in 3 to 6 letters!")
    .trim().escape().toUpperCase()
    .custom(value => {
        return service.isExists(value).then(user => {
            if (user) {
                return Promise.reject('Sender tag already in use!');
            }
        });
    });

module.exports = (app) => {
    router.get(
        '/',
        async (_, res) => {
            try {
                const senderTags = await service.getAll();
                return resHandler.successResponse(res, senderTags);
            } catch (error) {
                return resHandler.errorResponse(res, 500, error.parent.sqlMessage);
            }
        }
    );

    router.post(
        '/',
        tagValidation,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resHandler.errorResponse(res, 400, errors.mapped().tag.msg);
            }

            try {
                const { tag } = req.body;
                const senderTag = await service.create(tag);
                return resHandler.successResponse(res, senderTag);
            } catch (error) {
                return resHandler.errorResponse(res, 500, error.parent.sqlMessage);
            }
        }
    );

    router.put(
        '/:uuid',
        tagValidation,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resHandler.errorResponse(res, 400, errors.mapped().tag.msg);
            }

            try {
                const { uuid } = req.params;
                const { tag } = req.body;
                const count = await service.update(uuid, tag);
                if (count[0] < 1) {
                    return resHandler.errorResponse(res, 400, 'Invaid given id for update sender tag!');
                }
                return resHandler.successResponse(res, {uuid, tag});
            } catch (error) {
                return resHandler.errorResponse(res, 500, error.parent.sqlMessage);
            }
        }
    );

    router.delete(
        '/:uuid',
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resHandler.errorResponse(res, 400, errors.mapped().tag.msg);
            }

            try {
                const { uuid } = req.params;
                const count = await service.delete(uuid);
                if (count<1){
                    return resHandler.errorResponse(res, 400, 'Invaid given id for delete sender tag!');
                }
                return resHandler.successResponse(res, {uuid, msg: 'Sender tag deleted!'});
            } catch (error) {
                return resHandler.errorResponse(res, 500, error.parent.sqlMessage);
            }
        }
    );

    app.use(
        '/v1/sender-tag',
        router
    );
};