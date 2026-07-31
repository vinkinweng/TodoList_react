import { Moon, Search, Trash2, Plus, X, Edit3 } from 'lucide-react';
import { useState } from 'react';
import './App.css';
import type { TodoTask, TodoCategory, TodoData } from "./types/todo"


const initialTasks: TodoTask[] = [
  { id: 1, title: '完成左侧侧边栏', category: 'work', completed: false, dueDate: '2026-05-27' },
  { id: 2, title: '完成左侧侧边栏', category: 'life', completed: true, dueDate: '2026-06-27' },
  { id: 3, title: '完成左侧侧边栏', category: 'study', completed: true, dueDate: '' }
];
const categorys: TodoCategory[] = [
  { id: 'work', name: '工作', color: '#2563eb' },
  { id: 'life', name: '生活', color: '#16a34a' },
  { id: 'study', name: '学习', color: '#f59e0b' }
]

const fallbackData: TodoData = {
  updatedAt: new Date().toISOString(),
  tasks: [],
  categories: categorys,
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
  const [formTitle, setformTitle] = useState('新任务');
  const [taskId, setTaskId] = useState(0);
  const [categories, setCategories] = useState(categorys)

  //搜索内容
  const [search, setSearch] = useState('');

  const [selected, setSelected] = useState('all')
  // 已完成的数量
  const completedCount = tasks.filter(task => task.completed).length;
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
  }

  //编辑任务
  function onEdit(task: TodoTask) {
    setIsAddingTask(true);
    setformTitle("编辑任务");
    setTaskId(task.id);
    setDraftTitle(task.title);
    setDraftCategoryId(task.category);
    setDraftDueDate(task.dueDate);
    console.log("onEdit")
    console.log(task)
  }
  function taskEdit() {
    setTasks(previousTasks =>
      previousTasks.map(item => {
        console.log(item);
        if (item.id === taskId) {
          return {
            ...item,
            title: draftTitle,
            category: draftCategoryId,
            completed: false,
            dueDate: draftDueDate
          }
        }
        return item;
      })

    )

    setformTitle("新任务");
  }

  //点击保存按钮，根据stats 的值判断是添加任务还是修改任务
  // 2为修改
  // 默认为添加
  function saveClick(task?: TodoTask) {
    if (formTitle == "编辑任务") {
      taskEdit();
    } else {
      console.log("else")
      addTask();
    }

    setDraftTitle('');
    setDraftCategoryId('work');
    setDraftDueDate('');
    setIsAddingTask(false);
  }

  // 显示的任务列表，// 筛选
  const filteredTasks = tasks.filter(task => {
    const keyword = search.trim().toLowerCase();

    const matchesSearch =
      keyword === '' ||
      task.title.toLowerCase().includes(keyword);

    const matchesCategory =
      selected === 'all' ||
      task.category === selected;

    return matchesSearch && matchesCategory;
  });



  // 通过id 修改任务状态
  function onToggle(id: number) {

    setTasks(tasks => tasks.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )))
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
            <div className="stat"><span>总任务</span><strong>{tasks.length}</strong></div>
            <div className="stat"><span>已完成</span><strong>{completedCount}</strong></div>
            <div className="stat"><span>完成率</span><strong>{tasks.length ? Math.round((completedCount / tasks.length) * 100) + '%' : '0%'}</strong></div>
            <div className="stat"><span>无截止日期</span><strong>{tasks.filter((task) => !task.dueDate).length}</strong></div>
          </div>
        </section>

        <section className="categories-section">
          <div className="section-title">分类</div>
          <button className={selected === "all" ? "category-button active" : "category-button"} type="button" id="all" onClick={() => setSelected("all")}>
            <span>全部</span>
            <b>{tasks.length}</b>
          </button>
          {categories.map(category => (
            <button className={selected === category.id ? "category-button active" : "category-button"} type="button" id={category.id} onClick={() => setSelected(category.id)}>
              <span>{category.name}</span>
              <b>{tasks.filter((task) => task.category == category.id).length}</b>
            </button>
          ))}
        </section>
      </aside>


      <main className="main-content">
        <header className="app-header">
          <label className="search-box">
            <Search size={18} />
            <input placeholder="搜索任务、描述或标签" value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>
          <select defaultValue="list"><option value="list">列表视图</option></select>
          <select defaultValue="active"><option value="active">未完成</option></select>
          <select defaultValue="all"><option value="all">全部日期</option></select>
          <button className="primary-button" type="button" onClick={() => setIsAddingTask(true)}><Plus size={18} />新任务</button>
        </header>
        <section className="tasks-container">

          {filteredTasks.map(task => (
            <article className={`task-item ${task.completed ? 'completed' : ''}`} key={task.id}>
              <label className="task-check">
                <input type="checkbox" checked={task.completed} onChange={(e) => onToggle(task.id)} />
                <span>
                  <h2>{task.title}</h2>
                  <p>
                    {categorys.find(item => item.id === task.category)?.name} · {task.dueDate}</p>
                </span>
              </label>
              <div className="task-actions">
                <button className="icon-button" onClick={() => onEdit(task)}>
                  <Edit3 size={16} />
                </button>
                <button className="icon-button" type="button" onClick={() => setTasks((current) => current.filter((item) => item.id !== task.id))}>
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/*弹窗*/}
      {isAddingTask && (
        <div className="dialog-backdrop">
          <section className="dialog">
            <header className="dialog-header">
              <h2 id="add-task-title">{formTitle}</h2>
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
              <button className="primary-button" type="button" onClick={() => saveClick()}>保存</button>
            </footer>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
