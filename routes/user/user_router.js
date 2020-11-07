const express = require('express')
const router = express.Router()

const User = require('./user_model.js')

// all users
router.get('/all_user/:id', (req, res) => {
 const { id } = req.params
	User.findUserById(id)
		.then((user) => {
			if (!user) {
				res.status(400).json({ message: `No user with the id of ${id}` })
			} else {
				res.status(200).json(user)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No user with the id of ${id}`,
			}),
		)
})

router.put('/all_user/:id', async (req, res, next) => {
	if (!req.body) {
		return next('missing user data')
	} else {
		const updates = req.body
		const id = req.params.id
		User.findUserById(id)
			.then((clerks) => {
				if (!clerks) {
					next(`There is no user with the id of ${id} to update`)
				} else {
					User.updateUser(id, updates)
						.then((updatedClerk) => {
							res.status(201).json(updatedClerk)
						})
						.catch((error) => {
							res.status(500).json({ errorMsg: error.message,  message: `There is no user with the id of ${id} to update` })
						})
				}
			})
			.catch((error) => {
				res.status(500).json({
					errorMsg: error.message,
					message: `There is no user with the id of ${id} to update`,
				})
			})
	}
})
//clerk

router.get('/clerk', (req, res) => {
	User.findClerk()
		.then((clerks) => {
			if (!clerks) {
				res.status(400).json({ message: 'There are no clerks!' })
			} else {
				res.status(200).json(clerks)
			}
		})
		.catch((error) => res.status(500).json({ errorMsg: error.message, message: 'There are no clerks!' }))
})

router.get("/clerk/:id", (req, res) => {
  const { id } = req.params;
  User.findClerkById(id)
    .then(clerks => {
      if (!clerks) {
        res.status(400).json({message:`No clerk with the id of ${id}`});
      } else {
        res.status(200).json(clerks);
      }
    })
    .catch(error =>
      res
        .status(500)
        .json({
          errorMsg: error.message,
          message: `No clerks with the id of ${id}`
        })
    );
});



//patient
router.get('/patient', (req, res) => {
	User.findPatient()
		.then((patients) => {
			if (!patients) {
				res.status(400).json({ message: 'There are no patients!' })
			} else {
				res.status(200).json(patients)
			}
		})
		.catch((error) => res.status(500).json({ errorMsg: error.message, message: 'There are no patients!' }))
})

router.get('/patient/:id', (req, res) => {
	const { id } = req.params
	User.findPatientById(id)
		.then((patients) => {
			if (!patients) {
				res.status(400).json({ message: `No patients with the id of ${id}` })
			} else {
				res.status(200).json(patients)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No patient with the id of ${id}`,
			}),
		)
})

router.get('/card/:id', (req, res) => {
	const { id } = req.params
	User.findPatientCardByPatientId(id)
		.then((patients) => {
			if (!patients) {
				res.status(400).json({ message: `No patient with the id of ${id}` })
			} else {
				res.status(200).json(patients)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No patient with the id of ${id}`,
			}),
		)
})

router.put('/card/:id', async (req, res, next) => {
	if (!req.body) {
		return next('missing user data')
	} else {
		const updates = req.body
		const id = req.params.id
		User.findPatientCardByPatientId(id)
			.then((card) => {
				if (!card) {
					next(`There is no user with the id of ${id} to update`)
				} else {
					User.updateCard(id, updates)
						.then((updatedClerk) => {
							res.status(201).json(updatedClerk)
						})
						.catch((error) => {
							res.status(500).json({ errorMsg: error.message, message: `There is no user with the id of ${id} to update` })
						})
				}
			})
			.catch((error) => {
				res.status(500).json({
					errorMsg: error.message,
					message: `There is no user with the id of ${id} to update`,
				})
			})
	}
})

//admin

router.get('/admin', (req, res) => {
	User.findAdmin()
		.then((admins) => {
			if (!admins) {
				res.status(400).json({ message: 'There are no admins!' })
			} else {
				res.status(200).json(admins)
			}
		})
		.catch((error) => res.status(500).json({ errorMsg: error.message, message: 'There are no admins!' }))
})


router.get('/admin/:id', (req, res) => {
	const { id } = req.params
	User.findAdminById(id)
		.then((admins) => {
			if (!admins) {
				res.status(400).json({ message: `No admins with the id of ${id}` })
			} else {
				res.status(200).json(admins)
			}
		})
		.catch((error) =>
			res.status(500).json({
				errorMsg: error.message,
				message: `No admins with the id of ${id}`,
			}),
		)
})









module.exports = router