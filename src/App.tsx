import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Task } from './components/interfaces';
import TaskList from './components/TaskList';
import EditTaskForm from './components/EditTaskForm';

let url : string = "127.0.0.1:3000/";

let emptyTask : Task = {"id":0, "title":"", "completed":false};

function App() {
  const [tasks, setTasks ]=useState<[] | Task[]>([]);
  const [taskToEdit, setTaskToEdit]= useState(null);

  const fetchData = () => {
    return axios.get<Task[]>(url+"tasks").then((response) => setTasks(response.data));
  }


  function deleteTask(taskToDelete:Task) {
    axios.delete<Task>(url+"task"+ taskToDelete.id).then(()=>{
      fetchData();
    });
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="App">
      <h1>My Tasks</h1>
      <TaskList tasks={tasks} deleteTask={deleteTask}></TaskList>
      <EditTaskForm task={taskToEdit}/>
    </div>
  );
}

export default App;
