import useIsAuthorized from 'Hooks/useIsAuthorized.js';
import SessionContext from 'Providers/SessionProvider.js';
import { ThemeContext } from 'Providers/ThemeProvider.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useContext } from 'react';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { Link, NavLink } from "react-router-dom";
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.js';
import './Navbar.css';
import { useLogout } from 'Hooks/useLogout.js';


const Navbar = () => {  
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();

    const { role } = useContext(SessionContext);
    const { logout } = useLogout();

    const { theme } = useContext(ThemeContext);

    const navbarClassName = `navbar navbar-expand-md ${theme === 'dark' ? 'nav-dark' : 'nav-light'}`;
    const navItemClassName = "nav-item d-flex align-items-center justify-content-center";

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className={navbarClassName}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">CineMagic</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className={navItemClassName}>
                            <NavLink className="nav-link" activeClassName="active" to="/">Home</NavLink>
                        </li>

                        <li className={navItemClassName}>
                            <NavLink className="nav-link" activeClassName="active" to="/movies" >Movies</NavLink>
                        </li>
                        {role === 'Admin' && <li className={navItemClassName}>
                            <NavLink className="nav-link" activeClassName="active" to="/addmovie" >Add Movie</NavLink>
                        </li>}
                    </ul>
                    <div className="d-flex align-items-center justify-content-center">
                        <ThemeSwitch />
                    </div>

                    <ul className="navbar-nav me-auto mb-lg-0">
                        {!auth && <> <li className={navItemClassName}>
                            <NavLink className="nav-link" to="/login"  >Login</NavLink>
                        </li>
                            <li className={navItemClassName}>
                                <NavLink className="nav-link" to="/register" >Register</NavLink>
                            </li></>}
                        {auth && <>
                            {/* <li className={navItemClassName}>
                            <NavLink className="nav-link" activeClassName="active" to="/profile"  >Login</NavLink>
                        </li>  */}
                            <li className={navItemClassName}>
                                <NavLink className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
                            </li></>}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
