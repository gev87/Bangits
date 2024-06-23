import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Grid, Typography } from "@mui/material";
import TrashItem from "./TrashItem";

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
      <Grid container spacing={3}>
        {todos.map((todo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={todo.id}>
            <TrashItem todo={todo}></TrashItem>
          </Grid>
        ))}
      </Grid>
  );
};

export default TrashList;
