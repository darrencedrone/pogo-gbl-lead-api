const leagues = (connection, Sequelize) => {
  return connection.define('leagues', {
    slug: { type: Sequelize.STRING, primaryKey: true },
    leagueName: { type: Sequelize.STRING },
  }, {
    defaultScope: {
      attributes: { exclude: ['slug', 'updatedAt', 'deletedAt', 'createdAt'] }
    }
  }, { paranoid: true })
}

module.exports = leagues
