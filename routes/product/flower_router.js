const express = require('express')
const router = express.Router()

const Flowers = require('./flower_model.js')

//Flower Database
router.get('/flower', (req, res) => {
	Flowers.find()
		.then((flowers) => {
			if (!flowers) {
				res.status(400).json({ message: 'There are no flowers!' })
			} else {
				res.status(200).json(flowers)
			}
		})
		.catch((error) => res.status(500).json({ errorMsg: error.message, message: 'There are no flowers!' }))
})
router.get('/flower/:id', (req, res) => {
	const { id } = req.params
	Flowers.findById(id)
		.then((flowers) => {
			if (!flowers) {
				res.status(400).json({ message: `No flower with the id of ${id}` })
			} else {
				res.status(200).json(flowers)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No flower with the id of ${id}`,
			}),
		)
})

router.get('/flower/name/:name', (req, res) => {
	const {name} = req.params
	Flowers.findBy(name)
		.then((flowers) => {
			if (!flowers) {
				res.status(400).json({ message: `No flower with the name of ${name}` })
			} else {
				res.status(200).json(flowers)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No flower with the name of ${name}`,
			}),
		)
})

router.post('/flower', (req, res) => {
  Flowers.add(req.body)
    .then((flowers) => {
      res.status(201).json({ message: 'Success Flower was added to Database', info: flowers})
    })
  .catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No flower was added`,
			}),
		)
})

router.put('/flower/:id', async (req, res, next) => {
	if (!req.body) {
		return next('missing user data')
	} else {
		const updates = req.body
		const id = req.params.id
		Flowers.findById(id)
			.then((flowers) => {
				if (!flowers) {
					next(`There is no flower with the id of ${id} to update`)
				} else {
					Flowers.update(id, updates)
						.then((updatedFlower) => {
							res.status(201).json(updatedFlower)
						})
						.catch((error) => {
							res.status(500).json({ errorMsg: error.message, message: `There is no flower with the id of ${id} to update` })
						})
				}
			})
			.catch((error) => {
				res.status(500).json({
					errorMsg: error.message,
					message: `There is no flower with the id of ${id} to update`,
				})
			})
	}
})


//Current Flower Stock
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
router.get('/flower_stock/:id', (req, res) => {
	const { id } = req.params
	Flowers.findCurrentById(id)
		.then((flowers) => {
			if (!flowers) {
				res.status(400).json({ message: `No flower with the id of ${id}` })
			} else {
				res.status(200).json(flowers)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No flower with the id of ${id}`,
			}),
		)
})

router.post('/flower_stock', (req, res) => {
  const { name } = req.body

  Flowers.findBy(name)
    .then((flower) => {
      const inStock = {
    is_infused: req.body.is_infused,
    flower_id: flower.id
  }
      flower ?
        Flowers.addCurrent(inStock)
          .then((flowers) => {
            res.status(201).json({ message: 'Success Flower was added to Database', info: flowers })
          })
        : res.status(400).json({ message: 'Failure could not add to stock' })
    })
    .catch((error) =>
      res.status(500).json({
        errorMsg: error.message,
        message: `No flower was added`,
      }),
    )
    .catch((error) =>
      res.status(500).json({
        errorMsg: error.message,
        message: `No flower by that id exists`,
      }),
    )
})


router.delete('/flower_stock/:id', (req, res) => {
	const { id } = req.params
	Flowers.findCurrentById(id)
		.then((flower) => {
			flower
				? Flowers.removeCurrent(id).then((deleted) => {
						deleted ? res.status(200).json({ success: `Flower ${id} was deleted!`, info: flower }) : null
				  })
				: null
		})
		.catch((err) => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})


//In House PreRoll

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
router.get('/preRoll/:id', (req, res) => {
	const { id } = req.params
	Flowers.findpreRollById(id)
		.then((preRolls) => {
			if (!preRolls) {
				res.status(400).json({ message: `No preRoll with the id of ${id}` })
			} else {
				res.status(200).json(preRolls)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No preRoll with the id of ${id}`,
			}),
		)
})

router.post('/preRoll', (req, res) => {
	const { name } = req.body

	Flowers.findBy(name)
		.then((flower) => {
			const inStock = {
				quantity: req.body.quantity,
				is_infused: req.body.is_infused,
				flower_id: flower.id,
			}
			flower
				? Flowers.addpreRoll(inStock).then((preRolls) => {
						res.status(201).json({ message: 'Success Flower was added to Database', info: preRolls })
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
				message: `No preRoll by that id exists`,
			}),
		)
})

router.delete('/preRoll/:id', (req, res) => {
	const { id } = req.params
	Flowers.findpreRollById(id)
		.then((preRolls) => {
			preRolls
				? Flowers.removepreRoll(id).then((deleted) => {
						deleted ? res.status(200).json({ success: `The preRoll with id ${id} was deleted!`, info: preRolls }) : null
				  })
				: null
		})
		.catch((err) => {
			res.status(500).json({ error: 'You were unable to get info from the database!' })
		})
})
module.exports = router