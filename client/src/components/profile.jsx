import React from 'react';
import axios from 'axios';

function Profile() {
    const onLoadFunction = async e => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:5001/profile", {
                headers: {authorization: "bearer " + localStorage.getItem("token")}
            });
            console.log(res.data);
        } catch (err) {
            console.log(err.message);
        }
    };


    return (
        <div>
            <p className='font-normal hover:font-bold font-mono text-blue-600 text-center'>Profile Page</p>
        </div>
    )
}

export default Profile
