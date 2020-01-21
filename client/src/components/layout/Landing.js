import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import './Landing.css'
class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 text-center">
                <div className='row justify-content-center'>
                  <div className='col-md-12 text-center'>
                <h1 className="display-3 mb-4 ">Alumni Connector</h1>
                <p className="lead">
                  {' '}
                  Create a profile/portfolio, share posts and get help
                  from other Alumni
                </p>
                </div>
                <div className='col-12' style={{border :'0.5px solid white', marginBottom : '20px'}}></div>
                <div className='col-md-10' style={{display : 'flex', flexDirection:'row', justifyContent:'center'}}>

                <Link to="/register" className="btn btn-md mr-2 signup-btn">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-md login-btn">
                  Login
                </Link>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
