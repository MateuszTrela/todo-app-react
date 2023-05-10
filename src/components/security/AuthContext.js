import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider( {children} ){

    const [isAuthenticated, SetAuthenticated] = useState(false)

    function login(username, password){
        if(username==='Mat' && password==='password'){
            SetAuthenticated(true)
            return true
        } else {
            SetAuthenticated(false)
            return false
        }
    }

    function logout(){
        SetAuthenticated(false)
    }


    return(
        <AuthContext.Provider value={ {isAuthenticated, SetAuthenticated, login, logout} }>
            { children }
        </AuthContext.Provider>
    )
}