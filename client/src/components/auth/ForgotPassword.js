import React, { Component } from 'react'
import { connect } from 'react-redux';
import TextFieldGroup from './../common/TextFieldGroup'
import { forgotPassword } from './../../actions/authActions'


class ForgotPassword extends Component {

  constructor(props) {
    super(props)
    this.state = {
      'email': '',
    }
  }
  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
    };
    this.props.forgotPassword(userData)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  render() {

    return (
      <div>
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Password Reset</h1>

          {
            this.props.isEmailValid ?
              <div className='alert alert-success'>'Check Your Email for reset Link'</div>
              :

              <form onSubmit={this.onSubmit}>
                <div className="alert alert-warning">
                  Enter your e-mail address below, and we'll send you an e-mail to reset password using a link.
              </div>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                //   error={errors.email}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isEmailValid: state.auth.isEmailValid,
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);