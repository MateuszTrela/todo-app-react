import { useEffect, useState } from "react"
import { retriveAllTodosForUsername } from "../api/TodoAPIService"

export default function ListTodosComponent(){

    const [todos, setTodos] = useState([])

    useEffect (
        () => refreshTodos()
    )

    function refreshTodos(){
        retriveAllTodosForUsername('mat')
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }

    return(
        <div className="container" >
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
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning">Update</button></td>
                                    <td><button className="btn btn-danger">Delete</button></td>
                                </tr>
                            )
                        )
                    }

                    </tbody>
                </table>
                <div className="btn btn-success m-5" >ADD NEW</div>
            </div>
        </div>
    )
}