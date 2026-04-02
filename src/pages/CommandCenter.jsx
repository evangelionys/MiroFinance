import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp, Shield, CheckCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { holdings, portfolioSummary, recommendations, alphaReturns, healthScore, riskFactors, homeNewsAnalysis } from '../data/mockData';
import PortfolioSwitcher from '../components/PortfolioSwitcher';
import RecommendationCard from '../components/RecommendationCard';
import NewsCard from '../components/NewsCard';

const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ef4444', '#6366f1'];
const urgencyColors = { high: 'badge-red', medium: 'badge-orange', low: 'badge-blue' };

// Daily performance data for line chart
const dailyPerformance = [
  { date: 'Mar 1', portfolio: 0, benchmark: 0, alpha: 0 },
  { date: 'Mar 3', portfolio: 0.8, benchmark: 0.5, alpha: 0.3 },
  { date: 'Mar 5', portfolio: 1.2, benchmark: 0.9, alpha: 0.3 },
  { date: 'Mar 7', portfolio: 0.6, benchmark: 0.7, alpha: -0.1 },
  { date: 'Mar 9', portfolio: 1.5, benchmark: 1.0, alpha: 0.5 },
  { date: 'Mar 11', portfolio: 2.1, benchmark: 1.2, alpha: 0.9 },
  { date: 'Mar 13', portfolio: 1.8, benchmark: 1.4, alpha: 0.4 },
  { date: 'Mar 15', portfolio: 2.5, benchmark: 1.6, alpha: 0.9 },
  { date: 'Mar 17', portfolio: 3.2, benchmark: 1.8, alpha: 1.4 },
  { date: 'Mar 19', portfolio: 2.8, benchmark: 2.0, alpha: 0.8 },
  { date: 'Mar 21', portfolio: 3.5, benchmark: 2.2, alpha: 1.3 },
  { date: 'Mar 23', portfolio: 4.1, benchmark: 2.5, alpha: 1.6 },
  { date: 'Mar 25', portfolio: 3.8, benchmark: 2.3, alpha: 1.5 },
  { date: 'Mar 27', portfolio: 4.5, benchmark: 2.8, alpha: 1.7 },
  { date: 'Mar 29', portfolio: 5.2, benchmark: 3.1, alpha: 2.1 },
  { date: 'Mar 30', portfolio: 4.8, benchmark: 3.0, alpha: 1.8 },
];

function ScoreGauge({ score, max }) {
  const pct = (score / max) * 100;
  const color = score >= 4 ? '#16a34a' : score >= 3 ? '#eab308' : '#dc2626';
  return (
    <div className="relative w-20 h-20">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#f3f4f6" strokeWidth="8" />
        <circle cx="60" cy="60" r="50" fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${(pct / 100) * 314} 314`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[18px] font-bold" style={{ color }}>{score}</span>
        <span className="text-[9px] text-text-tertiary">/ {max}</span>
      </div>
    </div>
  );
}

export default function CommandCenter({ onSymbolClick, portfolios, activePortfolioId, onSwitchPortfolio, onCreateNew, onEditPortfolio, onDeletePortfolio, hasPortfolios }) {
  const [showAlphaDetail, setShowAlphaDetail] = useState(false);
  const [expandedRisk, setExpandedRisk] = useState(null);
  const [newsFilter, setNewsFilter] = useState('All');

  const pieData = holdings.map(h => ({ name: h.symbol, value: h.weight }));

  return (
    <div className="space-y-6">
      {/* Portfolio Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-[16px] font-semibold">Portfolio</h2>
            {hasPortfolios && portfolios && (
              <PortfolioSwitcher
                portfolios={portfolios}
                activePortfolioId={activePortfolioId}
                onSwitch={onSwitchPortfolio}
                onCreateNew={onCreateNew}
                onEdit={onEditPortfolio}
                onDelete={onDeletePortfolio}
              />
            )}
          </div>
          <div className="flex items-center gap-4 text-[13px]">
            <span className="text-text-secondary">Total Value</span>
            <span className="font-bold text-[18px]">${portfolioSummary.totalValue.toLocaleString()}</span>
            <span className={`font-medium ${portfolioSummary.dayChange >= 0 ? 'text-green' : 'text-red'}`}>
              {portfolioSummary.dayChange >= 0 ? '+' : ''}{portfolioSummary.dayChange.toLocaleString()} ({portfolioSummary.dayChangePct}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[280px_1fr] gap-4">
          {/* Left: Allocation Pie + Health Score */}
          <div className="space-y-4">
            <div className="card">
              <h3 className="text-[12px] font-semibold text-text-secondary mb-2">Allocation</h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} dataKey="value" paddingAngle={2}
                    onClick={(data) => onSymbolClick?.(data.name)} style={{ cursor: 'pointer' }}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
                    <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                    <span>{d.name} {d.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Score (moved from Asset Optimizer) */}
            <div className="card">
              <h3 className="text-[12px] font-semibold text-text-secondary mb-3">Portfolio Health</h3>
              <div className="flex items-center gap-4">
                <ScoreGauge score={healthScore.overall} max={healthScore.maxScore} />
                <div className="flex-1 space-y-1.5">
                  {healthScore.breakdown.filter(b => b.count > 0).map(b => (
                    <div key={b.label} className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background: b.color }} />
                        <span className="text-text-secondary">{b.label}</span>
                      </div>
                      <span className="font-semibold">{b.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-text-tertiary mt-2 leading-relaxed">{healthScore.diagnosis}</p>
            </div>
          </div>

          {/* Right: Holdings Table (Weight removed, Quant+Analyst merged) */}
          <div className="card overflow-x-auto p-0">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-border text-text-tertiary text-left">
                  <th className="px-4 py-3 font-medium">Symbol</th>
                  <th className="px-3 py-3 font-medium text-right">Price</th>
                  <th className="px-3 py-3 font-medium text-right">Change</th>
                  <th className="px-3 py-3 font-medium text-right">Change %</th>
                  <th className="px-3 py-3 font-medium text-right">Volume</th>
                  <th className="px-3 py-3 font-medium text-right">Open</th>
                  <th className="px-3 py-3 font-medium text-right">Prev Close</th>
                  <th className="px-3 py-3 font-medium text-right">Day Range</th>
                  <th className="px-3 py-3 font-medium text-right">52W Range</th>
                  <th className="px-3 py-3 font-medium text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map(h => {
                  const avgRating = (h.quantRating && h.analystRating) ? ((h.quantRating + h.analystRating) / 2).toFixed(1) : null;
                  return (
                    <tr key={h.symbol} className="border-b border-border-light hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <button onClick={() => onSymbolClick?.(h.symbol)} className="text-left cursor-pointer group">
                          <div className="font-semibold text-text-primary group-hover:text-primary transition-colors">{h.symbol}</div>
                          <div className="text-[10px] text-text-tertiary">{h.name}</div>
                        </button>
                      </td>
                      <td className="px-3 py-3 text-right font-medium">{h.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className={`px-3 py-3 text-right font-medium ${h.change >= 0 ? 'text-green' : 'text-red'}`}>
                        {h.change >= 0 ? '+' : ''}{h.change.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className={`px-3 py-3 text-right font-medium ${h.changePct >= 0 ? 'text-green' : 'text-red'}`}>
                        {h.changePct >= 0 ? '+' : ''}{h.changePct}%
                      </td>
                      <td className="px-3 py-3 text-right text-text-secondary">{h.volume}</td>
                      <td className="px-3 py-3 text-right text-text-secondary">{h.open.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="px-3 py-3 text-right text-text-secondary">{h.prevClose.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="px-3 py-3 text-right text-text-secondary text-[11px]">
                        {h.dayLow.toLocaleString()} — {h.dayHigh.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-right text-text-secondary text-[11px]">
                        {h.w52Low.toLocaleString()} — {h.w52High.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-center">
                        {avgRating ? (
                          <span className={`badge ${parseFloat(avgRating) >= 4 ? 'badge-green' : parseFloat(avgRating) >= 3 ? 'badge-blue' : 'badge-orange'}`}>
                            {avgRating}
                          </span>
                        ) : <span className="text-text-tertiary">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Investment Recommendations */}
      <section>
        <h2 className="text-[16px] font-semibold mb-4">Investment Recommendations</h2>
        <div className="space-y-3">
          {recommendations.slice(0, 5).map(rec => (
            <RecommendationCard key={rec.id} rec={rec} onSymbolClick={onSymbolClick} />
          ))}
        </div>
        <button className="mt-3 w-full py-2.5 text-[12px] font-medium text-primary hover:bg-primary-50 rounded-lg transition cursor-pointer">
          View History →
        </button>
      </section>

      {/* News & Analysis (portfolio-related) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold">News & Analysis</h2>
          <div className="flex gap-1">
            {['All', 'News', 'Analysis'].map(f => (
              <button key={f} onClick={() => setNewsFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition cursor-pointer
                  ${newsFilter === f ? 'bg-primary text-white' : 'text-text-secondary hover:bg-gray-100'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {homeNewsAnalysis.filter(n => newsFilter === 'All' || n.category === newsFilter).slice(0, 5).map(n => (
            <NewsCard key={n.id} item={n} onSymbolClick={onSymbolClick} />
          ))}
        </div>
        <button className="mt-3 w-full py-2.5 text-[12px] font-medium text-primary hover:bg-primary-50 rounded-lg transition cursor-pointer">
          View History →
        </button>
      </section>

      {/* Risk Factors (moved from Asset Optimizer) */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={18} className="text-red" />
          <h2 className="text-[16px] font-semibold">Risk Factors</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {riskFactors.map((rf, i) => {
            const isExpanded = expandedRisk === i;
            return (
              <div key={i} className="card">
                <button onClick={() => setExpandedRisk(isExpanded ? null : i)} className="w-full text-left cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1">
                      <AlertTriangle size={16} className={`${rf.severity === 'high' ? 'text-red' : 'text-orange'} mt-0.5 shrink-0`} />
                      <div>
                        <h4 className="text-[13px] font-semibold text-text-primary">{rf.title}</h4>
                        <span className={`badge mt-1 ${rf.severity === 'high' ? 'badge-red' : 'badge-orange'}`}>
                          {rf.severity} severity
                        </span>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={16} className="text-text-tertiary" /> : <ChevronDown size={16} className="text-text-tertiary" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-border-light">
                    <p className="text-[12px] text-text-secondary leading-relaxed mb-3">{rf.description}</p>
                    <div className="bg-primary-50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <CheckCircle size={12} className="text-primary" />
                        <span className="text-[11px] font-semibold text-primary">Recommended Action</span>
                      </div>
                      <p className="text-[12px] text-text-secondary">{rf.action}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Historical Returns & Alpha Attribution */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-semibold">Historical Returns & Alpha Attribution</h2>
          <span className="text-[12px] text-text-tertiary">{alphaReturns.period}</span>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="card-sm text-center">
            <div className="text-[11px] text-text-tertiary mb-1">Total Return</div>
            <div className="text-[22px] font-bold text-green">+{alphaReturns.totalReturn}%</div>
          </div>
          <div className="card-sm text-center">
            <div className="text-[11px] text-text-tertiary mb-1">Benchmark (S&P 500)</div>
            <div className="text-[22px] font-bold text-text-primary">+{alphaReturns.benchmarkReturn}%</div>
          </div>
          <div className="card-sm text-center">
            <div className="text-[11px] text-text-tertiary mb-1">Total Alpha</div>
            <div className="text-[22px] font-bold text-primary">+{alphaReturns.totalAlpha}%</div>
          </div>
          <div className="card-sm flex items-center justify-center">
            <button onClick={() => setShowAlphaDetail(!showAlphaDetail)} className="text-[12px] font-medium text-primary hover:text-primary-light transition cursor-pointer">
              {showAlphaDetail ? 'Hide' : 'View'} Alpha Breakdown →
            </button>
          </div>
        </div>

        {/* Daily Performance Line Chart (replaces monthly bar chart) */}
        <div className="card mb-4">
          <h3 className="text-[12px] font-semibold text-text-secondary mb-3">Daily Performance vs Benchmark</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={dailyPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={v => `${v}%`} />
              <Tooltip formatter={(v, name) => {
                const labels = { portfolio: 'Portfolio', benchmark: 'Benchmark', alpha: 'Alpha' };
                return [`${v.toFixed(1)}%`, labels[name] || name];
              }} contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }} />
              <Legend verticalAlign="top" height={28} formatter={(val) => {
                const labels = { portfolio: 'Portfolio', benchmark: 'S&P 500 Benchmark', alpha: 'Alpha' };
                return labels[val] || val;
              }} wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="portfolio" stroke="#3b82f6" strokeWidth={2} dot={false} name="portfolio" />
              <Line type="monotone" dataKey="benchmark" stroke="#9ca3af" strokeWidth={2} dot={false} strokeDasharray="4 4" name="benchmark" />
              <Line type="monotone" dataKey="alpha" stroke="#16a34a" strokeWidth={2} dot={false} name="alpha" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alpha Breakdown Detail */}
        {showAlphaDetail && (
          <div className="grid grid-cols-2 gap-4">
            <div className="card">
              <h3 className="text-[12px] font-semibold text-text-secondary mb-3">Alpha Composition</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={alphaReturns.breakdown.filter(b => b.category !== 'Market Beta')}
                    cx="50%" cy="50%"
                    innerRadius={50} outerRadius={80}
                    dataKey="value" paddingAngle={3}
                  >
                    {alphaReturns.breakdown.filter(b => b.category !== 'Market Beta').map((b, i) => (
                      <Cell key={i} fill={b.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={v => `+${v}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {alphaReturns.breakdown.map(b => (
                <div key={b.category} className="card-sm">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ background: b.color }} />
                      <span className="text-[13px] font-semibold">{b.category}</span>
                    </div>
                    <span className="text-[14px] font-bold" style={{ color: b.color }}>+{b.value}%</span>
                  </div>
                  <p className="text-[11px] text-text-tertiary mb-2">{b.description}</p>
                  <ul className="space-y-1">
                    {b.actions.map((a, i) => (
                      <li key={i} className="text-[11px] text-text-secondary flex items-start gap-1.5">
                        <span className="text-text-tertiary mt-0.5">•</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
