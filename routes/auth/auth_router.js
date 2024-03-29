const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const { jwtSecret } = require('./config/secret')
const regUser = require('./auth_model')

const generateToken = (user) => {
	const payload = {
    user_id: user.id,
    username: user.email,
    role: user.role
	}

	const options = {
		expiresIn: '1d',
	}
	return jwt.sign(payload, jwtSecret, options)
}



router.post('/register', async (req, res, next) => {
	const { email, password, phone, fullName, role} = req.body
	const rounds = process.env.BCRYPT_ROUNDS
  const hash = bcrypt.hashSync(password, rounds)
	const userObject = {
		fullName,
		email,
		phone,
		role,
		password: hash
	}
	try {
		// add new user to the db
		let newUser = await regUser.addUser(userObject)
		// create variables to save new user info for response
		let roleInfo = {}
		let userRole = {}
		let newUserId = newUser.id
		// check new users role - add additional info for volunteers
		switch (newUser.role) {
			case 'patient':
				roleInfo = {
					user_id: newUserId,
					card: req.body.card
				}
				userRole = await regUser.addPatient(roleInfo)
				break
			case 'admin':
				// add user_id to respective role table for foreign key requirement
				roleInfo = { user_id: newUserId}
				userRole = await regUser.addAdmin(roleInfo)
				break
			case 'clerk':
				roleInfo = { user_id: newUserId}
				userRole = await regUser.addClerk(roleInfo)
				break
			default:
				next('auth router did not find a valid user type')
    }
		token = generateToken(userObject)
		res.status(201).json({ createdUser: newUser, roleId: userRole, token: token})
	} catch (error) {
		res.status(500).json({ errorMsg: error.message, message: 'Was not able to register user' })
	}
})

router.post('/login', async (req, res) => {
	if (!req.body || !req.body.password || !req.body.email) {
		next('A valid email and password are required.')
	} else {
		let { email, password } = req.body

		try {
			// find user by email
			const user = await regUser.findBy({ email })

			if (user && bcrypt.compareSync(password, user.password)) {
				const roleInfo = await regUser.findTypeById(user.id, user.role)
				const token = generateToken(user)
				res.status(200).json({ user: user, roleInfo: roleInfo, token: token })
			} else {
				res.status(401).json({ message: 'Invalid Login Credentials' })
			}
		} catch (error) {
			res.status(500).json({ errorMsg: error.message, message: 'Was not able to login user' })
		}
	}
})



module.exports = router
