import React, { useEffect, useState } from 'react'
import Leads from '../components/Leads'
import Page from '../components/Page'
import Title from '../components/Title'
import Search from '../components/Search'
import GoBack from '../components/GoBack'
import { filterGreatLeads, retrieveGreatLeads } from '../utils/greatLeads'

export default () => {
  const [leadsList, setLeadsList] = useState([])
  const [filteredLeadsList, setFilteredLeadsList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function pullData() {
      const leads = await retrieveGreatLeads()

      setLeadsList(leads)
      setFilteredLeadsList(leads)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterGreatLeads(leadsList, searchTerm)

    setFilteredLeadsList(filtered)
  }, [searchTerm])

  return (
    <Page>
      <Title />
      <GoBack />
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredLeadsList.map(lead => (
          <Leads
            key={lead.slug}
            slug={lead.slug}
            leagueSlug="great"
            name={lead.name}
          />
        ))
      }
    </Page>
  )
}
