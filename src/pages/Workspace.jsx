import { useState } from 'react';
import { Upload, Send, Sparkles, Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';

const screenerResults = [
  { symbol: 'NVDA', name: 'NVIDIA Corpor...', price: 174.48, change: 9.31, changePct: 5.64, volume: '183.362M', avgVol: '180.644M', marketCap: '4.241T', pe: 34.19, w52Low: 86.62, w52High: 212.19, region: 'US', sector: 'Technology' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 253.79, change: 7.16, changePct: 2.90, volume: '32.032M', avgVol: '47.99M', marketCap: '3.73T', pe: 31.56, w52Low: 169.21, w52High: 268.62, region: 'US', sector: 'Technology' },
  { symbol: 'TSM', name: 'Taiwan Semico...', price: 337.95, change: 21.45, changePct: 6.78, volume: '16.756M', avgVol: '14.127M', marketCap: '1.753T', pe: 27.47, w52Low: 134.25, w52High: 390.21, region: 'US', sector: 'Technology' },
  { symbol: 'AVGO', name: 'Broadcom Inc.', price: 309.51, change: 16.10, changePct: 5.49, volume: '20.171M', avgVol: '26.776M', marketCap: '1.467T', pe: 58.60, w52Low: 138.10, w52High: 414.61, region: 'US', sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms...', price: 572.13, change: 35.75, changePct: 6.67, volume: '24.538M', avgVol: '15.658M', marketCap: '1.447T', pe: 22.38, w52Low: 479.80, w52High: 796.26, region: 'US', sector: 'Communication S...' },
  { symbol: 'MSFT', name: 'Microsoft Corp...', price: 370.17, change: 11.21, changePct: 3.12, volume: '32.447M', avgVol: '36.406M', marketCap: '2.751T', pe: 22.33, w52Low: 344.79, w52High: 555.45, region: 'US', sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon.com...', price: 208.27, change: 7.32, changePct: 3.64, volume: '51.968M', avgVol: '50.936M', marketCap: '2.236T', pe: 27.80, w52Low: 161.38, w52High: 258.60, region: 'US', sector: 'Consumer Cyclic...' },
];

export default function Workspace({ onSymbolClick }) {
  const [activeTab, setActiveTab] = useState('research'); // research | screener
  const [query, setQuery] = useState('');
  const [screenerQuery, setScreenerQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleScreenerSubmit = () => {
    if (screenerQuery.trim()) setShowResults(true);
  };

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Tab Toggle */}
      <div className="flex gap-1 mb-6 border-b border-border">
        <button onClick={() => setActiveTab('research')}
          className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer
            ${activeTab === 'research' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
          <span className="flex items-center gap-1.5"><Sparkles size={15} /> Deep Research</span>
        </button>
        <button onClick={() => setActiveTab('screener')}
          className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors cursor-pointer
            ${activeTab === 'screener' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'}`}>
          <span className="flex items-center gap-1.5"><Filter size={15} /> Stock Screener</span>
        </button>
      </div>

      {/* Deep Research Tab */}
      {activeTab === 'research' && (
        <section>
          <div className="card">
            <p className="text-[12px] text-text-secondary mb-4">
              Ask a detailed research question and our AI will conduct comprehensive analysis using multiple data sources, financial models, and market intelligence.
            </p>
            <div className="mb-4">
              <textarea
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="e.g., Analyze the impact of new AI chip export controls on NVDA's revenue mix and competitive positioning over the next 12 months..."
                className="w-full h-36 px-4 py-3 bg-bg border border-border rounded-xl text-[13px] text-text-primary placeholder-text-tertiary outline-none resize-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-[12px] font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors cursor-pointer">
                <Upload size={14} />
                Upload files or images
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-[13px] font-medium hover:bg-primary-light transition-colors cursor-pointer">
                <Send size={14} />
                Start Research
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Stock Screener Tab */}
      {activeTab === 'screener' && (
        <section className="space-y-4">
          <div className="card">
            <p className="text-[12px] text-text-secondary mb-4">
              Describe what kind of stocks you're looking for in natural language. Our AI will screen the US stock market and return matching results with reasoning.
            </p>

            {/* Screener Input */}
            <div className="flex gap-2 mb-3">
              <div className="flex-1 relative">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input
                  type="text"
                  value={screenerQuery}
                  onChange={e => setScreenerQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleScreenerSubmit()}
                  placeholder="e.g., Find AI semiconductor stocks with >50% gross margin and strong revenue growth..."
                  className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors"
                />
              </div>
              <button onClick={handleScreenerSubmit}
                className="px-5 py-3 bg-primary text-white rounded-xl text-[13px] font-medium hover:bg-primary-light transition-colors cursor-pointer shrink-0">
                Screen
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2">
              {[
                'High-growth AI stocks under $200',
                'Dividend aristocrats with low P/E',
                'Undervalued large-cap tech',
                'ESG leaders in S&P 500',
              ].map(prompt => (
                <button key={prompt} onClick={() => { setScreenerQuery(prompt); setShowResults(true); }}
                  className="px-3 py-1.5 bg-bg border border-border rounded-lg text-[11px] text-text-secondary hover:border-primary hover:text-primary transition cursor-pointer">
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Screener Results */}
          {showResults && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[14px] font-semibold text-text-primary">
                  Screening Results
                  <span className="text-[12px] font-normal text-text-tertiary ml-2">{screenerResults.length} stocks found</span>
                </h3>
              </div>

              {/* AI Summary */}
              <div className="card mb-4 bg-primary-50 border-primary/20">
                <div className="flex items-start gap-2">
                  <Sparkles size={16} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-[12px] font-semibold text-primary mb-1">AI Screening Summary</h4>
                    <p className="text-[12px] text-text-secondary leading-relaxed">
                      Based on your criteria, I identified {screenerResults.length} stocks in the US market that match. The top picks are concentrated in the semiconductor and cloud computing sectors, reflecting the current AI infrastructure investment cycle. Key factors considered: gross margin {'>'} 50%, revenue growth {'>'} 20% YoY, and direct AI exposure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Results Table */}
              <div className="card overflow-x-auto p-0">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-border text-text-tertiary">
                      <th className="px-3 py-2.5 text-left font-medium w-[30px]">#</th>
                      <th className="px-2 py-2.5 text-left font-medium">Symbol</th>
                      <th className="px-2 py-2.5 text-left font-medium">Name</th>
                      <th className="px-2 py-2.5 text-right font-medium">Price (Intraday)</th>
                      <th className="px-2 py-2.5 text-right font-medium">Change</th>
                      <th className="px-2 py-2.5 text-right font-medium">Change %</th>
                      <th className="px-2 py-2.5 text-right font-medium">Volume</th>
                      <th className="px-2 py-2.5 text-right font-medium">Avg Vol (3M)</th>
                      <th className="px-2 py-2.5 text-right font-medium">Market Cap</th>
                      <th className="px-2 py-2.5 text-right font-medium">P/E (TTM)</th>
                      <th className="px-2 py-2.5 text-right font-medium">52 Week Range</th>
                      <th className="px-2 py-2.5 text-center font-medium">Region</th>
                      <th className="px-2 py-2.5 text-left font-medium">Sector</th>
                    </tr>
                  </thead>
                  <tbody>
                    {screenerResults.map((s, idx) => (
                      <tr key={s.symbol} className="border-b border-border-light hover:bg-gray-50 transition">
                        <td className="px-3 py-2.5 text-text-tertiary">{idx + 1}</td>
                        <td className="px-2 py-2.5">
                          <button onClick={() => onSymbolClick?.(s.symbol)} className="font-bold text-text-primary hover:text-primary cursor-pointer transition">
                            {s.symbol}
                          </button>
                        </td>
                        <td className="px-2 py-2.5 text-text-secondary">{s.name}</td>
                        <td className="px-2 py-2.5 text-right font-medium">{s.price.toFixed(2)}</td>
                        <td className={`px-2 py-2.5 text-right font-medium ${s.change >= 0 ? 'text-green' : 'text-red'}`}>
                          {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}
                        </td>
                        <td className={`px-2 py-2.5 text-right font-medium ${s.changePct >= 0 ? 'text-green' : 'text-red'}`}>
                          {s.changePct >= 0 ? '+' : ''}{s.changePct.toFixed(2)}%
                        </td>
                        <td className="px-2 py-2.5 text-right text-text-secondary">{s.volume}</td>
                        <td className="px-2 py-2.5 text-right text-text-secondary">{s.avgVol}</td>
                        <td className="px-2 py-2.5 text-right text-text-secondary">{s.marketCap}</td>
                        <td className="px-2 py-2.5 text-right text-text-secondary">{s.pe}</td>
                        <td className="px-2 py-2.5 text-right text-[10px] text-text-tertiary">
                          <div className="flex items-center gap-1 justify-end">
                            <span>{s.w52Low.toLocaleString()}</span>
                            <div className="w-[50px] h-1.5 bg-gray-100 rounded-full relative">
                              <div className="absolute h-full bg-green rounded-full" style={{ width: `${((s.price - s.w52Low) / (s.w52High - s.w52Low)) * 100}%` }} />
                            </div>
                            <span>{s.w52High.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-2 py-2.5 text-center text-text-secondary">{s.region}</td>
                        <td className="px-2 py-2.5 text-text-secondary">{s.sector}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
