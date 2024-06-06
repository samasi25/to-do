import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    editTask(state, action) {
      const { id, name, description, date } = action.payload;
      const taskToEdit = state.tasks.find(task => task.id === id);
      if (taskToEdit) {
        taskToEdit.name = name;
        taskToEdit.description = description;
        taskToEdit.date = date;
      }
    },
    toggleTaskDone(state, action) {
      const taskToToggle = state.tasks.find(task => task.id === action.payload);
      if (taskToToggle) {
        taskToToggle.done = !taskToToggle.done;
      }
    },
  },
});

export const { addTask, deleteTask, editTask, toggleTaskDone } = tasksSlice.actions;
export default tasksSlice.reducer;
