import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  const handleLogoClick = () => {
    history.push('/')
  }

  return (
    <nav id='Navigation-Bar'>
      <NavLink exact to="/"><img className='logo' src='../logo/hahbooking-high-resolution-color-logo.png' alt='HAHBooking' onClick={handleLogoClick} /></NavLink>
      <ul className='session'>
        {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
    </nav>
  );
}

export default Navigation;
