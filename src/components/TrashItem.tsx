import { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Todo } from "../store/todoSlice";
import styles from "./TrashItem.module.css";

interface TrashItemProps {
  todo: Todo;
}

const TrashItem: FC<TrashItemProps> = ({ todo }) => {
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
    </Card>
  );
};

export default TrashItem;