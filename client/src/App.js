import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'


import About from "./components/about_us";
import Home from "./components/home";
import SignIn from './components/signin';
import Register from './components/register';
import Forget from './components/forget';
import Welcome from './components/welcome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/about" element={<About></About>}></Route>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/forget" element={<Forget></Forget>}></Route>
          <Route path="/welcome" element={<Welcome></Welcome>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
