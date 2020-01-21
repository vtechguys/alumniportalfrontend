import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import Search from './../search/search'
import { clearCurrentProfile } from '../../actions/profileActions';

import './Navbar.css';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
    this.props.history.push('/')
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const route = this.props.history.location.pathname.split('/')[1]
    console.log(route)
    const authLinks = (
      <div className='navbar-nav col-11 justify-content-around'>
         <div className="col-5 form-inline  my-lg-1">
           {
             route === 'feed' || route === 'profiles'
             ?
              <Search route={route} />
              :
              null
           }
                 
              </div>
      <ul className="navbar-nav ml-auto">
      
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="/feed">
            Post Feed
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="/messages">
            Messages
          </Link>
        </li> */}
        
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            {/* <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px',height : '25px', marginRight: '5px',objectFit : 'cover' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '} */}
            Logout
          </a>
        </li>
      </ul>
      </div>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm sticky-top mb-4" style={{marginBottom : '5rem'}}>
        <div className="container-fluid">
          <Link className="navbar-brand" style={{display : 'flex'}} to="/">
          <img className="bpitlogo" src={require('../../img/bpitlogo.png')} />
            {/* <p>AlumniPortal</p> */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            { isAuthenticated ? <ul className="navbar-nav ">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {' '}
                  Members
                </Link>
              </li>
            </ul> : null}
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar))
