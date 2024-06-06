import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTaskDone } from '../redux/tasksSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskList.css';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({ id: null, name: '', description: '', date: null });
  const editRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        handleCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editRef]);

  const handleDelete = id => {
    dispatch(deleteTask(id));
  };

  const handleEdit = task => {
    setEditingTaskId(task.id);
    setEditedTask({ ...task });
  };

  const handleSave = () => {
    dispatch(editTask(editedTask));
    setEditingTaskId(null);
    setEditedTask({ id: null, name: '', description: '', date: null });
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    setEditedTask({ id: null, name: '', description: '', date: null });
  };

  const handleToggleDone = id => {
    dispatch(toggleTaskDone(id));
  };

  return (
    <ul className="list-group">
      {tasks.map(task => (
        <li key={task.id} className={`list-group-item d-flex justify-content-between align-items-center ${task.done ? 'done' : ''}`}>
          {editingTaskId === task.id ? (
            <div ref={editRef} className="edit-input">
              <input
                type="text"
                className="form-control mb-2"
                value={editedTask.name}
                onChange={e => setEditedTask({ ...editedTask, name: e.target.value })}
              />
              <div className="d-flex">
                <div className="w-50 mr-1">
                  <label htmlFor="taskDescription">Description:</label>
                  <input
                    type="text"
                    id="taskDescription"
                    className="form-control"
                    value={editedTask.description}
                    onChange={e => setEditedTask({ ...editedTask, description: e.target.value })}
                  />
                </div>
                <div className="w-50 ml-1">
                  <label htmlFor="taskDate">Date:</label>
                  <DatePicker
                    id="taskDate"
                    selected={editedTask.date}
                    onChange={date => setEditedTask({ ...editedTask, date })}
                    showTimeSelect
                    minDate={new Date()}
                    dateFormat="Pp"
                    className="form-control"
                  />
                </div>
              </div>
              <button className="btn btn-sm btn-primary mr-2" onClick={handleSave}>Save</button>
              <button className="btn btn-sm btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <>
              <div>
                <div className="task-name">{task.name}</div>
                <div className="task-description">{task.description}</div>
                <div className="task-date">{task.date ? task.date.toLocaleString() : ''}</div>
              </div>
              <div>
                <button className="btn btn-sm btn-link" onClick={() => handleToggleDone(task.id)}>
                  <i className={`fas fa-${task.done ? 'undo' : 'check-circle'}`}></i>
                </button>
                <button className="btn btn-sm btn-link" onClick={() => handleEdit(task)}>
                  <i className="fas fa-edit"></i>
                </button>
                <button className="btn btn-sm btn-link" onClick={() => handleDelete(task.id)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
