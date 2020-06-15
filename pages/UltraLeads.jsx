import React, { useEffect, useState } from 'react'
import Leads from '../components/Leads'
import Page from '../components/Page'
import Title from '../components/Title'
import Search from '../components/Search'
import GoBack from '../components/GoBack'
import { filterUltraLeads, retrieveUltraLeads } from '../utils/ultraLeads'

export default () => {
  const [leadsList, setLeadsList] = useState([])
  const [filteredLeadsList, setFilteredLeadsList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function pullData() {
      const leads = await retrieveUltraLeads()

      setLeadsList(leads)
      setFilteredLeadsList(leads)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterUltraLeads(leadsList, searchTerm)

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
            leagueSlug="ultra"
            name={lead.name}
          />
        ))
      }
    </Page>
  )
}
