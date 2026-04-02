import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ChatBar from './components/ChatBar';
import CreatePortfolioModal from './components/CreatePortfolioModal';
import EmptyPortfolio from './components/EmptyPortfolio';
import Login from './pages/Login';
import Register from './pages/Register';
import CommandCenter from './pages/CommandCenter';
import MacroIntelligence from './pages/MacroIntelligence';
import Workspace from './pages/Workspace';
import Alerts from './pages/Alerts';
import SymbolDetail from './pages/SymbolDetail';

const searchSymbols = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation' }, { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' }, { symbol: 'GOOG', name: 'Alphabet Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' }, { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'META', name: 'Meta Platforms' }, { symbol: 'BTC-USD', name: 'Bitcoin USD' },
  { symbol: 'XAUUSD', name: 'Gold Spot' }, { symbol: 'TCEHY', name: 'Tencent Holdings' },
  { symbol: 'MTCH', name: 'Match Group' }, { symbol: 'JPM', name: 'JPMorgan Chase' },
  { symbol: 'AVGO', name: 'Broadcom Inc.' }, { symbol: 'AMD', name: 'Advanced Micro Devices' },
];

const pageTitles = { '/': 'Home', '/markets': 'Markets', '/research': 'Research', '/notifications': 'Notifications' };

/* Symbol detail page wrapper — extracts :symbol from URL */
function SymbolDetailPage() {
  const navigate = useNavigate();
  const { symbol } = useParams();
  return <SymbolDetail symbol={symbol} onBack={() => navigate(-1)} />;
}

/* Login page wrapper */
function LoginPage() {
  const navigate = useNavigate();
  return <Login onLogin={() => navigate('/')} onSwitchToRegister={() => navigate('/register')} />;
}

/* Register page wrapper */
function RegisterPage() {
  const navigate = useNavigate();
  return <Register onRegister={() => navigate('/')} onSwitchToLogin={() => navigate('/login')} />;
}

/* Main app layout with sidebar, header, and content */
function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user] = useState({ name: 'Demo User', email: 'demo@mirofinance.com' });
  const [portfolios, setPortfolios] = useState([]);
  const [activePortfolioId, setActivePortfolioId] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createModalMode, setCreateModalMode] = useState('choose');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = searchQuery.length >= 1
    ? searchSymbols.filter(s => s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || s.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
    : [];

  const handleSymbolClick = (symbol) => navigate(`/target_detail/${symbol}`);

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

  const isResearchPage = location.pathname === '/research';
  const isSymbolPage = location.pathname.startsWith('/target_detail/');
  const headerTitle = isSymbolPage
    ? decodeURIComponent(location.pathname.split('/target_detail/')[1] || '')
    : (pageTitles[location.pathname] || 'Home');
  const hasPortfolios = portfolios.length > 0;

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar user={user} onLogout={() => navigate('/login')} />
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-12 flex items-center justify-between px-6 border-b border-border bg-surface shrink-0">
          <h1 className="text-[15px] font-semibold text-text-primary">{headerTitle}</h1>
          <div className="relative">
            {searchOpen ? (
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
            <Routes>
              <Route path="/" element={
                hasPortfolios ? (
                  <CommandCenter
                    onSymbolClick={handleSymbolClick}
                    portfolios={portfolios}
                    activePortfolioId={activePortfolioId}
                    onSwitchPortfolio={setActivePortfolioId}
                    onCreateNew={() => openCreateModal('choose')}
                    onEditPortfolio={handleEditPortfolio}
                    onDeletePortfolio={handleDeletePortfolio}
                    hasPortfolios={hasPortfolios}
                  />
                ) : (
                  <EmptyPortfolio onCreateBroker={() => openCreateModal('plaid')} onCreateManual={() => openCreateModal('manual')} />
                )
              } />
              <Route path="/markets" element={<MacroIntelligence onSymbolClick={handleSymbolClick} />} />
              <Route path="/research" element={<Workspace onSymbolClick={handleSymbolClick} />} />
              <Route path="/notifications" element={<Alerts onSymbolClick={handleSymbolClick} />} />
              <Route path="/target_detail/:symbol" element={<SymbolDetailPage />} />
            </Routes>
          </div>
        </div>

        {/* ChatBar — hidden on Research */}
        {!isResearchPage && <ChatBar />}
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

/* Root App component — routes between auth pages and main layout */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
}
