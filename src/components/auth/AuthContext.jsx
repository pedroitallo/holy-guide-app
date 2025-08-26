import React, { createContext, useState, useEffect, useContext } from 'react';
import { User } from '@/api/entities';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            try {
                const currentUser = await User.me();
                setUser(currentUser);
            } catch (error) {
                // Auto-login for development
                const mockUser = {
                    id: 'user_' + Date.now(),
                    email: 'user@example.com',
                    full_name: 'Spiritual Seeker',
                    coins: 10,
                    is_premium: false,
                    role: 'user',
                    created_date: new Date().toISOString(),
                    last_login_date: new Date().toISOString()
                };
                localStorage.setItem('user_data', JSON.stringify(mockUser));
                setUser(mockUser);
            } finally {
                setLoading(false);
            }
        };

        checkUserSession();
    }, []);

    const value = { user, loading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};