//index.js

const mongoose = require('mongoose')

const uri = "mongodb+srv://alandler:MangoDoMangoDont4@trafficscenarios.gxygq.mongodb.net/TrafficScenarios?retryWrites=true&w=majority"

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db