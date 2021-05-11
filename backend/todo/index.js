const express = require("express");
const mongoose = require("mongoose");

const app = express();

//connecting to mongodb database
const db = "mongodb://localhost/todos";
mongoose.connect(db,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connected successfully to mongodb db"))
.catch(err=>console.log("Fail to connect to mongodb", err));

const port = process.env.PORT || 5000;
app.listen(port, ()=>`listening at port${port}...`)