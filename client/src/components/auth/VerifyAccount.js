import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import config from "../../config/index";
import axios from "axios";
import { EMAIL_VERIFIED } from "../../actions/types";

class VerifyAccount extends Component {
  componentDidMount() {
    const email = this.props.match.params.email;
    const hash = this.props.match.params.hash;
    const { BASE_URL } = config;

    axios
      .post(`${BASE_URL}/api/users/verify-account/${email}/${hash}`)
      .then(response => {
        return this.props.dispatch({
          type: EMAIL_VERIFIED
        });
      });
  }

  render() {
    return (
      <div>
        {this.props.success ? (
          <div className="alert alert-success">Email Verified. </div>
        ) : (
          <div className="alert alert-secondary">Link Expired. </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

const mapStateToProps = state => ({
  success: state.auth.success
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VerifyAccount)
);
