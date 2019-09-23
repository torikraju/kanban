import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../hoc/Layout';


class Landing extends Component {
  render() {
    return (
      <Layout>
        <div className="landing">
          <div className="light-overlay landing-inner text-dark">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Personal Kanban Tool</h1>
                  <p className="lead">Create your account to join active projects or start you own</p>
                  <hr />
                  <a href="register.html" className="btn btn-lg btn-primary mr-2">Sign Up</a>
                  <a href="login.html" className="btn btn-lg btn-secondary mr-2">Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}


export default Landing;
