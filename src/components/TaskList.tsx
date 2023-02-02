import { isPropertySignature } from "typescript";
import {Task} from "./interfaces";

export interface IProps {
    tasks: Task[];
    deleteTask: (tasks:Task) => void;
}

function TaskList(props: IProps){
    return (
        <>
            <ul>
                {props.tasks.map((todo: Task) => (
                    <li key={todo.id}>{todo.title} <button onClick={() => props.deleteTask(todo)}>Delete</button></li>
                ))}
            </ul>
        </>
    );
}

export default TaskList;