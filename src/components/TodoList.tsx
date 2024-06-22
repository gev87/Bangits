import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TodoItem from "./TodoItem";
import { Todo } from "../store/todoSlice";
import styles from './TodoList.module.css';

interface TodoListProps {
	onEdit: (todo: Todo) => void;
}

const TodoList: FC<TodoListProps> = ({ onEdit }) => {
	const todos = useSelector((state: RootState) => state.todos.todos);
	return (
		<div className={styles.list}>
			{todos
				.filter((todo) => todo.status !== "removed")
				.map((todo) => (
					<TodoItem key={todo.id} todo={todo} onEdit={() => onEdit(todo)} />
				))}
		</div>
	);
};

export default TodoList;
