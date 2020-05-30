const Sequelize = require('sequelize')
const models = require('../models')

const getAllLeagues = async (request, response) => {
  try {
    const leagues = await models.Leagues.findAll()

    return response.send(leagues)
  } catch (error) {
    return response.status(500).send('Unknown error finding leagues')
  }
}

module.exports = { getAllLeagues }
