import { SET_LOADING_STATUS } from '../actions';

const INITIAL_STATE = {
  displayLoader: false,
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        displayLoader: action.payload,
      };
    default:
     return state;
  }
}