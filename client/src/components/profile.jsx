import React from 'react';

function Profile() {
    /*
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
    */

    return (
        <div className='bg-stone-100'>
            {/* Here divided page into two section */}
            <div className='flex flex-row px-20 space-x-8'>
                <div className='basis-3/4 bg-cyan-500'>This is going to be intro</div>
                <div className='basis-1/4 bg-red-500'>people you may know</div>
            </div>
        </div>
    )
}

export default Profile
