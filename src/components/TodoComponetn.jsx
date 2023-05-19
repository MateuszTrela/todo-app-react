import { useParams } from "react-router-dom"
import { retriveTodoById, createTodo, updateTodo } from "../api/TodoAPIService"
import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

export default function TodoComponent(){

    const authContext = useAuth()

    const {id} = useParams()

    const navigate = useNavigate()

    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')

    useEffect(
        () =>{
            if(id !== 'new'){
                retriveTodo()
            }
        },// [id]
    )

    function retriveTodo(){
        retriveTodoById(authContext.username, id)
        .then(response => {
            setDescription(response.data.description)
            setTargetDate(response.data.targetDate)
        })
        .catch(error => console.log(error))
    }

    function addTodo(values){

        const todo = {
            //id: id,
            username: authContext.username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        console.log("Created todo:", todo)

        if(id==='new'){
            createTodo(authContext.username, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        } else {
            updateTodo(authContext.username, id, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
    }

    function validateInput(values){
        let errors = { }
        if(values.description.length<1){
            errors.description = 'Enter at least 1 characters'
        }

        if(values.targetDate == null || values.targetDate==='' || values.targetDate.length !== 10){
            errors.targetDate = "Enter a valid date"
        }

        return errors
    }

    return (
        <div className="container"> 
            <h1>Enter Your Todo</h1>
            <div>
                <Formik initialValues={ {description, targetDate} }
                    enableReinitialize="true"
                    onSubmit={addTodo}
                    validate = {validateInput}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                name="description"
                                component="div"
                                className="alert alert-warning"
                                />
                                <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>TargetDate</label>
                                    <Field type="date" className="form-control" name="targetDate"  />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="sumit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}