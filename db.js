const mysql = require("mysql")

//Koneksi
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Data_Penduduk"
}) 

module.exports = db;