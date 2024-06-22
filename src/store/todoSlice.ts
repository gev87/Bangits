import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
	id: string;
	title: string;
	description?: string;
	deadline?: string;
	status: "pending" | "completed" | "overdue" | "removed";
}

export interface TodoState {
	todos: Todo[];
}

const initialState: TodoState = {
	todos: [],
};

const todoSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<Omit<Todo, "id">>) => {
			const newTodo: Todo = { ...action.payload, id: crypto.randomUUID(), status: "pending" };
			state.todos.push(newTodo);
		},
		updateTodo: (state, action: PayloadAction<Todo>) => {
			const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
			if (index !== -1) {
				const now = new Date().toISOString();
				const updatedTodo = { ...action.payload };
					if (
						updatedTodo.status === "overdue" &&
						updatedTodo.deadline &&
						updatedTodo.deadline > now
					) {
						updatedTodo.status = "pending";
					}
					state.todos[index] = updatedTodo;
			}
		},
		deleteTodo: (state, action: PayloadAction<string>) => {
			const index = state.todos.findIndex((todo) => todo.id === action.payload);
			if (index !== -1) {
				state.todos[index].status = "removed";
			}
		},
		toggleComplete: (state, action: PayloadAction<string>) => {
			const index = state.todos.findIndex((todo) => todo.id === action.payload);
			if (index !== -1 && state.todos[index].status !== "overdue") {
				state.todos[index].status =
					state.todos[index].status === "completed" ? "pending" : "completed";
			}
		},
		checkOverdue: (state) => {
			const now = new Date().toISOString();
			state.todos.forEach((todo) => {
				if (todo.deadline && todo.deadline < now && todo.status === "pending") {
					todo.status = "overdue";
				}
			});
		},
		
	},
});

export const { addTodo, updateTodo, deleteTodo, toggleComplete, checkOverdue } = todoSlice.actions;
export default todoSlice.reducer;
