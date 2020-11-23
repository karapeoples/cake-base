const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const server = express()
const auth = require('../routes/auth/restricted-middleware')
const authRouter = require('../routes/auth/auth_router')
const userRouter = require('../routes/user/user_router')
const flowerRouter = require('../routes/product/flower_router')
const companyPRRouter = require('../routes/product/companyPR_router')
const patientInfoRouter = require('../routes/product/patient_info_router')



server.use(helmet(), morgan('dev'), express.json(), cors())
server.use('/api/auth', authRouter)
server.use('/api/user',  auth,  userRouter)
server.use('/api/strain',  auth,  flowerRouter)
server.use('/api/pr',  auth,  companyPRRouter)
server.use('/api/stock',   patientInfoRouter)


server.get('/', (req, res) => {
	res.status(200).json({ Message: 'Welcome to the Tasty Cakes API' })
})


module.exports = server