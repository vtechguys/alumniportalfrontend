import React from 'react';
import {connect} from 'react-redux'

import queryString from 'query-string';
import Spinner from '../common/Spinner';
// import {} from '../../actions';

class EmailVerification{

    componentDidMount(){
        // api req
        const { match, location } = this.props;
        const pathname = location.pathname;
        const parseQueryString = queryString.parse(pathname);

        console.log(parseQueryString);

    }
    resendEmailVerication(){

    }
    render(){
        const { verification } = this.props;

        return (
            <div>
                <h2>We are verifing you!</h2>
                <div>
                    {
                        verification.isLoading 
                            ?
                        <Spinner/>
                            :
                        <div>
                            {
                                !verification.didGetVerified
                                    ?
                                <div>
                                    <h3>Email didn't get verified retry withnew code</h3>
                                    <button>Resend</button>
                                </div>
                                    :
                                null
                            }
                            <button>Go to Home</button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default connect()(EmailVerification);