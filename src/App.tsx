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
    </aside>
    </div>
  )
}

export default App
