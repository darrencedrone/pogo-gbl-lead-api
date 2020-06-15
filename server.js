import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { getAllLeagues } from './controllers/leagues'
import { getAllLeads, getLeadEncountersBySlug, saveNewEncounter } from './controllers/leads'
import { deleteEncounter } from './controllers/encounters'

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/api', (request, response) => {
  return response.render('index')
})

app.get('/api/leagues', getAllLeagues)

app.get('/api/leagues/:leagueSlug/leads', getAllLeads)

app.get('/api/leagues/:leagueSlug/leads/:slug', getLeadEncountersBySlug)

app.post('/api/leagues/:leagueSlug/leads', bodyParser.json(), saveNewEncounter)

app.delete('/api/leagues/:leagueSlug/leads/:slug/:id', deleteEncounter)

app.all('*', (request, response) => response.sendFile(path.resolve(__dirname, 'public', 'index.html')))

app.listen(1974, () => {
  console.log('Listening on 1974') // eslint-disable-line no-console
})
