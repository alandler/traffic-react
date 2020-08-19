//scenariosModel.js

const mongoose = require('mongoose');
const uri = "mongodb+srv://alandler:MangoDoMangoDont4@trafficscenarios.gxygq.mongodb.net/TrafficScenarios?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});


const scenarioSchema = new mongoose.Schema({
    username: String,

    sae: Number,
    percentElectric: Number,
    percentPrivate: Number,
    percentPublic: Number,
    intersections: Number,
    passengerCost: Number,

    pmt: Number,
    pti: Number,
    tti: Number,
    ghg: Number,
    avgSpeed: Number,
    standstill: Number,
},
{ timestamps: true }
);


module.exports = mongoose.model('scenarios', scenarioSchema)