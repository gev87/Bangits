import  { FC, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Todo, checkOverdue } from "./store/todoSlice";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TrashList from "./components/TrashList";
import { Container, Fab, Tabs, Tab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import styles from "./App.module.css";


const App: FC = () => {
	const dispatch = useDispatch();
	const [showForm, setShowForm] = useState(false);
	const [tab, setTab] = useState(0);
	const [editTodo, setEditTodo] = useState<Todo | null | undefined>(null);

	const handleCloseModal = () => {
		setShowForm(false);
		setEditTodo(null);
	}

	const handleEdit = (todo: Todo) => {
		setEditTodo(todo);
		setShowForm(true);
	};
	
	const handleTabChange = (_: SyntheticEvent, newValue: number) => {
		setTab(newValue);
	};

	useEffect(() => {
		dispatch(checkOverdue());
	}, [showForm, dispatch]);

	return (
		<Container className={styles.container}>
			<h1>Todo List</h1>
			<Tabs value={tab} onChange={handleTabChange} centered className={styles.sectionMargin}>
				<Tab label="Todos" />
				<Tab label="Trash" />
			</Tabs>
			<Box>
				{tab === 0 && (
					<>
						<Fab
							className={styles.sectionMargin}
							color="primary"
							aria-label="add"
							onClick={() => setShowForm(true)}
						>
							<AddIcon />
						</Fab>
						{showForm && <TodoForm onClose={handleCloseModal} editTodo={editTodo} />}
						<TodoList onEdit={handleEdit} />
					</>
				)}
				{tab === 1 && <TrashList />}
			</Box>
		</Container>
	);
};

export default App;
