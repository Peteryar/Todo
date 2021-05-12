import { useRef, useState } from "react";
import "./todo.css";
import Subtask from "../Subtask/Subtask";
import postData from "../../Util";

function Todo({ todo, updateTodo }) {
    const [subtasks, setSubtasks] = useState(todo.subtasks);
    const [show, setShow] = useState("none");


    const [inputVal, setInputVal] = useState("")
    const inputEl = useRef(null);

    const addSubtask = () => {
        setSubtasks([...subtasks, { title: inputVal }]);

        postData("http://localhost:5000/add-subtask", { _id: todo._id, title: inputVal })
            .then((data) => console.log("fromAPI", data))

        //reseting input field
        inputEl.current.value = "";
        setInputVal("");
    }

    const updateTodoStatus = (status) => {
        postData("http://localhost:5000/update-todo", { _id: todo._id, status })
            .then((data) => updateTodo(todo._id, data))
    }
    const updateSubtask = (id, task) => {
        subtasks[subtasks.findIndex(el => el._id === id)] = task;
        setSubtasks([...subtasks]);
    }
    return (
        <div>
            <div className="sec1">
                <section className="sec1-first">
                    <input checked={todo.status === "pending" ? false : true} onChange={(e) => updateTodoStatus(e.target.checked ? "completed" : "pending")} type="checkbox" />
                    <p style={{ textDecoration: todo.status === "pending" ? "none" : "line-through" }}>{todo.title}</p>
                </section>
                <section className="sec1-second">
                    {show === "none" ? <i onClick={() => setShow("block")}
                        className="fas fa-chevron-down"></i> :
                        <i onClick={() => setShow("none")}
                            className="fas fa-chevron-up"></i>}
                </section>
            </div>
            <section style={{display:show}}>
                {subtasks.map((subtask, i) => <Subtask updateSubtask={(id, task)=>updateSubtask(id, task)} _id={todo._id} key={i} subtask={subtask} />)}
                <div className="sec2-input-con">
                    <input placeholder="Enter Steps to get task done!"
                        onChange={(e) => setInputVal(e.target.value)} ref={inputEl} />
                    <button onClick={addSubtask}>Add Step</button>
                </div>
            </section>
        </div>
    )
}

export default Todo;