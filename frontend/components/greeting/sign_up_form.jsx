import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import * as sessionActionCreators from '../../actions/session_actions';

function SignUpForm() {
  // This line below gives me access to the redux store
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  // This line below is replacing my the mapDispatchToProps portion of my previous container files
  const { signUp, signIn } = bindActionCreators(sessionActionCreators, dispatch);
  // These lines below are replacing my the mapStateToProps portion of my previous container files
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = email => {
    // General email regex found online
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return email.length && String(email)
      .toLowerCase()
      .match(emailFormat);
  };

  const isValidPassword = password => {
    // Regex found on stackOverflow, validates that user includes on number and one special character
    const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$/;
    return password.length > 6 && String(password).match(passwordFormat);
  };

  const handleSubmit = () => {
    if (isValidEmail(email) && isValidPassword(password) && name.length >= 1) {
      console.log('valid')
      signUp({email, name, password})
    } else console.log('invalid');
  };

  return (
    <div className="session-form-container">
      <form className="session-form" onSubmit={handleSubmit}>
        <input className="session-form-input"
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        ></input>
        <input className="session-form-input"
          onChange={e => setName(e.target.value)}
          value={name}
          placeholder="Full Name"
        ></input>
        <input className="session-form-input"
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          type="password"
        ></input>
        <button className="session-form-submit" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;