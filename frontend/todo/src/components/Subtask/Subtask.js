import "./subtask.css";

function Subtask({subtask}){
    return(
        <div className="subtask-con">
            <input type="checkbox"/>
            <p>{subtask.title}</p>
        </div>
    )
}

export default Subtask;