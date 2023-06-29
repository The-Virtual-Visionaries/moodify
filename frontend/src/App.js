import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import Homepage from "./pages/Homepage"
import Landingpage from "./pages/Landingpage"
import Mood from "./pages/Mood"
import Grateful from "./pages/Grateful"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/grateful" element={<Grateful />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
