import Sequelize from 'sequelize'
import models from '../models'

// eslint-disable-next-line import/prefer-default-export
export const getAllLeagues = async (request, response) => {
  try {
    const leagues = await models.Leagues.findAll()

    return response.send(leagues)
  } catch (error) {
    return response.status(500).send('Unknown error finding leagues')
  }
}
