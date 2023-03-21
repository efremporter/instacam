import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import SessionForm from './greeting/sign_up_form';

const App = () => {
  return (
    <>
      {/* <ProtectedRoute path="/" component={} /> */}
      {/* <Switch>
        <ProtectedRoute />
      </Switch> */}
      <div>Instacam</div>
      <SessionForm />
    </>
  )
}

export default App;