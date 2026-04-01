import { useState } from 'react';
import { Sliders } from 'lucide-react';
import { constraints } from '../data/mockData';

function ConstraintBar({ label, current, max, unit = '%', inverted = false }) {
  const pct = (current / max) * 100;
  const isWarning = inverted ? current < max : current > max;
  const barColor = isWarning ? '#dc2626' : current / max > 0.85 ? '#eab308' : '#16a34a';
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] font-medium text-text-primary">{label}</span>
        <div className="text-[12px]">
          <span className="font-semibold" style={{ color: barColor }}>{current}{unit}</span>
          <span className="text-text-tertiary"> / {max}{unit} max</span>
        </div>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%`, background: barColor }} />
      </div>
    </div>
  );
}

export default function AssetOptimizer({ onSymbolClick }) {
  const [maxDrawdown, setMaxDrawdown] = useState(constraints.riskTolerance.maxDrawdown);
  const [minCashFlow, setMinCashFlow] = useState(constraints.cashFlowRatio.minimum);
  const [sectorCap, setSectorCap] = useState(constraints.sectorConcentration.max);
  const [cryptoCap, setCryptoCap] = useState(constraints.cryptoExposure.max);

  return (
    <div className="max-w-[720px] mx-auto">
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Sliders size={20} className="text-primary" />
          <h2 className="text-[16px] font-semibold">Constraint Parameters</h2>
        </div>

        <div className="card">
          <p className="text-[12px] text-text-secondary mb-6">
            Adjust your investment constraints below. The system will use these parameters to evaluate your portfolio and generate recommendations.
          </p>

          {/* Max Drawdown */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-semibold text-text-primary">Max Drawdown Tolerance</label>
              <span className="text-[14px] font-bold text-primary">{maxDrawdown}%</span>
            </div>
            <input type="range" min={5} max={30} value={maxDrawdown} onChange={e => setMaxDrawdown(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary" />
            <div className="flex justify-between text-[10px] text-text-tertiary mt-1">
              <span>Conservative (5%)</span>
              <span>Aggressive (30%)</span>
            </div>
          </div>

          {/* Min Cash Flow Ratio */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-semibold text-text-primary">Min Cash Flow Ratio</label>
              <span className="text-[14px] font-bold text-primary">{minCashFlow}%</span>
            </div>
            <input type="range" min={5} max={30} value={minCashFlow} onChange={e => setMinCashFlow(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary" />
            <div className="flex justify-between text-[10px] text-text-tertiary mt-1">
              <span>Low (5%)</span>
              <span>High (30%)</span>
            </div>
          </div>

          {/* Sector Concentration Cap */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-semibold text-text-primary">Sector Concentration Cap</label>
              <span className="text-[14px] font-bold text-primary">{sectorCap}%</span>
            </div>
            <input type="range" min={20} max={60} value={sectorCap} onChange={e => setSectorCap(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary" />
            <div className="flex justify-between text-[10px] text-text-tertiary mt-1">
              <span>Strict (20%)</span>
              <span>Flexible (60%)</span>
            </div>
          </div>

          {/* Crypto Exposure Cap */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] font-semibold text-text-primary">Crypto Exposure Cap</label>
              <span className="text-[14px] font-bold text-primary">{cryptoCap}%</span>
            </div>
            <input type="range" min={0} max={25} value={cryptoCap} onChange={e => setCryptoCap(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary" />
            <div className="flex justify-between text-[10px] text-text-tertiary mt-1">
              <span>None (0%)</span>
              <span>High (25%)</span>
            </div>
          </div>

          {/* Current Status */}
          <div className="border-t border-border pt-5">
            <h4 className="text-[13px] font-semibold text-text-secondary mb-4">Current Status</h4>
            <ConstraintBar label="Max Drawdown" current={constraints.riskTolerance.current} max={maxDrawdown} />
            <ConstraintBar label="Cash Flow Ratio" current={constraints.cashFlowRatio.current} max={minCashFlow} inverted />
            <ConstraintBar label="Tech Sector Concentration" current={constraints.sectorConcentration.current} max={sectorCap} />
            <ConstraintBar label="Crypto Exposure" current={constraints.cryptoExposure.current} max={cryptoCap} />
          </div>
        </div>
      </section>
    </div>
  );
}
