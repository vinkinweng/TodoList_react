import { Moon, Search } from 'lucide-react';
import './App.css';
function App() {


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
          <button className="primary-button" type="button">新任务</button>
        </header>
        <section className="tasks-container">
          <article className="task-item"><h2>完成左侧侧边栏</h2><p>工作 · 高优先级 · 今天</p></article>
          <article className="task-item"><h2>完成左侧侧边栏</h2><p>工作 · 高优先级 · 今天</p></article>
          <article className="task-item"><h2>完成左侧侧边栏</h2><p>工作 · 高优先级 · 今天</p></article>
        </section>
      </main>
    </div>
  )
}

export default App
