import { Task, Props } from './interfaces';
import { useEffect, useState} from 'react';

const emptyTask : Task = {"title" : "", "completed": false, "id": 0};

function EditTaskForm(props: Props) {
    const [formData, setFormData] = useState<Task>(props.taskToEdit ?? emptyTask);
    
    useEffect(() => setFormData(props.taskToEdit), [props])
    
    function onInputChange(event : React.ChangeEvent<HTMLInputElement>) {
       //name: Name des Formularfelds
       //value: Wert      
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    }

    function onFormSubmit(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.taskEdited(formData);
    }

    return (
        <div className="editTaskForm">
            You're editing: {props.taskToEdit.id}. {props.taskToEdit.title}
            <form onSubmit={onFormSubmit}>
                Bezeichnung: <input type="text" name="title" value={formData.title} onChange={onInputChange} required/>
                <button>Save</button>
            </form>
        </div>
    )
}
export default EditTaskForm;