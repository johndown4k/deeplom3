const Router = require('express')
const router = new Router()

const vacancyController = require('../controllers/vacancyController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, vacancyController.create)
router.get('/find/:id', vacancyController.get)
router.get('/findAll', vacancyController.get_all)
module.exports = router