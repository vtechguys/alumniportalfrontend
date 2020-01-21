import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

const ProfileActions = () => {
  return (
    <div className="profile-actions-wrapper" role="group">
      <Link to="/edit-profile" className="btn action-btns">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn action-btns">
        <i className="fab fa-black-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn action-btns">
        <i className="fas fa-graduation-cap text-info mr-1" />
        Add Education
      </Link>
    </div>
  );
};

export default ProfileActions;
