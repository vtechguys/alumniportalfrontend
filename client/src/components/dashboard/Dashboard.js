import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
// import WidgetBot from '@widgetbot/react-embed';

import './Dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount(this.props.auth.user.id);
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div >
            <div className='col-12' style={{margin : '25px 0px'}}>
              <div className='row profile-wrapper'>
            <div className='profile-details'>
                <div className='col-1 rounded-2'>
                  <img src={profile.user.avatar} style={{height : '80px', width : '80px', objectFit : 'cover'}}/>
                </div>

                <div className='col-6' style={{marginLeft : '40px', marginTop: '-2px'}}>
                <p style={{margin : '0px'}}>
              <Link className='profile-link' to={`/profile/${profile.handle}`} style={{fontSize : '18px'}}>@{profile.handle}</Link>
              <span style={{marginLeft : '10px'}}>{profile.verifiedAccount ? <i className="fas  fa-check-circle" style={{color : '#00B446'}}></i> : null}</span>
              </p>
              <p className="lead profile-firstname text-muted" style={{fontSize : '14px', marginLeft : '5px', marginBottom : '5px'}}>{user.name}</p>
            <div style={{margin : '0px'}}>
                {profile.skills.map((skill, index) => (
                  <span 
                  style={{
                    margin : '0px 3px'
                  }} 
                  key={index} 
                  className="badge skill-badge">

                {skill}
                </span>
                  
                ))}
                </div>
                </div>
                </div>
                  
                <ProfileActions />
              </div>
            
            </div>
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            {/* <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button> */}
             {/* <WidgetBot
              server="664732642486517761"
              channel="664732643014737939"
              shard="https://disweb.dashflo.net"
            /> */}
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg create-profile-btn">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="dashboard-heading">Dashboard</h3>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
