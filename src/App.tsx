import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Button, Form, Modal, Card, Col, Row, Badge } from "react-bootstrap";
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

  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSave = () => {
    const updatedTodos = [...todos, todo];
    setTodos(updatedTodos);
    setTodo({
      activity: "",
      price: 0,
      type: "education",
      bookingRequired: false,
      accessibility: 0.5,
    });
    setShowModal(false);
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="m-3">
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Activity
      </Button>

      <div className="mt-4">
        {todos.length > 0 && (
          <>
            <h3>Todo List: {todos.length} item{todos.length > 1 ? "s" : ""}</h3>
            <Row>
              {todos.map((item, index) => (
                <Col md={4} key={index}>
                  <Card className="my-3">
                    <Card.Body>
                      <Card.Title>{item.activity}</Card.Title>
                      <Card.Text>
                        Price: ${item.price} <br />
                        Type: {item.type} <br />
                        Booking Required: {item.bookingRequired ? "Yes" : "No"} <br />
                        Accessibility: {item.accessibility}
                      </Card.Text>
                      <Badge bg={item.bookingRequired ? "success" : "danger"}>
                        {item.bookingRequired ? "Booking Required" : "No Booking Required"}
                      </Badge>
                      <Button variant="danger" className="ms-2" onClick={() => deleteTodo(index)}>
                        Delete
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
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
                {[
                  "education",
                  "recreational",
                  "social",
                  "diy",
                  "charity",
                  "cooking",
                  "relaxation",
                  "music",
                  "busywork",
                ].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-5">
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
