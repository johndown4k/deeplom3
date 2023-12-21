const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const resumeRouter = require('./resumeRouter')
const vacancyRouter = require('./vacancyRouter')

router.use('/user', userRouter)
router.use('/resume', resumeRouter)
router.use('/vacancy', vacancyRouter)

module.exports = router