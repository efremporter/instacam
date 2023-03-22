import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import SignInForm from './greeting/sign_in_form';
import SignUpForm from './greeting/sign_up_form';
import Home from './home/home';
import NavBar from './navbar/nav_bar';

const App = () => {
  return (
    <>
      <AuthRoute path="/signup" component={SignUpForm} />
      <AuthRoute path="/" component={SignInForm} />
      <ProtectedRoute path="/" component={NavBar}/>
      {/* <ProtectedRoute path="/" component={Home} /> */}
      <Switch>
        {/* <ProtectedRoute path="/" component={Home} /> */}
      </Switch>
    </>
  )
}

export default App;