{ name: 'Charizard', slug: 'charizard', league: 'great', rating: 1500 }

{ name: 'Charizard', slug: 'charizard', league: 'great', rating: 1500 }

{ name: 'Charizard', slug: 'charizard', league: 'great', rating: 1750 }

{ name: 'Charizard', slug: 'charizard', league: 'great', rating: 1880 }

{ name: 'Melmetal', slug: 'melmetal', league: 'great', rating: 1500 }

{ name: 'Melmetal', slug: 'melmetal', league: 'great', rating: 1500 }

'navigating to localhost:1974/leagues/great/charizard should show:'

{
  ratingsEncountered: {
    [
      {
        rating: 1500,
        date: 5 / 24
      },
      {
        rating: 1500,
        date: 5 / 25
      },
      {
        rating: 1750,
        date: 5 / 23
      },
      {
        rating: 1880,
        date: 5 / 25
      }
    ]
  }
}