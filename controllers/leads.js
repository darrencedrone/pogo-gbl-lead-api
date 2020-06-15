import models from '../models'

export const getAllLeads = async (request, response) => {
  const { leagueSlug } = request.params

  const leads = await models.Leads.findAll({
    where: { leagueSlug },
    attributes: ['name', 'slug']
  })

  return response.send(leads)
}

export const getLeadEncountersBySlug = async (request, response) => {
  try {
    const { leagueSlug, slug } = request.params

    const lead = await models.Leads.findOne({
      where: {
        [models.Op.and]: [
          { leagueSlug },
          { slug }
        ],
      },
      attributes: ['name', 'slug'],
      include: [{
        model: models.Encounters,
        where: { leagueSlug },
        attributes: ['rating', 'createdAt']
      }]
    })

    return lead
      ? response.status(201).send(lead)
      : response.sendStatus(404)
  } catch (error) {
    return response.status(500).send('Unknown error finding lead. Please try again.')
  }
}

export const saveNewEncounter = async (request, response) => {
  try {
    const { leagueSlug } = request.params
    const { name, slug, rating } = request.body

    if (!name || !slug || !rating) {
      return response.status(400).send('The following is required: name, slug, rating')
    }

    await models.Leads.findOrCreate({
      where: { slug, },
      defaults: { name, leagueSlug },
    })

    const encounter = await models.Encounters.create({
      rating, leagueSlug, leadSlug: slug
    })

    return response.status(201).send(encounter)
  } catch (error) {
    return response.status(500).send('Unknown error saving lead. Please try again.')
  }
}
