const { Resume } = require('../models/resume-model')
const { User } = require('../models/user-model')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')
class ResumeController {
    async create(req, res, next) {
        try{
            const { title, description, salary_min, salary_max, hit, userId } = req.body
            const exResume = await Resume.findOne({where: {userId: userId}})
            if (exResume){
                console.log('hi', exResume)
                return res.json({message: 'Резюме уже создано'})
            }
            const { image } = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const resume = await Resume.create({
                image: fileName,
                title: title,
                description: description,
                salary_min: salary_min,
                salary_max: salary_max || 0,
                hit: hit,
                userId: userId,
                createdAt: Date.now(),
                updatedAt: Date.now()
            })
            return res.json(resume)
        }catch(e){
            next()
        }
    }

    async get(req, res, next) {
        const { id } = req.params
        let data = []
        const resume = await Resume.findOne({where: {userId: id}})
        if (resume) {
            const user = await User.findOne({
                attributes: {exclude: ['id', 'password', 'is_admin', 'is_employer']},
                where: {id: resume.userId}
            })
            data = [{
                user: user,
                resume: resume
            }]
            return res.json(data)
        }
    }

    async get_all(req, res, next) {
        const resume = await Resume.findAll()
        return res.json(resume)
    }


}


module.exports = new ResumeController()