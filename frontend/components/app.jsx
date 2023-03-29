import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import SignInForm from './greeting/sign_in_form';
import SignUpForm from './greeting/sign_up_form';
import Home from './home/home';
import Modal from './modal/modal';
import NavBar from './navbar/nav_bar';
import Profile from './profile/profile';

const App = () => {
  return (
    <>
      <AuthRoute path="/signup" component={SignUpForm} />
      <AuthRoute path="/" component={SignInForm} />
      <ProtectedRoute path="/" component={NavBar}/>
      <ProtectedRoute path="/" component={Modal} />
      <Switch>
        <ProtectedRoute exact path="/" component={Profile} />
        {/* <ProtectedRoute exact path="/profile/:userId" component={Profile} /> */}
      </Switch>
    </>
  )
}

export default App;