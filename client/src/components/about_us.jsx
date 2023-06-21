import React from "react";
import { Link } from 'react-router-dom';

function About() {
    return (
        <div>
            <h1>About us</h1>
            <br />
            <Link to="/">Home</Link>
            <br />
            <Link to="/signin">Sign In</Link>
        </div>
    )
}

export default About;