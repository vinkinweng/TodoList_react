import { Moon, Sun } from 'lucide-react';
import type { TodoTask, TodoCategory, ThemeMode } from '../types/todo';
type SidebarProps = {
    tasks: TodoTask[];   //所有任务
    categories: TodoCategory[];  //所有分类
    selectedCategory: string;  //当前选中的分类
    onSelectCategory: (categoryId: string) => void;  //修改选中分类
    onToggleTheme: () => void; //修改主题
    theme: ThemeMode;
};
function Sidebar({
    tasks,
    categories,
    selectedCategory,
    onSelectCategory,
    onToggleTheme,
    theme
}: SidebarProps) {
    const completedCount = tasks.filter(task => task.completed).length;
    return (
        <aside className='sidebar'>
            <div className="sidebar-header">
                <div className="brand-block">
                    <div className="brand-mark">T</div>
                    <div>
                        <h1>Todo List</h1>
                        <span>Local JSON Workspace</span>
                    </div>
                </div>
                <button className='icon-button' type="button" onClick={onToggleTheme}>
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
            </div>

            <section className="stats-container">
                <div className="stats-dimension-selector">
                    <button className="dimension-btn active" type="button">全部</button>
                    <button className="dimension-btn" type="button">年</button>
                    <button className="dimension-btn" type="button">月</button>
                    <button className="dimension-btn" type="button">周</button>
                    <button className="dimension-btn" type="button">日</button>
                </div>
                <div className="stats-date-range">全部时间</div>
                <div className="stats-data">
                    <div className="stat"><span>总任务</span><strong>{tasks.length}</strong></div>
                    <div className="stat"><span>已完成</span><strong>{completedCount}</strong></div>
                    <div className="stat"><span>完成率</span><strong>{tasks.length ? Math.round((completedCount / tasks.length) * 100) + '%' : '0%'}</strong></div>
                    <div className="stat"><span>无截止日期</span><strong>{tasks.filter((task) => !task.dueDate).length}</strong></div>
                </div>
            </section>

            <section className="categories-section">
                <div className="section-title">分类</div>
                <button className={selectedCategory === "all" ? "category-button active" : "category-button"} type="button" id="all" onClick={() => onSelectCategory("all")}>
                    <span>全部</span>
                    <b>{tasks.length}</b>
                </button>
                {categories.map(category => (
                    <button className={selectedCategory === category.id ? "category-button active" : "category-button"} type="button" id={category.id} onClick={() => onSelectCategory(category.id)} key={category.id}>
                        <span>{category.name}</span>
                        <b>{tasks.filter((task) => task.category == category.id).length}</b>
                    </button>
                ))}
            </section>
        </aside>
    )
}

export default Sidebar;