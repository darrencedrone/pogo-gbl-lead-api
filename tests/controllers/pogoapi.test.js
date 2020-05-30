const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const models = require('../../models')
const {
  afterEach, before, beforeEach, describe, it
} = require('mocha')
const { getAllLeagues } = require('../../controllers/leagues')
const { getAllLeads, getLeadEncountersBySlug, saveNewEncounter } = require('../../controllers/leads')
const { deleteEncounter } = require('../../controllers/encounters')
const leaguesList = require('../mocks/leagues')
const { leadsList } = require('../mocks/leads')
const { singleEncounter } = require('../mocks/encounters')

chai.use(sinonChai)
const { expect } = chai

describe('allControllers', () => {
  let sandbox
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusDotSend
  let stubbedStatus

  let stubbedLeaguesFindAll
  let stubbedLeadsFindAll
  let stubbedLeadsFindOne
  let stubbedLeadsFindOrCreate
  let stubbedEncountersFindOne
  let stubbedEncountersCreate
  let stubbedEncountersDestroy

  before(() => {
    sandbox = sinon.createSandbox()
    stubbedLeaguesFindAll = sandbox.stub(models.Leagues, 'findAll')
    stubbedLeadsFindAll = sandbox.stub(models.Leads, 'findAll')
    stubbedLeadsFindOne = sandbox.stub(models.Leads, 'findOne')
    stubbedLeadsFindOrCreate = sandbox.stub(models.Leads, 'findOrCreate')
    stubbedEncountersFindOne = sandbox.stub(models.Encounters, 'findOne')
    stubbedEncountersCreate = sandbox.stub(models.Encounters, 'create')
    stubbedEncountersDestroy = sandbox.stub(models.Encounters, 'destroy')

    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusDotSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusDotSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  describe('getAllLeagues', () => {
    it('retrieves a list of leagues from a database and calls a response.send() with the list', async () => {
      stubbedLeaguesFindAll.returns(leaguesList)

      await getAllLeagues({}, response)

      expect(stubbedLeaguesFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(leaguesList)
    })

    it('returns a 500 when the database call fails', async () => {
      stubbedLeaguesFindAll.throws('ERROR!')

      await getAllLeagues({}, response)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unknown error finding leagues')
    })
  })

  describe('getAllLeads', () => {
    it('retrieves a list of all leads from a database associated with the league and calls a response.send() with the list', async () => {
      stubbedLeadsFindAll.returns(leadsList)
      const request = { params: { leagueSlug: 'great' } }

      await getAllLeads(request, response)

      expect(stubbedLeadsFindAll).to.have.been.calledWith({
        where: { leagueSlug: 'great' },
        attributes: ['name']
      })
    })
  })

  describe('getLeadEncountersBySlug', () => {
    it('retrieves a list of all ratings a lead has encountered and calls a response.send() with the list', async () => {
      stubbedLeadsFindOne.returns(singleEncounter)
      const request = { params: { slug: 'azumarill', leagueSlug: 'great' } }

      await getLeadEncountersBySlug(request, response)

      expect(stubbedLeadsFindOne).to.have.been.calledWith({
        where: {
          [models.Op.and]: [
            { leagueSlug: 'great' },
            { slug: 'azumarill' }
          ],
        },
        attributes: ['name'],
        include: [{
          model: models.Encounters,
          where: { leagueSlug: 'great' },
          attributes: ['rating', 'createdAt']
        }]
      })
      expect(stubbedLeadsFindOne).to.have.callCount(1)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleEncounter)
    })

    it('returns a 404 when the slugs are not found', async () => {
      stubbedLeadsFindOne.returns(null)
      const request = {
        params: { slug: 'magikarp', leagueSlug: 'master' }
      }

      await getLeadEncountersBySlug(request, response)

      expect(stubbedLeadsFindOne).to.have.been.calledWith({
        where: {
          [models.Op.and]: [
            { leagueSlug: request.params.leagueSlug },
            { slug: request.params.slug }
          ],
        },
        attributes: ['name'],
        include: [{
          model: models.Encounters,
          where: { leagueSlug: 'master' },
          attributes: ['rating', 'createdAt']
        }]
      })
      expect(stubbedLeadsFindOne).to.have.callCount(1)
      expect(stubbedSendStatus).to.have.been.calledWith(404)
    })

    it('returns a 500 when the database call fails', async () => {
      stubbedLeadsFindAll.throws('ERROR!')

      await getLeadEncountersBySlug({}, response)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unknown error finding lead. Please try again.')
    })
  })

  describe('saveNewEncounter', async () => {
    it('checks to see if a slug with the associated league exists. If it does, it creates an encounter associated with the slug. If not, it makes the slug first.', async () => {
      stubbedEncountersCreate.returns(singleEncounter)
      const request = { params: { leagueSlug: 'great' }, body: { name: 'Azumarill', slug: 'azumarill', rating: 1231 } }

      await saveNewEncounter(request, response)
      expect(stubbedLeadsFindOrCreate).to.have.callCount(1)
      expect(stubbedStatusDotSend).to.have.been.calledWith(singleEncounter)
    })
    it('sends a 400 when the required parameters are not sent', async () => {
      stubbedEncountersCreate.returns(null)
      const request = { params: { leagueSlug: 'great' }, body: { slug: 'azumarill', rating: 1231 } }

      await saveNewEncounter(request, response)
      expect(stubbedLeadsFindOrCreate).to.have.callCount(0)
      expect(stubbedEncountersCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedStatusDotSend).to.have.been.calledWith('The following is required: name, slug, rating')
    })
    it('sends a 500 when the database call fails', async () => {
      stubbedLeadsFindOrCreate.throws('ERROR!')

      await saveNewEncounter({}, response)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unknown error saving lead. Please try again.')
    })
  })

  describe('deleteEncounter', async () => {
    it('deletes an existing encounter', async () => {
      stubbedEncountersFindOne.returns(singleEncounter)

      const request = { params: { id: 1 } }

      await deleteEncounter(request, response)
      expect(stubbedEncountersDestroy).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith('Successfully deleted encounter')
    })
    it('returns a 404 when no corresponding ID is found', async () => {
      stubbedLeadsFindOne.returns(null)

      const request = { params: { id: 480293 } }

      await deleteEncounter(request, response)
      expect(stubbedEncountersDestroy).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(404)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Error, no corresponding encounter ID found')
    })
    it('returns a 500 when the database call fails', async () => {
      stubbedLeadsFindOrCreate.throws('ERROR!')

      await deleteEncounter({}, response)
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusDotSend).to.have.been.calledWith('Unknown error while deleting encounter, please try again.')
    })
  })
})

