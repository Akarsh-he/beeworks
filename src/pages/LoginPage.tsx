import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { PixelDriftText } from '../components/ui/PixelDriftText';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();

  const [email, setEmail] = useState('priya.sharma@dps.edu.in');
  const [password, setPassword] = useState('password123');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    // Try login first
    let success = await login('priya.sharma@dps.edu.in', 'password123');
    if (!success) {
      // Auto register demo teacher if not exists
      success = await register({
        email: 'priya.sharma@dps.edu.in',
        password: 'password123',
        name: 'Priya Sharma',
        role: 'TEACHER',
      });
    }
    setIsLoading(false);
    if (success) {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-stretch font-sans">
      {/* Left Hero Banner */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
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

          <PixelDriftText
            text="Every minute a teacher saves is another minute invested in teaching."
            className="text-2xl lg:text-3xl font-semibold text-white leading-snug"
          />

          <blockquote className="text-slate-300 text-sm font-serif italic border-l-2 border-amber-500 pl-4 py-1">
            “AI assists. Teachers decide.”
          </blockquote>

          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs space-y-2">
            <div className="flex justify-between font-bold">
              <span>Mathematics Mid-Term Exam</span>
              <span className="text-amber-400">32 Copies Processed</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Step-marking evaluated in 2m 45s per paper with 98% accuracy.
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

          {/* Quick Teacher Demo */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs flex items-center justify-between">
            <div>
              <p className="font-bold text-amber-950">Quick Teacher Demo</p>
              <p className="text-amber-800 text-[11px]">Sign in as Priya Sharma (Mathematics Teacher)</p>
            </div>
            <Button
              variant="gold"
              size="sm"
              isLoading={isLoading}
              onClick={handleDemoLogin}
            >
              One-Click Login
            </Button>
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
