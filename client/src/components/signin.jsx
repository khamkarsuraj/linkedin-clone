import React, { useState } from "react";
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignIn() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmitForm = async e => {
      e.preventDefault();
      try {
          const res = await axios.post("http://localhost:5001/signin", {
            email,
            password,
            withCredentials: true 
          });

          // TODO: Use cookies instead of localStorage
          localStorage.setItem('token', res.data.accessToken);
          window.location.href = "/profile";
      } catch (err) {
          console.log(err.message);
      }
  };

    return (
      // TODO: Below code is supposed to be replaced with AP's code.
      <div className="stone-100 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src={logo}
          alt="Linkedout"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in into your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={onSubmitForm}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={e => setemail(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
              <Link to="/forget" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
              Forgot Password?
              </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setpassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
          Register Now!
          </Link>
        </p>
      </div>
    </div>
    )
};

export default SignIn;
