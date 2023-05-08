import { useParams } from "react-router-dom"
import { retriveTodoById, createTodo, updateTodo } from "../api/TodoAPIService"
import { useEffect, useState } from "react"
import { Formik, Form, Field } from "formik"
import { useNavigate } from "react-router-dom"

export default function TodoComponent(){

    const {id} = useParams()

    const navigate = useNavigate()

    const[description, setDescription] = useState('')
    const[targetDate, setTargetDate] = useState('')
    
    useEffect(
        () =>{
            if(id != -1){
                retriveTodo()
            }
        }, [id]
    )

    function retriveTodo(){
        retriveTodoById('mat', id)
        .then(response => {
            setDescription(response.data.description)
            setTargetDate(response.data.targetDate)
        })
        .catch(error => console.log(error))
    }

    function addTodo(values){
        console.log(values)
        const username = 'Mat'
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        console.log(todo)

        if(id==-1){
            createTodo(username, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        } else {
            updateTodo(username, id, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))
        }
    }

    return (
        <div className="container"> 
            <h1>Enter Your Todo</h1>
            <div>
                <Formik initialValues={ {description, targetDate} }
                    enableReinitialize="true"
                    onSubmit={addTodo}
                >
                    {
                        (props) => (
                            <Form>
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