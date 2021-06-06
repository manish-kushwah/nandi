const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const resHandler = require('../lib/ResponseHandler')
const service = require('../services/recipientNoServices')

const mobileValidation = check("mobile")
    .not().isEmpty().withMessage("MobileNo. can't be empty!")
    .isNumeric().withMessage("Only numeric allow!")
    .trim().escape()
    .isMobilePhone().withMessage("Invaid given mobileNo!")
    .custom(value => {
        return service.isExists(value).then(user => {
            if (user) {
                return Promise.reject('MobileNo. already in use!');
            }
        });
    });

module.exports = (app) => {
    router.get(
        '/',
        async (_, res) => {
            try {
                const mobileNos = await service.getAll();
                return resHandler.successResponse(res, mobileNos);
            } catch (error) {
                return resHandler.errorResponse(res, 500, error.parent.sqlMessage);
            }
        }
    );

    router.post(
        '/',
        mobileValidation,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resHandler.errorResponse(res, 400, errors.mapped().mobile.msg);
            }

            try {
                const { mobile } = req.body;
                const mobileNo = await service.create(mobile);
                return resHandler.successResponse(res, mobileNo);
            } catch (error) {
                return resHandler.errorResponse(res, 500, error.parent.sqlMessage);
            }
        }
    );

    router.put(
        '/:uuid',
        mobileValidation,
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return resHandler.errorResponse(res, 400, errors.mapped().mobile.msg);
            }

            try {
                const { uuid } = req.params;
                const { mobile } = req.body;
                const count = await service.update(uuid, mobile);
                if (count[0] < 1) {
                    return resHandler.errorResponse(res, 400, 'Invaid given id for update mobileNo!');
                }
                return resHandler.successResponse(res, { uuid, mobile });
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
                return resHandler.errorResponse(res, 400, errors.mapped().mobile.msg);
            }

            try {
                const { uuid } = req.params;
                const count = await service.delete(uuid);
                if (count < 1) {
                    return resHandler.errorResponse(res, 400, 'Invaid given id for delete MobileNo!');
                }
                return resHandler.successResponse(res, { uuid, msg: 'MobileNo. deleted!' });
            } catch (error) {
                return resHandler.errorResponse(res, 500, error.parent.sqlMessage);
            }
        }
    );

    app.use(
        '/v1/recipient-no',
        router
    );
};