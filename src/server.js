//server.js
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;



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
    time: Date,

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
});

scenarioSchema.methods.displaySAE = function () {
    const message = this.sae
      ? "SAE level: " + this.sae
      : "I don't have a SAE level";
    console.log(message);
  }

const Scenario = mongoose.model('Scenario', scenarioSchema)

const demoScenario = new Scenario({ username: "alandler", time: dateTime, sae: 4, percentElectric: 90, percentPrivate: 40, percentPublic: 25, intersections: 25, passengerCost: 3, pmt: 7, pti: 9, tti: 3, pti: 6, ghg: 6, avgSpeed: 7, standstill: 100 })
demoScenario.displaySAE()

demoScenario.save(function (err, demoScenario) {
    if (err) return console.error(err);
    demoScenario.displaySAE()
});

Scenario.find(function (err, scenarios) {
    if (err) return console.error(err);
    console.log(scenarios);
  })


Scenario.find({ username: 'alandler'}, function (err, docs) {
    console.log(docs)
});
