import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function ProtectedRouteAdmin({ children }) {
    const auth = useAuth();
    if (auth.user.role!=="Admin" ) return <Navigate to='/' replace />

    return (
        <>{children}</>
    )
}
