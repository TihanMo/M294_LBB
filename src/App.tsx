import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Task } from './components/interfaces';
import TaskList from './components/TaskList';
import EditTaskForm from './components/EditTaskForm';

sessionStorage.setItem(`token`, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imxha3NqZmthc2RqZiIsImlhdCI6MTY3NTQzMDgzNH0.iBaXoo6orDtnprbwIH2ol8fDKy5k7wKIJ8lE-VzBv4o" )
const token = sessionStorage.getItem("token");

let emptyTask : Task = {"id":0, "title":"", "completed":false};

function App() {
  const [tasks, setTasks ]=useState<[] | Task[]>([]);
  const [taskToEdit, setTaskToEdit]= useState(emptyTask);
  const [taskToCreate, setTaskToCreate]= useState(emptyTask);

  const fetchData = () => {

    axios.get<Task[]>("http://127.0.0.1:3000/auth/jwt/tasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => setTasks(response.data));
  }

  function createTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios.post("http://127.0.0.1:3000/auth/jwt/tasks", taskToCreate, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        fetchData();
        setTaskToCreate(emptyTask);
      })
      .catch(error => console.log(error));
  }

  function deleteTask(taskToDelete:Task) {
    //let answer = window.confirm("Are you serious right now bro?")
    if (true){ //condition answer would be here
      axios.delete<Task>("http://127.0.0.1:3000/auth/jwt/task/"+ taskToDelete.id, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(()=>{
      fetchData();
    })} else {

    }
  }

  function editTask(task:Task) {
    setTaskToEdit(task);
  }

  function taskEdited(task:Task){
    axios.put("http://127.0.0.1:3000/auth/jwt/tasks", task, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      fetchData();
    })
  }

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="App">
      <h1>My Tasks</h1>
      <form onSubmit={createTask}>
        <input type="text" value={taskToCreate.title} onChange={e => setTaskToCreate({...taskToCreate, title: e.target.value})} />
        <button>Add Task</button>
      </form>
      <EditTaskForm taskToEdit={taskToEdit} taskEdited={taskEdited} />
      <TaskList tasks={tasks} deleteTask={deleteTask} taskToEdit={editTask}></TaskList>
    </div>
  );
}

export default App;
