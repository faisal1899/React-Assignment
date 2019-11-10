import { SET_DETAILS } from '../actions';

const INITIAL_STATE = {
  details: {},
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    default:
     return state;
  }
}