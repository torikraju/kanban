import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveLink } from '../../store/actions';

class Layout extends Component {
  state = {
    links: [
      {
        name: 'Register',
        linkTo: '/register',
      },
      {
        name: 'Login',
        linkTo: '/login',
      },
    ],
  };

  render() {
    const { children, setActiveLink: setLink, activeLink } = this.props;
    const { links } = this.state;
    return (
      <>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Kanban Tool
            </Link>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className={`nav-item ${activeLink === 'dashboard' ? 'active' : null}`}>
                  <Link
                    className="nav-link"
                    to="/dashboard"
                    onClick={() => setLink('dashboard')}
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>

              <ul className="navbar-nav ml-auto">
                {links.map((el, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li className={`nav-item ${activeLink === el.name ? 'active' : null}`} key={index}>
                    <Link
                      className="nav-link "
                      to={el.linkTo}
                      onClick={() => setLink(el.name)}
                    >
                      {el.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        {children}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  activeLink: state.ui.activeLink,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveLink: (name) => dispatch(setActiveLink(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
