import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoItem } from "./types/Todolist types";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState<TodoItem>({
    activity: "",
    price: 0,
    type: "education",
    bookingRequired: false,
    accessibility: 0.5,
  });

  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  //Saving the todos on localStorage 
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //Add Todo Function
  const handleSave = () => {
    setTodos([...todos, todo]);
    setTodo({
      activity: "",
      price: 0,
      type: "education",
      bookingRequired: false,
      accessibility: 0.5,
    });
    setShowModal(false);
  };
  //Delete Todo function
  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="m-3">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Activity
      </Button>
      <h3 className="mt-4">Todo List: {todos.length} item{todos.length > 1 ? "s" : ""}</h3>
      <TodoList todos={todos} onDelete={deleteTodo} />
      <TodoForm show={showModal} todo={todo} setTodo={setTodo} handleSave={handleSave} handleClose={() => setShowModal(false)} />
    </div>
  );
}