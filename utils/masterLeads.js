import fetchLeads from '../actions/leads'

export const filterMasterLeads = (list, term) => list.filter(leads => (
  leads.name.toLowerCase().includes(term.toLowerCase())
))

export const retrieveMasterLeads = async () => {
  const leads = await fetchLeads('master')

  return leads
}
