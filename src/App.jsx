import { useState } from 'react';
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
  const showChatBar = activePage !== 'workspace'; // No ChatBar on Research tab
  const headerTitle = viewingSymbol ? viewingSymbol : pages[activePage].title;

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar active={activePage} onNavigate={handleNavigate} user={user} onLogout={handleLogout} />
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar — simplified, no account or portfolio switcher */}
        <header className="h-12 flex items-center px-6 border-b border-border bg-surface shrink-0">
          <h1 className="text-[15px] font-semibold text-text-primary">{headerTitle}</h1>
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
