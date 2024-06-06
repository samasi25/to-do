import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskInput.css';

const TaskInput = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState(null);

  const handleAddTask = () => {
    if (taskName.trim()) {
      const id = Date.now(); // Generates a unique ID based on timestamp
      dispatch(addTask({ id, name: taskName, description: taskDescription, date: taskDate }));
      setTaskName('');
      setTaskDescription('');
      setTaskDate(null);
    }
  };

  return (
    <div className="task-input">
      <div className="form-group">
        <label htmlFor="taskName">Task:</label>
        <input
          type="text"
          id="taskName"
          className="form-control"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />
      </div>
      <div className="form-group d-flex">
        <div className="w-50 mr-1">
          <label htmlFor="taskDescription">Description:</label>
          <input
            type="text"
            id="taskDescription"
            className="form-control"
            value={taskDescription}
            onChange={e => setTaskDescription(e.target.value)}
          />
        </div>
        <div className="w-50 ml-1">
          <label htmlFor="taskDate">Date:</label>
          <DatePicker
            id="taskDate"
            selected={taskDate}
            onChange={date => setTaskDate(date)}
            showTimeSelect
            minDate={new Date()}
            dateFormat="Pp"
            className="form-control"
          />
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;
