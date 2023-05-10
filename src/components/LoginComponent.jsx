
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginCoomponent(){

    const[username, setUsername] = useState('Mat')

    const[password, setPassword] = useState('')

    const[showErrorMessage, setShowErrorMesage] = useState(false)

    const naviate = useNavigate()

    function handleUsernameChange(event){
        setUsername(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

    function handelSubmit(event){
        console.log(event)
        if(username=='Mat' && password=='password'){
            console.log('logged')
            naviate(`/welcome/${username}`)
        } else {
            setShowErrorMesage(true)
        }
    }

    return (
        <div className="Login">
            <h1>Please login</h1>

            {showErrorMessage && <div class="alert alert-danger" role="alert"> Wrong Username or Password.</div>}

            <div className="LoginForm">
                <div className="form-group col-xl-2 mx-auto">
                    <label>Username:</label>
                    <input type="text" className="form-control m-3" id="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div className="form-group col-xl-2 mx-auto">
                    <label>Password:</label>
                    <input type="password"  className="form-control m-3" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <button type="button" className="btn btn-primary m-3" onClick={handelSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}