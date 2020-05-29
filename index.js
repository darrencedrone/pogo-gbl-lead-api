const express = require('express')
const bodyParser = require('body-parser')
const { getAllLeagues } = require('./controllers/leagues')
const { getAllLeads, getLeadEncountersBySlug } = require('./controllers/leads')

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (request, response) => {
  return response.render('index')
})

app.get('/leagues', getAllLeagues)

app.get('/leagues/:leagueId/leads', getAllLeads)

app.get('/leagues/:leagueId/leads/:slug', getLeadEncountersBySlug)

app.all('*', (request, response) => {
  return response.sendStatus(404)
})

app.listen(1974, () => {
  console.log('Listening on 1974')
})