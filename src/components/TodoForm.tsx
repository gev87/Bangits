import  { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../store/todoSlice";
import { Todo } from "../store/todoSlice";

interface TodoFormProps {
	editTodo?: Todo | null;
	onClose: () => void;
}

const TodoForm: FC<TodoFormProps> = ({ editTodo, onClose }) => {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			title: editTodo?.title || "",
			description: editTodo?.description || "",
			deadline: editTodo?.deadline || "",
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Title is required"),
			description: Yup.string(),
			deadline: Yup.date(),
		}),
		onSubmit: (values) => {
			if (editTodo) {
				dispatch(updateTodo({ ...editTodo, ...values }));
			} else {
				dispatch(addTodo({ ...values, status: 'pending' }));
			}
			onClose();
		},
	});
	useEffect(() => {
		if (editTodo) {
			formik.setValues({
				title: editTodo.title,
				description: editTodo.description || '',
				deadline: editTodo.deadline || "",
			});
		}
	}, [editTodo]);

	return (
		<Dialog open onClose={onClose}>
			<DialogTitle>{editTodo ? "Edit Todo" : "Add Todo"}</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<TextField
						label="Title"
						name="title"
						value={formik.values.title}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.title && Boolean(formik.errors.title)}
						helperText={formik.touched.title && formik.errors.title}
						fullWidth
						margin="dense"
						required
					/>
					<TextField
						label="Description"
						name="description"
						value={formik.values.description}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.description && Boolean(formik.errors.description)}
						helperText={formik.touched.description && formik.errors.description}
						fullWidth
						margin="dense"
						multiline
					/>
					<TextField
						label="Deadline"
						name="deadline"
						type="date"
						value={formik.values.deadline}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.deadline && Boolean(formik.errors.deadline)}
						helperText={formik.touched.deadline && formik.errors.deadline}
						fullWidth
						margin="dense"
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" color="primary">
						{editTodo ? "Update" : "Add"}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default TodoForm;
