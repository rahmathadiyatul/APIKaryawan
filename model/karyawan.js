const mongoose = require('mongoose')

const KaryawanSchema = new mongoose.Schema({
    nama: String,
    gender: String,
    lahir: Date,
    universitas: String,
    skills: String
})

module.exports = mongoose.model('Karyawan', KaryawanSchema)