import { Modal, Button, Form } from "react-bootstrap";
import { TodoItem } from "../types/TodoItem";

type TodoFormProps = {
  show: boolean;
  todo: TodoItem;
  setTodo: (todo: TodoItem) => void;
  handleSave: () => void;
  handleClose: () => void;
};

export default function TodoForm({ show, todo, setTodo, handleSave, handleClose }: TodoFormProps) {
  return (
    <Modal show={show} onHide={handleClose}>
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}