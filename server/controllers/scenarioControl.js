const Scenario = require('../models/scenariosModel')



function createScenario(req, res) {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a scenario',
        })
    }

    const scenario = new Scenario(body)

    if (!scenario) {
        return res.status(400).json({ success: false, error: err })
    }

    scenario
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: scenario._id,
                message: 'Scenario created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Scenario not created!',
            })
        })
}


async function updateScenario (req, res) {
    res.send()
}
async function deleteScenario (req, res) {
    res.send()
}

async function getScenariosByUsername (req, res) {
    Scenario.find({ username: 'alandler'}, function (err, callback) {
        if (err){
            return res.status(400).json({
                error,
                success: false,
                message: 'Failed retrieval!',
            })
        }
        res.send(callback)
    });
}




module.exports = {
    createScenario,
    updateScenario,
    deleteScenario,
    getScenariosByUsername,
}