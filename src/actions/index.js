import axios from 'axios';
import { loginBaseURL } from '../api';
import history from '../history';
import api from '../api';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_DETAILS = 'SET_DETAILS';

export const signIn = () => ({
  type: SIGN_IN,
});

export const signOut = () => {
  if (localStorage) {
    localStorage.removeItem('username');
  }
  history.push('/');
  return { type: SIGN_OUT };
};

export const setLoadingStatus = (status) => ({
  type: SET_LOADING_STATUS,
  payload: status,
});

export const setLoginError = (status) => ({
  type: SET_LOGIN_ERROR,
  payload: status,
});

export const setDetails = (movieDetails) => ({
  type: SET_DETAILS,
  payload: movieDetails,
});

export const trySignin = (username) => dispatch => {
  dispatch(setLoadingStatus(true));
  axios.get(`${loginBaseURL}&apikey=${username}`)
    .then(
      res => {
        if (
          !res ||
          !res.data
        ) {
          return;
        }
        if (localStorage) {
          localStorage.setItem('username', username);
        }
        dispatch(setLoginError(false));
        dispatch(signIn());
      },
      err => {
        dispatch(setLoginError(true));
      },
    )
    .finally(() => dispatch(setLoadingStatus(false)));
}

export const fetchDetails = (id) => dispatch => {
  dispatch(setLoadingStatus(true));
  const params = { i: id };
  api.get('', { params })
    .then(
      res => {
        if (
          !res ||
          !res.data
        ) {
          return;
        }
        dispatch(setDetails(res.data));
      }
    )
    .finally(() => dispatch(setLoadingStatus(false)));
}
