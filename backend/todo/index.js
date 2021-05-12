const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors())
app.use(require("./api"));

//connecting to mongodb database
const db = process.env.db || 
"mongodb+srv://peter:ootou_test@cluster0.7wjw7.mongodb.net/todo?retryWrites=true&w=majority"

mongoose.connect(db,
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("connected successfully to mongodb db"))
.catch(err=>console.log("Fail to connect to mongodb", err));

const port = process.env.PORT || 5000;
app.listen(port, ()=>console.log(`listening at port ${port}...`))