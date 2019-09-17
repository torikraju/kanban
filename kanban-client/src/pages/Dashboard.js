import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ProjectItems from '../components/Project/ProjectItems';
import Layout from '../hoc/Layout';

// eslint-disable-next-line react/prefer-stateless-function
class Dashboard extends Component {
  render() {
    return (
      <Layout>
        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <br />
                <Link to="/addProject" className="btn btn-lg btn-info">
                  Create a Project
                </Link>
                <br />
                <hr />
                <ProjectItems />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;
