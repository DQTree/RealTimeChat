import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import UserServices from "@/services/UserServices";
import {router} from "next/client";

interface AuthContextType {
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const API_URL = '/api';

    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const userServices = new UserServices(API_URL);

    async function login(username: string, password: string) {
        await userServices.login(username, password).then(async r => {
            if (r.ok) {
                const {message} = await r.json();
                console.log('Login successful: ', message);
                setIsLoggedIn(true);
            } else {
                const {message} = await r.json();
                console.error('Login failed: ', message);
                setIsLoggedIn(false);
            }
        });
    }

    async function register(username: string, email: string, password: string) {
        await userServices.register(username, email, password).then(r => {
            if(r.ok){
                setIsLoggedIn(true);
            }else{
                setIsLoggedIn(false);
            }
        });
    }

    async function logout() {
        await userServices.logout();
        setIsLoggedIn(false)
    }

    async function checkAuth() {
        await userServices.checkAuth().then(r => {
            if(r) {
                setIsLoggedIn(true)
            }else{
                setIsLoggedIn(false)
            }
        });
    }

    useEffect(() => {
        const fetchAuth = async () => {
            setIsLoading(true);
            await checkAuth()
            setIsLoading(false);
        };

        fetchAuth()
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider
            value={{
                login,
                register,
                logout,
                checkAuth,
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
