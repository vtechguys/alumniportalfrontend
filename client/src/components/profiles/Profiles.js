import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';
import { uploadDocumentRequest } from '../../actions/uploadFile';
import axios from 'axios';

import './Profiles.css';
class Profiles extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filename: 'Choose File',
      // isUploading: false,
      profiles : [],
      file: null
    }
  }

  componentDidMount() {
    this.props.getProfiles();
  }
  onFileUpload(){
  }

  uploadHandle = (file) => {
    if(this.state.filename === 'Choose File' || !file) {
      alert('Please select file');
    } 
    else {      
      console.log(file);
      this.props.uploadDocumentRequest(file);
      this.setState({filename : 'Choose File', file : null})
    }
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <div class="alert alert-danger" role="alert">
      <Link className='alert-link' to={{pathname : '/create-profile'}}> Create your profile </Link> to view Members.
    </div>;
    } else {
      // console.log(profiles)
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = <h4 className="no-profile-text">No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="profiles-heading text-center">Alumni Profiles</h1>
              <p className="profiles-sub-heading lead text-center">
                Browse and connect with alumni
              </p>
              <p className="profiles-sub-heading lead text-center">
                Alumni who have completed the profile are listed only!   
              </p>
              
              <div className='col' style={{margin : '10px 0px'}}>
                {this.props.upload.isLoading ? <Spinner /> :
                  this.props.auth.user.role === 'superadmin' ? 
                  <div className='row justify-content-end'>
                  <div className="custom-file col-6 ">
                    <div className='row justify-content-between'>
                    <input type="file" onChange={(e) => {this.setState({filename : e.target.files[0].name, file: e.target.files[0]})}} className="custom-file-input col-10" name='usersFile' id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
                    <label className="custom-file-label col-10" for="inputGroupFile01">{this.state.filename}</label>
                    <button className='btn btn-secondary' type="submit" onClick={()=> this.uploadHandle(this.state.file)}>Upload</button>
                    </div>
                  </div>
                  </div>
                  :
                  null
                }
              </div>
              {profileItems}
              {/* <ul>
              {this.state.profiles.map(value => {
                return(
                  <li>{value}</li>
                )
              })}
              </ul> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth : state.auth,
  upload: state.upload
});

export default connect(mapStateToProps, { getProfiles,  uploadDocumentRequest})(Profiles);
