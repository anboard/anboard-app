import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Index from "./components/Index";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import AdminMail from "./components/AdminMail";
import ProtectedRoute from "./components/ProtectedRoute";
import VideoUploader from "./components/VideoUploader";
import Layout from "./components/Layout";
import Dash from "./components/Dash";
import NewVideoList from "./components/NewVideoList";
import NProfilePage from "./components/ProfilePage";


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/auth/register" element={<RegistrationPage />} />
          <Route path="/auth/login" element={<LoginPage />} />

          <Route path="/api/admin/mail" element={<AdminMail />} />

          <Route
            path="/api/anb-broadcaster/"
            element={
              <ProtectedRoute>
                {/* <DashboardPage /> */}
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/api/anb-broadcaster/dashboard"
              element={
                <ProtectedRoute>
                  <Dash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/anb-broadcaster/videos"
              element={
                <ProtectedRoute>
                  <NewVideoList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/anb-broadcaster/videos/upload"
              element={
                <ProtectedRoute>
                  <VideoUploader />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/anb-broadcaster/profile"
              element={
                <ProtectedRoute>
                  <NProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        {/* </Layout> */}
      </Router>
    </AuthProvider>
  );
};

export default App;
