import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {

    const errors = {}

    if (email.length < 0) {
      errors.email = 'Please provide valid email'
    }

    if (username.length < 4) {
      errors.username = 'Please provide valid username'
    }

    if (password.length < 6) {
      errors.password = 'Passsword must be 6 or more characters'
    }

    if (firstName.length < 2) {
      errors.firstName = 'First Name must be 2 or more characters'
    }

    if (lastName.length < 2) {
      errors.lastName = 'Last Name must be 2 or more characters'
    }

    if (confirmPassword.length < 6) {
      errors.confirmPassword = 'Please confirm your password'
    }

    setErrors(errors)

  }, [email, username, password, firstName, lastName, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className="signupForm">
      <h1>Sign Up</h1>
      <form className="signupInputs" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            className="signupInputs"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && email.length > 0 && (
          <p className='error-message'>{errors.email}</p>
        )}
        <label>
          Username
          <input
            className="signupInputs"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && username.length > 0 && (
          <p className='error-message'>{errors.username}</p>
        )}
        <label>
          First Name
          <input
            className="signupInputs"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && firstName.length > 0 && (
          <p className='error-message'>{errors.firstName}</p>
        )}
        <label>
          Last Name
          <input
            className="signupInputs"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && lastName.length > 0 && (
          <p className='error-message'>{errors.lastName}</p>
        )}
        <label>
          Password
          <input
            className="signupInputs"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && password.length > 0 && (
          <p className='error-message'>{errors.password}</p>
        )}
        <label>
          Confirm Password
          <input
            className="signupInputs"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && confirmPassword.length > 0 && (
          <p className='error-message'>{errors.confirmPassword}</p>
        )}
        <button type="submit" disabled={Object.keys(errors).length > 0}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
