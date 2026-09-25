import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null)

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);

    const refreshSession = async () => {
        const storedToken = localStorage.getItem("token");
        if(!storedToken){
            setUser(null);
            setToken(null);
            setLoading(false);
            return;
        }
        try{
            const { data } = await api.get("user/auth/session")
            setUser(data.user)
        }catch(error){
            // Token is invalid, clear it
            localStorage.removeItem("token")
            setUser(null)
            setToken(null)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshSession();
    }, []);

    const login = async (email, password) => {
        const {data} = await api.post("/user/login", {email,password})
        console.log(data);
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
        return data.user;
    }

    const logout = async () => {
        localStorage.removeItem("token")
        setToken(null);
        setUser(null);
    }

    const value = { user, token, login, logout, loading, refreshSession}

    return <AuthContext.Provider value = {value} >
        {children}
    </AuthContext.Provider>
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context) throw new Error("UseAuth must be used within AuthProvider");
    return context;
}
