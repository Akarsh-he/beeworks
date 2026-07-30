import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Sparkles, Mail, Lock, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();

  const [email, setEmail] = useState('priya.sharma@dps.edu.in');
  const [password, setPassword] = useState('••••••••••••');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setUser(prev => ({
        ...prev,
        email,
        name: email.includes('admin') ? 'Anita Desai' : 'Priya Sharma',
        role: email.includes('admin') ? 'School Admin' : 'Teacher'
      }));
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-stretch font-sans">
      {/* Left Hero Banner */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle Honeycomb Background SVG */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 100,0 100,100 0,100" fill="url(#honeycombPattern)" />
          </svg>
        </div>

        <div>
          <Logo variant="light" size="lg" />
        </div>

        {/* Hero Visual Teaser */}
        <div className="space-y-6 max-w-lg relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Assisted Evaluation for Schools</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight leading-tight">
            Elevate evaluation speed without compromising pedagogical standards.
          </h1>

          <blockquote className="text-slate-300 text-sm font-serif italic border-l-2 border-amber-500 pl-4 py-1">
            “AI assists. Teachers decide.”
          </blockquote>

          {/* Quick Mock Card Teaser */}
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs space-y-2">
            <div className="flex justify-between font-bold">
              <span>Mathematics Mid-Term Exam</span>
              <span className="text-amber-400">32 Copies Processed</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Step-marking evaluated in 2m 45s per paper with 94% accuracy.
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          © 2026 BeeWorks SaaS Platform • Security & Privacy Compliant
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 bg-white">
        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Logo variant="dark" size="md" />
            </Link>

            {/* Language Selector */}
            <div className="w-32">
              <Select
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'hi', label: 'Hindi (हिंदी)' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' },
                ]}
                value={language}
                onChange={e => setLanguage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sign In to BeeWorks</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Enter your school email credentials to access your teacher dashboard.
            </p>
          </div>

          {/* Single Click Teacher Demo Quick Sign In */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs flex items-center justify-between">
            <div>
              <p className="font-bold text-amber-950">Quick Teacher Demo</p>
              <p className="text-amber-800 text-[11px]">Sign in as Priya Sharma (Mathematics Teacher)</p>
            </div>
            <Button
              variant="gold"
              size="sm"
              onClick={() => {
                setUser(prev => ({ ...prev, role: 'Teacher', name: 'Priya Sharma' }));
                navigate('/dashboard');
              }}
            >
              One-Click Login
            </Button>
          </div>

          {/* SSO Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              Google Workspace
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z"/>
                <path fill="#81bc06" d="M12 1h10v10H12z"/>
                <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                <path fill="#ffba08" d="M12 12h10v10H12z"/>
              </svg>
              Microsoft 365
            </button>
          </div>

          <div className="relative flex items-center justify-center text-xs text-slate-400">
            <span className="bg-white px-3 relative z-10 font-semibold uppercase">Or sign in with email</span>
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              label="School Email Address"
              type="email"
              placeholder="name@school.edu.in"
              value={email}
              onChange={e => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
              required
            />

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs font-bold text-amber-600 hover:text-amber-700">Forgot Password?</a>
              </div>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full font-bold"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500 font-medium">
            New school or teacher?{' '}
            <Link to="/signup" className="font-bold text-amber-600 hover:text-amber-700">
              Create an Account or Book Demo
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
