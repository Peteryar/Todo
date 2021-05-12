function CheckBox({ doneCount, tasksCount, update, task }) {
    let status = task.status;
    if (tasksCount > 0)
        status = doneCount === tasksCount ? "completed" : "pending";
    return (
        <section className="sec1-first">
            <input checked={status === "pending" ? false : true}
                onChange={(e) => update(e.target.checked ? "completed" : "pending")} type="checkbox" />
            <p style={{ textDecoration: status !== "pending" ? "line-through" : "none" }}>{task.title}</p>
        </section>)
}

export default CheckBox;