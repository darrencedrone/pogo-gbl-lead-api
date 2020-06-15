import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const League = styled.div`
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`

export default ({ slug, leagueName }) => (
  <League
    key={slug}
  >
    <NavLink
      to={`/leagues/${slug}/leads`}
      style={{ color: 'goldenrod' }}
      activeStyle={{ color: 'goldenrod' }}
    >
      {`${leagueName} League`}
    </NavLink>
  </League>
)
