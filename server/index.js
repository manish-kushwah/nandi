'use strict';

require('dotenv').config();
const express = require('express');
const resHandler = require('./lib/ResponseHandler')
const { sequelize } = require('./models');

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => {
    return resHandler.successResponse(res, { msg: 'Server is running' });
});

require('./routes')(app);

const PORT = process.env.SPORT;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection is established');
        console.log(`Server is running on http://127.0.0.1:${PORT}/`);
    } catch (error) {
        console.error(`Unable to connect database: ${error}`);
    }
});