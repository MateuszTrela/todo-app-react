import { createContext, useContext, useState } from "react";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider( {children} ){

    const [isAuthenticated, SetAuthenticated] = useState(false)

    const [username, SetUsername] = useState('')

    function login(username, password){
        //if(username==='Mat' && password==='password'){
        if(password==='password'){
            SetAuthenticated(true)
            SetUsername(username)
            console.log(`User=${username} logged in`)
            return true
        } else {
            SetAuthenticated(false)
            console.log('Authentication failed')
            return false
        }
    }

    function logout(){
        SetAuthenticated(false)
        console.log(`User=${username} logged out`)
        SetUsername('')
    }


    return(
        <AuthContext.Provider value={ {isAuthenticated, SetAuthenticated, login, logout, username } }>
            { children }
        </AuthContext.Provider>
    )
}