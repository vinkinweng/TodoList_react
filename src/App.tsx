import { Search, Trash2, Plus, Edit3 } from 'lucide-react';
import { useState } from 'react';
import './App.css';
import type { TodoTask, TodoCategory, TodoData } from "./types/todo"
import Sidebar from './components/Sidebar';
import TaskFormDialog from './components/TaskFormDialog';

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


  // 关闭弹窗，清空数据
  function closeTaskDialog() {
    setIsAddingTask(false);
    setformTitle('新任务');
    setTaskId(0);
    setDraftTitle('');
    setDraftCategoryId('work');
    setDraftDueDate('');
  }
  return (
    <div className="container">
      <Sidebar
        tasks={tasks}
        categories={categories}
        selectedCategory={selected}
        onSelectCategory={setSelected}
      />



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
      <TaskFormDialog
        isOpen={isAddingTask}
        formTitle={formTitle}
        draftTitle={draftTitle}
        draftCategoryId={draftCategoryId}
        categories={data.categories}
        draftDueDate={draftDueDate}
        onTitleChange={setDraftTitle}
        onCategoryChange={setDraftCategoryId}
        onDueDateChange={setDraftDueDate}
        onClose={closeTaskDialog}
        onSave={saveClick}
      />
    </div>
  )
}

export default App
