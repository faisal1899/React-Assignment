import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import siteReducer from './siteReducer';
import movieReducer from './movieReducer';

export default combineReducers({
  auth: authReducer,
  site: siteReducer,
  movie: movieReducer,
  form: formReducer,
});