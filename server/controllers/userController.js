const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/user-model')

const generateJwt = async (id, first_name, last_name, is_admin, is_employer) => {
    return jwt.sign(
        {id, first_name, last_name, is_admin, is_employer}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {telephone, first_name, last_name, password, is_employer} = req.body
        if (!telephone || !password || !first_name || !last_name ) {
            return next(ApiError.badRequest('Некорректные данные'))
        }
        const candidate = await User.findOne({where: {telephone}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким номером уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({telephone, first_name, last_name, password:hashPassword})
        const token = await generateJwt(user.id, user.first_name, user.last_name, user.is_admin, user.is_employer)
        return res.json({token})
    }

    async login(req, res, next) {
        const {telephone, password} = req.body
        const user = await User.findOne({where: {telephone}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = await generateJwt(user.id, user.first_name, user.last_name, user.is_admin, user.is_employer)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = await generateJwt(req.user.id, req.user.first_name, req.user.last_name, req.user.is_admin, req.user.is_employer)
        return res.json({token})
    }

    async get_all(req, res, next) { 
        const users = await User.findAll()
        return res.json(users)
    }
}

module.exports = new UserController()