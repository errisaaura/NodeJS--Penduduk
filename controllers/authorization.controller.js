'use strict'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require ("../db")

const secret = '#$@^%#^@%#$%&^'

function hashPassword (password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    tampil: (req,res) => {
        const sql = `SELECT * FROM pengguna`
        db.query(sql, (err, result) =>{
            if(err) throw err
            res.json({
                message: "Berhasil",
                data: result
            })
        })
    },
    registrasi: (req,res) => {
        
        const nama = req.body.nama
        const email = req.body.email
        const password = req.body.password
        

        if(  !nama , !email || !password ){
            res.status(402).json({
                message : 'nama , email dan password harus diisi!'
            })
        }else{
            return db.query(`INSERT INTO pengguna SET ? `, {nama, email, password: hashPassword(password)}, (err, result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    return res.json ({
                        message : 'Registrasi berhasil',
                        data : result
                    })
                }
            })
        }
    },

    login: (req,res) => {
        
        const email = req.body.email
        const password = req.body.password
        

        if(!email || !password){
            res.status(402).json({ message : 'Email dan Password harus diisi'})
        }else{
            return db.query (`SELECT * FROM pengguna WHERE email = ? `, email, (err, result ) => {
                if(err) return res.status(500).json({err})

                const user = result[0]
                if(typeof user === 'undefined') return res.status(401).json({message : 'user tidak ditemukan'})
                if(!bcrypt.compareSync(password, user.password)) return res.status(401).json({message : 'email atau password tidak sesuai'})
                
                const token = jwt.sign({data : user}, secret) //ini mendaptkan token untuk autentifikasi dpt dari jwt user. Habis itu dimasukkan kalau setiap user dpt token secara secret
                return res.json({message : 'Login berhasi, silahkan mengisi token dibawah ini untuk mengakses endpoint private lain', token})
            }) 
        }
    }
}