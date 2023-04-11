import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='nav-bar'>
      <li>
        <NavLink exact to="/"><h1>MeetUp</h1></NavLink>
      </li>
      <div className='right-nav'>
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
