const express = require("express");
const { Todo, SubTask } = require("./model");

const router = express.Router();

router.post("/add-todo", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).send("Please provide todo title")
        }
        const todo = new Todo({ title: req.body.title });
        const result = await todo.save();
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

router.post("/update-todo", async (req, res) => {
    try {
        const { _id, status } = req.body;
        if (!_id || !status) {
            return res.status(400).send("please Provide valid _id and status");
        }

        const todo = await Todo.findOneAndUpdate({ _id, }, {
            $set: {
                status,
                "subtasks.$[].status": status //this ensure subtasks are updated base on main task status
            }
        }, { new: true });

        res.status(200).send(todo);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
})

router.get("/todos", async (req, res) => {
    try {
        const todos = await Todo.find({}).select("-__v");
        res.status(200).send(todos)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
})

router.post("/add-subtask", async (req, res) => {
    try {
        const { _id, title } = req.body;
        if (!_id || !title) {
            return res.status(400).send("please provide valid task id and subtask title")
        }

        const todo = await Todo.findOne({ _id });
        if (!todo) return res.status(404).send("todo not found");
        todo.subtasks.push(new SubTask({ title }));

        const result = await todo.save();

        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

router.post("/update-subtask", async (req, res) => {
    try {
        const { _id, subtask_id, status } = req.body;
        if (!_id || !subtask_id || !status) return res.status(400)
            .send("please provide task id, subtask id and status");

        const todo = await Todo.findOne({ _id });
        if (!todo) return res.status(404).send("todo not found");

        const subtask = todo.subtasks.id(subtask_id);
        if (!subtask) return res.status(404).send("subtask not found");

        subtask.set({ status });
        const result = await todo.save()
        res.status(200).send(result);

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
})

module.exports = router;
