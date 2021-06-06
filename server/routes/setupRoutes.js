const router = require('express').Router();
const resHandler = require('../lib/ResponseHandler')
const service = require('../services/setupServices')

module.exports = (app) => {
    router.get(
        '/:cmd',
        async (req, res) => {
            const cmd = req.params.cmd;
            if(cmd=='reset'){
                await service.reset();
            } else if(cmd=='alter'){
                await service.alter();
            } else if (cmd == 'drop') {
                await service.drop();
            } else {
                return resHandler.errorResponse(res, 400, `Invalid given command!`);
            }
            
            return resHandler.successResponse(res, `${cmd} successfull!`);
        }
    );

    app.use(
        '/v1/setup',
        router
    );
};