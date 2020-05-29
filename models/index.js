const Sequelize = require('sequelize')
const allConfigs = require('../configs/sequelize')
const LeaguesModel = require('./leagues')
const LeadsModel = require('./leads')
const EncountersModel = require('./encounters')

const environment = process.env.NODE_ENV || 'development'
const config = allConfigs[environment]

const connection = new Sequelize(config.database, config.username, config.password, {
  host: config.host, dialect: config.dialect,
})

const Leagues = LeaguesModel(connection, Sequelize)
const Leads = LeadsModel(connection, Sequelize)
const Encounters = EncountersModel(connection, Sequelize, Leads, Leagues)

Leads.hasMany(Encounters)
Encounters.belongsTo(Leads)

Leagues.hasMany(Leads)
Leads.belongsTo(Leagues)

Leagues.hasMany(Encounters)
Encounters.belongsTo(Leagues)

module.exports = {
  Leagues,
  Leads,
  Encounters,
  Op: Sequelize.Op,
}
