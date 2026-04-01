import { useState } from 'react';
import { Link2, PenLine, ArrowRight, ArrowLeft, Plus, Trash2, CheckCircle, Building2, X } from 'lucide-react';

const BROKERS = [
  { id: 'robinhood', name: 'Robinhood', logo: '🟢' },
  { id: 'schwab', name: 'Charles Schwab', logo: '🔵' },
  { id: 'fidelity', name: 'Fidelity', logo: '🟩' },
  { id: 'interactive', name: 'Interactive Brokers', logo: '🔴' },
  { id: 'etrade', name: 'E*TRADE', logo: '🟣' },
  { id: 'td', name: 'TD Ameritrade', logo: '🟠' },
];

function PlaidFlow({ onComplete, onBack }) {
  const [step, setStep] = useState('select'); // select | connecting | success
  const [selectedBroker, setSelectedBroker] = useState(null);

  const handleConnect = () => {
    setStep('connecting');
    setTimeout(() => setStep('success'), 2000);
  };

  if (step === 'connecting') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
        <h3 className="text-[15px] font-semibold text-text-primary mb-1">Connecting to {selectedBroker?.name}...</h3>
        <p className="text-[12px] text-text-tertiary">Securely syncing your portfolio via Plaid</p>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-light flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green" />
        </div>
        <h3 className="text-[16px] font-bold text-text-primary mb-1">Connected Successfully!</h3>
        <p className="text-[12px] text-text-secondary mb-6">Your {selectedBroker?.name} portfolio has been synced.</p>
        <p className="text-[12px] text-text-tertiary mb-4">7 positions imported · Total value: $136,272.21</p>
        <button onClick={() => onComplete(selectedBroker.name + ' Portfolio', 'broker')}
          className="px-6 py-2.5 bg-primary text-white rounded-xl text-[13px] font-semibold hover:bg-primary-light transition cursor-pointer">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Building2 size={18} className="text-primary" />
        <h3 className="text-[15px] font-semibold text-text-primary">Connect Your Broker</h3>
      </div>
      <p className="text-[12px] text-text-secondary mb-5">Select your brokerage to securely sync your portfolio via Plaid</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {BROKERS.map(b => (
          <button key={b.id} onClick={() => setSelectedBroker(b)}
            className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition cursor-pointer
              ${selectedBroker?.id === b.id ? 'border-primary bg-primary-50' : 'border-border hover:border-gray-300'}`}>
            <span className="text-[20px]">{b.logo}</span>
            <span className="text-[13px] font-medium text-text-primary">{b.name}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] font-medium text-text-secondary hover:text-text-primary cursor-pointer">
          <ArrowLeft size={14} /> Back
        </button>
        <button onClick={handleConnect} disabled={!selectedBroker}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-[13px] font-semibold hover:bg-primary-light transition cursor-pointer disabled:opacity-40">
          Connect via Plaid <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function ManualFlow({ onComplete, onBack }) {
  const [portfolioName, setPortfolioName] = useState('');
  const [positions, setPositions] = useState([{ symbol: '', shares: '', avgCost: '' }]);

  const addPosition = () => setPositions([...positions, { symbol: '', shares: '', avgCost: '' }]);
  const removePosition = (i) => setPositions(positions.filter((_, idx) => idx !== i));
  const updatePosition = (i, field, value) => {
    const updated = [...positions];
    updated[i] = { ...updated[i], [field]: value };
    setPositions(updated);
  };

  const canSubmit = portfolioName && positions.some(p => p.symbol && p.shares);

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <PenLine size={18} className="text-primary" />
        <h3 className="text-[15px] font-semibold text-text-primary">Manual Portfolio Entry</h3>
      </div>
      <p className="text-[12px] text-text-secondary mb-5">Enter your positions manually. You can add more later.</p>

      <div className="mb-4">
        <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Portfolio Name</label>
        <input type="text" value={portfolioName} onChange={e => setPortfolioName(e.target.value)}
          placeholder="e.g., My Investment Account"
          className="w-full px-3.5 py-2.5 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors" />
      </div>

      <div className="mb-4">
        <label className="text-[12px] font-medium text-text-secondary mb-2 block">Positions</label>
        <div className="space-y-2">
          {positions.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="text" value={p.symbol} onChange={e => updatePosition(i, 'symbol', e.target.value)}
                placeholder="Symbol (e.g., NVDA)"
                className="flex-1 px-3 py-2.5 bg-bg border border-border rounded-lg text-[12px] outline-none focus:border-primary transition-colors" />
              <input type="text" value={p.shares} onChange={e => updatePosition(i, 'shares', e.target.value)}
                placeholder="Shares"
                className="w-24 px-3 py-2.5 bg-bg border border-border rounded-lg text-[12px] outline-none focus:border-primary transition-colors" />
              <input type="text" value={p.avgCost} onChange={e => updatePosition(i, 'avgCost', e.target.value)}
                placeholder="Avg Cost"
                className="w-28 px-3 py-2.5 bg-bg border border-border rounded-lg text-[12px] outline-none focus:border-primary transition-colors" />
              {positions.length > 1 && (
                <button onClick={() => removePosition(i)} className="p-1.5 text-text-tertiary hover:text-red cursor-pointer">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addPosition}
          className="flex items-center gap-1.5 mt-2 text-[12px] font-medium text-primary hover:text-primary-light cursor-pointer">
          <Plus size={14} /> Add Position
        </button>
      </div>

      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] font-medium text-text-secondary hover:text-text-primary cursor-pointer">
          <ArrowLeft size={14} /> Back
        </button>
        <button onClick={() => onComplete(portfolioName, 'manual')} disabled={!canSubmit}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-[13px] font-semibold hover:bg-primary-light transition cursor-pointer disabled:opacity-40">
          Create Portfolio <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function CreatePortfolio({ onComplete, onClose }) {
  const [mode, setMode] = useState(null); // null | 'plaid' | 'manual'

  if (mode === 'plaid') {
    return (
      <div className="card max-w-[560px] mx-auto">
        <PlaidFlow onComplete={onComplete} onBack={() => setMode(null)} />
      </div>
    );
  }

  if (mode === 'manual') {
    return (
      <div className="card max-w-[560px] mx-auto">
        <ManualFlow onComplete={onComplete} onBack={() => setMode(null)} />
      </div>
    );
  }

  return (
    <div className="max-w-[560px] mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-[20px] font-bold text-text-primary mb-1">Create a Portfolio</h2>
        <p className="text-[13px] text-text-secondary">Choose how you'd like to set up your portfolio</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setMode('plaid')}
          className="card hover:border-primary hover:shadow-md transition-all cursor-pointer text-left group">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition">
            <Link2 size={22} className="text-primary" />
          </div>
          <h3 className="text-[14px] font-bold text-text-primary mb-1">Connect Broker</h3>
          <p className="text-[12px] text-text-secondary leading-relaxed mb-3">
            Securely link your brokerage account via Plaid to automatically sync your holdings.
          </p>
          <span className="text-[11px] font-medium text-primary flex items-center gap-1">
            Get started <ArrowRight size={12} />
          </span>
        </button>

        <button onClick={() => setMode('manual')}
          className="card hover:border-primary hover:shadow-md transition-all cursor-pointer text-left group">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition">
            <PenLine size={22} className="text-primary" />
          </div>
          <h3 className="text-[14px] font-bold text-text-primary mb-1">Manual Entry</h3>
          <p className="text-[12px] text-text-secondary leading-relaxed mb-3">
            Add your positions manually. You can always update or add more holdings later.
          </p>
          <span className="text-[11px] font-medium text-primary flex items-center gap-1">
            Get started <ArrowRight size={12} />
          </span>
        </button>
      </div>

      {onClose && (
        <div className="text-center mt-4">
          <button onClick={onClose} className="text-[12px] text-text-tertiary hover:text-text-secondary cursor-pointer">
            Skip for now
          </button>
        </div>
      )}
    </div>
  );
}
