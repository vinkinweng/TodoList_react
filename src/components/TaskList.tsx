import type { TodoTask, TodoCategory } from '../types/todo';
import TaskItem from './TaskItem';
type TaskListProps = {
    tasks: TodoTask[];
    categories: TodoCategory[];
    onToggle: (id: number) => void;
    onEdit: (task: TodoTask) => void;
    onDelete: (id: number) => void;
};
function TaskList({
    tasks,
    categories,
    onToggle,
    onEdit,
    onDelete
}: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <section className="tasks-container">
                <p>没有符合条件的任务</p>
            </section>
        );
    }
    return (
        <section className="tasks-container">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    categories={categories}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </section>
    )
}

export default TaskList;