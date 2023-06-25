import React from "react";
import { Link } from 'react-router-dom';

function Home() {
    return (
        // Not working this one. Need to follow video approach
        <div className="main-container">
            <h1>Home Page</h1>
            <br />
            <Link to="/register">Register</Link>
            <br />
            <Link to="/signin">Sign In</Link>
            <br />
            <Link to="/about">About</Link>
        </div>
    );
}

export default Home;