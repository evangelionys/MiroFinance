import { useState } from 'react';
import { TrendingUp, TrendingDown, Globe, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Treemap } from 'recharts';
import { macroOpportunities } from '../data/mockData';
import RecommendationCard from '../components/RecommendationCard';
import NewsCard from '../components/NewsCard';

// --- Macro data (Yahoo Finance style tabs) ---
const marketData = {
  'US Markets': [
    { symbol: 'ES=F', name: 'S&P Futures', price: 6477.50, change: -98.25, changePct: -1.49, spark: [6560, 6540, 6510, 6490, 6477] },
    { symbol: 'YM=F', name: 'Dow Futures', price: 45960.00, change: -385.00, changePct: -0.83, spark: [46300, 46200, 46100, 46000, 45960] },
    { symbol: 'NQ=F', name: 'Nasdaq Futures', price: 21410.75, change: -445.50, changePct: -2.04, spark: [21800, 21700, 21550, 21450, 21410] },
    { symbol: 'RTY=F', name: 'Russell 2000 Futures', price: 2198.40, change: -24.10, changePct: -1.08, spark: [2225, 2218, 2210, 2202, 2198] },
    { symbol: '^VIX', name: 'VIX', price: 26.18, change: 3.42, changePct: 15.03, spark: [22, 23, 24, 25, 26] },
    { symbol: 'GC=F', name: 'Gold', price: 4430.66, change: 50.70, changePct: 1.16, spark: [4380, 4395, 4410, 4420, 4430] },
    { symbol: 'BTC-USD', name: 'Bitcoin USD', price: 67720.25, change: -1066.38, changePct: -1.55, spark: [68800, 68400, 68000, 67800, 67720] },
    { symbol: '^TNX', name: 'CBOE 10Y T-Note', price: 4.52, change: -0.01, changePct: -0.22, spark: [4.54, 4.53, 4.53, 4.52, 4.52] },
  ],
  'Crypto': [
    { symbol: 'BTC-USD', name: 'Bitcoin USD', price: 67793.94, change: 1072.85, changePct: 1.61, spark: [66700, 67000, 67200, 67500, 67794] },
    { symbol: 'XRP-USD', name: 'XRP USD', price: 1.35, change: 0.02, changePct: 1.18, spark: [1.33, 1.33, 1.34, 1.34, 1.35] },
    { symbol: 'ETH-USD', name: 'Ethereum USD', price: 2070.79, change: 69.94, changePct: 3.50, spark: [2000, 2020, 2040, 2055, 2071] },
    { symbol: 'USDT-USD', name: 'Tether USDt USD', price: 1.00, change: 0.00, changePct: 0.01, spark: [1.00, 1.00, 1.00, 1.00, 1.00] },
    { symbol: 'BNB-USD', name: 'BNB USD', price: 618.43, change: 5.90, changePct: 0.96, spark: [612, 614, 615, 617, 618] },
    { symbol: 'SOL-USD', name: 'Solana USD', price: 84.27, change: 1.86, changePct: 2.26, spark: [82, 82.5, 83, 83.5, 84.3] },
    { symbol: 'DOGE-USD', name: 'Dogecoin USD', price: 0.09, change: 0.00, changePct: 2.38, spark: [0.088, 0.088, 0.089, 0.089, 0.09] },
  ],
  'Rates': [
    { symbol: '^IRX', name: '13-Wk Bond', price: 3.6070, change: -0.0130, changePct: -0.36, spark: [3.62, 3.62, 3.61, 3.61, 3.607] },
    { symbol: '^FVX', name: '5-Yr Bond', price: 4.0700, change: -0.0250, changePct: -0.61, spark: [4.10, 4.09, 4.08, 4.08, 4.07] },
    { symbol: '^TNX', name: '10-Yr Bond', price: 4.4400, change: 0.0240, changePct: 0.54, spark: [4.42, 4.42, 4.43, 4.43, 4.44] },
    { symbol: '^TYX', name: '30-Yr Bond', price: 4.9820, change: 0.0460, changePct: 0.93, spark: [4.94, 4.95, 4.96, 4.97, 4.98] },
    { symbol: 'ZT=F', name: '2 Yr T-Note Futures', price: 103.56, change: 0.04, changePct: 0.04, spark: [103.5, 103.52, 103.53, 103.55, 103.56] },
    { symbol: 'ZN=F', name: '10 Yr T-Note Futures', price: 110.44, change: 0.28, changePct: 0.26, spark: [110.1, 110.2, 110.3, 110.4, 110.44] },
    { symbol: 'GOVT', name: 'iShares 20+ Treasury Bond ETF', price: 85.64, change: -0.47, changePct: -0.55, spark: [86.1, 86.0, 85.9, 85.7, 85.64] },
  ],
  'Commodities': [
    { symbol: 'CL=F', name: 'Crude Oil', price: 101.37, change: 1.73, changePct: 1.74, spark: [99.5, 100, 100.5, 101, 101.4] },
    { symbol: 'GC=F', name: 'Gold', price: 4566.00, change: 41.70, changePct: 0.92, spark: [4520, 4535, 4545, 4555, 4566] },
    { symbol: 'SI=F', name: 'Silver', price: 71.32, change: 1.52, changePct: 2.18, spark: [69.8, 70.0, 70.5, 71.0, 71.3] },
    { symbol: 'HG=F', name: 'Copper May 26', price: 5.52, change: 0.03, changePct: 0.47, spark: [5.48, 5.49, 5.50, 5.51, 5.52] },
    { symbol: 'NG=F', name: 'Natural Gas May 26', price: 2.9220, change: -0.1030, changePct: -3.40, spark: [3.03, 3.00, 2.97, 2.95, 2.92] },
    { symbol: 'BZ=F', name: 'Brent Crude Oil Last Day Financ', price: 107.78, change: 2.46, changePct: 2.34, spark: [105, 105.8, 106.5, 107, 107.8] },
    { symbol: 'PL=F', name: 'Platinum Jul 26', price: 1932.10, change: 45.00, changePct: 2.38, spark: [1885, 1900, 1910, 1920, 1932] },
  ],
  'Currencies': [
    { symbol: 'EURUSD=X', name: 'EUR/USD', price: 1.1480, change: -0.0026, changePct: -0.22, spark: [1.151, 1.150, 1.149, 1.149, 1.148] },
    { symbol: 'JPY=X', name: 'USD/JPY', price: 159.5240, change: -0.7620, changePct: -0.48, spark: [160.3, 160.0, 159.8, 159.6, 159.5] },
    { symbol: 'GBPUSD=X', name: 'USD/GBP', price: 0.7562, change: 0.0021, changePct: 0.27, spark: [0.754, 0.755, 0.755, 0.756, 0.756] },
    { symbol: 'AUDUSD=X', name: 'USD/AUD', price: 1.4586, change: 0.0037, changePct: 0.25, spark: [1.455, 1.456, 1.457, 1.458, 1.459] },
    { symbol: 'CAD=X', name: 'USD/CAD', price: 1.3921, change: 0.0029, changePct: 0.21, spark: [1.389, 1.390, 1.391, 1.392, 1.392] },
    { symbol: 'MXN=X', name: 'USD/MXN', price: 18.0898, change: -0.0102, changePct: -0.06, spark: [18.10, 18.10, 18.09, 18.09, 18.09] },
    { symbol: 'HKD=X', name: 'USD/HKD', price: 7.8340, change: 0.0012, changePct: 0.02, spark: [7.833, 7.833, 7.834, 7.834, 7.834] },
  ],
};

const watchlistData = [
  { symbol: 'CL=F', name: 'Crude Oil', tag: 'CLUSD', price: 101.50, changePct: 1.87, color: '#f59e0b' },
  { symbol: 'NQ=F', name: 'Nasdaq 100', tag: 'NQUSD', price: 23397.75, changePct: 0.30, color: '#3b82f6' },
  { symbol: 'GOVT', name: 'iShares U.S. Treasury Bond...', tag: 'GOVT · CBOE', price: 22.77, changePct: 0.02, color: '#6366f1' },
  { symbol: 'ETH-USD', name: 'Ethereum USD', tag: 'ETHUSD · CRYPTO', price: 2053.96, changePct: 3.58, color: '#8b5cf6' },
  { symbol: 'BTC-USD', name: 'Bitcoin USD', tag: 'BTCUSD · CRYPTO', price: 67474.24, changePct: 2.30, color: '#f97316' },
];

const moversData = {
  Gainers: [
    { symbol: 'AGX', name: 'Argan, Inc.', exchange: 'NYSE', price: 566.62, changePct: 37.91 },
    { symbol: 'EGG', name: 'Enigmatig Limited', exchange: 'AMEX', price: 7.26, changePct: 32.00 },
    { symbol: 'MSC', name: 'Studio City International Hol...', exchange: 'NYSE', price: 3.37, changePct: 27.17 },
    { symbol: 'TBN', name: 'Tamboran Resources Corp', exchange: 'NYSE', price: 43.40, changePct: 25.62 },
  ],
  Losers: [
    { symbol: 'LUMN', name: 'Lumen Technologies', exchange: 'NYSE', price: 3.85, changePct: -18.42 },
    { symbol: 'SMCI', name: 'Super Micro Computer', exchange: 'NASDAQ', price: 28.90, changePct: -12.35 },
    { symbol: 'RIVN', name: 'Rivian Automotive', exchange: 'NASDAQ', price: 11.45, changePct: -9.88 },
    { symbol: 'SNAP', name: 'Snap Inc.', exchange: 'NYSE', price: 8.72, changePct: -8.56 },
  ],
  Active: [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NASDAQ', price: 171.24, changePct: -4.16 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', exchange: 'NASDAQ', price: 178.92, changePct: -4.46 },
    { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NASDAQ', price: 242.56, changePct: -1.31 },
    { symbol: 'AMD', name: 'Advanced Micro Devices', exchange: 'NASDAQ', price: 162.45, changePct: -3.78 },
  ],
};

const sectorData = [
  { name: 'Technology', price: 129.92, changePct: -1.95 },
  { name: 'Energy', price: 62.56, changePct: 1.69 },
  { name: 'Consumer Cyclical', price: 105.68, changePct: -2.89 },
  { name: 'Consumer Defensive', price: 81.78, changePct: 0.79 },
  { name: 'Communication Servic...', price: 107.04, changePct: -1.63 },
  { name: 'Industrials', price: 159.20, changePct: -1.28 },
  { name: 'Financial Services', price: 47.81, changePct: -2.53 },
  { name: 'Utilities', price: 45.59, changePct: 0.57 },
  { name: 'Basic Materials', price: 48.91, changePct: -0.37 },
  { name: 'Real Estate', price: 40.01, changePct: -0.69 },
  { name: 'Healthcare', price: 143.26, changePct: -1.70 },
];

const newsAnalysis = [
  { id: 'na-1', category: 'News', title: 'Federal Reserve Signals Patience on Rate Cuts Amid Sticky Inflation', summary: 'Fed Chair Powell emphasized data dependency, noting that recent inflation readings have been "somewhat elevated" and the central bank needs greater confidence before easing.', image: '📰', sourceCount: 3, sources: ['Reuters', 'Bloomberg', 'CNBC'], time: '45m ago', tickers: [{ symbol: 'SPY', price: 572.30, changePct: -1.74 }] },
  { id: 'na-2', category: 'Analysis', title: 'Goldman Sachs: AI Capex Cycle Has Room to Run — Raise Semi Estimates', summary: 'GS upgrades semiconductor sector to Overweight, arguing AI infrastructure spending will accelerate in H2 2026. Raises NVDA price target to $240.', image: '📊', sourceCount: 2, sources: ['Goldman Sachs', 'Bloomberg'], time: '2h ago', tickers: [{ symbol: 'NVDA', price: 171.24, changePct: -4.16 }, { symbol: 'AVGO', price: 309.51, changePct: 5.49 }] },
  { id: 'na-3', category: 'Analysis', title: 'Oil Markets Face Supply Squeeze as OPEC+ Holds Production Steady', summary: 'OPEC+ surprised markets by maintaining current production cuts through Q3 2026. Brent crude rallied above $107/bbl.', image: '🛢️', sourceCount: 2, sources: ['Bloomberg', 'Reuters'], time: '3h ago', tickers: [{ symbol: 'XOM', price: 118.56, changePct: -5.23 }] },
  { id: 'na-4', category: 'News', title: 'China GDP Growth Beats Expectations at 5.4% in Q1 2026', summary: 'China\'s economy grew 5.4% year-over-year in Q1, driven by manufacturing exports and government stimulus.', image: '🌏', sourceCount: 3, sources: ['CNBC', 'Reuters', 'SCMP'], time: '4h ago', tickers: [{ symbol: 'TCEHY', price: 62.74, changePct: -2.52 }] },
  { id: 'na-5', category: 'Analysis', title: 'The Dollar Dilemma: Why DXY Strength May Not Last', summary: 'Despite the Fed\'s hawkish stance, structural factors including twin deficits and de-dollarization trends suggest the dollar rally is approaching its limits.', image: '💱', sourceCount: 2, sources: ['FT', 'WSJ'], time: '6h ago', tickers: [] },
  { id: 'na-6', category: 'News', title: 'Apple Announces $110B Stock Buyback — Largest in Corporate History', summary: 'Apple authorized a record $110 billion share repurchase program alongside a 4% dividend increase.', image: '🍎', sourceCount: 4, sources: ['WSJ', 'Bloomberg', 'Reuters', 'CNBC'], time: '8h ago', tickers: [{ symbol: 'AAPL', price: 242.56, changePct: -1.31 }] },
  { id: 'na-7', category: 'Analysis', title: 'Crypto Regulatory Clarity Drives Institutional Adoption', summary: 'New SEC framework for digital asset classification is accelerating institutional crypto adoption. Bitcoin ETF assets surpassed $120B.', image: '₿', sourceCount: 3, sources: ['CoinDesk', 'Bloomberg', 'SEC.gov'], time: '12h ago', tickers: [{ symbol: 'BTC-USD', price: 67830, changePct: -1.39 }] },
  { id: 'na-8', category: 'News', title: 'EU Carbon Border Tax Takes Effect — Impact on Global Trade', summary: 'The EU\'s CBAM officially entered its definitive phase, imposing tariffs on carbon-intensive imports.', image: '🌱', sourceCount: 2, sources: ['Reuters', 'FT'], time: '1d ago', tickers: [] },
];

const tabs = Object.keys(marketData);

function MiniSparkline({ data, color }) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width={60} height={28}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default function MacroIntelligence({ onSymbolClick }) {
  const [activeTab, setActiveTab] = useState('US Markets');
  // removed expandedOpp/expandedOppSources — now handled by RecommendationCard
  const [moverTab, setMoverTab] = useState('Gainers');
  const [watchPage, setWatchPage] = useState(0);
  const [newsFilter, setNewsFilter] = useState('All');

  const currentMarket = marketData[activeTab];

  return (
    <div className="grid grid-cols-[1fr_340px] gap-6">
      {/* LEFT COLUMN */}
      <div className="space-y-6 min-w-0">
        {/* Market Overview */}
        <section>
          <h2 className="text-[16px] font-semibold mb-4">Market Overview</h2>
          <div className="flex gap-1 mb-4 border-b border-border">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-3 py-2.5 text-[12px] font-medium border-b-2 transition-colors cursor-pointer whitespace-nowrap
                  ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
                {tab}
              </button>
            ))}
          </div>

          {/* Horizontal scrollable market items */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {currentMarket.map(item => (
              <div key={item.symbol} onClick={() => onSymbolClick?.(item.symbol)} className="card-sm shrink-0 w-[165px] cursor-pointer hover:shadow-sm transition">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="text-[11px] font-semibold text-text-primary">{item.name}</div>
                    <div className="text-[10px] text-text-tertiary">{item.symbol}</div>
                  </div>
                </div>
                <div className="flex items-end justify-between mt-2">
                  <div>
                    <div className="text-[15px] font-bold">
                      {item.price >= 100 ? item.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : item.price.toFixed(item.price < 10 ? 4 : 2)}
                    </div>
                    <div className={`text-[11px] font-medium ${item.change >= 0 ? 'text-green' : 'text-red'}`}>
                      {item.change >= 0 ? '+' : ''}{item.changePct.toFixed(2)}%
                    </div>
                  </div>
                  {item.spark && <MiniSparkline data={item.spark} color={item.change >= 0 ? '#16a34a' : '#dc2626'} />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Opportunities */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Globe size={18} className="text-primary" />
            <h2 className="text-[16px] font-semibold">Opportunities</h2>
          </div>
          <div className="space-y-3">
            {macroOpportunities.map(opp => (
              <RecommendationCard key={opp.id} rec={opp} onSymbolClick={onSymbolClick} />
            ))}
          </div>
          <button className="mt-3 w-full py-2.5 text-[12px] font-medium text-primary hover:bg-primary-50 rounded-lg transition cursor-pointer">
            View History →
          </button>
        </section>

        {/* S&P 500 Heatmap */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[16px] font-semibold">S&P 500 Heatmap</h2>
            <button className="flex items-center gap-1 text-[11px] text-text-tertiary hover:text-primary cursor-pointer">
              Expand <Maximize2 size={12} />
            </button>
          </div>
          <div className="card p-2 overflow-hidden">
            <div className="grid grid-cols-6 gap-0.5 text-[9px] font-semibold" style={{ minHeight: 280 }}>
              {/* Technology */}
              <div className="col-span-2 row-span-3 bg-green/10 rounded p-1.5 flex flex-col">
                <span className="text-[10px] text-text-secondary mb-1">Technology +1.51%</span>
                <div className="grid grid-cols-3 gap-0.5 flex-1">
                  {[{s:'NVDA',c:0.77},{s:'AVGO',c:1.29},{s:'AAPL',c:0.73},{s:'MSFT',c:-0.22},{s:'AMD',c:3.33},{s:'ORCL',c:-1.24},{s:'INTC',c:8.84},{s:'QCOM',c:0.5},{s:'MU',c:8.88}].map(t => (
                    <button key={t.s} onClick={() => onSymbolClick?.(t.s)}
                      className={`rounded p-0.5 text-center cursor-pointer hover:opacity-80 transition ${t.c >= 0 ? 'bg-green/20 text-green' : 'bg-red/10 text-red'}`}>
                      <div className="font-bold text-[8px]">{t.s}</div>
                      <div className="text-[7px]">{t.c >= 0 ? '+' : ''}{t.c}%</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Communication Services */}
              <div className="col-span-2 row-span-2 bg-green/10 rounded p-1.5">
                <span className="text-[10px] text-text-secondary mb-1 block">Comm. Services +0.34%</span>
                <div className="grid grid-cols-2 gap-0.5">
                  {[{s:'GOOGL',c:3.42},{s:'META',c:1.24},{s:'NFLX',c:-0.62},{s:'TMUS',c:-2.75}].map(t => (
                    <button key={t.s} onClick={() => onSymbolClick?.(t.s)}
                      className={`rounded p-0.5 text-center cursor-pointer hover:opacity-80 ${t.c >= 0 ? 'bg-green/20 text-green' : 'bg-red/10 text-red'}`}>
                      <div className="font-bold text-[8px]">{t.s}</div>
                      <div className="text-[7px]">{t.c >= 0 ? '+' : ''}{t.c}%</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Consumer Defensive */}
              <div className="row-span-2 bg-red/5 rounded p-1.5">
                <span className="text-[9px] text-text-secondary block mb-0.5">Cons. Def. -0.63%</span>
                {[{s:'WMT',c:0.37},{s:'PG',c:-0.8},{s:'COST',c:-1.2}].map(t => (
                  <button key={t.s} onClick={() => onSymbolClick?.(t.s)}
                    className={`block w-full rounded p-0.5 text-center mb-0.5 cursor-pointer hover:opacity-80 ${t.c >= 0 ? 'bg-green/15 text-green' : 'bg-red/10 text-red'}`}>
                    <div className="font-bold text-[8px]">{t.s} {t.c >= 0 ? '+' : ''}{t.c}%</div>
                  </button>
                ))}
              </div>
              {/* Healthcare */}
              <div className="row-span-2 bg-green/5 rounded p-1.5">
                <span className="text-[9px] text-text-secondary block mb-0.5">Healthcare +0.76%</span>
                {[{s:'LLY',c:3.75},{s:'JNJ',c:-0.13},{s:'MRK',c:0.49},{s:'PFE',c:-0.3}].map(t => (
                  <button key={t.s} onClick={() => onSymbolClick?.(t.s)}
                    className={`block w-full rounded p-0.5 text-center mb-0.5 cursor-pointer hover:opacity-80 ${t.c >= 0 ? 'bg-green/15 text-green' : 'bg-red/10 text-red'}`}>
                    <div className="font-bold text-[8px]">{t.s} {t.c >= 0 ? '+' : ''}{t.c}%</div>
                  </button>
                ))}
              </div>
              {/* Consumer Cyclical */}
              <div className="col-span-2 bg-green/5 rounded p-1.5">
                <span className="text-[9px] text-text-secondary block mb-0.5">Consumer Cyclical +0.75%</span>
                <div className="flex gap-0.5">
                  {[{s:'AMZN',c:1.10},{s:'TSLA',c:2.56},{s:'HD',c:0.20}].map(t => (
                    <button key={t.s} onClick={() => onSymbolClick?.(t.s)}
                      className={`flex-1 rounded p-0.5 text-center cursor-pointer hover:opacity-80 ${t.c >= 0 ? 'bg-green/20 text-green' : 'bg-red/10 text-red'}`}>
                      <div className="font-bold text-[8px]">{t.s}</div>
                      <div className="text-[7px]">+{t.c}%</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Financial Services */}
              <div className="col-span-2 bg-green/5 rounded p-1.5">
                <span className="text-[9px] text-text-secondary block mb-0.5">Financial +0.14%</span>
                <div className="flex gap-0.5">
                  {[{s:'BRK-B',c:-0.15},{s:'JPM',c:1.07},{s:'V',c:-1.23},{s:'BAC',c:0.5}].map(t => (
                    <button key={t.s} onClick={() => onSymbolClick?.(t.s)}
                      className={`flex-1 rounded p-0.5 text-center cursor-pointer hover:opacity-80 ${t.c >= 0 ? 'bg-green/15 text-green' : 'bg-red/10 text-red'}`}>
                      <div className="font-bold text-[8px]">{t.s}</div>
                      <div className="text-[7px]">{t.c >= 0 ? '+' : ''}{t.c}%</div>
                    </button>
                  ))}
                </div>
              </div>
              {/* Energy */}
              <div className="bg-red/10 rounded p-1.5">
                <span className="text-[9px] text-text-secondary block mb-0.5">Energy -3.74%</span>
                {[{s:'XOM',c:-5.23},{s:'CVX',c:-4.62}].map(t => (
                  <button key={t.s} onClick={() => onSymbolClick?.(t.s)}
                    className="block w-full rounded p-0.5 text-center mb-0.5 bg-red/15 text-red cursor-pointer hover:opacity-80">
                    <div className="font-bold text-[8px]">{t.s} {t.c}%</div>
                  </button>
                ))}
              </div>
              {/* Industrials */}
              <div className="bg-green/5 rounded p-1.5">
                <span className="text-[9px] text-text-secondary block mb-0.5">Industrials +1.67%</span>
                {[{s:'CAT',c:3.09},{s:'GE',c:3.14},{s:'BA',c:-0.5}].map(t => (
                  <button key={t.s} onClick={() => onSymbolClick?.(t.s)}
                    className={`block w-full rounded p-0.5 text-center mb-0.5 cursor-pointer hover:opacity-80 ${t.c >= 0 ? 'bg-green/15 text-green' : 'bg-red/10 text-red'}`}>
                    <div className="font-bold text-[8px]">{t.s} {t.c >= 0 ? '+' : ''}{t.c}%</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[9px] text-text-tertiary">
              <div className="flex items-center gap-1">
                <span>-3%</span>
                <div className="flex gap-0.5">
                  {['#fecaca','#fde8e8','#f3f4f6','#dcfce7','#bbf7d0'].map(c => (
                    <div key={c} className="w-3 h-2 rounded-sm" style={{ background: c }} />
                  ))}
                </div>
                <span>+3%</span>
              </div>
              <span>Apr 1, 2026, 4:00 PM EDT</span>
            </div>
          </div>
        </section>

        {/* News & Analysis (infinite scroll, no View History) */}
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
            {newsAnalysis.filter(n => newsFilter === 'All' || n.category === newsFilter).map(n => (
              <NewsCard key={n.id} item={n} onSymbolClick={onSymbolClick} />
            ))}
            <div className="text-center py-4 text-[12px] text-text-tertiary">Scroll for more...</div>
          </div>
        </section>
      </div>

      {/* RIGHT COLUMN */}
      <div className="space-y-4">
        {/* Watchlist (Perplexity Finance style) */}
        <div className="card p-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h3 className="text-[13px] font-semibold">Watchlist</h3>
          </div>
          <div className="divide-y divide-border-light">
            {watchlistData.map(w => (
              <div key={w.symbol} onClick={() => onSymbolClick?.(w.symbol)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                  style={{ background: w.color }}>
                  {w.symbol.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-text-primary truncate">{w.name}</div>
                  <div className="text-[10px] text-text-tertiary">{w.tag}</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-semibold">${w.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  <div className={`text-[11px] font-medium ${w.changePct >= 0 ? 'text-green' : 'text-red'}`}>
                    {w.changePct >= 0 ? '+' : ''}{w.changePct.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 px-4 py-2.5 border-t border-border text-text-tertiary">
            <button className="hover:text-text-secondary cursor-pointer"><ChevronLeft size={16} /></button>
            <span className="text-[11px]">1 / 2</span>
            <button className="hover:text-text-secondary cursor-pointer"><ChevronRight size={16} /></button>
          </div>
        </div>

        {/* Top Gainers / Losers / Active (Perplexity Finance style) */}
        <div className="card p-0">
          <div className="flex border-b border-border">
            {['Gainers', 'Losers', 'Active'].map(tab => (
              <button key={tab} onClick={() => setMoverTab(tab)}
                className={`flex-1 py-2.5 text-[12px] font-semibold text-center border-b-2 transition cursor-pointer
                  ${moverTab === tab ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
                {tab}
              </button>
            ))}
          </div>
          <div className="divide-y divide-border-light">
            {moversData[moverTab].map(m => (
              <div key={m.symbol} onClick={() => onSymbolClick?.(m.symbol)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-text-secondary shrink-0">
                  {m.symbol.substring(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-text-primary truncate">{m.name}</div>
                  <div className="text-[10px] text-text-tertiary">{m.symbol} · {m.exchange}</div>
                </div>
                <div className="text-right">
                  <div className="text-[12px] font-semibold">${m.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                  <div className={`text-[11px] font-semibold ${m.changePct >= 0 ? 'text-green' : 'text-red'}`}>
                    {m.changePct >= 0 ? '+' : ''}{m.changePct.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-2.5 border-t border-border text-center">
            <span className="text-[11px] text-primary font-medium cursor-pointer hover:text-primary-light">See all &gt;</span>
          </div>
        </div>

        {/* Equity Sectors (Perplexity Finance style) */}
        <div className="card p-0">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-[13px] font-semibold">Equity Sectors</h3>
          </div>
          <div className="divide-y divide-border-light">
            {sectorData.map(s => (
              <div key={s.name} className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition cursor-pointer">
                <span className="text-[12px] font-medium text-text-primary">{s.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-text-secondary">${s.price.toFixed(2)}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${s.changePct >= 0 ? 'text-green bg-green-light' : 'text-red bg-red-light'}`}>
                    {s.changePct >= 0 ? '↗' : '↘'} {Math.abs(s.changePct).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
