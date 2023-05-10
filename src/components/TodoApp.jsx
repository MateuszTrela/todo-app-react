import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import TodoComponent from './TodoComponetn.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import AuthProvider, { useAuth } from './security/AuthContext.js'

function AuthenticatedRoute( {children} ){
    const authContext = useAuth()
    if(authContext.isAuthenticated){
        return children
    }
    return <Navigate to = '/' />
       
}

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                        <Routes>
                            <Route path='/' element={<LoginComponent />} />
                            <Route path='/login' element={<LoginComponent />} />

                            <Route path='/welcome/:username' element={
                                <AuthenticatedRoute>
                                    <WelcomeComponent />
                                </AuthenticatedRoute>
                            } />

                            <Route path='/todos' element={
                                <AuthenticatedRoute>
                                    <ListTodosComponent />
                                </AuthenticatedRoute>
                            } />

                            <Route path='/todo/:id' element={
                                <AuthenticatedRoute>
                                    <TodoComponent />
                                </AuthenticatedRoute>
                            } />

                            <Route path='/logout' element={
                                <AuthenticatedRoute>
                                    <LogoutComponent />
                                </AuthenticatedRoute>
                            } />

                        </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}