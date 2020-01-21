import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import Spinner from '../common/Spinner';
import { getProfileByHandle, verifyProfileHandle, assignRoleHandle } from '../../actions/profileActions';
import config from '../../config';

const ROLES_THAT_ARE_ALLOWED_TO_VERIFY_AND_ASSIGN_ROLES = ['superadmin'];

class Profile extends Component {

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  renderProfileForHigherRole = ()=>{

    const { profile, loading, profileActionLoading } = this.props.profile;
    const { user } = this.props.auth;
    return (
      <div>
          <div className="row">
            <div className="col-md-12">
              <div className='row'>
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
              {
                profileActionLoading ? 
                <div style={{
                  position: 'absolute', backgroundColor: 'grey', width: '100%', height: '100%'
                  }}
                >

                </div>
                : null
              }

              {
                user && ROLES_THAT_ARE_ALLOWED_TO_VERIFY_AND_ASSIGN_ROLES.includes(user.role) && profile ?
                  <React.Fragment >
                    <div style={{margin : '0px 30px'}} >
                    {
                      
                        <button className='btn btn-primary mb-3' onClick={()=>{
                          const status = profile.verifiedAccount;
                          return this.props.verifyProfileHandle(!status, profile.user)
                          }}
                        >
                          {profile.verifiedAccount ? 'unverify': 'verify'}
                        </button>
                    

                    }
                    </div>
                    <div style={{}}>
                      {/* <br/> */}
                      {
                        <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Assign Role
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          {
                            config.VALID_ASSIGN_ROLE.map((role)=>{
                              const bg = profile.user.role === role ? '#00b446': '##E3003F';
                                 return ( <button className='dropdown-item'
                                    key = {role} 
                                    onClick={ ()=>(this.props.assignRoleHandle(role, profile.user))}
                                    style={{
                                      backgroundColor: bg
                                    }}
                                  >
                                    {role}
                                  </button> )
                           
                                  })
                          }
                        </div>
                      </div>
                        
                      }
                    </div>
                  </React.Fragment>
                : null
              }
              </div>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          {/* <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          /> */}
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
        </div>
    )
    
  }

  renderProfileForNormalRole = ()=>{

    const { profile, loading, profileActionLoading } = this.props.profile;
    const { user } = this.props.auth;

    return(
      <div>
          <div className="row">
            <div className="col-md-12">
              <div className='row'>
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
              {
                profileActionLoading ? 
                <div style={{
                  position: 'absolute', backgroundColor: 'grey', width: '100%', height: '100%'
                  }}
                >

                </div>
                : null
              }
              </div>
            </div>
            <div className="col-md-6" />
          </div>
          <div className='row'>
          <ProfileHeader profile={profile} 
              education={profile.education}
              experience={profile.experience} />
          {/* <ProfileAbout profile={profile} /> */}
          {/* <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          /> */}
          {profile.githubusername ? (
            <ProfileGithub username={profile.githubusername} />
          ) : null}
          </div>
        </div>
    )
  }

  render() {
    const { profile, loading, profileActionLoading } = this.props.profile;
    const { user } = this.props.auth;
    let profileContent;
    console.log('profile_updated_now',profile);



    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      
      if(ROLES_THAT_ARE_ALLOWED_TO_VERIFY_AND_ASSIGN_ROLES.indexOf(user.role) > -1){
        profileContent = this.renderProfileForHigherRole()
      }else{
        profileContent = this.renderProfileForNormalRole()
      }

    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileByHandle, verifyProfileHandle, assignRoleHandle })(Profile);
