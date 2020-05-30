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

Leads.hasMany(Encounters, { foreignKey: 'leadSlug' })
Encounters.belongsTo(Leads, { foreignKey: 'leadSlug' })

Leagues.hasMany(Leads, { foreignKey: 'leagueSlug' })
Leads.belongsTo(Leagues, { foreignKey: 'leagueSlug' })

Leagues.hasMany(Encounters, { foreignKey: 'leagueSlug' })
Encounters.belongsTo(Leagues, { foreignKey: 'leagueSlug' })

module.exports = {
  Leagues,
  Leads,
  Encounters,
  Op: Sequelize.Op,
}
