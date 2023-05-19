import { Link } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

export default function WelcomeComponent(){

    const authContext = useAuth()

    return(
        <div>
            <h1>Welcome, {authContext.username}</h1>
            <Link to="/todos" className="btn btn-primary m-3">Manage your todos</Link>
        </div>
    )
}