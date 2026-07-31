
import { Trash2, Edit3 } from 'lucide-react';
import type { TodoTask, TodoCategory } from '../types/todo';

type TaskItemProps = {
    task: TodoTask;
    categories: TodoCategory[];
    onToggle: (id: number) => void;
    onEdit: (task: TodoTask) => void;
    onDelete: (id: number) => void;
};

function TaskItem({
    task,
    categories,
    onToggle,
    onEdit,
    onDelete
}: TaskItemProps) {
    return (
        <article className={`task-item ${task.completed ? 'completed' : ''}`} key={task.id}>
            <label className="task-check">
                <input type="checkbox" checked={task.completed} onChange={(e) => onToggle(task.id)} />
                <span>
                    <h2>{task.title}</h2>
                    <p>
                        {categories.find(item => item.id === task.category)?.name} · {task.dueDate}</p>
                </span>
            </label>
            <div className="task-actions">
                <button className="icon-button" onClick={() => onEdit(task)}>
                    <Edit3 size={16} />
                </button>
                <button className="icon-button" type="button" onClick={() => onDelete(task.id)}>
                    <Trash2 size={16} />
                </button>
            </div>
        </article>
    )
}



export default TaskItem;