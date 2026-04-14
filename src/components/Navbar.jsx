import {Link, useNavigate} from 'react-router-dom';
import React from 'react';
import './Navbar.css';

export default function Navbar() {
    const navigate = useNavigate();

       const isLoggedIn = !!localStorage.getItem('token');
    return (
        <header className="nav">
           <div className='nav_inner'>
                <Link className='nav_brand' to="/humanize">
                    <div className='nav__logo' aria-hidden="true">
                        🎓
                    </div>
                    <span className='nav__title'>GrammarAI</span>     
                </Link>

                 <nav className="nav__actions">
                    <Link className="nav__humanize" to="/humanize">
                        Humanize
                    </Link>
                    <Link className="nav__humanize" to="/summarize">
                        Summarize
                    </Link>
                    {isLoggedIn ? (
                        <Link className='nav__link' to="/login" onClick={() => {
                            localStorage.removeItem('token');
                            navigate("/login");
                        }}>
                            Logout
                        </Link>
                    ) : (
                        <Link className='nav__link' to="/login">
                            Login
                        </Link>
                    )}

                    <Link className="nav__btn" to="/signup">
                        Sign Up
                    </Link>
                </nav>
            </div> 
        </header>
    );
}

