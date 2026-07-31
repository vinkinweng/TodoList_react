import { X } from 'lucide-react';
import type { TodoCategory } from '../types/todo';
type TaskFormDialogProps = {
    isOpen: boolean;
    formTitle: string;

    draftTitle: string;
    draftCategoryId: string;
    draftDueDate: string;

    categories: TodoCategory[];

    onTitleChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onDueDateChange: (value: string) => void;
    onSave: () => void;
    onClose: () => void;
};
function TaskFormDialog({
    isOpen,
    formTitle,
    draftTitle,
    draftCategoryId,
    categories,
    draftDueDate,
    onTitleChange,
    onCategoryChange,
    onDueDateChange,
    onSave,
    onClose

}: TaskFormDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="dialog-backdrop">
            <section className="dialog">
                <header className="dialog-header">
                    <h2 id="add-task-title">{formTitle}</h2>
                    <button className="icon-button" type="button" onClick={onClose}>
                        <X size={18} />
                    </button>
                </header>
                <label className="field">
                    <span>标题</span>
                    <input
                        autoFocus
                        value={draftTitle}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') onSave();
                        }}
                        onChange={(event) => onTitleChange(event.target.value)}
                        placeholder="输入任务标题"
                    />
                </label>
                <label className="field">
                    <span>分类</span>
                    <select value={draftCategoryId} onChange={(event) => onCategoryChange(event.target.value)}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </label>
                <label className="field">
                    <span>截止日期</span>
                    <input value={draftDueDate} type="date" onChange={(event) => onDueDateChange(event.target.value)} />
                </label>
                <footer className="dialog-actions">
                    <button className="secondary-button" type="button" onClick={() => onClose()}>取消</button>
                    <button className="primary-button" type="button" onClick={() => onSave()}>保存</button>
                </footer>
            </section>
        </div>
    )
}

export default TaskFormDialog;

