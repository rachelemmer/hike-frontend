import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav className="nav-bar">
            <Link to="/" className="link">Home</Link>
            <Link to='Signup' className="link">Sign Up</Link>
            <Link to='Login' className="link">Log In</Link>
            <Link to='ViewAllHikes' className="link">View all Hikes</Link>
        </nav>
    )
}