//scenarioRouter

const express = require('express')

const ScenarioControl = require('../controllers/scenarioControl')

const router = express.Router()

router.post('/create', ScenarioControl.createScenario)
router.put('/update/:id', ScenarioControl.updateScenario)
router.delete('/delete/:id', ScenarioControl.deleteScenario)
router.get('/get/:user', ScenarioControl.getScenariosByUsername)

module.exports = router