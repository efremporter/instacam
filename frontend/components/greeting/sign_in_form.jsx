import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as sessionActionCreators from '../../actions/session_actions';

function SignInForm() {
  const dispatch = useDispatch();
  const { signIn } = bindActionCreators(sessionActionCreators, dispatch);
  const [handleOrEmail, setHandleOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = () => {
    if (handleOrEmail.length > 0 && password.length > 6) {
      handleOrEmail.includes('@') ?
        signIn({ email: handleOrEmail, password }) :
        signIn({ handle: handleOrEmail, password });
    } else console.log('invalid');
  };

  const handleDemoUser = () => {
    signIn({handle: "demouser", password: "password123!"});
  };

  return (
    <div className="sign-up-page-outer-container">
      <div className="sign-up-page-inner-container" id="sign-in-page-inner-container">
        <div className="sign-up-form-container">
          <div className="sign-up-page-logo">Instacam</div>
          <form className="sign-up-form" id="sign-in-form">
            <input className="sign-up-form-input"
              onChange={e => setHandleOrEmail(e.target.value)}
              value={handleOrEmail}
              placeholder="Username or email"
            ></input>
            <input className="sign-up-form-input"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              type="password"
            ></input>
          </form>
          <button 
            className="sign-up-form-submit"
            id="sign-up-form-submit"
            onClick={handleSubmit}>
              Log in
          </button>
          <button
            className="sign-up-form-submit"
            id="sign-up-demo-user"
            onClick={handleDemoUser}>
              Demo User
          </button>
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