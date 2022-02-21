'use strict' //hanya menjalankan data di file ini saja

const express = require('express')
const pendudukController = require('../controllers/penduduk.controller')
const {checkToken} = require('../auth/token_validation')
const router =  new express.Router();


router.get("/tampil",checkToken, pendudukController.tampil)
router.post("/tambah", pendudukController.tambah)
router.put("/update/:id",pendudukController.update)
router.delete("/hapus/:id", pendudukController.delete)



module.exports = router