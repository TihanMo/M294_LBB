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
                    <li key={todo.id}>{todo.title} 
                    <button onClick={() => props.deleteTask(todo)}>Delete</button>
                    <button onClick={() => props.taskToEdit(todo)}>Edit</button></li>
                ))}
            </ul>
        </>
    );
}

export default TaskList;