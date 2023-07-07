import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [userInfo, setUserInfo] = useState(null);

    function editInfo() {
        window.location.href = "/edit";
        return
    }

    useEffect(() => {
        async function onPageLoadFun() {
            try {
                const res = await axios.get("http://localhost:5001/profile", {
                    headers: { authorization: "bearer " + localStorage.getItem("token") }
                });
                setUserInfo(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        onPageLoadFun();
    }, []);

    return (
        <div className='bg-stone-200'>
            {/* Here divided page into two section */}
            <div className='flex flex-row px-20 py-4 space-x-8'>
                {/* Left side flex */}
                <div className='flex-col basis-3/4 space-y-4'>
                    <div className='flex-col bg-white rounded-lg px-8 py-5 space-y-1'>
                        <div className='rounded-lg px-8 py-5'>Cover Photo</div>
                        <div className='flex flex-row grid grid-cols-2 rounded-lg '>
                            <div className='basis-3/4 rounded-lg px-8 py-5'>
                                {userInfo ? (
                                    <div>
                                        <p>{userInfo.user.first_name} {userInfo.user.last_name}</p>
                                        <p>{userInfo.user.email}</p>
                                    </div>
                                ) : ( <div>Loading...</div> )}
                            </div>
                            <div className='place-self-end basis-1/4 rounded-lg px-8 py-5'>
                                <button
                                    className="flex rounded-full w-full justify-center px-3 py-1.5 font-bold leading-6 text-black hover:bg-stone-100"
                                    onClick={editInfo}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='border-2 rounded-lg bg-white px-8 py-5'>About</div>
                    <div className='border-2 rounded-lg bg-white px-8 py-5'>Experience</div>
                    <div className='border-2 rounded-lg bg-white px-8 py-5'>Education</div>
                    <div className='border-2 rounded-lg bg-white px-8 py-5'>Project</div>
                </div>
                {/* Right side flex */}
                <div className='flex flex-col basis-1/4 bg-white rounded-lg justify-center text-center'>
                    <div>People you may know</div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
