'use strict'

//Inisialisasi
const express = require("express")

//implementasi
const app = express()
app.use(express.json())

//menghubungkan ke database
const db = require('./db')
db.connect(error =>{
    if(error){
        console.log(error.message)
    }else{
        console.log("Mysql Connected")
    }
} )

app.get("/", (req, res) => { 
    res.send({
        message: "Berhasil menjalankan GET",
        data:{
            description : 
            "Endpoint ini menampilkan data"
        }
    })
});

app.use("/penduduk", require('./routes/penduduk.route'))

const port = 2000;
app.listen(port, () => {
    console.log(`App running in server ${port}`);
});