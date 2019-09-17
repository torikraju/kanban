import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import ProjectFrom from './pages/ProjectForm';


const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/addProject" exact component={ProjectFrom} />
  </Switch>
);

export default Routes;
