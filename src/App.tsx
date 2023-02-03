import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Task } from './components/interfaces';
import TaskList from './components/TaskList';
import EditTaskForm from './components/EditTaskForm';

let url = "http://localhost:3000";

let emptyTask : Task = {"id":0, "title":"", "completed":false};

function App() {
  const [tasks, setTasks ]=useState<[] | Task[]>([]);
  const [taskToEdit, setTaskToEdit]= useState(emptyTask);

  const fetchData = () => {
    axios.get<Task[]>(url+"/tasks").then((response) => setTasks(response.data));
  }

  const createTask = () => {
    axios.post<Task>('http://localhost:3001/tasks', {
    title: tasks
    })
    .then(response => {
      setTasks([...tasks, response.data]);
    })
    .catch(error => {
      console.error(error);
    });
  }

  function deleteTask(taskToDelete:Task) {
    let answer = window.confirm("Are you serious right neow bro?")
    if (answer){
      axios.delete<Task>(url+ "/task/"+ taskToDelete.id).then(()=>{
      fetchData();
    })} else {

    }
  }

  function editTask(task:Task) {
    setTaskToEdit(task);
  }

  function taskEdited(task:Task){
    axios.post<Task>(url+ "localhost:3000/tasks", task)
    .then((response) => {
      setTaskToEdit(response.data)
    })
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="App">
      <h1>My Tasks</h1>
      <EditTaskForm taskToEdit={taskToEdit} taskEdited={taskEdited} />
      <TaskList tasks={tasks} deleteTask={deleteTask} taskToEdit={editTask}></TaskList>
    </div>
  );
}

export default App;
