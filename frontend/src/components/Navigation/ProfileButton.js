import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import {useHistory, NavLink} from 'react-router-dom'

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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
    history.push('/');
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <div className={showMenu ? "modal-is-open" : ""}id="profile-menu-container" onClick={openMenu}>
        <i className="fas fa-bars"></i>
        <i className="fas fa-user-circle" />
      </div>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li id="greeting">Hello, {user.firstName}</li>
            <li id="email">{user.email}</li>
            <li onClick={closeMenu} id="all-groups">
              <NavLink to='/groups/all'>All Groups</NavLink>
            </li>
            <li onClick={closeMenu} id="all-events">
              <NavLink to='/events/all'>All Events</NavLink>
            </li>
            <li onClick={closeMenu} id="view-groups">
              <NavLink to={`/users/${user.id}/groups`}>Your Groups</NavLink>
            </li>
            <li onClick={closeMenu} id="view-events">
              <NavLink exact to="/events/all">Your Events</NavLink>
            </li>
            <li onClick={logout} id="logout">
              Log Out
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
