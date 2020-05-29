const encounters = (connection, Sequelize, Leads, Leagues) => {
  return connection.define('encounters', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    rating: { type: Sequelize.INTEGER },
    leadId: { type: Sequelize.STRING, references: { model: Leads, key: 'slug' } },
    leagueId: { type: Sequelize.STRING, references: { model: Leagues, key: 'slug' } },
  }, {
    defaultScope: {
      attributes: { exclude: ['updatedAt', 'deletedAt', 'leadId', 'leagueId'] }
    }
  }, { paranoid: true })
}

module.exports = encounters
