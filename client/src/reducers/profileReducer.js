import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  VERFIY_USER,
  ASSIGN_ROLE,
  PROFILE_ACTION
} from "../actions/types";

const initialState = {
  profileActionLoading: false,
  profile: null,
  profiles: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      console.log("GET_PROFILE", action);
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case VERFIY_USER:
      return {
        ...state,
        profileActionLoading: false,
        profile: action.payload
      };
    case ASSIGN_ROLE:
      var profile = state.profile;
      profile.user = action.payload;
      return {
        ...state,
        profileActionLoading: false,
        profile: profile
      };
    case PROFILE_ACTION:
      return {
        ...state,
        profileActionLoading: true,
        profile: null
      };

    default:
      return state;
  }
}
