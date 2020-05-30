const express = require('express')
const bodyParser = require('body-parser')
const { getAllLeagues } = require('./controllers/leagues')
const { getAllLeads, getLeadEncountersBySlug, saveNewEncounter } = require('./controllers/leads')
const { deleteEncounter } = require('./controllers/encounters')

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (request, response) => {
  return response.render('index')
})

app.get('/leagues', getAllLeagues)

app.get('/leagues/:leagueSlug/leads', getAllLeads)

app.get('/leagues/:leagueSlug/leads/:slug', getLeadEncountersBySlug)

app.post('/leagues/:leagueSlug/leads', bodyParser.json(), saveNewEncounter)

app.delete('/leagues/:leagueSlug/leads/:slug/:id', deleteEncounter)

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(1974, () => {
  console.log('Listening on 1974')
})