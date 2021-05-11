import { useRef, useState } from "react";
import "./todo.css";
import Subtask from "../Subtask/Subtask";
import postData from "../../Util";

function Todo({ todo }) {
    const [subtasks, setSubtasks] = useState(todo.subtasks);


    const [inputVal, setInputVal] = useState("")
    const inputEl = useRef(null);

    const subtasksConEl = useRef(null);
    const [showSubtasks, setShowSubtasks] = useState("hide");

    const addSubtask = () => {
        setSubtasks([...subtasks, { title: inputVal }]);

        postData("http://localhost:5000/add-subtask", { _id:todo._id, title: inputVal })
            .then((data) => console.log("fromAPI", data))

        //reseting input field
        inputEl.current.value = "";
        setInputVal("");
    }

    const toggleShowSubtask = (action) => {
        switch (action) {
            case "hide":
                subtasksConEl.current.className = "";
                setShowSubtasks("show")
                break;
            case "show":
                subtasksConEl.current.className = "sec2"
                setShowSubtasks("hide")
        }
    }
    return (
        <div>
            <div className="sec1">
                <section className="sec1-first">
                    <input type="checkbox" />
                    <p>{todo.title}</p>
                </section>
                <section className="sec1-second">
                    {showSubtasks === "hide" ? <i onClick={() => toggleShowSubtask(showSubtasks)}
                        className="fas fa-chevron-down"></i> :
                        <i onClick={() => toggleShowSubtask(showSubtasks)}
                            className="fas fa-chevron-up"></i>}
                </section>
            </div>
            <section className="sec2" ref={subtasksConEl}>
                {subtasks.map((subtask, i) => <Subtask key={i} subtask={subtask} />)}
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