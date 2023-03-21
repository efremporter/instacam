import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import SignUpForm from './greeting/sign_up_form';

const App = () => {
  return (
    <>
      {/* <ProtectedRoute path="/" component={} /> */}
      {/* <Switch>
        <ProtectedRoute />
      </Switch> */}
      <SignUpForm />
    </>
  )
}

export default App;