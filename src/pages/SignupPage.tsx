import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Sparkles, Mail, Lock, User, Building2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useApp();

  const [fullName, setFullName] = useState('Priya Sharma');
  const [schoolName, setSchoolName] = useState('Delhi Public School, R.K. Puram');
  const [email, setEmail] = useState('priya.sharma@dps.edu.in');
  const [role, setRole] = useState<'Teacher' | 'School Admin'>('Teacher');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: fullName,
      email,
      schoolName,
      role
    }));
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-stretch font-sans">
      {/* Left Hero Banner */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div>
          <Logo variant="light" size="lg" />
        </div>

        <div className="space-y-6 max-w-lg relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join 1,200+ Schools Across India</span>
          </div>

          <h1 className="text-4xl font-black tracking-tight leading-tight">
            Start saving 6+ hours every week on handwritten evaluation.
          </h1>

          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-center gap-2 font-medium">✓ Step-by-step automated math & science marking</li>
            <li className="flex items-center gap-2 font-medium">✓ Full teacher override & comment flexibility</li>
            <li className="flex items-center gap-2 font-medium">✓ Gradebook export to Google Classroom & Excel</li>
          </ul>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          © 2026 BeeWorks AI Platform
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 bg-white py-12">
        <div className="max-w-md w-full mx-auto space-y-6">
          <Link to="/">
            <Logo variant="dark" size="md" />
          </Link>

          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create your BeeWorks Account</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Start evaluating handwritten answer sheets in under 5 minutes.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. Priya Sharma"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              leftIcon={<User className="w-4 h-4 text-slate-400" />}
              required
            />

            <Input
              label="School / Institution Name"
              type="text"
              placeholder="e.g. Delhi Public School"
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
              required
            />

            <Input
              label="School Email Address"
              type="email"
              placeholder="priya@dps.edu.in"
              value={email}
              onChange={e => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
              required
            />

            <Select
              label="Select Role"
              options={[
                { value: 'Teacher', label: 'Teacher / Educator' },
                { value: 'School Admin', label: 'School Admin / Principal' },
              ]}
              value={role}
              onChange={e => setRole(e.target.value as any)}
            />

            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full font-extrabold text-slate-950 shadow-lg shadow-amber-500/20"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Get Started Free
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-amber-600 hover:text-amber-700">
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
