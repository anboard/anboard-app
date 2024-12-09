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

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/auth/register" element={<RegistrationPage />} />
          <Route path="/auth/login" element={<LoginPage />} />

        <Route path="/api/admin" element={<AdminLayout />}>
          <Route path="mail" element={<AdminMail />} />
          <Route path="account" element={<AdminAccount />} />
          <Route path="announcement" element={<AdminAnnouncement />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="Broadcasters" element={<AdminBroadcasters />} />
        </Route>


        

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
              path="/api/anb-broadcaster/videos/upload"
              element={
                <ProtectedRoute>
                  <VideoUploader />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/anb-broadcaster/videos"
              element={
                <ProtectedRoute>
                  <VideoList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/anb-broadcaster/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/api/anb-broadcaster/station"
              element={
                <ProtectedRoute>
                  <BroadcastStation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api/anb-broadcaster/audios"
              element={
                <ProtectedRoute>
                  <AudioList />
                </ProtectedRoute>
              }
            />
             <Route
                path="/api/anb-broadcaster/audios/upload"
                element={
                  <ProtectedRoute>
                    <AudioUploader />
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
