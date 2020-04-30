import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

import './Register.css'
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      enrollmentNumber: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  validateFieldEnrollmentNumber(value){
    var msg = ''
    if (!value) {
      msg = 'Enrollment Number is requried';
    }
    else {
      if ( value.length != 11) {
        msg = 'Enrollment Number must be  11 digits';
      } else {
        const numEquivalentOfEnrollNo = Number(value);
        if ( typeof numEquivalentOfEnrollNo != 'number' || Number.isNaN(numEquivalentOfEnrollNo)) {
          msg = "Enrollment Number is not valid number";
        } else {
          const RollNumber = value.substring(0, 2);
          const CollegeCode = value.substring(3,5);
          const CourseCode = value.substring(6,8);
          const YearOfAdmision = value.substring(9, 10);
          if (CollegeCode != "208") {
            msg = "Are you sure you are bpitian?";
            return msg;
          }
          this.setState({
            enrollmentDetails: {
              RollNumber,
              CollegeCode,
              CourseCode,
              YearOfAdmision,
            }
          });
        }
      }
      
    }
   
    return msg;
  }


  onBlur = (e) => {
  }
  onSubmit(e) {
    e.preventDefault();
    var msg = this.validateFieldEnrollmentNumber(this.state.enrollmentNumber);
    if (msg && msg.length > 0) {
      return this.setState(prevState => {
        return {
          errors: {
            ...prevState.errors,
            enrollmentNumber: msg,
          },
        };
      });
    }

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      enrollmentNumber: this.state.enrollmentNumber
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <img className="bpitlogo" src={require('../../img/bpitlogo.png')} />
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                  placeholder="Enrollment Number"
                  name="enrollmentNumber"
                  value={this.state.enrollmentNumber}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  error={errors.enrollmentNumber}
                  info="Your College Enrollment Number"
                  type="number"
                />
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                  info="Minimum 6 characters"
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit"  type='submit' className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
