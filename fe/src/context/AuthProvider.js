import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.user?JSON.parse(localStorage.user):null);
    const [token,setToken] = useState(localStorage.token?localStorage.token:null);
    const [pet, setPet] =useState(null);
    const navigate = useNavigate();

    const login = (user,token)=>{
        setUser(user);
        setToken(token)
        localStorage.user = JSON.stringify(user);
        localStorage.token = token;
        navigate("/");
    }
    const logout = ()=>{
        setUser("");
        setToken("");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    }
    const changePet = (pet)=>
        setPet(pet)
    return (
        <AuthContext.Provider value={{ user ,token, login, logout, pet, changePet }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = ()=>{
    return useContext(AuthContext);
}