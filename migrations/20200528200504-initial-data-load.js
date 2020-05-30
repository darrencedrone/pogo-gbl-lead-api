'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    await queryInterface.bulkInsert('leagues', [
      { slug: 'great', leagueName: 'Great' },
      { slug: 'ultra', leagueName: 'Ultra' },
      { slug: 'master', leagueName: 'Master' },
    ])

    await queryInterface.bulkInsert('leads', [
      { slug: 'azumarill', name: 'Azumarill', leagueSlug: 'great' },
      { slug: 'altaria', name: 'Altaria', leagueSlug: 'great' },
      { slug: 'registeel', name: 'Registeel', leagueSlug: 'great' },
      { slug: 'victreebel', name: 'Victreebel', leagueSlug: 'great' },
      { slug: 'victreebel-shadow', name: 'Victreebel (Shadow)', leagueSlug: 'great' },
      { slug: 'stunfisk', name: 'Stunfisk', leagueSlug: 'great' },
      { slug: 'stunfisk-galarian', name: 'Stunfisk (Galarian)', leagueSlug: 'great' },
      { slug: 'raichu', name: 'Raichu', leagueSlug: 'great' },
      { slug: 'raichu-alolan', name: 'Raichu (Alolan)', leagueSlug: 'great' },
      { slug: 'swampert', name: 'Swampert', leagueSlug: 'great' },
      { slug: 'melmetal', name: 'Melmetal', leagueSlug: 'great' },
      { slug: 'giratina-altered', name: 'Giratina (Altered)', leagueSlug: 'master' },
      { slug: 'giratina-origin', name: 'Giratina (Origin)', leagueSlug: 'master' },
      { slug: 'swampert', name: 'Swampert', leagueSlug: 'master' },
      { slug: 'dialga', name: 'Dialga', leagueSlug: 'master' },
      { slug: 'palkia', name: 'Palkia', leagueSlug: 'master' },
      { slug: 'groudon', name: 'Groudon', leagueSlug: 'master' },
      { slug: 'kyogre', name: 'Kyogre', leagueSlug: 'master' },
      { slug: 'melmetal', name: 'Melmetal', leagueSlug: 'master' },
      { slug: 'giratina-altered', name: 'Giratina (Altered)', leagueSlug: 'ultra' },
      { slug: 'giratina-origin', name: 'Giratina (Origin)', leagueSlug: 'ultra' },
      { slug: 'swampert', name: 'Swampert', leagueSlug: 'ultra' },
      { slug: 'melmetal', name: 'Melmetal', leagueSlug: 'ultra' },
    ])

    return queryInterface.bulkInsert('encounters', [
      { rating: 2100, leadSlug: 'azumarill', leagueSlug: 'great' },
      { rating: 2100, leadSlug: 'azumarill', leagueSlug: 'great' },
      { rating: 2310, leadSlug: 'melmetal', leagueSlug: 'great' },
      { rating: 2220, leadSlug: 'melmetal', leagueSlug: 'master' },
      { rating: 2450, leadSlug: 'Melmetal', leagueSlug: 'ultra' },
      { rating: 1937, leadSlug: 'stunfisk-galarian', leagueSlug: 'great' },
      { rating: 2300, leadSlug: 'victreebel-shadow', leagueSlug: 'great' },
      { rating: 2610, leadSlug: 'giratina-altered', leagueSlug: 'ultra' },
      { rating: 2222, leadSlug: 'altaria', leagueSlug: 'great' },
      { rating: 2223, leadSlug: 'registeel', leagueSlug: 'great' },
      { rating: 2100, leadSlug: 'registeel', leagueSlug: 'ultra' },
      { rating: 2100, leadSlug: 'azumarill', leagueSlug: 'great' },
      { rating: 2450, leadSlug: 'dialga', leagueSlug: 'master' },
      { rating: 2840, leadSlug: 'kyogre', leagueSlug: 'master' },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.bulkDelete('encounters')

    await queryInterface.bulkDelete('leads')

    await queryInterface.bulkDelete('leagues')
  }
};
