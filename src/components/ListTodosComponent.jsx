import { useEffect, useState } from "react"
import { retriveAllTodosForUsername } from "../api/TodoAPIService"
import { useNavigate } from "react-router-dom"
import { deleteTodoAPI } from "../api/TodoAPIService"
import { useAuth } from "./security/AuthContext"

export default function ListTodosComponent(){

    const [todos, setTodos] = useState([])

    const navigate = useNavigate()

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    useEffect (
        () => refreshTodos()
    )

    function refreshTodos(){
        retriveAllTodosForUsername(authContext.username)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }

    function addnewTodo(){
        navigate(`/todo/new`)
    }

    function updateTodo(id){
        navigate(`/todo/${id}`)
    }

    function deleteTodo(id){
        deleteTodoAPI(authContext.username, id)
        .then(
            () => {
                setMessage(`To-do succesfully delited.`)
                refreshTodos()
            }
        )
        .catch(error => console.log(error))
    }

    return(
        <div className="container" >
            {message && <div className="alert alert-info">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        todos.map(
                            todo => (                        
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{ todo.targetDate?.toString() ?? '' }</td>
                                    <td><button className="btn btn-warning" 
                                                onClick={ () => updateTodo(todo.id)}
                                    > Update</button></td>
                                    <td><button className="btn btn-danger"
                                                onClick={ () => deleteTodo(todo.id)}
                                    >Delete</button></td>
                                </tr>
                            )
                        )
                    }

                    </tbody>
                </table>
                <div className="btn btn-success m-5" onClick={addnewTodo} >ADD NEW</div>
            </div>
        </div>
    )
}