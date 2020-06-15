import axios from 'axios'

export default async (leagueSlug) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/leagues/${leagueSlug}/leads`) // eslint-disable-line no-undef

    return data
  } catch (error) {
    return []
  }
}
