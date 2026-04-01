import { useState, useMemo } from 'react';
import { X, Link2, Plus, Trash2, ArrowRight, CheckCircle, Building2, PenLine, ChevronRight, Search } from 'lucide-react';

const brokers = [
  { id: 'robinhood', name: 'Robinhood', logo: 'RH' },
  { id: 'schwab', name: 'Charles Schwab', logo: 'CS' },
  { id: 'fidelity', name: 'Fidelity', logo: 'FD' },
  { id: 'td', name: 'TD Ameritrade', logo: 'TD' },
  { id: 'interactive', name: 'Interactive Brokers', logo: 'IB' },
  { id: 'etrade', name: 'E*TRADE', logo: 'ET' },
  { id: 'vanguard', name: 'Vanguard', logo: 'VG' },
  { id: 'coinbase', name: 'Coinbase', logo: 'CB' },
  { id: 'merrill', name: 'Merrill Edge', logo: 'ME' },
  { id: 'webull', name: 'Webull', logo: 'WB' },
  { id: 'sofi', name: 'SoFi Invest', logo: 'SF' },
  { id: 'ally', name: 'Ally Invest', logo: 'AL' },
];

// Mock symbol search database
const symbolDatabase = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
  { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.' },
  { symbol: 'BA', name: 'The Boeing Company' },
  { symbol: 'BA:CA', name: 'The Boeing Company' },
  { symbol: 'BABA', name: 'Alibaba Group Holding Ltd' },
  { symbol: 'BTC-USD', name: 'Bitcoin USD' },
  { symbol: 'DIS', name: 'The Walt Disney Company' },
  { symbol: 'ETH-USD', name: 'Ethereum USD' },
  { symbol: 'GOOG', name: 'Alphabet Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. Class A' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'META', name: 'Meta Platforms, Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'MTCH', name: 'Match Group, Inc.' },
  { symbol: 'NFLX', name: 'Netflix, Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'PYPL', name: 'PayPal Holdings, Inc.' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust' },
  { symbol: 'SPY', name: 'SPDR S&P 500 ETF Trust' },
  { symbol: 'TCEHY', name: 'Tencent Holdings Ltd' },
  { symbol: 'TSLA', name: 'Tesla, Inc.' },
  { symbol: 'V', name: 'Visa Inc.' },
  { symbol: 'XAUUSD', name: 'Gold Spot / U.S. Dollar' },
  { symbol: 'XOM', name: 'Exxon Mobil Corporation' },
];

// Mock prices for auto-fill
const mockPrices = { AAPL: 242.56, AMZN: 218.34, AMD: 162.45, BA: 178.90, BABA: 85.20, 'BTC-USD': 67830, DIS: 112.34, 'ETH-USD': 2065.73, GOOG: 280.74, GOOGL: 281.10, JPM: 245.67, META: 612.45, MSFT: 365.97, MTCH: 30.81, NFLX: 985.30, NVDA: 171.24, PYPL: 72.45, QQQ: 518.90, SPY: 572.30, TCEHY: 62.74, TSLA: 178.92, V: 312.45, XAUUSD: 4431.38, XOM: 118.56 };

export default function CreatePortfolioModal({ onClose, onCreatePortfolio, initialMode = 'choose' }) {
  const [step, setStep] = useState(initialMode); // 'choose' | 'plaid' | 'plaid-connect' | 'plaid-success' | 'manual'
  const [portfolioName, setPortfolioName] = useState('');
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [brokerSearch, setBrokerSearch] = useState('');
  const [connecting, setConnecting] = useState(false);

  // Manual input state
  const [symbolSearch, setSymbolSearch] = useState('');
  const [showSymbolResults, setShowSymbolResults] = useState(false);
  const [lots, setLots] = useState([]); // Array of { symbol, name, shares, avgCost, date, commission, type }
  const [editingLot, setEditingLot] = useState(null); // { symbol, name } when adding a new lot

  const filteredBrokers = useMemo(() => {
    if (!brokerSearch) return brokers;
    const q = brokerSearch.toLowerCase();
    return brokers.filter(b => b.name.toLowerCase().includes(q) || b.id.toLowerCase().includes(q));
  }, [brokerSearch]);

  const symbolResults = useMemo(() => {
    if (!symbolSearch || symbolSearch.length < 1) return [];
    const q = symbolSearch.toLowerCase();
    return symbolDatabase.filter(s =>
      s.symbol.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [symbolSearch]);

  const selectSymbol = (sym) => {
    setEditingLot({ symbol: sym.symbol, name: sym.name });
    setSymbolSearch('');
    setShowSymbolResults(false);
  };

  const saveLot = (lotData) => {
    setLots([...lots, lotData]);
    setEditingLot(null);
  };

  const removeLot = (i) => setLots(lots.filter((_, idx) => idx !== i));

  const handlePlaidConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setStep('plaid-success');
    }, 2000);
  };

  const handleCreate = (type) => {
    const name = portfolioName || (type === 'plaid' ? `${brokers.find(b => b.id === selectedBroker)?.name} Portfolio` : 'Manual Portfolio');
    onCreatePortfolio({
      id: `p-${Date.now()}`,
      name,
      type,
      broker: type === 'plaid' ? selectedBroker : null,
      holdings: type === 'manual' ? lots : null,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-[560px] max-h-[85vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-[16px] font-bold text-text-primary">
            {step === 'choose' && 'Create Portfolio'}
            {step === 'plaid' && 'Connect Broker'}
            {step === 'plaid-connect' && 'Connect via Plaid'}
            {step === 'plaid-success' && 'Connected!'}
            {step === 'manual' && 'Add Positions Manually'}
          </h2>
          <button onClick={onClose} className="text-text-tertiary hover:text-text-secondary cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Step: Choose Method */}
          {step === 'choose' && (
            <div className="space-y-3">
              <p className="text-[13px] text-text-secondary mb-4">
                Choose how you'd like to set up your portfolio. You can always add more positions later.
              </p>
              <button onClick={() => setStep('plaid')}
                className="w-full flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary hover:bg-primary-50 transition-all cursor-pointer text-left group">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                  <Link2 size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-text-primary">Connect Broker via Plaid</h3>
                  <p className="text-[12px] text-text-secondary mt-0.5">Automatically sync your holdings from 10,000+ institutions</p>
                </div>
                <ChevronRight size={18} className="text-text-tertiary group-hover:text-primary" />
              </button>
              <button onClick={() => setStep('manual')}
                className="w-full flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary hover:bg-primary-50 transition-all cursor-pointer text-left group">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                  <PenLine size={22} />
                </div>
                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-text-primary">Enter Positions Manually</h3>
                  <p className="text-[12px] text-text-secondary mt-0.5">Add stocks, ETFs, crypto, and more by symbol</p>
                </div>
                <ChevronRight size={18} className="text-text-tertiary group-hover:text-primary" />
              </button>
            </div>
          )}

          {/* Step: Plaid Broker Selection with Search */}
          {step === 'plaid' && (
            <div>
              <p className="text-[12px] font-medium text-text-secondary mb-2">Select your broker</p>
              <div className="relative mb-3">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input type="text" value={brokerSearch} onChange={e => setBrokerSearch(e.target.value)}
                  placeholder="Search brokers..."
                  className="w-full pl-10 pr-4 py-2.5 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors" />
                {brokerSearch && (
                  <button onClick={() => setBrokerSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary cursor-pointer">
                    <X size={14} />
                  </button>
                )}
              </div>

              {filteredBrokers.length === 0 ? (
                <div className="text-center py-6 text-[12px] text-text-tertiary">No brokers found for "{brokerSearch}"</div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filteredBrokers.map(b => (
                    <button key={b.id} onClick={() => setSelectedBroker(b.id)}
                      className={`flex items-center gap-3 p-3 border rounded-xl transition-all cursor-pointer text-left
                        ${selectedBroker === b.id ? 'border-primary bg-primary-50' : 'border-border hover:border-gray-300'}`}>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0
                        ${selectedBroker === b.id ? 'bg-primary text-white' : 'bg-gray-100 text-text-secondary'}`}>
                        {b.logo}
                      </div>
                      <span className="text-[13px] font-medium text-text-primary">{b.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step: Plaid Connecting */}
          {step === 'plaid-connect' && (
            <div className="flex flex-col items-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-4">
                <Building2 size={28} className="text-primary" />
              </div>
              <h3 className="text-[15px] font-semibold text-text-primary mb-1">
                Connecting to {brokers.find(b => b.id === selectedBroker)?.name}
              </h3>
              <p className="text-[12px] text-text-secondary mb-6">Securely syncing your portfolio data via Plaid...</p>
              <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          )}

          {/* Step: Plaid Success */}
          {step === 'plaid-success' && (
            <div className="flex flex-col items-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-green-light flex items-center justify-center mb-4">
                <CheckCircle size={28} className="text-green" />
              </div>
              <h3 className="text-[15px] font-semibold text-text-primary mb-1">Successfully Connected!</h3>
              <p className="text-[12px] text-text-secondary mb-2">
                Your {brokers.find(b => b.id === selectedBroker)?.name} account has been linked.
              </p>
              <p className="text-[12px] text-text-tertiary">7 positions synced &middot; Portfolio value: $136,272.21</p>
            </div>
          )}

          {/* Step: Manual Input */}
          {step === 'manual' && (
            <div>
              <div className="mb-4">
                <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Portfolio Name (Optional)</label>
                <input type="text" value={portfolioName} onChange={e => setPortfolioName(e.target.value)}
                  placeholder="e.g., My Stock Portfolio"
                  className="w-full px-4 py-2.5 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors" />
              </div>

              {/* Existing lots */}
              {lots.length > 0 && (
                <div className="mb-4">
                  <p className="text-[12px] font-medium text-text-secondary mb-2">Added Positions</p>
                  <div className="space-y-2">
                    {lots.map((lot, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-bg rounded-lg border border-border-light">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center text-[10px] font-bold text-primary">
                            {lot.symbol.charAt(0)}
                          </div>
                          <div>
                            <div className="text-[12px] font-semibold">{lot.symbol}</div>
                            <div className="text-[10px] text-text-tertiary">{lot.shares} shares @ ${lot.avgCost} &middot; {lot.type} &middot; {lot.date}</div>
                          </div>
                        </div>
                        <button onClick={() => removeLot(i)} className="text-text-tertiary hover:text-red cursor-pointer">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Lot — Symbol Search or Lot Form */}
              {!editingLot ? (
                <div>
                  <p className="text-[12px] font-medium text-text-secondary mb-2">Add Symbols to Follow</p>
                  <div className="relative">
                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                    <input
                      type="text"
                      value={symbolSearch}
                      onChange={e => { setSymbolSearch(e.target.value); setShowSymbolResults(true); }}
                      onFocus={() => symbolSearch && setShowSymbolResults(true)}
                      placeholder="Search by name or symbol..."
                      className="w-full pl-10 pr-10 py-3 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors"
                    />
                    {symbolSearch && (
                      <button onClick={() => { setSymbolSearch(''); setShowSymbolResults(false); }}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary cursor-pointer">
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  {/* Search Results Dropdown */}
                  {showSymbolResults && symbolResults.length > 0 && (
                    <div className="mt-1 border border-border rounded-xl bg-surface shadow-lg max-h-[280px] overflow-y-auto">
                      <div className="px-3 py-2 text-[11px] text-text-tertiary font-medium border-b border-border-light">Results:</div>
                      {symbolResults.map(s => (
                        <button key={s.symbol} onClick={() => selectSymbol(s)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition cursor-pointer text-left border-b border-border-light last:border-b-0">
                          <span className="text-[13px] font-bold text-text-primary w-[80px]">{s.symbol}</span>
                          <span className="text-[12px] text-text-secondary">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {showSymbolResults && symbolSearch && symbolResults.length === 0 && (
                    <div className="mt-1 border border-border rounded-xl bg-surface p-4 text-center text-[12px] text-text-tertiary">
                      No results for "{symbolSearch}"
                    </div>
                  )}
                </div>
              ) : (
                /* Lot Entry Form */
                <LotEntryForm
                  symbol={editingLot.symbol}
                  name={editingLot.name}
                  defaultPrice={mockPrices[editingLot.symbol] || 0}
                  defaultDate={today}
                  onSave={saveLot}
                  onCancel={() => setEditingLot(null)}
                />
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          {step !== 'choose' && step !== 'plaid-success' && !editingLot && (
            <button onClick={() => { setStep(step === 'plaid-connect' ? 'plaid' : 'choose'); setBrokerSearch(''); }}
              className="text-[13px] font-medium text-text-secondary hover:text-text-primary cursor-pointer">
              Back
            </button>
          )}
          {(step === 'choose' || step === 'plaid-success' || editingLot) && <div />}

          <div className="flex items-center gap-2">
            <button onClick={onClose}
              className="px-4 py-2.5 border border-border rounded-xl text-[13px] font-medium text-text-secondary hover:bg-gray-50 cursor-pointer">
              Cancel
            </button>

            {step === 'plaid' && (
              <button onClick={() => { setStep('plaid-connect'); handlePlaidConnect(); }} disabled={!selectedBroker}
                className="px-5 py-2.5 bg-primary text-white rounded-xl text-[13px] font-semibold hover:bg-primary-light cursor-pointer disabled:opacity-40 flex items-center gap-2">
                Connect <ArrowRight size={14} />
              </button>
            )}

            {step === 'plaid-success' && (
              <button onClick={() => handleCreate('plaid')}
                className="px-5 py-2.5 bg-primary text-white rounded-xl text-[13px] font-semibold hover:bg-primary-light cursor-pointer flex items-center gap-2">
                Done <CheckCircle size={14} />
              </button>
            )}

            {step === 'manual' && !editingLot && (
              <button onClick={() => handleCreate('manual')}
                disabled={lots.length === 0}
                className="px-5 py-2.5 bg-primary text-white rounded-xl text-[13px] font-semibold hover:bg-primary-light cursor-pointer disabled:opacity-40 flex items-center gap-2">
                Create Portfolio <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Lot Entry Form — matches the "Add Lot SP500" screenshot */
function LotEntryForm({ symbol, name, defaultPrice, defaultDate, onSave, onCancel }) {
  const [shares, setShares] = useState('');
  const [avgCost, setAvgCost] = useState(defaultPrice ? String(defaultPrice) : '');
  const [date, setDate] = useState(defaultDate);
  const [txnType, setTxnType] = useState('buy');

  const handleSave = () => {
    if (!shares) return;
    onSave({
      symbol,
      name,
      shares: parseFloat(shares) || 0,
      avgCost: parseFloat(avgCost) || 0,
      date,
      type: txnType,
    });
  };

  return (
    <div className="border border-border rounded-xl p-4 bg-bg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[14px] font-semibold text-text-primary">Add Lot {symbol}</h3>
        <button onClick={onCancel} className="text-[12px] font-medium text-text-secondary hover:text-text-primary cursor-pointer">Cancel</button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-[11px] font-semibold text-text-secondary mb-1 block">Number of shares *</label>
          <input type="number" value={shares} onChange={e => setShares(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] outline-none focus:border-primary transition-colors bg-surface" />
        </div>
        <div>
          <label className="text-[11px] font-semibold text-text-secondary mb-1 block">Avg. Cost Per Share</label>
          <input type="number" value={avgCost} onChange={e => setAvgCost(e.target.value)}
            placeholder="0.00" step="0.01"
            className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] outline-none focus:border-primary transition-colors bg-surface" />
        </div>
      </div>

      <div className="mb-3">
        <label className="text-[11px] font-semibold text-text-secondary mb-1 block">Date *</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          className="w-full px-3 py-2.5 border border-border rounded-lg text-[13px] outline-none focus:border-primary transition-colors bg-surface" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-semibold text-text-secondary">Transaction type:</span>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="radio" name="txnType" value="buy" checked={txnType === 'buy'} onChange={() => setTxnType('buy')}
              className="accent-primary" />
            <span className="text-[12px] font-medium text-primary">Buy</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="radio" name="txnType" value="sell" checked={txnType === 'sell'} onChange={() => setTxnType('sell')}
              className="accent-primary" />
            <span className="text-[12px] font-medium text-text-secondary">Sell</span>
          </label>
        </div>
      </div>

      <button onClick={handleSave} disabled={!shares}
        className="w-full py-2.5 bg-primary text-white rounded-lg text-[13px] font-semibold hover:bg-primary-light cursor-pointer disabled:opacity-40 transition-colors">
        Save Lot
      </button>
    </div>
  );
}
