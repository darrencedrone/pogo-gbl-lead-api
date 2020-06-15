import fetchLeads from '../actions/leads'

export const filterUltraLeads = (list, term) => list.filter(leads => (
  leads.name.toLowerCase().includes(term.toLowerCase())
))

export const retrieveUltraLeads = async () => {
  const leads = await fetchLeads('ultra')

  return leads
}
