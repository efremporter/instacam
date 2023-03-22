import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as sessionActionCreators from '../../actions/session_actions';

function SignInForm() {
  const dispatch = useDispatch();
  const { signUp, signIn } = bindActionCreators(sessionActionCreators, dispatch);
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    if (usernameOrEmail.length > 0 && password.length > 6) {
      usernameOrEmail.includes('@') ?
        signIn({ email: usernameOrEmail, password }) :
        signIn({ username: usernameOrEmail, password });
    } else console.log('invalid');
  };

  return (
    <div className="sign-up-page-outer-container">
      <div className="sign-up-page-inner-container" id="sign-in-page-inner-container">
        <div className="sign-up-form-container">
          <div className="sign-up-page-logo">Instacam</div>
          <form className="sign-up-form" id="sign-in-form" onSubmit={handleSubmit}>
            <input className="sign-up-form-input"
              onChange={e => setUsernameOrEmail(e.target.value)}
              value={usernameOrEmail}
              placeholder="Username or email"
            ></input>
            <input className="sign-up-form-input"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              type="password"
            ></input>
          </form>
          <button className="sign-up-form-submit" id="sign-up-form-submit">Log in</button>
          <button className="sign-up-form-submit" id="sign-up-demo-user">Demo User</button>
        </div>
        <div className="sign-in-form-reroute-container">
          Don't have an account?
          <span className="sign-in-form-reroute" onClick={() => history.push('/signup')}>Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;