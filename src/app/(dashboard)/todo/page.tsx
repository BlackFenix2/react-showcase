"use client";

import * as React from "react";
import {
  ListItem,
  Fade,
  Button,
  TextField,
  ListItemText,
  Checkbox,
  Grid,
  Fab,
  ListItemIcon,
  IconButton,
  List,
  InputAdornment,
} from "@mui/material";
import { Add, Delete, Padding } from "@mui/icons-material";
import { useStoreState, useStoreActions } from "@/state/hooks";
import { PageContainer } from "@toolpad/core/PageContainer";

const Todo = () => {
  const [task, setTask] = React.useState("");

  const todoModel = useStoreState((state) => state.todo);
  const todoActions = useStoreActions((actions) => actions.todo);

  type Todo = (typeof todoModel.todoList)[number];

  const clearInput = () => {
    setTask("");
  };

  const handleTaskChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTask(value);
  };

  const handleAddTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    todoActions.addTodo(task);
    clearInput();
  };

  const handleClearTodoList = () => {
    todoActions.clearTodoList();
    clearInput();
  };

  const handleClearTodo = (todo: Todo) => {
    todoActions.clearTodo(todo);
    clearInput();
  };

  const handleToggleTask = (todo: Todo) => {
    todoActions.toggleTodo(todo);
  };

  return (
    <PageContainer title="Everyone makes a todo list, so why not? 🤷">
      <Grid>
        <form onSubmit={handleAddTodo}>
          <TextField
            required
            value={task}
            label="Task"
            onChange={handleTaskChange}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Button type="submit" size="small" color="primary">
                      <Add />
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
        </form>
        <Button
          sx={{ marginTop: 1 }}
          variant="contained"
          color="error"
          onClick={handleClearTodoList}
        >
          Clear TODO List
        </Button>
        <div>
          <List>
            {todoModel.todoList.map((todo, idx) => (
              <Fade in key={idx}>
                <ListItem
                  onClick={() => handleToggleTask(todo)}
                  secondaryAction={
                    <IconButton onClick={() => handleClearTodo(todo)}>
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText primary={todo.task} />
                  <ListItemIcon>
                    <Checkbox checked={todo.isComplete} />
                  </ListItemIcon>
                </ListItem>
              </Fade>
            ))}
          </List>
        </div>
        <div>
          <p>
            Completed Tasks:
            {todoModel.completedTasks}
          </p>
        </div>
      </Grid>
    </PageContainer>
  );
};

export default Todo;
