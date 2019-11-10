import React, {
  useCallback,
} from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../actions';

const Header = () => {
  const isSignedIn = useSelector(({ auth }) => auth.isSignedIn);
  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <header className="main-header">
      <div className="container clearfix">
        <ul className="main-nav">
          <li><Link to={'/dashboard'}>Dashboard</Link></li>
          <li><Link to={'/add'}>Add Movie</Link></li>
          {
            !isSignedIn &&
            <li><Link to={'/'}>Login</Link></li>
          }
          {
          isSignedIn &&
          <li>
            <button onClick={logout}>Logout</button>
          </li>
          }
        </ul>
      </div>
    </header>
  );
}

export default Header;