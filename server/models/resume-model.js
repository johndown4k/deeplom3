const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const { User } = require('./user-model')

const Resume = sequelize.define('resume', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, defaultValue: '/no-image.png' },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT('long') },
    salary_min: { type: DataTypes.FLOAT },
    salary_max: { type: DataTypes.FLOAT, allowNull: true },
    hit: { type: DataTypes.BOOLEAN, defaultValue: false },
})

User.hasOne(Resume) //Автор 
Resume.belongsTo(User)

module.exports = {
    Resume
}