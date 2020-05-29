const leads = (connection, Sequelize, Leagues) => {
  return connection.define('leads', {
    slug: { type: Sequelize.STRING, primaryKey: true },
    name: { type: Sequelize.STRING },
    league: { type: Sequelize.STRING, references: { model: Leagues, key: 'slug' } },
  }, {
    defaultScope: {
      attributes: { exclude: ['updatedAt', 'deletedAt', 'createdAt', 'slug', 'league'] }
    }
  }, { paranoid: true })
}

module.exports = leads
