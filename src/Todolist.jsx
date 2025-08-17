import React, { useState } from "react";
import { TextField, Button, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UndoIcon from "@mui/icons-material/Undo";
import { v4 as uuidv4 } from "uuid";
import "./Todolist.css";

export default function Todolist() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  // Add new task
  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), text: task, isDone: false }]);
    setTask(""); // reset input
  };

  // Delete task
  const deleteTask = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Mark task as done
  const markDone = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isDone: true } : t
      )
    );
  };

  // Undo task
  const undoTask = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isDone: false } : t
      )
    );
  };

  // Clear all tasks
  const clearAll = () => {
    setTodos([]);
  };

  return (
    <Box className="todo-container">
      <h1 className="title">My Todo List </h1>

      <Box className="input-box">
        <TextField
          label="Enter a task"
          variant="outlined"
          fullWidth
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTask}
          sx={{ marginLeft: "10px" }}
        >
          Add
        </Button>
      </Box>

      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t.id} className={t.isDone ? "done" : ""}>
            <span>{t.text}</span>
            <div>
              {!t.isDone ? (
                <IconButton color="success" onClick={() => markDone(t.id)}>
                  <CheckCircleIcon />
                </IconButton>
              ) : (
                <IconButton color="warning" onClick={() => undoTask(t.id)}>
                  <UndoIcon />
                </IconButton>
              )}
              <IconButton color="error" onClick={() => deleteTask(t.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <Button
          variant="outlined"
          color="error"
          onClick={clearAll}
          className="clear-btn"
        >
          Clear All
        </Button>
      )}
    </Box>
  );
}
