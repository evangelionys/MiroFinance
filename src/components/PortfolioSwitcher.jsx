import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Pencil, Trash2, Briefcase, Link2, PenLine, Check } from 'lucide-react';

export default function PortfolioSwitcher({ portfolios, activePortfolioId, onSwitch, onCreateNew, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const allPortfolio = { id: 'all', name: 'All Portfolios', type: 'all' };
  const items = [allPortfolio, ...portfolios];
  const active = items.find(p => p.id === activePortfolioId) || allPortfolio;

  const startEdit = (e, p) => {
    e.stopPropagation();
    setEditingId(p.id);
    setEditName(p.name);
  };

  const saveEdit = (e, id) => {
    e.stopPropagation();
    if (editName.trim()) onEdit(id, editName.trim());
    setEditingId(null);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:border-gray-300 transition-colors cursor-pointer bg-surface">
        <Briefcase size={13} className="text-primary" />
        <span className="text-[12px] font-medium text-text-primary max-w-[140px] truncate">{active.name}</span>
        <ChevronDown size={14} className={`text-text-tertiary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1.5 w-[280px] bg-surface border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="py-1.5">
            {items.map(p => (
              <div key={p.id}
                className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer group ${p.id === activePortfolioId ? 'bg-primary-50' : ''}`}
                onClick={() => { onSwitch(p.id); setOpen(false); }}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold
                  ${p.id === activePortfolioId ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary'}`}>
                  {p.type === 'all' ? 'A' : p.type === 'plaid' ? <Link2 size={12} /> : <PenLine size={12} />}
                </div>

                {editingId === p.id ? (
                  <div className="flex-1 flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                      className="flex-1 px-2 py-1 text-[12px] border border-primary rounded-md outline-none bg-white"
                      autoFocus onKeyDown={e => e.key === 'Enter' && saveEdit(e, p.id)} />
                    <button onClick={e => saveEdit(e, p.id)} className="text-green cursor-pointer"><Check size={14} /></button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-medium text-text-primary truncate">{p.name}</div>
                      {p.type === 'plaid' && <div className="text-[10px] text-text-tertiary">Broker Linked</div>}
                      {p.type === 'manual' && <div className="text-[10px] text-text-tertiary">Manual</div>}
                      {p.type === 'all' && <div className="text-[10px] text-text-tertiary">Combined view</div>}
                    </div>
                    {p.id !== 'all' && (
                      <div className="hidden group-hover:flex items-center gap-1">
                        <button onClick={e => startEdit(e, p)} className="p-1 text-text-tertiary hover:text-primary cursor-pointer">
                          <Pencil size={12} />
                        </button>
                        <button onClick={e => handleDelete(e, p.id)} className="p-1 text-text-tertiary hover:text-red cursor-pointer">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-border p-2">
            <button onClick={() => { onCreateNew(); setOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium text-primary hover:bg-primary-50 cursor-pointer">
              <Plus size={14} /> Create New Portfolio
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
