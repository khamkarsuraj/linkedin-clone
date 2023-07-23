import React from 'react'
import logo from '../assets/logo.png'
import { useLocation } from 'react-router-dom';
/* import home from '../assets/home.png'
import network from  '../assets/network.png'
import notification from '../assets/notification.png'
import message from '../assets/messages.png'
import job from '../assets/work.png';
import user from '../assets/user.png'; */

/* Routes you don't want show navigation bar */
const listNoNavBar = ["/", "/about", "/signin", "/register", "/forgot"];

function Navbar() {
    if (listNoNavBar.includes(useLocation().pathname)) return null;

    function onSignOutFunction() {
        localStorage.removeItem('token');
        window.location.href = '/signin';
    }

    return (
        <div>
            {/* This is navigation bar */}
            <nav className="bg-white">
                <div className="flex flex-wrap items-center justify-between p-3">
                    <div className="flex items-center px-24">
                        {/* Logo */}
                        <img src={logo} className="h-8 mr-3" alt="Linkedout Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">LinkedOut</span>
                        {/* Search */}
                        <div className="pl-4 flex">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border:hidden rounded-lg bg-slate-100 focus:ring-blue-100 focus:border-blue-100" placeholder="Search..." />
                            </div>
                        </div>
                    </div>
                    <div className="px-12 items-center justify-between" id="navbar-search">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <li>
                                <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Home</a>
                            </li>
                            <li>
                                <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">My Network</a>
                            </li>
                            <li>
                                <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Jobs</a>
                            </li>
                            <li>
                                <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Messaging</a>
                            </li>
                            <li>
                                <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Notifications</a>
                            </li>
                            <li>
                                <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">Me</a>
                            </li>
                            <li>
                                <button type="submit"
                                        className="flex w-full px-2 py-0.8 justify-center rounded-md bg-red-300 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                                        onClick={onSignOutFunction}
                                >
                                Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
