import { useState } from 'react';
import { Bell, Plus, AlertTriangle, TrendingDown, CheckCircle, Info, X, Shield, Trash2 } from 'lucide-react';
import { priceAlerts as initialAlerts, alertNotifications } from '../data/mockData';

const severityIcons = {
  high: AlertTriangle,
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};
const severityColors = {
  high: 'text-red',
  warning: 'text-orange',
  info: 'text-primary',
  success: 'text-green',
};
const severityBg = {
  high: 'bg-red-light',
  warning: 'bg-orange-light',
  info: 'bg-primary-50',
  success: 'bg-green-light',
};

export default function Alerts({ onSymbolClick }) {
  const [activeAlerts, setActiveAlerts] = useState(initialAlerts);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [alertType, setAlertType] = useState('price');
  const [alertSymbol, setAlertSymbol] = useState('');
  const [alertTarget, setAlertTarget] = useState('');

  const deleteAlert = (id) => setActiveAlerts(prev => prev.filter(a => a.id !== id));

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-primary" />
            <h2 className="text-[16px] font-semibold">Notifications</h2>
            <span className="badge badge-red">{alertNotifications.filter(n => !n.read).length} new</span>
          </div>
        </div>
        <div className="space-y-2">
          {alertNotifications.map(n => {
            const Icon = severityIcons[n.severity];
            return (
              <div key={n.id} className={`card flex items-start gap-3 ${!n.read ? 'border-l-3 border-l-primary' : 'opacity-75'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${severityBg[n.severity]}`}>
                  <Icon size={14} className={severityColors[n.severity]} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {n.type === 'price' && <span className="text-[12px] font-bold">{n.symbol}</span>}
                    {n.type === 'constraint' && <span className="text-[12px] font-bold">{n.title}</span>}
                    <span className="text-[11px] text-text-tertiary">{n.timestamp}</span>
                    {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  </div>
                  <p className="text-[12px] text-text-secondary leading-relaxed">{n.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Active Price Alerts */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            <h2 className="text-[16px] font-semibold">Active Alerts</h2>
          </div>
          <button onClick={() => setShowCreateAlert(!showCreateAlert)}
            className="flex items-center gap-1.5 px-3 py-2 bg-primary text-white rounded-lg text-[12px] font-medium hover:bg-primary-light transition cursor-pointer">
            <Plus size={14} />
            New Alert
          </button>
        </div>

        {/* Create Alert Modal */}
        {showCreateAlert && (
          <div className="card mb-4 border-primary border-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14px] font-semibold">Create Price Alert</h3>
              <button onClick={() => setShowCreateAlert(false)} className="text-text-tertiary hover:text-text-secondary cursor-pointer">
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Find a stock, token, or fund...</label>
                <input type="text" value={alertSymbol} onChange={e => setAlertSymbol(e.target.value)}
                  placeholder="e.g., NVDA"
                  className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-[13px] outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Alert Criteria</label>
                <div className="flex gap-2">
                  <button onClick={() => setAlertType('price')}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-[12px] font-medium border transition cursor-pointer
                      ${alertType === 'price' ? 'bg-primary-50 text-primary border-primary' : 'border-border text-text-secondary'}`}>
                    Target Price
                  </button>
                  <button onClick={() => setAlertType('movement')}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-[12px] font-medium border transition cursor-pointer
                      ${alertType === 'movement' ? 'bg-primary-50 text-primary border-primary' : 'border-border text-text-secondary'}`}>
                    Movement Amount
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">
                  {alertType === 'price' ? 'Target Price' : 'Movement Threshold (%)'}
                </label>
                <input type="text" value={alertTarget} onChange={e => setAlertTarget(e.target.value)}
                  placeholder={alertType === 'price' ? '$0.00' : '5%'}
                  className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-[13px] outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Notification Platform</label>
                <select className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-[13px] outline-none focus:border-primary transition-colors">
                  <option>In-app and Email</option>
                  <option>In-app only</option>
                  <option>Email only</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Default Query (AI will analyze when alert triggers)</label>
              <textarea
                placeholder="e.g., Explain the factors driving the latest movement, including recent price context and investor narrative."
                className="w-full h-20 px-3 py-2.5 bg-bg border border-border rounded-lg text-[13px] outline-none resize-none focus:border-primary transition-colors"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCreateAlert(false)}
                className="px-4 py-2 border border-border rounded-lg text-[12px] font-medium text-text-secondary hover:bg-gray-50 transition cursor-pointer">
                Cancel
              </button>
              <button className="px-5 py-2 bg-primary text-white rounded-lg text-[12px] font-medium hover:bg-primary-light transition cursor-pointer">
                Save
              </button>
            </div>
          </div>
        )}

        {/* Alert List */}
        <div className="card overflow-hidden p-0">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border text-text-tertiary">
                <th className="px-4 py-3 text-left font-medium">Symbol</th>
                <th className="px-3 py-3 text-left font-medium">Type</th>
                <th className="px-3 py-3 text-right font-medium">Condition</th>
                <th className="px-3 py-3 text-right font-medium">Current Price</th>
                <th className="px-3 py-3 text-center font-medium">Status</th>
                <th className="px-3 py-3 text-right font-medium">Created</th>
                <th className="px-3 py-3 text-center font-medium w-[50px]"></th>
              </tr>
            </thead>
            <tbody>
              {activeAlerts.map(a => (
                <tr key={a.id} className="border-b border-border-light hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold">
                    <button onClick={() => onSymbolClick?.(a.symbol)} className="hover:text-primary transition-colors cursor-pointer">{a.symbol}</button>
                  </td>
                  <td className="px-3 py-3">
                    <span className="badge badge-blue">{a.type === 'price' ? 'Price' : 'Movement'}</span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    {a.type === 'price'
                      ? `${a.condition === 'below' ? '↓ Below' : '↑ Above'} $${a.targetPrice.toFixed(2)}`
                      : `±${a.threshold}% change`}
                  </td>
                  <td className="px-3 py-3 text-right font-medium">${a.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                  <td className="px-3 py-3 text-center">
                    <span className="badge badge-green">{a.status}</span>
                  </td>
                  <td className="px-3 py-3 text-right text-text-tertiary">{a.createdAt}</td>
                  <td className="px-3 py-3 text-center">
                    <button onClick={() => deleteAlert(a.id)} className="text-text-tertiary hover:text-red transition cursor-pointer">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
