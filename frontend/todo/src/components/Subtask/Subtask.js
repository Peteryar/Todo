function Subtask({subtask}){
    return(
        <div>
            <input type="checkbox"/>
            <p>{subtask.title}</p>
        </div>
    )
}

export default Subtask;