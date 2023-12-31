import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./components/error/NotFound"
import Unauthorised from "./components/error/Unauthorised"
import { AuthProvider } from "./hooks/useAuth"
import Account from "./pages/Account"
import UserContacts from "./pages/Account/UserContacts"
import Grateful from "./pages/Grateful"
import Homepage from "./pages/Homepage"
import Landingpage from "./pages/Landingpage"
import LoginPage from "./pages/LoginPage"
import Mood from "./pages/Mood"
import JoinConsult from "./pages/Patient/PatientConsult/JoinConsult"
import PatientConsult from "./pages/Patient/PatientConsult/PatientConsult"
import ScheduleConsult from "./pages/Patient/PatientConsult/ScheduleConsult"
import PatientResources from "./pages/Patient/PatientResources"
import SignupPage from "./pages/SignupPage"
import TherapistConsult from "./pages/Therapist/TherapistConsult"
import Therapists from "./pages/Therapists"

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
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <PatientResources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consult"
            element={
              <ProtectedRoute>
                <PatientConsult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consult/join"
            element={
              <ProtectedRoute>
                <JoinConsult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/consult/schedule"
            element={
              <ProtectedRoute>
                <ScheduleConsult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/consult"
            element={
              <ProtectedRoute>
                <TherapistConsult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-contact"
            element={
              <ProtectedRoute>
                <UserContacts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/therapists"
            element={
              <ProtectedRoute>
                <Therapists />
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
