import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatBar from './components/ChatBar';
import PortfolioSwitcher from './components/PortfolioSwitcher';
import CreatePortfolioModal from './components/CreatePortfolioModal';
import EmptyPortfolio from './components/EmptyPortfolio';
import Login from './pages/Login';
import Register from './pages/Register';
import CommandCenter from './pages/CommandCenter';
import MacroIntelligence from './pages/MacroIntelligence';
import Workspace from './pages/Workspace';
import Alerts from './pages/Alerts';
import SymbolDetail from './pages/SymbolDetail';

const pages = {
  command: { component: CommandCenter, title: 'Home', needsPortfolio: true },
  macro: { component: MacroIntelligence, title: 'Markets', needsPortfolio: false },
  workspace: { component: Workspace, title: 'Research', needsPortfolio: false },
  alerts: { component: Alerts, title: 'Notifications', needsPortfolio: false },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [authScreen, setAuthScreen] = useState('login');

  const [portfolios, setPortfolios] = useState([]);
  const [activePortfolioId, setActivePortfolioId] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createModalMode, setCreateModalMode] = useState('choose');

  const [activePage, setActivePage] = useState('command');
  const [viewingSymbol, setViewingSymbol] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (userData) => setUser(userData);
  const handleRegister = (userData) => setUser(userData);
  const handleLogout = () => {
    setUser(null);
    setAuthScreen('login');
    setPortfolios([]);
    setActivePortfolioId('all');
    setActivePage('command');
    setViewingSymbol(null);
  };

  const handleCreatePortfolio = (portfolio) => {
    setPortfolios(prev => [...prev, portfolio]);
    setActivePortfolioId(portfolio.id);
    setShowCreateModal(false);
    setCreateModalMode('choose');
  };

  const openCreateModal = (mode = 'choose') => {
    setCreateModalMode(mode);
    setShowCreateModal(true);
  };

  const handleEditPortfolio = (id, newName) => {
    setPortfolios(prev => prev.map(p => p.id === id ? { ...p, name: newName } : p));
  };

  const handleDeletePortfolio = (id) => {
    setPortfolios(prev => prev.filter(p => p.id !== id));
    if (activePortfolioId === id) setActivePortfolioId('all');
  };

  const handleSymbolClick = (symbol) => setViewingSymbol(symbol);
  const handleBackFromSymbol = () => setViewingSymbol(null);

  const handleNavigate = (page) => {
    setActivePage(page);
    setViewingSymbol(null);
  };

  if (!user) {
    if (authScreen === 'register') {
      return <Register onRegister={handleRegister} onSwitchToLogin={() => setAuthScreen('login')} />;
    }
    return <Login onLogin={handleLogin} onSwitchToRegister={() => setAuthScreen('register')} />;
  }

  const Page = pages[activePage].component;
  const hasPortfolios = portfolios.length > 0;
  const showEmpty = pages[activePage].needsPortfolio && !hasPortfolios && !viewingSymbol;
  const showChatBar = activePage !== 'workspace';
  const headerTitle = viewingSymbol ? viewingSymbol : pages[activePage].title;

  const searchSymbols = [
    { symbol: 'NVDA', name: 'NVIDIA Corporation' }, { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' }, { symbol: 'GOOG', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' }, { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'META', name: 'Meta Platforms' }, { symbol: 'BTC-USD', name: 'Bitcoin USD' },
    { symbol: 'XAUUSD', name: 'Gold Spot' }, { symbol: 'TCEHY', name: 'Tencent Holdings' },
    { symbol: 'MTCH', name: 'Match Group' }, { symbol: 'JPM', name: 'JPMorgan Chase' },
    { symbol: 'AVGO', name: 'Broadcom Inc.' }, { symbol: 'AMD', name: 'Advanced Micro Devices' },
  ];
  const searchResults = useMemo(() => {
    if (!searchQuery || searchQuery.length < 1) return [];
    const q = searchQuery.toLowerCase();
    return searchSymbols.filter(s => s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)).slice(0, 8);
  }, [searchQuery]);

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar active={activePage} onNavigate={handleNavigate} user={user} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-12 flex items-center justify-between px-6 border-b border-border bg-surface shrink-0">
          <h1 className="text-[15px] font-semibold text-text-primary">{headerTitle}</h1>
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                  <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} autoFocus
                    placeholder="Search symbol or name..."
                    className="w-[260px] pl-8 pr-8 py-1.5 bg-bg border border-border rounded-lg text-[12px] outline-none focus:border-primary" />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary cursor-pointer">
                    <X size={13} />
                  </button>
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-[280px] overflow-y-auto">
                      {searchResults.map(s => (
                        <button key={s.symbol} onClick={() => { handleSymbolClick(s.symbol); setSearchOpen(false); setSearchQuery(''); }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition cursor-pointer text-left">
                          <span className="text-[12px] font-bold text-text-primary w-[60px]">{s.symbol}</span>
                          <span className="text-[11px] text-text-secondary">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button onClick={() => setSearchOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-text-tertiary hover:text-text-secondary border border-border rounded-lg hover:border-gray-300 cursor-pointer transition">
                <Search size={14} />
                <span>Search</span>
                <span className="text-[10px] text-text-tertiary ml-4 border border-border rounded px-1">⌘K</span>
              </button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 pb-4">
            {viewingSymbol ? (
              <SymbolDetail symbol={viewingSymbol} onBack={handleBackFromSymbol} />
            ) : showEmpty ? (
              <EmptyPortfolio onCreateBroker={() => openCreateModal('plaid')} onCreateManual={() => openCreateModal('manual')} />
            ) : (
              <Page
                onSymbolClick={handleSymbolClick}
                // Pass portfolio props only to Home
                {...(activePage === 'command' ? {
                  portfolios,
                  activePortfolioId,
                  onSwitchPortfolio: setActivePortfolioId,
                  onCreateNew: () => openCreateModal('choose'),
                  onEditPortfolio: handleEditPortfolio,
                  onDeletePortfolio: handleDeletePortfolio,
                  hasPortfolios,
                } : {})}
              />
            )}
          </div>
        </div>

        {/* ChatBar — hidden on Research tab */}
        {showChatBar && <ChatBar />}
      </main>

      {showCreateModal && (
        <CreatePortfolioModal
          onClose={() => { setShowCreateModal(false); setCreateModalMode('choose'); }}
          onCreatePortfolio={handleCreatePortfolio}
          initialMode={createModalMode}
        />
      )}
    </div>
  );
}
