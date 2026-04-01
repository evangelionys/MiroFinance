import { ChevronDown, ChevronUp, Brain, Search, BarChart3, Shield, Lightbulb } from 'lucide-react';
import { useState } from 'react';

const stepIcons = {
  'Signal Detection': Search,
  'Impact Analysis': BarChart3,
  'Portfolio Context': Brain,
  'Constraint Check': Shield,
  'Recommendation': Lightbulb,
  'Market Impact': BarChart3,
  'Opportunity Assessment': Lightbulb,
};

export default function ReasoningChain({ reasoning, isOpen, onToggle }) {
  if (!reasoning) return null;

  return (
    <div className="mt-3">
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 text-[12px] font-medium text-primary hover:text-primary-light transition-colors cursor-pointer"
      >
        <Brain size={14} />
        <span>Reasoning Chain</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isOpen && (
        <div className="mt-3 ml-1 border-l-2 border-primary-100 pl-4 space-y-3">
          {reasoning.map((step, i) => {
            const Icon = stepIcons[step.step] || Brain;
            return (
              <div key={i} className="relative">
                <div className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-primary-50 border-2 border-primary" />
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon size={12} className="text-primary" />
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wide">{step.step}</span>
                  </div>
                  <p className="text-[12px] text-text-secondary leading-relaxed">{step.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
