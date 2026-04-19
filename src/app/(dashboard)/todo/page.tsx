"use client";

import * as React from "react";
import {
  Fade,
  Button,
  TextField,
  ListItemText,
  Checkbox,
  Grid,
  ListItemIcon,
  IconButton,
  List,
  InputAdornment,
  Box,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { Add, AutoAwesome, Delete, LocalFireDepartment, RocketLaunch } from "@mui/icons-material";
import PageContainer from "@/components/layout/PageContainer";
import { useStoreState, useStoreActions } from "@/state/hooks";

const suggestionTasks = [
  "Patch the bug before lunch",
  "Ship one tiny delight",
  "Refactor the scary bit",
  "Write the test future-you wants",
];

const Todo = () => {
  const [task, setTask] = React.useState("");

  const todoModel = useStoreState((state) => state.todo);
  const todoActions = useStoreActions((actions) => actions.todo);

  type Todo = (typeof todoModel.todoList)[number];

  const totalTasks = todoModel.todoList.length;
  const remainingTasks = totalTasks - todoModel.completedTasks;
  const completionRate = totalTasks === 0 ? 0 : Math.round((todoModel.completedTasks / totalTasks) * 100);

  const clearInput = () => {
    setTask("");
  };

  const handleTaskChange = ({ currentTarget: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setTask(value);
  };

  const handleAddTodo = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const trimmedTask = task.trim();

    if (!trimmedTask) {
      return;
    }

    todoActions.addTodo(trimmedTask);
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
    <PageContainer title="Spicy Task Board">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 4,
              color: "#1f1300",
              background:
                "linear-gradient(145deg, rgba(255,190,92,0.95) 0%, rgba(255,121,63,0.95) 52%, rgba(255,84,104,0.95) 100%)",
              boxShadow: "0 24px 60px rgba(173, 58, 20, 0.22)",
            }}
          >
            <CardContent>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AutoAwesome />
                  <Typography variant="overline" sx={{ letterSpacing: "0.2em" }}>
                    HIGH HEAT PLANNING
                  </Typography>
                </Stack>

                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.05 }}>
                    Make the boring list feel like a launch sequence.
                  </Typography>
                  <Typography sx={{ mt: 1.5, opacity: 0.82 }}>
                    Add sharp tasks, clear the noise, and keep the streak alive.
                  </Typography>
                </Box>

                <form onSubmit={handleAddTodo}>
                  <TextField
                    required
                    fullWidth
                    value={task}
                    label="What needs to happen?"
                    placeholder="Close the loop on something important"
                    onChange={handleTaskChange}
                    helperText="Hit enter or the plus button to throw it on the board."
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "rgba(31,19,0,0.72)",
                      },
                      "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink": {
                        color: "#1f1300",
                        backgroundColor: "rgba(255,255,255,0.96)",
                        px: 0.75,
                        borderRadius: 1,
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgba(255,255,255,0.85)",
                      },
                      "& .MuiFormHelperText-root": {
                        color: "rgba(31,19,0,0.78)",
                      },
                    }}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton type="submit" color="primary" sx={{ bgcolor: "rgba(31,19,0,0.08)" }}>
                              <Add />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </form>

                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {suggestionTasks.map((suggestion) => (
                    <Chip
                      key={suggestion}
                      label={suggestion}
                      onClick={() => setTask(suggestion)}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.75)",
                        backdropFilter: "blur(12px)",
                      }}
                    />
                  ))}
                </Stack>

                <Button variant="contained" color="error" onClick={handleClearTodoList}>
                  Clear The Deck
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ borderRadius: 4, bgcolor: "background.paper" }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="overline">Total</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 800 }}>
                          {totalTasks}
                        </Typography>
                      </Box>
                      <RocketLaunch color="primary" />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ borderRadius: 4, bgcolor: "background.paper" }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="overline">Completed</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 800 }}>
                          {todoModel.completedTasks}
                        </Typography>
                      </Box>
                      <LocalFireDepartment sx={{ color: "#ff6b35" }} />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Card sx={{ borderRadius: 4, bgcolor: "background.paper" }}>
                  <CardContent>
                    <Typography variant="overline">Remaining</Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      {remainingTasks}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {completionRate}% complete
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={completionRate}
                      sx={{
                        mt: 1,
                        height: 10,
                        borderRadius: 999,
                        bgcolor: "rgba(255,121,63,0.12)",
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      Task Queue
                    </Typography>
                    <Typography color="text.secondary">
                      Tap a row to mark it done. Delete the dead weight when it deserves it.
                    </Typography>
                  </Box>

                  <Divider />

                  {todoModel.todoList.length === 0 ? (
                    <Box
                      sx={{
                        py: 6,
                        px: 3,
                        textAlign: "center",
                        borderRadius: 3,
                        border: "1px dashed rgba(255,121,63,0.3)",
                        background: "radial-gradient(circle at top, rgba(255,190,92,0.16), transparent 60%)",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        No tasks yet.
                      </Typography>
                      <Typography color="text.secondary">
                        Start with something annoying enough that finishing it will feel excellent.
                      </Typography>
                    </Box>
                  ) : (
                    <List sx={{ p: 0 }}>
                      {todoModel.todoList.map((todo, idx) => (
                        <Fade in key={todo.id}>
                          <Card
                            variant="outlined"
                            sx={{
                              mb: 1.5,
                              borderRadius: 3,
                              borderColor: todo.isComplete ? "rgba(67, 160, 71, 0.28)" : "rgba(255,121,63,0.18)",
                              background: todo.isComplete
                                ? "linear-gradient(90deg, rgba(76,175,80,0.08), rgba(255,255,255,1))"
                                : idx % 2 === 0
                                  ? "linear-gradient(90deg, rgba(255,190,92,0.12), rgba(255,255,255,1))"
                                  : "linear-gradient(90deg, rgba(255,121,63,0.10), rgba(255,255,255,1))",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                px: 2,
                                py: 1,
                                cursor: "pointer",
                              }}
                              onClick={() => handleToggleTask(todo)}
                            >
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <Checkbox checked={todo.isComplete} />
                              </ListItemIcon>
                              <ListItemText
                                primary={todo.task}
                                secondary={todo.isComplete ? "Done and dusted" : "Still cooking"}
                                slotProps={{
                                  primary: {
                                    sx: {
                                      fontWeight: 700,
                                      textDecoration: todo.isComplete ? "line-through" : "none",
                                    },
                                  },
                                }}
                              />
                              <Chip
                                size="small"
                                label={todo.isComplete ? "Complete" : "Active"}
                                color={todo.isComplete ? "success" : "warning"}
                                variant={todo.isComplete ? "filled" : "outlined"}
                              />
                              <IconButton
                                edge="end"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleClearTodo(todo);
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </Box>
                          </Card>
                        </Fade>
                      ))}
                    </List>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Todo;
