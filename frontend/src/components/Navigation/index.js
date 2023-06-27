import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-bar'>
      <div className='title-and-socials-container'>
        <li>
          <NavLink exact to="/"><h1>GroupTogether</h1></NavLink>
        </li>
        <div className='socials'>
          <a href="https://github.com/APH1997" target="_blank">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/andre-hristu-012842164/" target="_blank">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
      <div className={`right-nav${!sessionUser ? ' noUser' : ''}`}>
        {sessionUser && <li><NavLink exact to="/groups/new">Start a new Group</NavLink></li>}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </ul>
  );
}

export default Navigation;
