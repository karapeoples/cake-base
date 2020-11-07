const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const server = express()
const auth = require('../routes/auth/restricted-middleware')
const authRouter = require('../routes/auth/auth_router')
const userRouter = require('../routes/user/user_router')




server.use(helmet(), morgan('dev'), express.json(), cors())
server.use('/api/auth', authRouter)
server.use('/api/user', userRouter)


server.get('/', (req, res) => {
	res.status(200).json({ Message: 'Welcome to the Tasty Cakes API' })
})


module.exports = server