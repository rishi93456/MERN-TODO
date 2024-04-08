import React, { useState } from "react"
import axios from 'axios'
import { BASEURL } from "./url"

function Create({ setTodos }) {
    const [task, setTask] = useState("");
      

    const handleAdd = () => {
        axios.post(`${BASEURL}add`, { task: task })
            .then(result => {
                setTodos(prevTodos => [...prevTodos, result.data]);
                setTask("");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="create_form">
            <input type="text" name="" id="" placeholder="enter task" value={task} onChange={(e) => setTask(e.target.value)} />
            <button type="button" onClick={handleAdd}> ADD</button>
        </div>
    );
}

export default Create;
