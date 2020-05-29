const Sequelize = require('sequelize')
const models = require('../models')

const getAllLeagues = async (request, response) => {
  const leagues = await models.Leagues.findAll()

  return response.send(leagues)
}

module.exports = { getAllLeagues }
