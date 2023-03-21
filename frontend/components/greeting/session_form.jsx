import React, { useState } from "react";
import { useSelector } from "react-redux";

function SessionForm() {
  
  const state = useSelector(state => state);
  console.log(state);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="session-form-container">
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
    </div>
  );
};

export default SessionForm;