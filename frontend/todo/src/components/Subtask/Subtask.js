import "./subtask.css";
import {useState} from "react";
import postData from "../../Util";
import CheckBox from "../CheckBox/CheckBox";

function Subtask({ _id, subtask, updateSubtask}) {
    const updateSubtaskStatus = (status) => {
        postData("http://localhost:5000/update-subtask", { _id, subtask_id: subtask._id, status })
            .then((data) => {
                const subtasks = data.subtasks;
                const updatedsubtask = subtasks[subtasks.findIndex(el => el._id === subtask._id)];
                updateSubtask(subtask._id, updatedsubtask )
            })
            .catch((err)=>console.log(err))
    }
    return (
        <div className="subtask-con">
            <input onChange={(e) => updateSubtaskStatus(e.target.checked ? 
            "completed" : "pending")}
            checked={subtask.status === "pending"?false:true}
                type="checkbox" />
            <p
                style={{
                    textDecoration: subtask.status === "pending" ?
                        "none" : "line-through"
                }}>{subtask.title}</p>
        </div>
    )
}

export default Subtask;