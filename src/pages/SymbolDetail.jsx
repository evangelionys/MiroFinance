import { useState } from 'react';
import { ArrowLeft, Clock, Calendar, Users, Building2, Heart, Bell, BarChart2, TrendingUp, ExternalLink, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell, ComposedChart, Legend } from 'recharts';
import { getSymbolDetail } from '../data/symbolDetailData';

const timeRanges = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX'];
const tabs = ['Overview', 'Financials', 'Earnings', 'Historical Data', 'Analysis'];

function SentimentDot({ sentiment }) {
  const c = sentiment === 'positive' ? '#16a34a' : sentiment === 'negative' ? '#dc2626' : '#9ca3af';
  return <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: c }} />;
}

function StatRow({ label, value }) {
  if (value == null) return null;
  return (
    <div className="flex items-center justify-between text-[12px] py-1">
      <span className="text-text-tertiary">{label}</span>
      <span className="font-medium text-text-primary">{String(value)}</span>
    </div>
  );
}

const fmtVol = (v) => {
  if (v >= 1e9) return `${(v/1e9).toFixed(1)}B`;
  if (v >= 1e6) return `${(v/1e6).toFixed(0)}M`;
  if (v >= 1e3) return `${(v/1e3).toFixed(0)}K`;
  return v;
};

// Rating badge colors
const ratingColors = {
  'Strong Buy': 'bg-green text-white', 'Buy': 'bg-green/80 text-white',
  'Overweight': 'bg-green-light text-green', 'Outperform': 'bg-green-light text-green',
  'Hold': 'bg-yellow-100 text-yellow-700', 'Neutral': 'bg-gray-100 text-gray-600',
  'Sell': 'bg-red-light text-red', 'Underweight': 'bg-red-light text-red',
};

export default function SymbolDetail({ symbol, onBack }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [chartRange, setChartRange] = useState('1Y');
  const [chartMode, setChartMode] = useState('line'); // line | candle
  const [following, setFollowing] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  // Financials state
  const [finView, setFinView] = useState('annual');
  const [finStatement, setFinStatement] = useState('income');
  // Historical state
  const [histFreq, setHistFreq] = useState('5Y');

  const data = getSymbolDetail(symbol);
  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary">Symbol {symbol} not found.</p>
        <button onClick={onBack} className="mt-4 text-primary font-medium cursor-pointer">Go back</button>
      </div>
    );
  }

  const pos = data.change >= 0;
  const ahPos = data.afterHours?.change >= 0;
  const totalAnalysts = data.analystRatings ? data.analystRatings.buy + data.analystRatings.hold + data.analystRatings.sell : 0;
  const hasVolume = data.chartData.some(d => d.volume > 0);
  const peersData = data.peersData || (data.peers || []).map(p => ({ symbol: p, name: p, price: 0, changePct: 0 }));

  return (
    <div className="space-y-0">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            <ArrowLeft size={18} className="text-text-secondary" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-[14px] font-bold text-primary">
            {data.symbol.charAt(0)}
          </div>
          <div>
            <h1 className="text-[18px] font-bold text-text-primary">{data.name}</h1>
            <div className="flex items-center gap-2 text-[12px] text-text-tertiary">
              <span>{data.symbol}</span><span>·</span><span>{data.exchange}</span>
            </div>
          </div>
        </div>
        {/* Following + Price Alert */}
        <div className="flex items-center gap-2">
          <button onClick={() => setFollowing(!following)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-medium border transition cursor-pointer
              ${following ? 'bg-primary text-white border-primary' : 'border-border text-text-secondary hover:border-primary hover:text-primary'}`}>
            <Heart size={14} fill={following ? 'white' : 'none'} />
            {following ? 'Following' : 'Follow'}
          </button>
          <button onClick={() => setShowAlertModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-medium border border-border text-text-secondary hover:border-primary hover:text-primary transition cursor-pointer">
            <Bell size={14} />
            Price Alert
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 border-b border-border mb-5">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer
              ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* ==================== OVERVIEW ==================== */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-[1fr_320px] gap-6">
          {/* LEFT */}
          <div className="space-y-6 min-w-0">
            {/* Price Header */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-[32px] font-bold">${data.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <span className={`text-[16px] font-semibold ${pos ? 'text-green' : 'text-red'}`}>
                  {pos ? '+' : ''}{data.change.toLocaleString(undefined, { minimumFractionDigits: 2 })} ({pos ? '+' : ''}{data.changePct}%)
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-[11px] text-text-tertiary">
                <span>As of Mar 30, 2026 4:00 PM EDT</span>
                {data.afterHours && (
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    After Hours: ${data.afterHours.price.toFixed(2)}
                    <span className={ahPos ? 'text-green' : 'text-red'}>
                      {ahPos ? '+' : ''}{data.afterHours.change.toFixed(2)} ({ahPos ? '+' : ''}{data.afterHours.changePct}%)
                    </span>
                  </span>
                )}
              </div>
              <div className="text-[11px] text-text-tertiary mt-0.5">
                {chartRange === '1D' ? 'Today' : chartRange === '5D' ? 'Past 5 Days' : chartRange === '1M' ? 'Past Month' : chartRange === '6M' ? 'Past 6 Months' : chartRange === 'YTD' ? 'Year to Date' : chartRange === '1Y' ? 'Past Year' : chartRange === '5Y' ? 'Past 5 Years' : 'All Time'}
              </div>
            </div>

            {/* Chart */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {timeRanges.map(r => (
                    <button key={r} onClick={() => setChartRange(r)}
                      className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium transition cursor-pointer
                        ${chartRange === r ? 'bg-primary text-white' : 'text-text-secondary hover:bg-gray-100'}`}>
                      {r}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => setChartMode('line')}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium transition cursor-pointer ${chartMode === 'line' ? 'bg-gray-200 text-text-primary' : 'text-text-tertiary'}`}>
                    Line
                  </button>
                  <button onClick={() => setChartMode('candle')}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium transition cursor-pointer ${chartMode === 'candle' ? 'bg-gray-200 text-text-primary' : 'text-text-tertiary'}`}>
                    Candle
                  </button>
                  <a href={`https://www.tradingview.com/chart/?symbol=${data.symbol}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[11px] font-medium text-primary hover:bg-primary-50 transition cursor-pointer ml-1">
                    <BarChart2 size={12} /> Adv Chart
                    <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Price chart */}
              <ResponsiveContainer width="100%" height={220}>
                {chartMode === 'line' ? (
                  <LineChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} domain={['auto', 'auto']}
                      tickFormatter={v => data.price > 1000 ? `${(v/1000).toFixed(0)}K` : v.toLocaleString()} />
                    <Tooltip content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0]?.payload;
                      return (
                        <div className="bg-surface border border-border rounded-lg shadow-lg p-2.5 text-[11px]">
                          <div className="font-semibold mb-0.5">{label}</div>
                          <div>O: ${d.open?.toLocaleString()} H: ${d.high?.toLocaleString()} L: ${d.low?.toLocaleString()} C: ${d.close?.toLocaleString()}</div>
                          {d.volume > 0 && <div className="text-text-tertiary">Vol: {fmtVol(d.volume)}</div>}
                        </div>
                      );
                    }} />
                    <Line type="monotone" dataKey="close" stroke={pos ? '#16a34a' : '#dc2626'} strokeWidth={2} dot={false} />
                  </LineChart>
                ) : (
                  /* Candle chart approximation using bars */
                  <ComposedChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} domain={['auto', 'auto']} />
                    <Tooltip content={({ active, payload, label }) => {
                      if (!active || !payload?.length) return null;
                      const d = payload[0]?.payload;
                      return (
                        <div className="bg-surface border border-border rounded-lg shadow-lg p-2.5 text-[11px]">
                          <div className="font-semibold mb-0.5">{label}</div>
                          <div>O: ${d.open?.toLocaleString()} H: ${d.high?.toLocaleString()} L: ${d.low?.toLocaleString()} C: ${d.close?.toLocaleString()}</div>
                        </div>
                      );
                    }} />
                    <Bar dataKey="high" fill="transparent" />
                    <Line type="step" dataKey="close" stroke={pos ? '#16a34a' : '#dc2626'} strokeWidth={2} dot={{ r: 3, fill: pos ? '#16a34a' : '#dc2626' }} />
                    <Line type="step" dataKey="open" stroke="#9ca3af" strokeWidth={1} dot={false} strokeDasharray="4 2" />
                  </ComposedChart>
                )}
              </ResponsiveContainer>

              {/* Volume bars below */}
              {hasVolume && (
                <ResponsiveContainer width="100%" height={60}>
                  <BarChart data={data.chartData}>
                    <XAxis dataKey="date" tick={false} axisLine={false} />
                    <YAxis tick={false} axisLine={false} />
                    <Bar dataKey="volume" fill="#e5e7eb" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}

              {/* Technical Indicators below chart */}
              <div className="grid grid-cols-3 gap-x-6 gap-y-2 mt-4 pt-4 border-t border-border-light">
                {[
                  ['Prev Close', `$${data.keyStats.prevClose}`],
                  ['Market Cap', data.keyStats.marketCap],
                  ['Open', `$${data.keyStats.open}`],
                  ['P/E Ratio', data.keyStats.peRatio],
                  ['Day Range', data.keyStats.dayRange],
                  ['Dividend Yield', data.keyStats.dividend],
                  ['52W Range', `${data.keyStats.w52Low} - ${data.keyStats.w52High}`],
                  ['EPS', data.keyStats.eps],
                  ['Volume', data.keyStats.volume],
                ].map(([l, v]) => (
                  <div key={l} className="flex items-center justify-between text-[11px]">
                    <span className="text-text-tertiary">{l}</span>
                    <span className="font-medium text-text-primary">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stories & Analysis (merged with Latest Developments) */}
            <div>
              <h3 className="text-[14px] font-semibold text-text-primary mb-3">Stories & Analysis</h3>
              <div className="space-y-2">
                {data.news.map(n => (
                  <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer border border-border-light">
                    <SentimentDot sentiment={n.sentiment} />
                    <div className="flex-1">
                      <h4 className="text-[12px] font-semibold text-text-primary leading-snug mb-0.5">{n.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-text-tertiary">
                        <span>{n.source}</span><span>·</span><span>{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {/* About (with company info from old Key Statistics) */}
            <div className="card">
              <h3 className="text-[13px] font-semibold text-text-primary mb-2">About</h3>
              <p className="text-[12px] text-text-secondary leading-relaxed mb-3">{data.about}</p>
              <div className="border-t border-border-light pt-2 space-y-1.5">
                <StatRow label="Symbol" value={data.symbol} />
                <StatRow label="Exchange" value={data.exchange} />
                <StatRow label="Sector" value={data.sector} />
                <StatRow label="Industry" value={data.industry} />
                <StatRow label="IPO Date" value={data.ipoDate} />
                <StatRow label="Country" value={data.country} />
                {data.ceo && <StatRow label="CEO" value={data.ceo} />}
                {data.employees && <StatRow label="Employees" value={data.employees} />}
              </div>
            </div>

            {/* Analyst Consensus (click to Analysis tab) */}
            {data.analystRatings && (
              <div className="card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[13px] font-semibold text-text-primary">Analyst Consensus</h3>
                  <button onClick={() => setActiveTab('Analysis')} className="text-[11px] text-primary font-medium cursor-pointer hover:text-primary-light flex items-center gap-0.5">
                    Details <ChevronRight size={12} />
                  </button>
                </div>
                <div className="text-center mb-3">
                  <span className={`text-[18px] font-bold ${data.analystRatings.consensus.includes('Buy') ? 'text-green' : 'text-text-primary'}`}>
                    {data.analystRatings.consensus}
                  </span>
                  <span className="text-[12px] text-text-tertiary ml-2">{totalAnalysts} analysts</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden mb-3">
                  <div className="bg-green" style={{ width: `${(data.analystRatings.buy / totalAnalysts) * 100}%` }} />
                  <div className="bg-yellow-400" style={{ width: `${(data.analystRatings.hold / totalAnalysts) * 100}%` }} />
                  <div className="bg-red" style={{ width: `${(data.analystRatings.sell / totalAnalysts) * 100}%` }} />
                </div>
                <div className="flex justify-between text-[11px]">
                  <div className="text-center"><div className="font-bold text-green">{data.analystRatings.buy}</div><div className="text-text-tertiary">Buy</div></div>
                  <div className="text-center"><div className="font-bold text-yellow-600">{data.analystRatings.hold}</div><div className="text-text-tertiary">Hold</div></div>
                  <div className="text-center"><div className="font-bold text-red">{data.analystRatings.sell}</div><div className="text-text-tertiary">Sell</div></div>
                </div>
              </div>
            )}

            {/* Peers with price + change */}
            {peersData.length > 0 && (
              <div className="card p-0">
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="text-[13px] font-semibold">Peers</h3>
                </div>
                <div className="divide-y divide-border-light">
                  {peersData.map(p => (
                    <div key={p.symbol} className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition">
                      <div>
                        <div className="text-[12px] font-semibold">{p.symbol}</div>
                        <div className="text-[10px] text-text-tertiary">{p.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[12px] font-medium">${p.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                        <div className={`text-[11px] font-medium ${p.changePct >= 0 ? 'text-green' : 'text-red'}`}>
                          {p.changePct >= 0 ? '+' : ''}{p.changePct.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== FINANCIALS ==================== */}
      {activeTab === 'Financials' && data.financials && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-1 flex-wrap">
              {[['income', 'Income Statement'], ['balance', 'Balance Sheet'], ['cashflow', 'Cash Flow'],
                ['keystats', 'Key Stats'], ['segments', 'Segments & KPIs'], ['ratios', 'Ratios']].map(([k, l]) => (
                <button key={k} onClick={() => setFinStatement(k)}
                  className={`px-3 py-2 text-[11px] font-medium rounded-lg transition cursor-pointer
                    ${finStatement === k ? 'bg-primary text-white' : 'text-text-secondary hover:bg-gray-100'}`}>
                  {l}
                </button>
              ))}
            </div>
            <div className="flex gap-1 bg-bg rounded-lg p-0.5">
              {['annual', 'quarterly', 'ttm'].map(v => (
                <button key={v} onClick={() => setFinView(v)}
                  className={`px-3 py-1.5 text-[11px] font-medium rounded-md transition cursor-pointer uppercase
                    ${finView === v ? 'bg-surface shadow-sm text-text-primary' : 'text-text-tertiary'}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Income Statement */}
          {finStatement === 'income' && data.financials.incomeStatement && (
            <FinTable data={finView === 'quarterly' ? data.financials.incomeStatement.quarterly : data.financials.incomeStatement.annual}
              fields={['revenue', 'costOfRevenue', 'grossProfit', 'operatingExpenses', 'operatingIncome', 'netIncome', 'ebitda', 'eps']} />
          )}
          {/* Balance Sheet */}
          {finStatement === 'balance' && data.financials.balanceSheet && (
            <FinTable data={data.financials.balanceSheet.annual}
              fields={['totalAssets', 'totalLiabilities', 'totalEquity', 'cash', 'totalDebt', 'currentRatio']} />
          )}
          {/* Cash Flow */}
          {finStatement === 'cashflow' && data.financials.cashFlow && (
            <FinTable data={data.financials.cashFlow.annual}
              fields={['operatingCF', 'investingCF', 'financingCF', 'capex', 'freeCashFlow']} />
          )}
          {/* Key Stats */}
          {finStatement === 'keystats' && data.financials.keyStatsFinancial && (
            <div className="card">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {data.financials.keyStatsFinancial.map((s, i) => (
                  <StatRow key={i} label={s.label} value={s.value} />
                ))}
              </div>
            </div>
          )}
          {finStatement === 'keystats' && !data.financials.keyStatsFinancial && (
            <div className="text-center py-12 text-text-tertiary text-[13px]">No Key Stats data available</div>
          )}
          {/* Segments */}
          {finStatement === 'segments' && data.financials.segments && (
            <div className="card overflow-x-auto p-0">
              <table className="w-full text-[12px]">
                <thead><tr className="border-b border-border text-text-tertiary">
                  <th className="px-4 py-3 text-left font-medium">Segment</th>
                  <th className="px-3 py-3 text-right font-medium">Revenue</th>
                  <th className="px-3 py-3 text-right font-medium">% of Total</th>
                </tr></thead>
                <tbody>
                  {data.financials.segments.map((s, i) => (
                    <tr key={i} className="border-b border-border-light">
                      <td className="px-4 py-2.5 font-medium">{s.name}</td>
                      <td className="px-3 py-2.5 text-right">{s.revenue}</td>
                      <td className="px-3 py-2.5 text-right">{s.pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {finStatement === 'segments' && !data.financials.segments && (
            <div className="text-center py-12 text-text-tertiary text-[13px]">No segment data available</div>
          )}
          {/* Ratios */}
          {finStatement === 'ratios' && data.financials.ratios && (
            <div className="card">
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {data.financials.ratios.map((r, i) => (
                  <StatRow key={i} label={r.label} value={r.value} />
                ))}
              </div>
            </div>
          )}
          {finStatement === 'ratios' && !data.financials.ratios && (
            <div className="text-center py-12 text-text-tertiary text-[13px]">No ratio data available</div>
          )}
        </div>
      )}
      {activeTab === 'Financials' && !data.financials && (
        <div className="text-center py-16 text-text-tertiary text-[13px]">No financial data available</div>
      )}

      {/* ==================== EARNINGS ==================== */}
      {activeTab === 'Earnings' && data.earnings && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-[14px] font-semibold mb-4">Earnings History</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={data.earnings.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="quarter" tick={{ fontSize: 10, fill: '#9ca3af' }} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={v => `$${v}`} />
                <Tooltip formatter={v => `$${Number(v).toFixed(2)}`} />
                <Bar dataKey="epsEstimate" fill="#d1d5db" radius={[4, 4, 0, 0]} name="Estimate" />
                <Bar dataKey="epsActual" radius={[4, 4, 0, 0]} name="Actual">
                  {data.earnings.history.map((e, i) => <Cell key={i} fill={e.beat ? '#16a34a' : '#dc2626'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead><tr className="border-b border-border text-text-tertiary">
                  <th className="px-3 py-2 text-left font-medium">Quarter</th>
                  <th className="px-3 py-2 text-right font-medium">EPS Est</th>
                  <th className="px-3 py-2 text-right font-medium">EPS Act</th>
                  <th className="px-3 py-2 text-right font-medium">Rev Est</th>
                  <th className="px-3 py-2 text-right font-medium">Rev Act</th>
                  <th className="px-3 py-2 text-center font-medium">Result</th>
                </tr></thead>
                <tbody>
                  {data.earnings.history.map((q, i) => (
                    <tr key={i} className="border-b border-border-light">
                      <td className="px-3 py-2 font-medium">{q.quarter}</td>
                      <td className="px-3 py-2 text-right text-text-secondary">${q.epsEstimate.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right font-medium">${q.epsActual.toFixed(2)}</td>
                      <td className="px-3 py-2 text-right text-text-secondary">{q.revEstimate || '—'}</td>
                      <td className="px-3 py-2 text-right font-medium">{q.revActual || '—'}</td>
                      <td className={`px-3 py-2 text-center font-semibold ${q.beat ? 'text-green' : 'text-red'}`}>{q.beat ? 'Beat' : 'Miss'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-text-secondary mt-4">
              <Calendar size={14} className="text-primary" />
              Next: <span className="font-semibold text-text-primary">{data.earnings.nextDate}</span>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'Earnings' && !data.earnings && (
        <div className="text-center py-16 text-text-tertiary text-[13px]">No earnings data available</div>
      )}

      {/* ==================== HISTORICAL DATA ==================== */}
      {activeTab === 'Historical Data' && (
        <div className="card overflow-x-auto p-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-[14px] font-semibold">Historical Prices</h3>
            <div className="flex gap-1 bg-bg rounded-lg p-0.5">
              {timeRanges.map(r => (
                <button key={r} onClick={() => setHistFreq(r)}
                  className={`px-2.5 py-1.5 text-[11px] font-medium rounded-md transition cursor-pointer
                    ${histFreq === r ? 'bg-surface shadow-sm text-text-primary font-bold' : 'text-text-tertiary'}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <table className="w-full text-[12px]">
            <thead><tr className="border-b border-border text-text-tertiary">
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-3 py-3 text-right font-medium">Open</th>
              <th className="px-3 py-3 text-right font-medium">High</th>
              <th className="px-3 py-3 text-right font-medium">Low</th>
              <th className="px-3 py-3 text-right font-medium">Close</th>
              {hasVolume && <th className="px-3 py-3 text-right font-medium">Volume</th>}
            </tr></thead>
            <tbody>
              {data.chartData.slice().reverse().map((d, i) => {
                const fmt = (v) => v != null ? `$${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '—';
                return (
                  <tr key={i} className="border-b border-border-light">
                    <td className="px-4 py-2.5 font-medium">{d.date}</td>
                    <td className="px-3 py-2.5 text-right">{fmt(d.open)}</td>
                    <td className="px-3 py-2.5 text-right">{fmt(d.high)}</td>
                    <td className="px-3 py-2.5 text-right">{fmt(d.low)}</td>
                    <td className="px-3 py-2.5 text-right font-medium">{fmt(d.close)}</td>
                    {hasVolume && <td className="px-3 py-2.5 text-right text-text-secondary">{d.volume > 0 ? fmtVol(d.volume) : '—'}</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ==================== ANALYSIS ==================== */}
      {activeTab === 'Analysis' && (
        <div className="space-y-6">
          {/* Analyst Consensus */}
          {data.analystRatings && (
            <div className="card">
              <h3 className="text-[14px] font-semibold mb-4">Analyst Consensus</h3>
              <div className="flex items-center gap-6 mb-4">
                <div className="text-center">
                  <div className={`text-[24px] font-bold ${data.analystRatings.consensus.includes('Buy') ? 'text-green' : 'text-text-primary'}`}>
                    {data.analystRatings.consensus}
                  </div>
                  <div className="text-[12px] text-text-tertiary">{totalAnalysts} analysts</div>
                </div>
                <div className="flex-1">
                  <div className="flex h-4 rounded-full overflow-hidden mb-2">
                    <div className="bg-green" style={{ width: `${(data.analystRatings.buy / totalAnalysts) * 100}%` }} />
                    <div className="bg-yellow-400" style={{ width: `${(data.analystRatings.hold / totalAnalysts) * 100}%` }} />
                    <div className="bg-red" style={{ width: `${(data.analystRatings.sell / totalAnalysts) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-green font-semibold">{data.analystRatings.buy} Buy</span>
                    <span className="text-yellow-600 font-semibold">{data.analystRatings.hold} Hold</span>
                    <span className="text-red font-semibold">{data.analystRatings.sell} Sell</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 52W Price Targets: Current + Low + Average + High */}
          {data.analystRatings && (
            <div className="card">
              <h3 className="text-[14px] font-semibold mb-4">Analyst 52W Price Targets</h3>
              <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                  ['Current', data.price, 'text-text-primary'],
                  ['Low', data.analystRatings.lowTarget, 'text-red'],
                  ['Average', data.analystRatings.avgTarget, 'text-primary'],
                  ['High', data.analystRatings.highTarget, 'text-green'],
                ].map(([l, v, c]) => (
                  <div key={l} className="text-center p-3 bg-bg rounded-lg">
                    <div className="text-[10px] text-text-tertiary mb-1">{l}</div>
                    <div className={`text-[16px] font-bold ${c}`}>${Number(v).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-primary-50 rounded-lg text-center">
                <span className="text-[12px] text-text-secondary">Avg target implies </span>
                <span className={`text-[13px] font-bold ${data.analystRatings.avgTarget > data.price ? 'text-green' : 'text-red'}`}>
                  {data.analystRatings.avgTarget > data.price ? '+' : ''}{(((data.analystRatings.avgTarget - data.price) / data.price) * 100).toFixed(1)}% upside
                </span>
              </div>
            </div>
          )}

          {/* Analyst Estimates Table */}
          {data.analystEstimates && data.analystEstimates.length > 0 && (
            <div className="card overflow-x-auto p-0">
              <div className="px-4 py-3 border-b border-border">
                <h3 className="text-[14px] font-semibold">Analyst Estimates</h3>
              </div>
              <table className="w-full text-[12px]">
                <thead><tr className="border-b border-border text-text-tertiary">
                  <th className="px-4 py-2.5 text-left font-medium">Firm</th>
                  <th className="px-3 py-2.5 text-left font-medium">Analyst</th>
                  <th className="px-3 py-2.5 text-center font-medium">Rating</th>
                  <th className="px-3 py-2.5 text-right font-medium">52W Price Target</th>
                  <th className="px-3 py-2.5 text-right font-medium">Upside</th>
                  <th className="px-3 py-2.5 text-right font-medium">Date</th>
                </tr></thead>
                <tbody>
                  {data.analystEstimates.map((a, i) => (
                    <tr key={i} className="border-b border-border-light">
                      <td className="px-4 py-2.5 font-medium">{a.firm}</td>
                      <td className="px-3 py-2.5 text-text-secondary">{a.analyst}</td>
                      <td className="px-3 py-2.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${ratingColors[a.rating] || 'bg-gray-100 text-gray-600'}`}>
                          {a.rating}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-right font-medium">
                        ${a.target} <span className="text-text-tertiary text-[10px]">from ${a.priorTarget}</span>
                      </td>
                      <td className="px-3 py-2.5 text-right text-green font-medium">{a.upside}%</td>
                      <td className="px-3 py-2.5 text-right text-text-tertiary">{a.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-4 py-2.5 text-center border-t border-border">
                <span className="text-[11px] text-text-tertiary">See {data.analystEstimates.length > 8 ? '89' : data.analystEstimates.length} more</span>
              </div>
            </div>
          )}

          {/* Research Reports */}
          {data.researchReports && data.researchReports.length > 0 && (
            <div className="card">
              <h3 className="text-[14px] font-semibold mb-3">Open Web Research Reports</h3>
              <div className="space-y-2">
                {data.researchReports.map((r, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-border-light rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <div className="text-[12px] font-semibold text-text-primary flex items-center gap-1.5">
                        <span className="text-text-tertiary">{'>'}</span> {r.title}
                      </div>
                      <div className="text-[10px] text-text-tertiary mt-0.5">
                        By {r.source} · {r.date} · Outlook: <span className="text-green font-medium">{r.outlook}</span>
                      </div>
                    </div>
                    <button className="text-[11px] font-medium text-text-secondary border border-border rounded-lg px-3 py-1.5 hover:bg-gray-100 cursor-pointer">
                      View Source
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!data.analystRatings && (
            <div className="text-center py-16 text-text-tertiary text-[13px]">No analyst data available</div>
          )}
        </div>
      )}

      {/* Price Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowAlertModal(false)}>
          <div className="bg-surface rounded-2xl shadow-xl w-full max-w-[400px] p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-[16px] font-bold mb-4">Price Alert — {data.symbol}</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[12px] font-medium text-text-secondary mb-1 block">Alert When Price</label>
                <div className="flex gap-2">
                  <select className="flex-1 px-3 py-2.5 bg-bg border border-border rounded-lg text-[13px] outline-none">
                    <option>Drops Below</option><option>Rises Above</option>
                  </select>
                  <input type="number" defaultValue={Math.round(data.price * 0.95)} className="w-[120px] px-3 py-2.5 bg-bg border border-border rounded-lg text-[13px] outline-none" />
                </div>
              </div>
              <div>
                <label className="text-[12px] font-medium text-text-secondary mb-1 block">Notification</label>
                <select className="w-full px-3 py-2.5 bg-bg border border-border rounded-lg text-[13px] outline-none">
                  <option>In-app and Email</option><option>In-app only</option><option>Email only</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowAlertModal(false)} className="flex-1 py-2.5 border border-border rounded-xl text-[13px] font-medium cursor-pointer hover:bg-gray-50">Cancel</button>
              <button onClick={() => setShowAlertModal(false)} className="flex-1 py-2.5 bg-primary text-white rounded-xl text-[13px] font-semibold cursor-pointer hover:bg-primary-light">Save Alert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Reusable Financial Table */
function FinTable({ data, fields }) {
  if (!data || data.length === 0) return <div className="text-center py-12 text-text-tertiary text-[13px]">No data available</div>;
  return (
    <div className="card overflow-x-auto p-0">
      <table className="w-full text-[12px]">
        <thead><tr className="border-b border-border text-text-tertiary">
          <th className="px-4 py-3 text-left font-medium">Item</th>
          {data.map((r, i) => <th key={i} className="px-3 py-3 text-right font-medium">{r.period}</th>)}
        </tr></thead>
        <tbody>
          {fields.map(field => (
            <tr key={field} className="border-b border-border-light">
              <td className="px-4 py-2.5 font-medium capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</td>
              {data.map((r, i) => <td key={i} className="px-3 py-2.5 text-right">{r[field] || '—'}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
