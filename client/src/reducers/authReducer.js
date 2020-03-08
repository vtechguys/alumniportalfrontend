import isEmpty from "../validation/is-empty";

import {
  SET_CURRENT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  EMAIL_VERIFIED
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  isEmailValid: false, //if email exists, reset password
  success: false //reset password check
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        isEmailValid: true
      };

    case RESET_PASSWORD:
      return {
        ...state,
        success: true
      };

    case EMAIL_VERIFIED:
      return {
        ...state,
        success: true
      };
    default:
      return state;
  }
}
