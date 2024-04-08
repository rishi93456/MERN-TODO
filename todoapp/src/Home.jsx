import React, { useEffect, useState } from "react"
import Create from "./Create"
import axios from 'axios'
import './App.css'
import { BsCircleFill } from 'react-icons/bs'
import { BsFillTrashFill } from 'react-icons/bs'
import { BsFillCheckCircleFill } from "react-icons/bs"
import { BASEURL } from "./url"

function Home() {
    const [todos, setTodos] = useState([])
    useEffect(() => {  
        axios.get(`${BASEURL}get`)
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleEdit = (_id) => {
        axios.put(`${BASEURL}update/${_id}`)
            .then(result => {
                if(result.status === 200) {
                    setTodos(todos.map(todo => todo._id === _id ? result.data : todo));
                }
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (_id) => {
        axios.delete(`${BASEURL}delete/${_id}`)
            .then(() => {
                setTodos(todos.filter(todo => todo._id !== _id));
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="home">
            <h2>To-Do list</h2>
            
            <Create setTodos={setTodos} />
            <br />
            {
                todos.length === 0
                    ?
                    <div><h2>Oops! You have nothing To-Do</h2></div>
                    :
                    todos.map(todo => (
                        <div className="task" key={todo._id}>
                            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                                {todo.done ?
                                <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                                : 
                                <BsCircleFill className="icon"/>
                    }
                            <p className={todo.done? "line_through": ""}> {todo.task}</p>
                        </div>
                        <div>
                            <span><BsFillTrashFill className="icon" 
                            onClick={() => handleDelete(todo._id)}/></span>
                        </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default Home;
