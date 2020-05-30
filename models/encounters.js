const encounters = (connection, Sequelize, Leads, Leagues) => {
  return connection.define('encounters', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    rating: { type: Sequelize.INTEGER },
    leadSlug: { type: Sequelize.STRING, references: { model: Leads, key: 'slug' } },
    leagueSlug: { type: Sequelize.STRING, references: { model: Leagues, key: 'slug' } },
  }, {
    defaultScope: {
      attributes: { exclude: ['updatedAt', 'deletedAt', 'leadId', 'leagueId'] }
    }
  }, { paranoid: true })
}

module.exports = encounters
