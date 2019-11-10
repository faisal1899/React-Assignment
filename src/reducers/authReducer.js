import { SIGN_IN, SIGN_OUT, SET_LOGIN_ERROR } from '../actions';

const INITIAL_STATE = {
  isSignedIn: (localStorage && localStorage.getItem('username')) || null,
  displayLoginError: false,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
      };
    case SET_LOGIN_ERROR:
      return {
        ...state,
        displayLoginError: action.payload,
      };
    default:
     return state;
  }
}