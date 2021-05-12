function CheckBox({doneCount, tasksCount, update, title}) {
    return (
        <section className="sec1-first">
            <input checked={doneCount === tasksCount ? true : false}
                onChange={(e) => update(e.target.checked ? "completed" : "pending")} type="checkbox" />
            <p style={{ textDecoration: doneCount === tasksCount ? "line-through" : "none" }}>{title}</p>
        </section>)
}

export default CheckBox;