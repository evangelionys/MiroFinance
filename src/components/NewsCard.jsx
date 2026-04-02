import { useState } from 'react';
import { Newspaper } from 'lucide-react';

export default function NewsCard({ item, onSymbolClick }) {
  const [sourcesOpen, setSourcesOpen] = useState(false);

  return (
    <div className="card flex gap-4 hover:shadow-sm transition-shadow cursor-pointer">
      {/* Image */}
      {item.image && (
        <div className="w-[88px] h-[66px] rounded-lg bg-gray-100 shrink-0 flex items-center justify-center overflow-hidden">
          <span className="text-[22px]">{item.image}</span>
        </div>
      )}
      <div className="flex-1 min-w-0">
        {/* Category + Title */}
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`badge ${item.category === 'News' ? 'badge-blue' : 'badge-orange'}`}>{item.category}</span>
        </div>
        <h3 className="text-[13px] font-semibold text-text-primary mb-1 leading-snug">{item.title}</h3>
        <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2 mb-2">{item.summary}</p>

        {/* Ticker tags with price */}
        {item.tickers && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {item.tickers.map(t => {
              const sym = typeof t === 'string' ? t : t.symbol;
              const price = typeof t === 'object' ? t.price : null;
              const chg = typeof t === 'object' ? t.changePct : null;
              return (
                <button key={sym} onClick={(e) => { e.stopPropagation(); onSymbolClick?.(sym); }}
                  className="flex items-center gap-1 px-2 py-0.5 bg-bg border border-border rounded text-[10px] font-semibold text-primary hover:bg-primary-50 cursor-pointer transition">
                  <span>{sym}</span>
                  {price != null && <span className="text-text-secondary">${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>}
                  {chg != null && <span className={chg >= 0 ? 'text-green' : 'text-red'}>{chg >= 0 ? '↑' : '↓'}{Math.abs(chg)}%</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Bottom: sources icons + time */}
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); setSourcesOpen(!sourcesOpen); }}
            className="flex items-center gap-1 text-[10px] text-text-tertiary hover:text-primary cursor-pointer transition">
            <div className="flex -space-x-1">
              {(item.sources || []).slice(0, 3).map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 rounded-full bg-gray-200 border border-white flex items-center justify-center">
                  <Newspaper size={7} className="text-text-tertiary" />
                </div>
              ))}
            </div>
            <span>{item.sourceCount || 1} sources</span>
          </button>
          {sourcesOpen && (
            <div className="flex flex-wrap gap-1">
              {(item.sources || [item.source]).map((s, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-bg border border-border rounded text-[9px] text-text-secondary">{s}</span>
              ))}
            </div>
          )}
          <span className="text-[10px] text-text-tertiary">{item.time}</span>
        </div>
      </div>
    </div>
  );
}
