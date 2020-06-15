export default (connection, Sequelize, Leagues) => connection.define('leads', {
  slug: { type: Sequelize.STRING, primaryKey: true },
  name: { type: Sequelize.STRING },
  leagueSlug: { type: Sequelize.STRING, references: { model: Leagues, key: 'slug' } },
}, {
  defaultScope: {
    attributes: { exclude: ['updatedAt', 'deletedAt', 'createdAt'] },
  },
}, { paranoid: true })
