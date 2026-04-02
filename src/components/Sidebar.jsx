import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Globe, FlaskConical, Bell, CheckCircle, Loader, LogOut } from 'lucide-react';
import { researchHistory } from '../data/mockData';

const navItems = [
  { id: 'command', label: 'Home', icon: LayoutDashboard, path: '/' },
  { id: 'macro', label: 'Markets', icon: Globe, path: '/markets' },
  { id: 'workspace', label: 'Research', icon: FlaskConical, path: '/research' },
  { id: 'alerts', label: 'Notifications', icon: Bell, path: '/notifications' },
];

export default function Sidebar({ user, onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-[220px] h-screen bg-surface border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white text-[11px] font-bold">M</span>
          </div>
          <span className="text-[15px] font-bold text-text-primary tracking-tight">MiroFinance</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 py-3 space-y-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '');
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all
                ${isActive
                  ? 'bg-primary-50 text-primary'
                  : 'text-text-secondary hover:bg-gray-50 hover:text-text-primary'
                }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2 : 1.5} />
              <span>{item.label}</span>
              {item.id === 'alerts' && (
                <span className="ml-auto w-5 h-5 rounded-full bg-red text-white text-[10px] font-bold flex items-center justify-center">3</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Research History */}
      <div className="flex-1 overflow-y-auto border-t border-border">
        <div className="px-4 py-2.5">
          <h4 className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-2">Research History</h4>
        </div>
        <div className="px-2 space-y-0.5">
          {researchHistory.map(r => {
            const StatusIcon = r.status === 'completed' ? CheckCircle : Loader;
            const statusColor = r.status === 'completed' ? 'text-green' : 'text-primary';
            return (
              <Link
                key={r.id}
                to="/research"
                className="w-full flex items-start gap-2 px-2 py-2 rounded-lg text-left hover:bg-gray-50 transition group"
              >
                <StatusIcon size={13} className={`${statusColor} mt-0.5 shrink-0 ${r.status === 'in-progress' ? 'animate-spin' : ''}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium text-text-primary truncate group-hover:text-primary transition-colors">
                    {r.title}
                  </div>
                  <div className="text-[10px] text-text-tertiary">{r.date}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Account */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 transition">
          <div className="w-8 h-8 rounded-full bg-primary-50 text-primary text-[11px] font-bold flex items-center justify-center shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-text-primary truncate">{user?.name || 'User'}</div>
            <div className="text-[10px] text-text-tertiary truncate">{user?.email || ''}</div>
          </div>
          <button onClick={onLogout} className="text-text-tertiary hover:text-red transition cursor-pointer p-1" title="Logout">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
