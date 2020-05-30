const models = require('../models')

const deleteEncounter = async (request, response) => {
  try {
    const { id } = request.params

    const encounter = await models.Encounters.findOne({ where: { id } })

    if (!encounter) return response.status(404).send('Error, no corresponding encounter ID found')

    await models.Encounters.destroy({ where: { id } })

    return response.send('Successfully deleted encounter')
  } catch (error) {
    return response.status(500).send('Unknown error while deleting encounter, please try again.')
  }
}

module.exports = { deleteEncounter }
