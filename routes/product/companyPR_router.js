const express = require('express')
const router = express.Router()

const PR = require('./companyPR_model.js')

//Flower Database
router.get('/companyPR', (req, res) => {
	PR.find()
		.then((prs) => {
			if (!prs) {
				res.status(400).json({ message: 'There are no pre-rolls!' })
			} else {
				res.status(200).json(prs)
			}
		})
		.catch((error) => res.status(500).json({ errorMsg: error.message, message: 'There are no pre-rolls!' }))
})
router.get('/companyPR/:id', (req, res) => {
	const { id } = req.params
	PR.findById(id)
		.then((prs) => {
			if (!prs) {
				res.status(400).json({ message: `No preRoll with the id of ${id}` })
			} else {
				res.status(200).json(prs)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No preRoll with the id of ${id}`,
			}),
		)
})

router.get('/companyPR/name/:name', (req, res) => {
	const { name } = req.params
	PR.findBy(name)
		.then((prs) => {
			if (!prs) {
				res.status(400).json({ message: `No preRoll with the name of ${name}` })
			} else {
				res.status(200).json(prs)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No preRoll with the name of ${name}`,
			}),
		)
})

router.post('/companyPR', (req, res) => {
	PR.add(req.body)
		.then((prs) => {
			res.status(201).json({ message: 'Success PreRoll was added to Database', info: prs })
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No preRoll was added`,
			}),
		)
})

router.put('/companyPR/:id', async (req, res, next) => {
	if (!req.body) {
		return next('missing data')
	} else {
		const updates = req.body
		const id = req.params.id
		PR.findById(id)
			.then((prs) => {
				if (!prs) {
					next(`There is no preRoll with the id of ${id} to update`)
				} else {
					PR.update(id, updates)
						.then((updatedPR) => {
							res.status(201).json(updatedPR)
						})
						.catch((error) => {
							res.status(500).json({ errorMsg: error.message, message: `There is no preRoll with the id of ${id} to update` })
						})
				}
			})
			.catch((error) => {
				res.status(500).json({
					errorMsg: error.message,
					message: `There is no preRoll with the id of ${id} to update`,
				})
			})
	}
})

//Current Flower Stock
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
router.get('/pr_stock/:id', (req, res) => {
	const { id } = req.params
	PR.findCurrentById(id)
		.then((prs) => {
			if (!prs) {
				res.status(400).json({ message: `No preRoll with the id of ${id}` })
			} else {
				res.status(200).json(prs)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No preRoll with the id of ${id}`,
			}),
		)
})

router.post('/pr_stock', (req, res) => {
	const { name } = req.body

	PR.findBy(name)
		.then((pr) => {
			const inStock = {
				is_infused: req.body.is_infused,
				in_stock: req.body.in_stock,
				preRoll_id: preRoll.id,
			}
			pr
				? PR.addCurrent(inStock).then((prs) => {
						res.status(201).json({ message: 'Success PreRoll was added to Database', info: prs })
				  })
				: res.status(400).json({ message: 'Failure could not add to stock' })
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No preRoll was added`,
			}),
		)
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No preRoll by that name exists`,
			}),
		)
})

router.delete('/pr_stock/:id', (req, res) => {
	const { id } = req.params
	PR.findCurrentById(id)
		.then((pr) => {
			pr
				? PR.removeCurrent(id).then((deleted) => {
						deleted ? res.status(200).json({ success: `PreRoll ${id} was deleted!`, info: pr }) : null
				  })
				: null
		})
		.catch((err) => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})

module.exports = router