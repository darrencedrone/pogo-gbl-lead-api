import fetchLeagues from '../actions/leagues'

export const filterLeagues = (list, term) => list.filter(league => (
  league.slug.toLowerCase().includes(term.toLowerCase())
))

export const retrieveLeagues = async () => {
  const league = await fetchLeagues()

  return league
}
