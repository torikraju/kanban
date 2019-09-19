import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import ProjectFrom from './pages/ProjectForm';
import ProjectBoard from './pages/ProjectBoard';
import AddTask from './pages/AddTask';


const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/addProject" exact component={ProjectFrom} />
    <Route path="/updateProject/:identifier" exact component={ProjectFrom} />
    <Route path="/projectBoard/:identifier" exact component={ProjectBoard} />
    <Route path="/addTask/:identifier" exact component={AddTask} />
    <Route path="/updateTask/:identifier/:sequence" exact component={AddTask} />
  </Switch>
);

export default Routes;
