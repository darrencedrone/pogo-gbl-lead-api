import React from 'react'
import League from '../components/League'
import Page from '../components/Page'
import Title from '../components/Title'

export default () => (
  <Page>
    <Title />
    <League key="great" slug="great" leagueName="Great" />
    <League key="ultra" slug="ultra" leagueName="Ultra" />
    <League key="master" slug="master" leagueName="Master" />
  </Page>
)
