import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import config from './config'

interface AuthContextType {
    accessToken: string | null
    setAccessToken: (token: string) => void
    login: (accessToken: string, refreshToken: string) => void
    logout: () => void
    refreshAccessToken: () => Promise<void>
    authError: boolean 
    setAuthError: (error: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('nXNxx'))
    const [authError, setAuthError] = useState(false)

    const isTokenExpired = (token: string | null): boolean => {
        if (!token) return true
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.exp * 1000 < Date.now()
    }

    const login = (accessToken: string, refreshToken: string) => {
        localStorage.setItem('nXNxx', accessToken)
        localStorage.setItem('vvvAAA', refreshToken)
        setAccessToken(accessToken)
        setAuthError(false)
    }

    const logout = () => {
        localStorage.removeItem('nXNxx')
        localStorage.removeItem('vvvAAA')
        setAccessToken(null)
        setAuthError(true)
    }

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('vvvAAA')
        if (!refreshToken) {
            logout()
            return
        }

        try {
            const response = await fetch(`${config.AUTH_BASE_URL}/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
                credentials: 'include'
            })

            if (!response.ok) throw new Error('Failed to refresh token')

            const fetchData = await response.json()
            const newAccessToken = fetchData.data.accessToken
            const newRefreshToken = fetchData.data.refreshToken

            login(newAccessToken, newRefreshToken)
        } catch (error) {
            logout()
        }
    }

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            if (accessToken) {
               login(accessToken, localStorage.getItem('vvvAAA') || '')
              } else {
                logout()
              }
            
            if (accessToken && isTokenExpired(accessToken)) {
                await refreshAccessToken()
            }
        }

        checkAndRefreshToken()
        const interval = setInterval(checkAndRefreshToken, 14 * 60 * 1000) 

        return () => clearInterval(interval)
    }, [accessToken])

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, login, logout, refreshAccessToken, authError, setAuthError }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
