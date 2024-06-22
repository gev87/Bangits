import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Card, CardContent, Typography } from "@mui/material";

const TrashList: FC = () => {
	const todos = useSelector((state: RootState) =>
		state.todos.todos.filter((todo) => todo.status === "removed")
    );
    
	if (!todos.length) {
		return (
			<Typography variant="h6" color="textSecondary">
				No items in the trash.
			</Typography>
		);
	}

	return (
		<div style={{ display: "flex", flexWrap: "wrap", gap: "30px" }}>
			{todos.map((todo) => (
				<Card key={todo.id} variant="outlined" style={{ margin: "10px 0", width: "300px" }}>
					<CardContent>
						<Typography variant="h5" component="div">
							{todo.title}
						</Typography>
						<Typography color="textSecondary">{todo.description}</Typography>
						<Typography color="textSecondary">{todo.deadline}</Typography>
						<Typography color="textSecondary">{todo.status}</Typography>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default TrashList;
