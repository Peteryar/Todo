function CheckBox({doneCount, tasksCount, update, task}) {
    return (
        <section className="sec1-first">
            <input checked={task.status ==="pending"?false:true}
                onChange={(e) => update(e.target.checked ? "completed" : "pending")} type="checkbox" />
            <p style={{ textDecoration:task.status!=="pending"?"line-through" : "none" }}>{task.title}</p>
        </section>)
}

export default CheckBox;