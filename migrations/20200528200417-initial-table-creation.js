'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.createTable('leagues', {
      slug: { type: Sequelize.STRING, primaryKey: true },
      leagueName: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },
    })

    await queryInterface.createTable('leads', {
      slug: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      leagueSlug: { type: Sequelize.STRING, references: { model: 'leagues', key: 'slug' }, primaryKey: true },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },
    })

    return queryInterface.createTable('encounters', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      rating: { type: Sequelize.INTEGER, allowNull: false },
      leadSlug: { type: Sequelize.STRING, references: { model: 'leads', key: 'slug' } },
      leagueSlug: { type: Sequelize.STRING, references: { model: 'leagues', key: 'slug' } },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: { type: Sequelize.DATE },
    })
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
 
      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('encounters')

    await queryInterface.dropTable('leads')

    return queryInterface.dropTable('leagues')
  }
};
