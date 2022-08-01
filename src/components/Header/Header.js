import React from "react"
import "./Header.css"

const Header = () => {
    return <nav className="navbar">
        <a href="/">Home</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/logout">Logout</a>
    </nav>
}

export default Header