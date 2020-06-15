export default (connection, Sequelize) => connection.define('leagues', {
  slug: { type: Sequelize.STRING, primaryKey: true },
  leagueName: { type: Sequelize.STRING },
}, {
  defaultScope: {
    attributes: { exclude: ['updatedAt', 'deletedAt', 'createdAt'] },
  },
}, { paranoid: true })
