const Router = require('express')
const router = new Router()

const resumeController = require('../controllers/resumeController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/create', authMiddleware, resumeController.create)
router.get('/find/:id', resumeController.get)
router.get('/findAll', resumeController.get_all)
module.exports = router