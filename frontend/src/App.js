import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./components/error/NotFound"
import Unauthorised from "./components/error/Unauthorised"
import Login from "./components/public/Login"
import Signup from "./components/public/Signup"
import { AuthProvider } from "./hooks/useAuth"
import Grateful from "./pages/Grateful"
import Homepage from "./pages/Homepage"
import Landingpage from "./pages/Landingpage"
import Mood from "./pages/Mood"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mood"
            element={
              <ProtectedRoute>
                <Mood />
              </ProtectedRoute>
            }
          />
          <Route
            path="/grateful"
            element={
              <ProtectedRoute>
                <Grateful />
              </ProtectedRoute>
            }
          />
          <Route path="/401" element={<Unauthorised />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <NotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
