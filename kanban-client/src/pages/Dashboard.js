import React, { Component } from 'react';
import ProjectItem from '../components/Project/ProjectItem';

// eslint-disable-next-line react/prefer-stateless-function
class Dashboard extends Component {
  render() {
    return (
      <>
        <h1>Welcome to dashboard</h1>
        <ProjectItem />
      </>
    );
  }
}

export default Dashboard;
