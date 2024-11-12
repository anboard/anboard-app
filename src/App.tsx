import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RegistrationPage from './components/RegistrationPage'
import LoginPage from './components/LoginPage'
import AdminMail from './components/AdminMail'
import { AuthProvider } from './AuthContext'
import DashboardPage from './components/DashboardPage'
import VideoList from './components/VideoList'
import VideoPlayer from './components/VideoPlayer'
import ProfilePage from './components/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute';
import VideoUploader from './components/VideoUploader'

const App: React.FC = () => {
    return (
        <AuthProvider> 
            <Router>
                <Routes>
                    <Route path="/auth/register" element={<RegistrationPage />} />
                    <Route path="/auth/login" element={<LoginPage />} />

                    <Route path="/api/admin/mail" element={<AdminMail />} />

                    <Route path="/api/anb-broadcaster/dashboard" element={<ProtectedRoute> <DashboardPage /> </ProtectedRoute>} />

                    <Route path="/api/anb-broadcaster/videos" element={<ProtectedRoute>  <VideoList /> </ProtectedRoute>} />
                    <Route path="/api/anb-broadcaster/videos/upload" element={<VideoUploader />} />
                    <Route path="/api/anb-broadcaster/videos/stream/:filename" element={<VideoPlayer />} />

                    <Route path="/api/anb-broadcaster/profile" element={<ProtectedRoute> <ProfilePage/> </ProtectedRoute>} />

                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
