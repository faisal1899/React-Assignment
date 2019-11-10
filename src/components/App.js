import React, {
  Suspense,
} from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from '../history';
import Header from './Header';
import SiteErrorBoundary from './SiteErrorBoundary';
const Login = React.lazy(() => import('./Login'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const Details = React.lazy(() => import('./Details'));
const AddMovie = React.lazy(() => import('./AddMovie'));

const App = () => {
  return (
    <div className="">
      <SiteErrorBoundary>
        <Router history={history}>
          <div>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/details/:id" exact component={Details} />
                <Route path="/add" exact component={AddMovie} />
              </Switch>
            </Suspense>
          </div>
        </Router>
      </SiteErrorBoundary>
    </div>
  );
}

export default App;
