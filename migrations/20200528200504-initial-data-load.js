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
      { slug: 'azumarill', name: 'Azumarill', league: 'great' },
      { slug: 'altaria', name: 'Altaria', league: 'great' },
      { slug: 'registeel', name: 'Registeel', league: 'great' },
      { slug: 'victreebel', name: 'Victreebel', league: 'great' },
      { slug: 'victreebel-shadow', name: 'Victreebel (Shadow)', league: 'great' },
      { slug: 'stunfisk', name: 'Stunfisk', league: 'great' },
      { slug: 'stunfisk-galarian', name: 'Stunfisk (Galarian)', league: 'great' },
      { slug: 'raichu', name: 'Raichu', league: 'great' },
      { slug: 'raichu-alolan', name: 'Raichu (Alolan)', league: 'great' },
      { slug: 'swampert', name: 'Swampert', league: 'great' },
      { slug: 'melmetal', name: 'Melmetal', league: 'great' },
      { slug: 'giratina-altered', name: 'Giratina (Altered)', league: 'master' },
      { slug: 'giratina-origin', name: 'Giratina (Origin)', league: 'master' },
      { slug: 'swampert', name: 'Swampert', league: 'master' },
      { slug: 'dialga', name: 'Dialga', league: 'master' },
      { slug: 'palkia', name: 'Palkia', league: 'master' },
      { slug: 'groudon', name: 'Groudon', league: 'master' },
      { slug: 'kyogre', name: 'Kyogre', league: 'master' },
      { slug: 'melmetal', name: 'Melmetal', league: 'master' },
      { slug: 'giratina-altered', name: 'Giratina (Altered)', league: 'ultra' },
      { slug: 'giratina-origin', name: 'Giratina (Origin)', league: 'ultra' },
      { slug: 'swampert', name: 'Swampert', league: 'ultra' },
      { slug: 'melmetal', name: 'Melmetal', league: 'ultra' },
    ])

    return queryInterface.bulkInsert('encounters', [
      { rating: 2100, leadId: 'azumarill', leagueId: 'great' },
      { rating: 2100, leadId: 'azumarill', leagueId: 'great' },
      { rating: 2310, leadId: 'melmetal', leagueId: 'great' },
      { rating: 2220, leadId: 'melmetal', leagueId: 'master' },
      { rating: 2450, leadId: 'Melmetal', leagueId: 'ultra' },
      { rating: 1937, leadId: 'stunfisk-galarian', leagueId: 'great' },
      { rating: 2300, leadId: 'victreebel-shadow', leagueId: 'great' },
      { rating: 2610, leadId: 'giratina-altered', leagueId: 'ultra' },
      { rating: 2222, leadId: 'altaria', leagueId: 'great' },
      { rating: 2223, leadId: 'registeel', leagueId: 'great' },
      { rating: 2100, leadId: 'registeel', leagueId: 'ultra' },
      { rating: 2100, leadId: 'azumarill', leagueId: 'great' },
      { rating: 2450, leadId: 'dialga', leagueId: 'master' },
      { rating: 2840, leadId: 'kyogre', leagueId: 'master' },
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
