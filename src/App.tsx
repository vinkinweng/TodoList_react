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
      </aside>



    </div>
  )
}

export default App
