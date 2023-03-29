import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as sessionActionCreators from '../../actions/session_actions';

function SignUpForm() {
  const dispatch = useDispatch();
  // This line below is replacing my the mapDispatchToProps portion of my previous container files
  const { signUp } = bindActionCreators(sessionActionCreators, dispatch);
  // These lines below are replacing my the mapStateToProps portion of my previous container files
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const isValidEmail = email => {
    // General email regex found online
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.length && String(email)
      .toLowerCase()
      .match(emailFormat);
  };

  const isValidHandle = handle => {
    if (handle.length < 1 || handle.length > 30) return false;
    const validChars = "abcdefghijklmnopqrstuvwxyz1234567890_."
    const handleArray = handle.toLowerCase().split("");
    let i = 0;
    while (i < handleArray.length) {
      if (!validChars.includes(handleArray[i])) {
        return false;
      };
      i++;
    };
    return true;
  };

  const isValidPassword = password => {
    // Regex found on stackOverflow, validates that user includes on number and one special character
    const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$/;
    return password.length > 6 && String(password).match(passwordFormat);
  };

  const handleSubmit = () => {
    const isValidName = name.length >= 1;
    if (
      isValidEmail(email) && 
      isValidHandle(handle) && 
      isValidPassword(password) &&
      isValidName) {
      signUp({email, name, handle, password})
    } else console.log('invalid');
  };

  return (
    <div className="sign-up-page-outer-container">
      <div className="sign-up-page-inner-container">
        <div className="sign-up-form-container">
          <div className="sign-up-page-logo">Instacam</div>
          <div className="sign-up-page-caption">Sign up to see photos and videos from your friends.</div>
          <form className="sign-up-form">
            <input className="sign-up-form-input"
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
            ></input>
            <input className="sign-up-form-input"
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder="Full Name"
            ></input>
            <input className="sign-up-form-input"
              onChange={e => setHandle(e.target.value)}
              value={handle}
              placeholder="Username"
            ></input>
            <input className="sign-up-form-input"
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              type="password"
            ></input>
          </form>
          <div className="sign-up-form-warning">
            People who use our service may have uploaded your contact information to Instacam.
          </div>
          <button className="sign-up-form-submit" type="submit" onClick={handleSubmit}>Sign Up</button>
        </div>
        <div className="sign-in-form-reroute-container">
          Have an account?
          <span className="sign-in-form-reroute" onClick={() => history.push('/')}>Log in</span>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;