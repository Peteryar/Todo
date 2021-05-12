import { useState, useRef, useEffect } from "react";
import './App.css';
import postData from "./Util";

import Todo from "./components/Todo/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState(0);

  const [inputVal, setInputVal] = useState("");
  const inputEl = useRef(null);

  const addTodo = ()=>{
    if(inputVal.length < 2){
      alert("Provide valid task name");
      return;
    }
    inputEl.current.value = "";
    setInputVal("");

    setTodos([...todos, { title: inputVal, status:"pending", subtasks: [] }])
    
    postData("http://localhost:5000/add-todo", { title: inputVal })
      .then((data) => setTodos([...todos, data]))
  }

  const updateTodo = (id, todo)=>{
    todos[todos.findIndex(el => el._id === id)]= todo;
    setTodos([...todos]);
  }

  useEffect(()=>{
    fetch(`http://localhost:5000/todos`)
    .then(response => response.json())
    .then(data => setTodos(data))
    .catch(error => console.log(error.messsage))
  }, [])

  return (
    <div className="App">
      <h1>Todo App</h1>
      <section className="main-wrapper">
        <div className="first-input-con">
          <input ref={inputEl}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Enter todo" />
          <button onClick={addTodo}>Create Todo</button>
        </div>
        {todos.map((todo, i) =><Todo updateTodo={updateTodo}  key={i} todo={todo}/>)}
      </section>
    </div>
  );
}

export default App;
