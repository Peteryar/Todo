import { useRef, useState, useEffect } from "react";
import "./todo.css";
import Subtask from "../Subtask/Subtask";
import postData from "../../Util";
import CheckBox from "../CheckBox/CheckBox";

function Todo({ todo, updateTodo }) {
    const [subtasks, setSubtasks] = useState(todo.subtasks);
    const [show, setShow] = useState("none");

    let doneTasksCount = subtasks.filter(task => task.status === "completed").length;

    const [inputVal, setInputVal] = useState("")
    const inputEl = useRef(null);

    useEffect(() => {
        //ensures subtasks gets updated when main tasks changes;
        setSubtasks(todo.subtasks)
    }, [todo])

    const addSubtask = () => {
        if (inputVal.length < 2) {
            alert("Provide Valid task name");
            return
        }
        setSubtasks([...subtasks, { title: inputVal, status: "pending" }]);

        postData("http://localhost:5000/add-subtask", { _id: todo._id, title: inputVal })
            .then((data) => setSubtasks([...data.subtasks]))
            .catch(err=>console.log(err))

        //reseting input field
        inputEl.current.value = "";
        setInputVal("");
    }

    const updateTodoStatus = (status) => {
        postData("http://localhost:5000/update-todo", { _id: todo._id, status })
            .then((data) => updateTodo(todo._id, data))
            .catch((err) => console.log("err", err))
    }
    const updateSubtask = (id, task) => {
        subtasks[subtasks.findIndex(el => el._id === id)] = task;
        setSubtasks([...subtasks]);
    }
    return (
        <div>
            <div className="sec1">
                <CheckBox update={(status) => updateTodoStatus(status)}
                    title={todo.title}
                    tasksCount={subtasks.length} doneCount={doneTasksCount} />
                <section className="sec1-second">
                    {subtasks.length > 0 && <p>{doneTasksCount} completed of {subtasks.length}</p>}
                    {show === "none" ? <i onClick={() => setShow("block")}
                        className="fas fa-chevron-down"></i> :
                        <i onClick={() => setShow("none")}
                            className="fas fa-chevron-up"></i>}
                </section>
            </div>
            <section style={{ display: show }}>
                {subtasks.map((subtask, i) => {

                    return <Subtask updateSubtask={(id, task) => updateSubtask(id, task)}
                        _id={todo._id} key={i} subtask={subtask} />
                })}
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