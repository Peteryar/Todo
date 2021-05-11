const express = require("express");
const {Todo, SubTask} = require("./model");

const router = express.Router();

router.post("/add-todo", async(req, res)=>{
    try {
        if(!req.body.title){
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

module.exports = router;
