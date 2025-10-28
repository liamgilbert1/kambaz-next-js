import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { todo } from "node:test";
import { ListGroupItem, Button } from "react-bootstrap";

export default function TodoItem(todo: any) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id}>
      <Button
        variant="danger"
        className="me-2"
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
      >
        {" "}
        Delete{" "}
      </Button>
      <Button
        variant="primary"
        className="me-2"
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
      >
        {" "}
        Edit{" "}
      </Button>
      {todo.title}
    </ListGroupItem>
  );
}
