import fetchLeads from '../actions/leads'

export const filterGreatLeads = (list, term) => list.filter(leads => (
  leads.name.toLowerCase().includes(term.toLowerCase())
))

export const retrieveGreatLeads = async () => {
  const leads = await fetchLeads('great')

  return leads
}
