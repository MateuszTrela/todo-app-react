import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginComponent from './LoginComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import TodoComponent from './TodoComponetn.jsx'

export default function TodoApp(){
    return(
        <div className="TodoApp">
            <BrowserRouter>
                <HeaderComponent />
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/todos' element={<ListTodosComponent />} />
                        <Route path='/todo/:id' element={<TodoComponent />} />
                        <Route path='/logout' element={<LogoutComponent />} />

                    </Routes>
            
            </BrowserRouter>
        </div>
    )
}