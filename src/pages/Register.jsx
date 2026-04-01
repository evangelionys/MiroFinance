import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Register({ onRegister, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError('Password must contain both letters and numbers.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegister({ email, name });
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
        <div className="space-y-6">
          <h2 className="text-[28px] font-bold leading-tight">
            Get started in minutes.
          </h2>
          <div className="space-y-4">
            {[
              { step: '1', title: 'Create your account', desc: 'Sign up with your email' },
              { step: '2', title: 'Connect your portfolio', desc: 'Link your broker or add positions manually' },
              { step: '3', title: 'Get AI-powered insights', desc: 'Receive personalized recommendations' },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <div className="text-[14px] font-semibold">{item.title}</div>
                  <div className="text-[12px] text-white/60">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[11px] text-white/40">&copy; 2026 MiroFinance. All rights reserved.</p>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white text-[12px] font-bold">M</span>
            </div>
            <span className="text-[18px] font-bold text-text-primary">MiroFinance</span>
          </div>

          <h1 className="text-[24px] font-bold text-text-primary mb-1">Create your account</h1>
          <p className="text-[14px] text-text-secondary mb-8">Start your AI-powered investment journey</p>

          {error && (
            <div className="mb-4 p-3 bg-red-light rounded-lg text-[12px] text-red font-medium">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="Letters + numbers, min 8 chars"
                  className="w-full pl-10 pr-10 py-3 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary cursor-pointer">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-[12px] font-medium text-text-secondary mb-1.5 block">Confirm Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-10 pr-4 py-3 bg-bg border border-border rounded-xl text-[13px] outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl text-[14px] font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-[13px] text-text-secondary mt-6">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="text-primary font-semibold hover:text-primary-light cursor-pointer">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
