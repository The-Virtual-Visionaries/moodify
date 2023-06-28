import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Homepage from './pages/Homepage';
import Landingpage from './pages/Landingpage';
import Mood from './pages/Mood';
import Grateful from './pages/Grateful';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/grateful" element={<Grateful />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;