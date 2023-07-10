import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <div className="user-navigation">
        {user ? (<NavLink className="create-new-spot" exact to="/spots/new" >Create a New Spot</NavLink>) : ("")}
        <button id='login-button' onClick={openMenu}>
          <span className="material-symbols-outlined">menu</span>
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>
      <div>
        <ul id='user-session' className={ulClassName} ref={ulRef}>
          {user ? (
            <div className="loggedin">
              <li className="user-menu">Hello, {user.firstName}</li>
              <li className="user-menu">{user.email}</li>
              <li className="user-menu">
                <NavLink className="manage-user-spots" exact to="/spots/current" >Manage Spots</NavLink>
              </li>
              <li className="user-menu">
                <button className="logout-login-signup-button" onClick={logout}>Log Out</button>
              </li>
            </div>
          ) : (
            <div className="login-signup-buttons">
              <div className="logout-login-signup-button">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              </div>
              <div className="logout-login-signup-button">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfileButton;
