import "./todo.css";
import Subtask from "../Subtask/Subtask";

function Todo({todo}){
    return (
        <div>
            <section className="sec1">
                <input type="checkbox"/>
                <p>{todo.title}</p>
            </section>
            <section className="sec2">
                {todo.subtasks.map((subtask, i)=><Subtask subtask={subtask}/>)}
                <div className="input2-con">
                    <input/>
                    <button>Add Step</button>
                </div>
            </section>
        </div>
    )
}

export default Todo;