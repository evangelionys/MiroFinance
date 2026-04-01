import { useState } from 'react';
import { LayoutDashboard, Globe, FlaskConical, Bell, CheckCircle, Loader, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { researchHistory } from '../data/mockData';

const navItems = [
  { id: 'command', label: 'Home', icon: LayoutDashboard },
  { id: 'macro', label: 'Markets', icon: Globe },
  { id: 'workspace', label: 'Research', icon: FlaskConical },
  { id: 'alerts', label: 'Notifications', icon: Bell },
];

export default function Sidebar({ active, onNavigate, user, onLogout }) {
  const [expandedResearch, setExpandedResearch] = useState(null);
  return (
    <aside className="w-[220px] h-screen bg-surface border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center px-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white text-[11px] font-bold">M</span>
          </div>
          <span className="text-[15px] font-bold text-text-primary tracking-tight">MiroFinance</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 py-3 space-y-0.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all cursor-pointer
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
            </button>
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
            const isExpanded = expandedResearch === r.id;
            return (
              <div key={r.id}>
                <button
                  onClick={() => setExpandedResearch(isExpanded ? null : r.id)}
                  className="w-full flex items-start gap-2 px-2 py-2 rounded-lg text-left hover:bg-gray-50 transition cursor-pointer group"
                >
                  <StatusIcon size={13} className={`${statusColor} mt-0.5 shrink-0 ${r.status === 'in-progress' ? 'animate-spin' : ''}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium text-text-primary truncate group-hover:text-primary transition-colors">
                      {r.title}
                    </div>
                    <div className="text-[10px] text-text-tertiary">{r.date}</div>
                  </div>
                  {isExpanded ? <ChevronUp size={11} className="text-text-tertiary mt-1 shrink-0" /> : <ChevronDown size={11} className="text-text-tertiary mt-1 shrink-0" />}
                </button>
                {isExpanded && (
                  <div className="ml-5 mr-1 mb-1 px-2 py-2 bg-bg rounded-lg text-[10px] text-text-secondary leading-relaxed">
                    <p className="mb-1.5">{r.summary}</p>
                    {r.status === 'in-progress' ? (
                      <span className="text-primary font-medium">Research in progress...</span>
                    ) : (
                      <button onClick={() => onNavigate('workspace')} className="text-primary font-medium hover:text-primary-light cursor-pointer">
                        View Full Report →
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* User Account */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-gray-50 transition">
          <div className="w-8 h-8 rounded-full bg-primary-50 text-primary text-[11px] font-bold flex items-center justify-center shrink-0">
            {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12px] font-medium text-text-primary truncate">{user?.name || user?.email || 'User'}</div>
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
