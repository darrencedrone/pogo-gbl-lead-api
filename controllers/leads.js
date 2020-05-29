const models = require('../models')

const getAllLeads = async (request, response) => {
  const leads = await models.Leads.findAll()

  return response.send(leads)
}

const getLeadEncountersBySlug = async (request, response) => {
  try {
    const { leagueId, slug } = request.params

    const lead = await models.Leads.findOne({
      where: { leagueId, slug },
    })

    return lead
      ? response.send(lead)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unable to find lead')
  }
}

module.exports = { getAllLeads, getLeadEncountersBySlug }