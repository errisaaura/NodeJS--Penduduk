'use strict' //hanya menjalankan data di file ini saja

const express = require('express')

const autoriController = require('../controllers/authorization.controller')
const router =  new express.Router();

// //ini buat login sama register
router.post("/registrasi", autoriController.registrasi)
router.post("/login", autoriController.login)





module.exports = router