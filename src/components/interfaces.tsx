export type Task = {
    id: number;
    title: string;
    completed: boolean;
};

export interface Props{
    taskToEdit: Task;
    taskEdited: (task:Task) => void;
}