import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (error) {
    console.error('Error saving state to local storage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    state.tasks.tasks.forEach(task => {
      task.date = new Date(task.date);
    });
    return state;
  } catch (error) {
    console.error('Error loading state from local storage:', error);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
