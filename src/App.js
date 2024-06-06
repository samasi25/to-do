import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <a className="navbar-brand" href="#">To-Do App</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Tasks</a>
            </li>
          </ul>
        </div>
      </nav>
      <TaskInput />
      <TaskList />
    </div>
  );
}

export default App;
