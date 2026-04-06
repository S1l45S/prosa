"use client";
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token) handleToken(token);
        setLoading(false);
    }, []);

    function getToken() {
        if (typeof document === "undefined") return null;
        const match = document.cookie.match(/token=([^;]+)/);
        return match ? match[1] : null;
    }

    function handleToken(token) {
        try {
            const decoded = jwtDecode(token);

            const now = Date.now() / 1000;

            if (decoded.exp < now) {
                logout();
                return;
            }

            setUser({
                id: decoded.id,
                nickName: decoded.nickName
            });

        } catch {
            logout();
        }
    }

    function login(token) {
        document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
        handleToken(token);
    }

    function logout() {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}