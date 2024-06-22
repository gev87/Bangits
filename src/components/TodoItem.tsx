import { FC } from "react";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleComplete, Todo } from "../store/todoSlice";
import styles from "./TodoItem.module.css";

interface TodoItemProps {
	todo: Todo;
	onEdit: () => void;
}

const TodoItem: FC<TodoItemProps> = ({ todo, onEdit }) => {
	const dispatch = useDispatch();

	return (
		<Card variant="outlined" className={styles.card}>
			<CardContent>
				<Typography variant="h5" component="div">
					{todo.title}
				</Typography>
				<Typography color="textSecondary">{todo.description}</Typography>
				<Typography color="textSecondary">{todo.deadline}</Typography>
				<Typography color="textSecondary">{todo.status}</Typography>
			</CardContent>
			<CardActions className={styles.cardActions}>
				{todo.status !== "overdue" &&
				<Button size="small" onClick={() => dispatch(toggleComplete(todo.id))}>
					{todo.status === "completed" ? "Unmark" : "Complete"}
				</Button>}
				<Button size="small" onClick={onEdit}>
					Edit
				</Button>
				<Button size="small" onClick={() => dispatch(deleteTodo(todo.id))}>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
};

export default TodoItem;
