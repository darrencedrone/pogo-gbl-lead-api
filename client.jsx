import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Leagues from './pages/Leagues'
import NotFound from './pages/NotFound'
import GreatLeads from './pages/GreatLeads'
import UltraLeads from './pages/UltraLeads'
import MasterLeads from './pages/MasterLeads'

render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/leagues" component={Leagues} />
      <Route exact path="/leagues/great/leads" component={GreatLeads} />
      <Route exact path="/leagues/ultra/leads" component={UltraLeads} />
      <Route exact path="/leagues/master/leads" component={MasterLeads} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
)
