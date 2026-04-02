import { useState } from 'react';
import { ChevronDown, ChevronUp, Newspaper } from 'lucide-react';

const urgencyColors = { high: 'badge-red', medium: 'badge-orange', low: 'badge-blue' };

export default function RecommendationCard({ rec, onSymbolClick }) {
  const [expanded, setExpanded] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  return (
    <div className="card">
      {/* Title */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className={`badge ${urgencyColors[rec.urgency]}`}>{rec.urgency}</span>
      </div>
      <h3 className="text-[14px] font-semibold text-text-primary mb-1">{rec.title}</h3>

      {/* Summary with inline expand arrow */}
      <div className="mb-2">
        <p className="text-[12px] text-text-secondary leading-relaxed inline">{rec.summary}</p>
        <button onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center ml-1 text-text-tertiary hover:text-primary cursor-pointer transition align-middle">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expanded detail (Markdown) */}
      {expanded && rec.detail && (
        <div className="mb-3 pt-2 border-t border-border-light">
          <div className="text-[12px] text-text-secondary leading-relaxed whitespace-pre-line">
            {rec.detail.split('\n').map((line, i) => {
              if (line.startsWith('## ')) return <h4 key={i} className="text-[12px] font-bold text-text-primary mt-3 mb-1">{line.replace('## ', '')}</h4>;
              if (line.includes('**')) {
                const parts = line.split(/\*\*(.*?)\*\*/g);
                return <p key={i}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</p>;
              }
              return line ? <p key={i}>{line}</p> : null;
            })}
          </div>
        </div>
      )}

      {/* Symbol Tags with price */}
      {rec.tickers && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {rec.tickers.map(t => (
            <button key={t.symbol} onClick={() => onSymbolClick?.(t.symbol)}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-bg border border-border rounded-lg text-[11px] hover:border-primary cursor-pointer transition">
              <span className="font-bold text-text-primary">{t.symbol}</span>
              <span className="font-medium">${t.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              <span className={`font-medium ${t.changePct >= 0 ? 'text-green' : 'text-red'}`}>
                {t.changePct >= 0 ? '↑' : '↓'}{Math.abs(t.changePct)}%
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Bottom: sources icons + timestamp */}
      <div className="flex items-center justify-between pt-2 border-t border-border-light">
        <div className="flex items-center gap-2">
          <button onClick={() => setSourcesOpen(!sourcesOpen)}
            className="flex items-center gap-1 text-[11px] text-text-tertiary hover:text-primary cursor-pointer transition">
            <div className="flex -space-x-1">
              {(rec.sources || []).slice(0, 3).map((_, i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-gray-200 border border-white flex items-center justify-center">
                  <Newspaper size={8} className="text-text-tertiary" />
                </div>
              ))}
            </div>
            <span>{rec.sourceCount} sources</span>
          </button>
          {sourcesOpen && (
            <div className="flex flex-wrap gap-1">
              {(rec.sources || []).map((s, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-bg border border-border rounded text-[9px] text-text-secondary">{s}</span>
              ))}
            </div>
          )}
        </div>
        <span className="text-[10px] text-text-tertiary">{rec.timestamp}</span>
      </div>
    </div>
  );
}
