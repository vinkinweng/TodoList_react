import { Moon, Search, Trash2, Plus, X } from 'lucide-react';
import { useState } from 'react';
import './App.css';

type TodoTask = {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  dueDate: string;
};

const initialTasks: TodoTask[] = [
  { id: 1, title: '完成左侧侧边栏', category: '工作', completed: false, dueDate: '今天' },
  { id: 2, title: '完成左侧侧边栏', category: '学习', completed: false, dueDate: '本周' },
  { id: 3, title: '完成左侧侧边栏', category: '生活', completed: true, dueDate: '无日期' }
];
type TodoCategory = {
  id: string;
  name: string;
  color: string;
};
type TodoData = {
  updatedAt: string;
  tasks: TodoTask[];
  categories: TodoCategory[];
  settings: { theme: 'light' | 'dark' };
};
const fallbackData: TodoData = {
  updatedAt: new Date().toISOString(),
  tasks: [],
  categories: [
    { id: 'work', name: '工作', color: '#2563eb' },
    { id: 'life', name: '生活', color: '#16a34a' },
    { id: 'study', name: '学习', color: '#f59e0b' }
  ],
  settings: { theme: 'light' }
};

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  //弹窗是否显示
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  //分类
  const [draftCategoryId, setDraftCategoryId] = useState('work');
  //日期
  const [draftDueDate, setDraftDueDate] = useState('');
  const [data, setData] = useState(fallbackData);

  //添加任务
  function addTask() {
    const title = draftTitle.trim();
    if (!title) {
      alert('请输入任务标题');
      return;
    }



    setTasks((current) => [
      { id: Date.now(), title, category: draftCategoryId, completed: false, dueDate: draftDueDate },
      ...current
    ]);
    console.log(tasks.values);
    setDraftTitle('');
    setDraftCategoryId('work');
    setDraftDueDate('');
    setIsAddingTask(false);
  }
  return (
    <div className="container">
      <aside className='sidebar'>
        <div className="sidebar-header">
          <div className="brand-block">
            <div className="brand-mark">T</div>
            <div>
              <h1>Todo List</h1>
              <span>Local JSON Workspace</span>
            </div>
          </div>
          <button className='icon-button' type="button"><Moon size={18} /></button>
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
            <div className="stat"><span>总任务</span><strong>12</strong></div>
            <div className="stat"><span>已完成</span><strong>12</strong></div>
            <div className="stat"><span>完成率</span><strong>42%</strong></div>
            <div className="stat"><span>无截止日期</span><strong>12</strong></div>
          </div>
        </section>

        <section className="categories-section">
          <div className="section-title">分类</div>
          <button className="category-button active" type="button"><span>全部</span><b>12</b></button>
          <button className="category-button" type="button"><span>工作</span><b>12</b></button>
          <button className="category-button" type="button"><span>生活</span><b>12</b></button>
          <button className="category-button" type="button"><span>学习</span><b>12</b></button>
        </section>
      </aside>


      <main className="main-content">
        <header className="app-header">
          <label className="search-box">
            <Search size={18} />
            <input readOnly placeholder="搜索任务、描述或标签" />
          </label>
          <select defaultValue="list"><option value="list">列表视图</option></select>
          <select defaultValue="active"><option value="active">未完成</option></select>
          <select defaultValue="all"><option value="all">全部日期</option></select>
          <button className="primary-button" type="button" onClick={() => setIsAddingTask(true)}><Plus size={18} />新任务</button>
        </header>
        <section className="tasks-container">

          {tasks.map(task => (
            <article className={`task-item ${task.completed ? 'completed' : ''}`} key={task.id}>
              <label className="task-check">
                <input type="checkbox" />
                <span>
                  <h2>{task.title}</h2>
                  <p>{task.category} · {task.dueDate}</p>
                </span>
              </label>
              <button className="icon-button" type="button"
                onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))}>
                <Trash2 size={17} />
              </button>
            </article>
          ))}
        </section>
      </main>

      {/*弹窗*/}
      {isAddingTask && (
        <div className="dialog-backdrop">
          <section className="dialog">
            <header className="dialog-header">
              <h2 id="add-task-title">新任务</h2>
              <button className="icon-button" type="button" onClick={() => setIsAddingTask(false)}>
                <X size={18} />
              </button>
            </header>
            <label className="field">
              <span>标题</span>
              <input
                autoFocus
                value={draftTitle}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') addTask();
                }}
                onChange={(event) => setDraftTitle(event.target.value)}
                placeholder="输入任务标题"
              />
            </label>
            <label className="field">
              <span>分类</span>
              <select value={draftCategoryId} onChange={(event) => setDraftCategoryId(event.target.value)}>
                {data.categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>截止日期</span>
              <input value={draftDueDate} type="date" onChange={(event) => setDraftDueDate(event.target.value)} />
            </label>
            <footer className="dialog-actions">
              <button className="secondary-button" type="button" onClick={() => setIsAddingTask(false)}>取消</button>
              <button className="primary-button" type="button" onClick={addTask}>保存</button>
            </footer>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
