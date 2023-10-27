'use strict';

const express = require('express');
const eventControll = require('../controllers/eventController');
const router = express.Router();




router.get('/Country',eventControll.verifyToken, eventControll.getAllCountries);
router.get('/Country/:id', eventControll.getCountry);
router.post('/Country', eventControll.addCountry);
router.put('/Country/:id', eventControll.updateCountry);
router.delete('/Country/:id', eventControll.deleteCountry);
router.get('/State',eventControll.verifyToken, eventControll.getAllStates)
router.post('/Login',eventControll.Login)



module.exports = {
    router
}