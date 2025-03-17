import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  return (
    <div className="m-3">
      <input
        type="text"
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
      />
      <Button variant="primary" className="ms-3" >
        Add
      </Button>

      {todos.length > 0 && (
        <div>
          <h3>Todo List:</h3>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>{todo}
                <Button variant="danger" className="ms-3" >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;