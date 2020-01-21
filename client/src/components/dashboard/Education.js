import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

import './Dashboard.css';

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    // const education = this.props.education.map(edu => (
    //   <tr key={edu._id}>
    //     <td>{edu.school}</td>
    //     <td>{edu.degree}</td>
    //     <td>
    //       <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
    //       {edu.to === null ? (
    //         ' Now'
    //       ) : (
    //         <Moment format="YYYY/MM/DD">{edu.to}</Moment>
    //       )}
    //     </td>
    //     <td>
    //       <button
    //         onClick={this.onDeleteClick.bind(this, edu._id)}
    //         className="btn btn-danger"
    //       >
    //         Delete
    //       </button>
    //     </td>
    //   </tr>
    // ));
    const education = this.props.education.map(edu => (
      <li key={edu._id}>
        <div>
          <span className='school-name'>{edu.school}</span>
          <span className='degree-name'>{edu.degree}</span>
          <span className='time-period'>
            {
              edu.from ?
              (new Date(edu.from)).toLocaleDateString()
              : '??'
            }<span>- </span>
            {
            
            edu.to ?
            (new Date(edu.to)).toLocaleDateString()
            : 'Now'
            
            }
          </span>
        </div>
        <div>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
          >
            <i class="far fa-trash-alt"></i>
          </button>
        </div>
      </li>
    ));
    return (
      <div className='education'>
        <h4 className="mb-4 edu-cred">Education Credentials</h4>
        <ol className="list-wrapper">
          
        {education}
        </ol>
        {/* <table className="table table-borderless">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Years</th>
              <th />
            </tr>
            {education}
          </thead>
        </table> */}
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
