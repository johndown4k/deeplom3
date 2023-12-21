const { Vacancy } = require('../models/vacancy-model')
const { User } = require('../models/user-model')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')
class ResumeController {
    async create(req, res, next) {
        try{
       
            const { title, description, salary_min, salary_max,  userId } = req.body
            if (!title || !description || !salary_min){
                return res.json(
                    {
                        status: 228,
                        message: 'Заполните все поля'
                    }
                    )
            }
            const { image } = req.files
           
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const vacancy = await Vacancy.create({
                image: fileName || 'no-image.png',
                title: title,
                description: description,
                salary_min: salary_min,
                salary_max: salary_max || 0,
                userId: userId,
                hit: false,
                createdAt: Date.now(),
                updatedAt: Date.now()
            })
            return res.json(vacancy)
        }catch(e){
            console.log(e)
            next()
        }
    }

    async get(req, res, next) {
        const {id} = req.params
        const vacancy = await Vacancy.findOne({where: {id}})
        const user = await User.findOne({
            where: {id: vacancy.userId}, 
            attributes: {exclude: ['id', 'password', 'is_admin', 'is_employer']},
        })
        return res.json([{vacancy: vacancy, user: user}])
    }

    async get_all(req, res, next) {
        const vacancy = await Vacancy.findAll()
        return res.json(vacancy)
    }

}


module.exports = new ResumeController()