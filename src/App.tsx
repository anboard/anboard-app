// App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Index from "./components/Index";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import AdminMail from "./components/AdminMail";
import AdminAccount from "./components/AdminAccount";
import AdminAnnouncement from "./components/AdminAnnouncement";
import AdminNews from "./components/AdminNews";
import AdminDashboard from "./components/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import AdminBroadcasters from "./components/AdminBroadcasters";
import ProtectedRoute from "./components/ProtectedRoute";
import VideoUploader from "./components/VideoUploader";
import Layout from "./components/Layout";
import Dash from "./components/Dash";
import VideoList from "./components/VideoList";
import ProfilePage from "./components/ProfilePage";
import BroadcastStation from "./components/BroadcastStation";
import AudioList from "./components/AudioList";
import AudioUploader from "./components/AudioUploader";
import Unauthorized from "./components/Unauthorized";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<Index />} />
          <Route path="/auth/register" element={<RegistrationPage />} />
          <Route path="/auth/login" element={<LoginPage />} />

          <Route path="/api/admin" element={<AdminLayout />}>
            <Route
              path="mail"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminMail />
                </ProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAccount />
                </ProtectedRoute>
              }
            />
            <Route
              path="announcement"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAnnouncement />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="news"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminNews />
                </ProtectedRoute>
              }
            />
            <Route
              path="Broadcasters"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminBroadcasters />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            path="/api/anb-broadcaster/"
            element={
              <ProtectedRoute allowedRoles={['broadcaster']}>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route
              path="dashboard"
              element={
                <ProtectedRoute allowedRoles={['broadcaster']}>
                  <Dash />
                </ProtectedRoute>
              }
            />
            <Route
              path="videos/upload"
              element={
                <ProtectedRoute allowedRoles={['broadcaster']}>
                  <VideoUploader />
                </ProtectedRoute>
              }
            />
            <Route
              path="videos"
              element={
                <ProtectedRoute allowedRoles={['broadcaster']}>
                  <VideoList />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute allowedRoles={['broadcaster']}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="station"
              element={
                <ProtectedRoute allowedRoles={['broadcaster']}>
                  <BroadcastStation />
                </ProtectedRoute>
              }
            />
            <Route
              path="audios"
              element={
                <ProtectedRoute allowedRoles={['broadcaster']}>
                  <AudioList />
                </ProtectedRoute>
              }
            />
            <Route
              path="audios/upload"
              element={
                <ProtectedRoute allowedRoles={['broadcaster']}>
                  <AudioUploader />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
