'use strict'

const db = require('../db')

module.exports = {
    tampil: (req, res) =>{
        const sql = `SELECT * FROM data_penduduk`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil",
                data: result
            })
        })
    },
    tambah: (req, res) => {
        let tambah_penduduk = {
            nama : req.body.nama,
            alamat: req.body.alamat

        }

        let sql = `INSERT INTO data_penduduk SET ? `

        db.query(sql, tambah_penduduk, (err, result) => {
            if(err){
                throw err
            }else{
                res.json({
                    message : "Data berhasil ditambahkan",
                    data : ({
                        nama : tambah_penduduk.nama,
                        alamat : tambah_penduduk.alamat,
                    })
                })
                
            }
        })
    },
    update: (req,res) => {
        const id = req.params.id
        let edit_penduduk = {
            nama : req.body.nama,
            alamat : req.body.alamat,
    
        }
        let sql = `UPDATE data_penduduk SET ? WHERE id = '${id}'`

        db.query(sql, edit_penduduk, (err, result) => {
            if(err){
                console.log(err.message)
            }else{
                res.json({
                    message : "Data Berhasil di Update",
                    data : ({
                        nama : edit_penduduk.nama,
                        alamat : edit_penduduk.alamat,
                    })
                })
            }
        })
    },
    delete: (req,res) => {
        const id = req.params.id
        let sql = `DELETE FROM data_penduduk WHERE id = '${id}'`

        db.query(sql, (err, result) => {
            if(err){
                console.log(err.message)
            }else{
                res.json({
                    message : "Data Berhasil di Hapus",
                })
            }
        })
    }

    


       
}