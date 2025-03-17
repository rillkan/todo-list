import { Card, Badge, Button } from "react-bootstrap";
import { TodoItem } from "../types/TodoItem";

type TodoCardProps = {
  todo: TodoItem;
  onDelete: () => void;
};

export default function TodoCard({ todo, onDelete }: TodoCardProps) {
  return (
    <Card className="my-3">
      <Card.Body>
        <Card.Title>{todo.activity}</Card.Title>
        <Card.Text>
          Price: ${todo.price} <br />
          Type: {todo.type} <br />
          Booking Required: {todo.bookingRequired ? "Yes" : "No"} <br />
          Accessibility: {todo.accessibility}
        </Card.Text>
        <Badge bg={todo.bookingRequired ? "success" : "danger"}>
          {todo.bookingRequired ? "Booking Required" : "No Booking Required"}
        </Badge>
        <Button variant="danger" className="ms-2" onClick={onDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}