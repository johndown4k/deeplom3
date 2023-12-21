const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const { User } = require('./user-model')

const Vacancy = sequelize.define('vacancy', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: { type: DataTypes.STRING, defaultValue: '/no-image.png' },
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    salary_min: { type: DataTypes.FLOAT },
    old_price_max: { type: DataTypes.FLOAT, allowNull: true },
    hit: { type: DataTypes.BOOLEAN, defaultValue: false },
})

User.hasOne(Vacancy) //Автор 
Vacancy.belongsTo(User)


module.exports = {
    Vacancy
}