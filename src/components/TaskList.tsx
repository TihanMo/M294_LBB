import {Task} from "./interfaces";

export interface IProps {
    tasks: Task[];
    deleteTask: (tasks:Task) => void;
    taskToEdit: (task:Task) => void;    
}

function TaskList(props: IProps){
    return (
        <>
            <ul>
                {props.tasks.map((todo: Task) => (
                    <li key={todo.id}>{todo.title} {todo.completed ? <div className="completed_task">Completed</div> : <div className="uncompleted_task">Not Completed</div>} 
                    <button onClick={() => props.deleteTask(todo)}>Delete</button>
                    <button onClick={() => props.taskToEdit(todo)}>Edit</button></li>
                ))}
            </ul>
        </>
    );
}

export default TaskList;