import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ email, name: email.split('@')[0] });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-[480px] bg-primary flex-col justify-between p-12 text-white">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <span className="text-[16px] font-bold">M</span>
            </div>
            <span className="text-[22px] font-bold tracking-tight">MiroFinance</span>
          </div>
          <p className="text-[14px] text-white/60 mt-1">AI-Powered Wealth Intelligence</p>
        </div>
        <div className="space-y-8">
          <div>
            <h2 className="text-[28px] font-bold leading-tight mb-3">
              Smarter decisions.<br />Transparent reasoning.
            </h2>
            <p className="text-[14px] text-white/70 leading-relaxed">
              MiroFinance combines advanced AI reasoning with institutional-grade portfolio analytics to deliver actionable investment intelligence.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'AI Reasoning', value: 'White-box' },
              { label: 'Risk Analysis', value: 'Real-time' },
              { label: 'Alpha Attribution', value: '4-Factor' },
            ].map(item => (
              <div key={item.label} className="bg-white/10 rounded-lg p-3">
                <div className="text-[16px] font-bold">{item.value}</div>
                <div className="text-[11px] text-white/60">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-white/40">&copy; 2026 MiroFinance. All rights reserved.</p>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white text-[12px] font-bold">M</span>
            </div>
            <span className="text-[18px] font-bold text-text-primary">MiroFinance</span>
          </div>

          <h1 className="text-[24px] font-bold text-text-primary mb-1">Welcome back</h1>
          <p className="text-[14px] text-text-secondary mb-8">Sign in to your account to continue</p>

          {error && (
            <div className="mb-4 p-3 bg-red-light rounded-lg text-[12px] text-red font-medium">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input
                  type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary cursor-pointer">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border accent-primary" />
                <span className="text-[12px] text-text-secondary">Remember me</span>
              </label>
              <button type="button" className="text-[12px] text-primary font-medium hover:text-primary-light cursor-pointer">
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl text-[14px] font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-[13px] text-text-secondary mt-6">
            Don't have an account?{' '}
            <button onClick={onSwitchToRegister} className="text-primary font-semibold hover:text-primary-light cursor-pointer">
              Create account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
