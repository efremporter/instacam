import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../utils/route_util';
import SignInForm from './greeting/sign_in_form';
import SignUpForm from './greeting/sign_up_form';
import Home from './home/home';
import Modal from './modal/modal';
import DoubleModal from './modal/double_modal';
import NavBar from './navbar/nav_bar';
import Profile from './profile/profile';
import ComingSoonPage from './greeting/coming_soon_page';

const App = () => {
  return (
    <>
      <Switch>
        <AuthRoute path="/signup" component={SignUpForm} />
        <AuthRoute path="/" component={SignInForm} />
      </Switch>
      <ProtectedRoute path="/" component={NavBar}/>
      <ProtectedRoute path="/" component={Modal} />
      <ProtectedRoute path="/" component={DoubleModal} />
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute path="/posts/:postId/edit" component={Home} />
        <ProtectedRoute path="/posts/:postId/update" component={Home} />
        <ProtectedRoute path="/search" component={ComingSoonPage} />
        <ProtectedRoute path="/explore" component={ComingSoonPage} />
        <ProtectedRoute path="/messages" component={ComingSoonPage} />
        <ProtectedRoute path="/settings" component={ComingSoonPage} />
        <ProtectedRoute path="/profile/:userId" component={Profile} />
      </Switch>
    </>
  )
}

export default App;