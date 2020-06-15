export default (connection, Sequelize, Leads, Leagues) => connection.define('encounters', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  rating: { type: Sequelize.INTEGER },
  leadSlug: { type: Sequelize.STRING, references: { model: Leads, key: 'slug' } },
  leagueSlug: { type: Sequelize.STRING, references: { model: Leagues, key: 'slug' } },
}, {
  defaultScope: {
    attributes: { exclude: ['updatedAt', 'deletedAt', 'leadId'] },
  },
}, { paranoid: true })
