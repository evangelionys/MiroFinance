import { Briefcase, Link2, PenLine, ArrowRight } from 'lucide-react';

export default function EmptyPortfolio({ onCreateBroker, onCreateManual }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
        <Briefcase size={36} className="text-primary" />
      </div>
      <h2 className="text-[20px] font-bold text-text-primary mb-2">No Portfolio Yet</h2>
      <p className="text-[14px] text-text-secondary mb-8 text-center max-w-[400px]">
        Create a portfolio to get personalized investment recommendations, risk analysis, and AI-powered insights.
      </p>

      <div className="flex gap-4">
        <button onClick={onCreateBroker}
          className="flex items-center gap-3 px-6 py-4 border border-border rounded-xl hover:border-primary hover:bg-primary-50 transition-all cursor-pointer text-left group">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors">
            <Link2 size={20} />
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-text-primary">Connect Broker</h3>
            <p className="text-[11px] text-text-secondary">Sync via Plaid</p>
          </div>
          <ArrowRight size={16} className="text-text-tertiary ml-2 group-hover:text-primary" />
        </button>

        <button onClick={onCreateManual}
          className="flex items-center gap-3 px-6 py-4 border border-border rounded-xl hover:border-primary hover:bg-primary-50 transition-all cursor-pointer text-left group">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white text-primary transition-colors">
            <PenLine size={20} />
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-text-primary">Enter Manually</h3>
            <p className="text-[11px] text-text-secondary">Add positions by symbol</p>
          </div>
          <ArrowRight size={16} className="text-text-tertiary ml-2 group-hover:text-primary" />
        </button>
      </div>
    </div>
  );
}
