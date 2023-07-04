import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'

import Navbar from './components/navbar';
import About from "./components/about_us";
import Home from "./components/home";
import SignIn from './components/signin';
import Register from './components/register';
import Forget from './components/forget';
import Profile from './components/profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/*
        * Make sure you will add route to list in Navbar,
        * if you don't want navbar to be shown for that
        * particular page.
        */}
      <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/forget" element={<Forget></Forget>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
