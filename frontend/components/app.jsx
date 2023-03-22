import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import SignInForm from './greeting/sign_in_form';
import SignUpForm from './greeting/sign_up_form';

const App = () => {
  return (
    <>
      <AuthRoute path="/signup" component={SignUpForm} />
      <AuthRoute path="/" component={SignInForm} />
      <Switch>
        <ProtectedRoute path="/" />
      </Switch>
      {/* <SignUpForm /> */}
    </>
  )
}

export default App;