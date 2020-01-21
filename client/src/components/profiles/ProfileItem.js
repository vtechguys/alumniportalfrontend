import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

import './ProfileItem.css'

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card card-body bg-light mb-3 profile-item" style={{padding : '10px 25px'}}>
        <div className="row" style={{padding : ''}}>
          <div className="col-1" style={{padding : '0px'}}>
            <img src={profile.user.avatar} alt="" className="rounded-circle" style={{height : '90px', width : '', objectFit :'cover'}} />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            {/* <div className='row'> */}
              <div>
              <Link to={`/profile/${profile.handle}`} >@{profile.handle}</Link>
                <span style={{marginLeft : '10px'}}>{profile.verifiedAccount ? <i class="fas  fa-check-circle" style={{color : '#00B446'}}></i> : null}</span>
              </div>
              <div style={{
                marginTop : '-5px'
              }}>
          <small>
              {profile.status}{' '}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </small>
          </div>
          <div style={{
            marginTop : '10px'
          }}>
            {profile.skills.slice(0, 4).map((skill, index) => (
                  <span 
                  style={{
                    margin : '0px 3px',
                    padding : '3px',
                    background : '#2f3094'
                  }} 
                  key={index} 
                  className="badge badge-primary">

                {skill}
                </span>
                  
                ))}
          </div>

            {/* </div> */}
            
            
            {/* <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p> */}
            {/* <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link> */}
          </div>
          
          <div className="col-md-4 d-none d-md-block">
           
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
