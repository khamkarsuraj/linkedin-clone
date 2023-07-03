import React from 'react';
import axios from 'axios';

function Welcome() {
    const onLoadFunction = async e => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:5001/welcome", {
                headers: {authorization: "bearer " + localStorage.getItem("token")}
            });
            console.log(res.data);
        } catch (err) {
            console.log(err.message);
        }
    };


    return (
        <div>
            <h1>Welcome to Profile</h1>
            <div id="div-users" className="flex" method="GET" onClick={onLoadFunction}>
                <h2>USERS</h2>
                <button
                    id="button-get-users"
                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Get Users
                </button>
                <div>
            </div>
                <div id="msg-users"></div>
                <ul id="user-list"></ul>
            </div>
        </div>
    )
}

export default Welcome
