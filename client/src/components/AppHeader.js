import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';
import './AppHeader.css';
import { UserProfileContext } from "../providers/UserProfileProvider"

const AppHeader = () => {
  const { getCurrentUser, logout } = useContext(UserProfileContext);
  const user = getCurrentUser();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logoutAndReturn = () => {
    return logout().then(() => {
      history.push('/login');
    });
  };

  return (
    <div>
      <Navbar dark expand="md">
        <NavbarBrand tag={Link} to="/">
          CommuniTea
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {user ? (
              <>
                <NavItem>
                  <NavLink to="/newpost" tag={Link}>
                    New Post
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/discover" tag={Link}>
                    Discover
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    Search
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    Inspiration
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    {user.displayName}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="pointer" onClick={logoutAndReturn}>
                    Logout
                  </NavLink>
                </NavItem>
              </>
            ) : (
                <>
                  <NavItem>
                    <NavLink to="/login" tag={Link}>
                      Login
                  </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink to="/register" tag={Link}>
                      Register
                  </NavLink>
                  </NavItem>
                </>
              )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppHeader;