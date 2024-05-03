import {createContext, ReactNode, useContext, useState} from "react";

interface AuthContextType {
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const API_URL = '/api';

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    async function login(username: string, password: string) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username: username, password: password }),
            });

            if (response.ok) {
                const {message} = await response.json();
                console.log('Login successful: ', message);
                setIsLoggedIn(true);
            } else {
                const {message} = await response.json();
                console.error('Login failed: ', message);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error logging in: ', error);
        }
    }

    async function register(username: string, email: string, password: string) {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ username, email, password }),
        });

        if (response.ok) {
            const {message} = await response.json();
            setIsLoggedIn(true);
        }else{
            const {message} = await response.json();
            setIsLoggedIn(false);
        }
    }

    async function logout() {
        await fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include',
        });
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                register,
                logout,
                isLoggedIn
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a AuthProvider');
    }
    return context;
}
