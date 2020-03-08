import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import config from '../config/index'
import { GET_ERRORS, SET_CURRENT_USER, FORGOT_PASSWORD } from './types';
const {BASE_URL} = config
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${BASE_URL}/api/users/register`, userData)
    .then(res => history.push('/login'))
    .catch(err =>{
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post(`${BASE_URL}/api/users/login`, userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      let userObj = {
        ...decoded
      };
      if(res && res.data && res.data.user){
        userObj = {
          ...userObj,
          ...res.data.user
        };
      }
      // Set current user
      dispatch(setCurrentUser(userObj));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const forgotPassword = userData => dispatch => {

  axios.post(`${BASE_URL}/api/users/forgot-password`,userData)
  .then(res => {
    if(res.data.success){
      dispatch({
        type : FORGOT_PASSWORD,
      })
    }
  })
  .catch(err => {})
}

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

