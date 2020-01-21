import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

import './Dashboard.css';
import Education from './Education';

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <li key={exp._id}>
        <div>
          <span className='company-name'>{exp.company}</span>
          <span className='title-in-company'>{exp.title}</span>
          <span className='time-period'>
            {
              exp.from?
              (new Date(exp.from)).toLocaleDateString()
              : '??'
            } -
            { exp.to?
              (new Date(exp.to)).toLocaleDateString()
              : 'Now'}
          </span>
        </div>
        <div>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
          >
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </li>
    ));
    return (
      <div className='experience'>
        <h4 className="mb-4 exp-cred">Experience Credentials</h4>
        <ol className="list-wrapper">
          {experience}
        </ol>
        {/* <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table> */}
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);
