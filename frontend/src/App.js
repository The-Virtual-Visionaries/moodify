import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import Homepage from "./pages/Homepage"
import Landingpage from "./pages/Landingpage"
import Mood from "./pages/Mood"
import Grateful from "./pages/Grateful"
import Login from "./components/public/Login"
import Signup from "./components/public/Signup"
import { AuthProvider } from "./hooks/useAuth"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/grateful" element={<Grateful />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
