import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TodoItem from "./TodoItem";
import { Todo } from "../store/todoSlice";
import { Grid } from "@mui/material";

interface TodoListProps {
  onEdit: (todo: Todo) => void;
}

const TodoList: FC<TodoListProps> = ({ onEdit }) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  return (
    <Grid container spacing={3} justifyContent="center">
      {todos
        .filter((todo) => todo.status !== "removed")
        .map((todo) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            key={todo.id}
          >
            <TodoItem todo={todo} onEdit={() => onEdit(todo)} />
          </Grid>
        ))}
    </Grid>
  );
};

export default TodoList;
