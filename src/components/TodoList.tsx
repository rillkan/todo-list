import { Row, Col } from "react-bootstrap";
import TodoCard from "./TodoCard";
import { TodoItem } from "../types/TodoItem";

type TodoListProps = {
  todos: TodoItem[];
  onDelete: (index: number) => void;
};

export default function TodoList({ todos, onDelete }: TodoListProps) {
  return (
    <Row>
      {todos.map((todo, index) => (
        <Col md={4} key={index}>
          <TodoCard todo={todo} onDelete={() => onDelete(index)} />
        </Col>
      ))}
    </Row>
  );
}