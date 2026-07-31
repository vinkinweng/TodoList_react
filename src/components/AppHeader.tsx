import { Search, Plus } from 'lucide-react';
type AppHeaderProps = {
    search: string;
    setSearch: (value: string) => void;
    setIsAddingTask: (value: boolean) => void;
};
function AppHeader({
    search,
    setSearch,
    setIsAddingTask
}: AppHeaderProps) {
    return (
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
    );
}

export default AppHeader;