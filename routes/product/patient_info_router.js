const express = require('express')
const router = express.Router()

const Flowers = require('./flower_model.js')
const PR = require('./companyPR_model.js')


router.get('/flower_stock', (req, res) => {
	Flowers.findCurrent()
		.then((flowers) => {
			if (!flowers) {
				res.status(400).json({ message: 'There are no flowers!' })
			} else {
				res.status(200).json(flowers)
			}
		})
		.catch((error) => res.status(500).json({ errorMsg: error.message, message: 'There are no flowers!' }))
})

router.get('/preRoll', (req, res) => {
	Flowers.findpreRoll()
		.then((preRolls) => {
			if (!preRolls) {
				res.status(400).json({ message: 'There are no preRolls!' })
			} else {
				res.status(200).json(preRolls)
			}
		})
		.catch((error) => res.status(500).json({ errorMsg: error.message, message: 'There are no preRolls!' }))
})

router.get('/pr_stock', (req, res) => {
	PR.findCurrent()
		.then((prs) => {
			if (!prs) {
				res.status(400).json({ message: 'There are no preRolls!' })
			} else {
				res.status(200).json(prs)
			}
		})
		.catch((error) => res.status(500).json({ errorMsg: error.message, message: 'There are no preRolls!' }))
})

module.exports = router