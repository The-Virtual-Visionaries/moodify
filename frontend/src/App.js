import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./components/error/NotFound"
import Unauthorised from "./components/error/Unauthorised"
import { AuthProvider } from "./hooks/useAuth"
import Grateful from "./pages/Grateful"
import Homepage from "./pages/Homepage"
import Landingpage from "./pages/Landingpage"
import LoginPage from "./pages/LoginPage"
import Mood from "./pages/Mood"
import SignupPage from "./pages/SignupPage"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
