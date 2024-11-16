import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import Index from './components/Index'
import RegistrationPage from './components/RegistrationPage'
import LoginPage from './components/LoginPage'
import AdminMail from './components/AdminMail'
import DashboardPage from './components/DashboardPage'
import VideoList from './components/VideoList'
import ProfilePage from './components/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute'
import VideoUploader from './components/VideoUploader'


const App: React.FC = () => {
    const pfpLink = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
    return (
        <AuthProvider> 
            <Router>
                <Routes>
                    <Route path="/" element={<Index />} />
                    
                    <Route path="/auth/register" element={<RegistrationPage />} />
                    <Route path="/auth/login" element={<LoginPage />} />

                    <Route path="/api/admin/mail" element={<AdminMail />} />

                    {/* Protected routes */}
                    <Route path="/api/anb-broadcaster/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/api/anb-broadcaster/videos" element={<ProtectedRoute><VideoList /></ProtectedRoute>} />
                    <Route path="/api/anb-broadcaster/videos/upload" element={<ProtectedRoute><VideoUploader /></ProtectedRoute>} />
                    <Route path="/api/anb-broadcaster/profile" element={<ProtectedRoute><ProfilePage pfpLink={pfpLink}/></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
