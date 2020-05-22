import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {

    return (
        <nav className="nav-bar">
            {localStorage.token ? 
            <div>
                <Link to='Dashboard' className="link">Dashboard</Link>
                <Link to='Login' className="link">Log Out</Link>
            </div>
            : 
            <div>
                <Link to='Signup' className="link">Sign Up</Link>
                <Link to='Login' className="link">Log In</Link>
            </div>
            }
        </nav>
    )
}