import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux';
import TextFieldGroup from './../common/TextFieldGroup'
import config from './../../config/index'
import { RESET_PASSWORD } from './../../actions/types'
// import {forgotPassword} from './../../actions/authActions'


class ResetPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'password': '',
            'confirmPassword': ''
        }
    }
    onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            password: this.state.password,
        };

        if (this.state.password !== this.state.confirmPassword) {
            alert("Password didn't match")
        } else {
            this.callAPI(userData)
        }
        // this.props.forgotPassword(userData)

    }

    callAPI = (userData = {}) => {
        const email = this.props.match.params.email
        const hash = this.props.match.params.hash
        const { BASE_URL } = config

        axios.post(`${BASE_URL}/api/users/reset-password/${email}/${hash}`, userData)
            .then(res =>
                this.props.dispatch({
                    type: RESET_PASSWORD
                })
            )
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {


        const timestamp = this.props.match.params.timestamp
        const currTimestamp = new Date().getTime()
        if ((currTimestamp - timestamp) > 5 * 60 * 1000) {            // 5 min window
            this.callAPI()
            return (
                <div className='alert alert-secondary'>
                    Link Expired !!!
                </div>
            )
        } else {

        }
        return (


            <div>
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Password Reset</h1>

                    {
                        !this.props.success ? <form onSubmit={this.onSubmit}>

                            <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type="text"
                                value={this.state.password}
                                onChange={this.onChange}
                            //   error={errors.email}
                            />

                            <TextFieldGroup
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={this.state.confirmPassword}
                                onChange={this.onChange}
                            //   error={errors.email}
                            />

                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form> :
                            <div className='alert alert-success'>Password reset Successfull !!!</div>
                    }



                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    success: state.auth.success,
});

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPassword))
// export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);