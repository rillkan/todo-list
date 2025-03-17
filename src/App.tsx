import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TodoItem } from "./types/Todolist types";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState<TodoItem>({
    activity: "",
    price: 0,
    type: "education",
    bookingRequired: false,
    accessibility: 0.5,
  });
  const [todos, setTodos] = useState<TodoItem[]>([]);

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

  return (
    <div className="m-3">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Activity
      </Button>

      <div className="mt-4">
        {todos.length > 0 && (
          <>
            <h3>Todo List:</h3>
            <ul>
              {todos.map((item, index) => (
                <li key={index}>
                  {item.activity} - ${item.price} - {item.type} - Booking Required: {item.bookingRequired ? "Yes" : "No"} - Accessibility: {item.accessibility}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Activity</Form.Label>
              <Form.Control
                type="text"
                value={todo.activity}
                onChange={(e) => setTodo({ ...todo, activity: e.target.value })}
                placeholder="Enter activity"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={todo.price}
                onChange={(e) => setTodo({ ...todo, price: parseFloat(e.target.value) })}
                placeholder="Enter price"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={todo.type}
                onChange={(e) => setTodo({ ...todo, type: e.target.value })}
              >
                {["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Booking Required"
                checked={todo.bookingRequired}
                onChange={(e) => setTodo({ ...todo, bookingRequired: e.target.checked })}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Accessibility: {todo.accessibility.toFixed(1)}</Form.Label>
              <Form.Range
                min={0}
                max={1}
                step={0.1}
                value={todo.accessibility}
                onChange={(e) => setTodo({ ...todo, accessibility: parseFloat(e.target.value) })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
