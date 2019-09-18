import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import ProjectItems from '../components/Project/ProjectItems';
import Layout from '../hoc/Layout';
import { removeProject } from '../store/actions';


class Dashboard extends Component {
  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.removeProject();
  }

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

const mapDispatchToProps = (dispatch) => ({
  removeProject: (data) => dispatch(removeProject(data)),
});

export default connect(null, mapDispatchToProps)(Dashboard);
