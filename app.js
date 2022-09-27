const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const Karyawan = require('./model/karyawan')
const app = express()

mongoose.connect('mongodb://localhost:27017/karyawan')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'KONEKSI ERROR CUY'))
db.once('open', () => {
    console.log('Database Terkoneksi')
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

//SHOW ALL
app.get('/karyawan', async (req, res) => {
    const karyawan = await Karyawan.find({})
    res.render('karyawan/index', { karyawan })
})

//CREATE
app.get('/karyawan/new', async (req, res) => {
    const karyawan = new Karyawan(req.body.karyawan)
    res.render('karyawan/new', { karyawan })
})
app.post('/karyawan', async (req, res) => {
    const karyawan = new Karyawan(req.body.karyawan)
    await karyawan.save()
    res.redirect(`/karyawan/${karyawan._id}`)
})

//READ
app.get('/karyawan/:id', async (req, res) => {
    const karyawan = await Karyawan.findById(req.params.id)
    res.render('karyawan/show', { karyawan })
})

//UPDATE
app.get('/karyawan/:id/edit', async (req, res) => {
    const karyawan = await Karyawan.findById(req.params.id)
    res.render('karyawan/edit', { karyawan })
})
app.put('/karyawan/:id', async (req, res) => {
    const { id } = req.params
    const karyawan = await Karyawan.findByIdAndUpdate(id, { ...req.body.karyawan })
    res.redirect(`/karyawan/${karyawan._id}`)
})

//DELETE
app.delete('/karyawan/:id', async (req, res) => {
    const { id } = req.params
    await Karyawan.findByIdAndDelete(id)
    res.redirect('/karyawan')
})

app.listen(3000, () => {
    console.log('I Love You Port 3000')
})