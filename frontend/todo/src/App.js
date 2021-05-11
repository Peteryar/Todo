import { useState, useRef } from "react";
import './App.css';

import Todo from "./components/Todo/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const inputEl = useRef(null);

  const addTodo = ()=>{
    //reset input field
    inputEl.current.value = "";
    setInputVal("");

    setTodos([...todos, inputVal])
    console.log(todos)
  }
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
        {todos.map((todo, i) => <Todo
          //updateTodos={(_id, todo) => updateTodo(_id, todo)}
          todo={todo} key={i} />)}
      </section>
    </div>
  );
}

export default App;
