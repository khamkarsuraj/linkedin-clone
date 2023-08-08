import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Edit() {
    // Global Variable
    const [userInfo, setUserInfo] = useState(null);

    const [id, setid] = useState("");
    const [first, setfirst] = useState("");
    const [last, setlast] = useState("");
    const [headline, setHeadline] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");

    useEffect(() => {
        async function onPageLoadFun() {
            try {
                // Get data and set into variables for further operations
                const res = await axios.get("http://localhost:5001/profile", {
                    headers: { authorization: "bearer " + localStorage.getItem("token") }
                });
                setUserInfo(res.data);
                setid(res.data.user.user_id);
                setfirst(res.data.user.first_name);
                setlast(res.data.user.last_name);
                setHeadline(res.data.user.headline);
                setAddress(res.data.user.address);
                setPhone(res.data.user.phone);
                setBirthday(new Date(res.data.user.birthday).toLocaleDateString());
            } catch (error) {
                console.log(error);
            }
        }

        onPageLoadFun();
    }, []);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            axios.post("http://localhost:5001/update", {
                id: id,
                first: first,
                last: last,
                head: headline,
                phone: phone,
                address: address,
                birthday: birthday,
                withCredentials: true
            })
            .then((res) => {
                console.log(res);
            })
            window.location.href = "/profile";
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="stone-100 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {userInfo ? (
                    <div>
                        <form className="space-y-6" method="POST" onSubmit={onSubmitForm}>
                            <div>
                                <label htmlFor="first" className="block text-sm font-medium leading-6 text-gray-900">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="first"
                                    name="first"
                                    type="name"
                                    defaultValue={userInfo.user.first_name}
                                    onChange={e => setfirst(e.target.value)}
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="last" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="last"
                                    name="last"
                                    type="name"
                                    defaultValue={userInfo.user.last_name}
                                    onChange={e => setlast(e.target.value)}
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="head" className="block text-sm font-medium leading-6 text-gray-900">
                                    Headline
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="head"
                                    name="head"
                                    type="text"
                                    defaultValue={userInfo.user.headline}
                                    onChange={e => setHeadline(e.target.value)}
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="birthday" className="block text-sm font-medium leading-6 text-gray-900">
                                    Birthday
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="birthday"
                                    name="birthday"
                                    type="date"
                                    defaultValue={userInfo.user.birthday}
                                    onChange={e => setBirthday(e.target.value)}
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="address"
                                    name="address"
                                    type="address"
                                    defaultValue={userInfo.user.address}
                                    onChange={e => setAddress(e.target.value)}
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <input
                                    id="phone"
                                    name="phone"
                                    type="phone"
                                    defaultValue={userInfo.user.phone}
                                    onChange={e => setPhone(e.target.value)}
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (<div>Something went wrong</div>)
                }

                <p className="mt-10 text-center text-sm text-gray-500">
                    <Link to="/profile" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                    Cancel
                    </Link>
                </p>
            </div>
      </div>
    )
}

export default Edit
