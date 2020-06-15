import Sequelize from 'sequelize'
import allConfigs from '../configs/sequelize'
import LeaguesModel from './leagues'
import LeadsModel from './leads'
import EncountersModel from './encounters'

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

export default {
  Leagues,
  Leads,
  Encounters,
  Op: Sequelize.Op,
}
