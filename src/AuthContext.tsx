import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'

interface AuthContextType {
    accessToken: string | null
    setAccessToken: (token: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'))
    // const [accessToken, setAccessToken] = useState<string | null>(null)

    useEffect(() => {
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)
        } else {
          localStorage.removeItem('accessToken')
        }
      }, [accessToken])
    
    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken }}>
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
