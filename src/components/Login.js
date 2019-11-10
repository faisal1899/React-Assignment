import React, {
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';

import { trySignin, setLoginError } from '../actions';
import history from '../history';

const Login = () => {
  const usernameRef = useRef(null);
  const dispatch = useDispatch();
  const displayLoader = useSelector(({ site }) => {
    return site.displayLoader;
  });
  const { displayLoginError, isSignedIn } = useSelector(({ auth }) => {
    return auth;
  });
  const onLoginClick = useCallback(() => {
    if (displayLoader) {
      return;
    }
    dispatch(trySignin(usernameRef.current.value));
  }, [usernameRef, dispatch, displayLoader]);
  useEffect(() => {
    setLoginError(false);
  }, []);
  useEffect(() => {
    if (!isSignedIn) {
      return;
    }
    history.push('dashboard');
  }, [isSignedIn]);
  return (
    <div className="container">
      <div className="login-wrap">
      <h1 className="text-center">Login</h1>
      <div>
        
        <div className="form-element">
          <label htmlFor="username">Username: </label>
          <input className="form-object" type="text" name="username" ref={usernameRef}/>
        </div>
        
        <div className="form-element">
          <button className="btn btn-primary login-btn" onClick={onLoginClick}>
            {displayLoader ? 'Loading...' : 'Login'}
          </button>
          
        </div>
        {
          displayLoginError &&
          <span className="msg error-msg">Invalid username</span>
        }
      </div>
      </div>
    </div>
  );
}

export default Login;