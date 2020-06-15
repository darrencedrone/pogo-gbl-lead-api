import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Link = styled(NavLink)`
  font-size: 20px;
  margin-bottom: 10px;
  text-align: center;
`

export default ({ slug, leagueSlug, name }) => (
  <Link
    key={slug}
    to={`/leagues/${leagueSlug}/leads`}
    style={{ color: 'goldenrod' }}
    activeStyle={{ color: 'goldenrod' }}
  >
    {`${name}`}
  </Link>
)
