import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {

    const errors = {}

    if (credential.length < 4) {
      errors.credential = 'Username must be 4 or more characters'
    }

    if (password.length < 6) {
      errors.password = 'Passsword must be 6 or more characters'
    }

    setErrors(errors)

  }, [credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUserLogin = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
        .then(closeModal)
  }



  return (
    <div id='login-form'>
      <h1 className="title">Log In</h1>
      <form id="login" onSubmit={handleSubmit}>
        <label>
          <div className="username">Username or Email</div>
          <input
            className="username-input"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        {errors.credential && credential.length > 0 && (
          <p className='error-message'>{errors.credential}</p>
        )}
        <label>
          <div className="password">Password</div>
          <input
            className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && password.length > 0 && (
          <p className='error-message'>{errors.password}</p>
        )}
        <div className="login-button">
          <button type="submit" disabled={Object.keys(errors).length > 0}>Log In</button>
        </div>
      </form>
      <button className="demo-login-button" onClick={demoUserLogin}>Demo User Login</button>
    </div>
  );
}

export default LoginFormModal;
