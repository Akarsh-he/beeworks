import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Eye,
  ShieldCheck,
  ArrowRight,
  Play,
  Award,
  Users,
  ChevronRight,
  Calculator,
  Globe,
  FileCheck
} from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { trustSchoolLogos } from '../mock/mockData';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Interactive ROI Calculator State
  const [studentCount, setStudentCount] = useState<number>(350);
  const [examsPerMonth, setExamsPerMonth] = useState<number>(4);

  // Math: Avg 8 mins per copy manually vs 2.5 mins with BeeWorks -> 5.5 mins saved per paper
  const hoursSavedPerMonth = Math.round((studentCount * examsPerMonth * 5.5) / 60);
  const teacherDaysSaved = (hoursSavedPerMonth / 8).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo size="md" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#product" className="hover:text-slate-900 transition-colors">Product</a>
            <a href="#value-pillars" className="hover:text-slate-900 transition-colors">Why BeeWorks</a>
            <a href="#roi-calculator" className="hover:text-slate-900 transition-colors">Time Saved</a>
            <Link to="/pricing" className="hover:text-slate-900 transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="md">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="gold" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Core Principle Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-900 text-xs font-extrabold tracking-wide"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>CORE PRINCIPLE: “AI assists. Teachers decide.”</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]"
            >
              Every minute a teacher saves is another minute invested in teaching.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed"
            >
              BeeWorks empowers schools with intelligent automated step-marking for handwritten answer sheets—delivering fast, accurate evaluation while giving teachers full control to review, edit, and approve marks.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button
                variant="gold"
                size="lg"
                className="w-full sm:w-auto font-extrabold text-base shadow-xl shadow-amber-500/25"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                onClick={() => navigate('/dashboard')}
              >
                Book a Demo
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-base"
                leftIcon={<Play className="w-5 h-5 text-amber-500 fill-amber-500" />}
                onClick={() => navigate('/evaluations/sheet-1')}
              >
                Watch Interactive Demo
              </Button>
            </motion.div>

            {/* Key Metric Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto">
              <div className="p-4 bg-white/80 rounded-xl border border-slate-200 text-center shadow-sm">
                <div className="text-2xl font-black text-slate-900">2.4x</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Evaluation Speed</div>
              </div>
              <div className="p-4 bg-white/80 rounded-xl border border-slate-200 text-center shadow-sm">
                <div className="text-2xl font-black text-amber-500">93.6%</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">AI Step Accuracy</div>
              </div>
              <div className="p-4 bg-white/80 rounded-xl border border-slate-200 text-center shadow-sm">
                <div className="text-2xl font-black text-slate-900">64h+</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Saved Per Teacher/Mo</div>
              </div>
              <div className="p-4 bg-white/80 rounded-xl border border-slate-200 text-center shadow-sm">
                <div className="text-2xl font-black text-emerald-600">100%</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Teacher Override Control</div>
              </div>
            </div>
          </div>

          {/* Interactive Workspace Teaser Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-14 max-w-5xl mx-auto rounded-2xl overflow-hidden border-2 border-slate-300 shadow-2xl bg-slate-900"
          >
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-2 font-mono text-slate-300">BeeWorks AI Evaluation Workspace — Class 10 Mathematics</span>
              </div>
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">Live Interactive Workspace</span>
            </div>
            
            <div className="p-6 bg-slate-900 text-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-white text-slate-900 p-6 rounded-xl shadow-inner font-mono text-sm border border-slate-300">
                <div className="text-xs text-slate-500 font-bold mb-2">STUDENT HANDWRITTEN PAPER (AARAV SHARMA)</div>
                <div className="p-3 bg-amber-50/50 rounded border border-amber-300 text-blue-900 space-y-2">
                  <p className="font-bold">Q1. 2x² - 5x - 3 = 0</p>
                  <p>a = 2, b = -5, c = -3</p>
                  <p>x = [ -(-5) ± √((-5)² - 4(2)(-3)) ] / (2*2)</p>
                  <p className="text-emerald-700 font-bold">x = 3 or x = -1/2</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">AI STEP SCORING BREAKDOWN</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs">
                    <span>1. Formula & Coefficients</span>
                    <span className="text-emerald-400 font-bold">1.0 / 1.0</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs">
                    <span>2. Substitution & Δ = 49</span>
                    <span className="text-emerald-400 font-bold">1.0 / 1.0</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs">
                    <span>3. Final Roots (3, -1/2)</span>
                    <span className="text-emerald-400 font-bold">1.0 / 1.0</span>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="md"
                  className="w-full font-bold mt-2"
                  onClick={() => navigate('/evaluations/sheet-1')}
                >
                  Try AI Workspace Live
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar Section */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-8">
            Trusted by Leading Educational Institutions & Schools
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14">
            {trustSchoolLogos.map(school => (
              <div key={school.name} className="flex items-center gap-2 text-slate-700 font-bold text-sm sm:text-base grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-black text-xs">
                  {school.abbr}
                </div>
                <span>{school.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section id="value-pillars" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Designed for School Academic Excellence
            </h2>
            <p className="text-slate-600 mt-2 text-sm font-medium">
              Built ground-up to streamline answer sheet grading without compromising pedagogical standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Pillar 1 */}
            <Card hoverable className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Intelligent Evaluation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step mark breakdown for math, science, and reasoning problems.
              </p>
            </Card>

            {/* Pillar 2 */}
            <Card hoverable className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Teacher Control</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Single-click score overrides, custom feedback notes, and total teacher authority.
              </p>
            </Card>

            {/* Pillar 3 */}
            <Card hoverable className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Time Saving</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reduce evaluation turnaround from weeks to hours with automated batch processing.
              </p>
            </Card>

            {/* Pillar 4 */}
            <Card hoverable className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Complete Visibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                School admins track active evaluation rooms, accuracy rates, and teacher speed metrics.
              </p>
            </Card>

            {/* Pillar 5 */}
            <Card hoverable className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Secure & Private</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                FERPA & DPDP compliant encrypted paper processing for school data safety.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Time Savings Calculator */}
      <section id="roi-calculator" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-2">
                  <Calculator className="w-4 h-4" />
                  School ROI Estimator
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
                  Calculate Your School's Time Savings
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  See how much time BeeWorks returns to your teaching staff every month.
                </p>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300">Number of Students:</span>
                      <span className="text-amber-400 font-bold text-sm">{studentCount} Students</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="2000"
                      step="50"
                      value={studentCount}
                      onChange={e => setStudentCount(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span className="text-slate-300">Exams / Quizzes per Month:</span>
                      <span className="text-amber-400 font-bold text-sm">{examsPerMonth} Exams</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={examsPerMonth}
                      onChange={e => setExamsPerMonth(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Calculator Output */}
              <div className="bg-slate-800/90 rounded-2xl p-6 border border-slate-700 text-center space-y-6">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
                    Total Hours Saved Per Month
                  </span>
                  <span className="text-5xl font-black text-amber-400">{hoursSavedPerMonth} hrs</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                  <div>
                    <span className="text-xl font-extrabold text-white">{teacherDaysSaved} Days</span>
                    <span className="text-[11px] text-slate-400 block font-medium">Teaching Days Saved</span>
                  </div>
                  <div>
                    <span className="text-xl font-extrabold text-emerald-400">2.4x</span>
                    <span className="text-[11px] text-slate-400 block font-medium">Speedup Multiplier</span>
                  </div>
                </div>

                <Button
                  variant="gold"
                  size="md"
                  className="w-full font-bold"
                  onClick={() => navigate('/pricing')}
                >
                  View Pricing Plans
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <Logo size="md" lightText />
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              BeeWorks is the premier AI-powered handwritten answer sheet evaluation platform for K-12 schools and educational institutions.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/evaluations/sheet-1" className="hover:text-white">AI Workspace</Link></li>
              <li><Link to="/rooms/create" className="hover:text-white">Room Creation</Link></li>
              <li><Link to="/analytics" className="hover:text-white">Analytics Engine</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing Plans</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/dashboard" className="hover:text-white">For Teachers</Link></li>
              <li><Link to="/admin/dashboard" className="hover:text-white">For School Admins</Link></li>
              <li><a href="#value-pillars" className="hover:text-white">Math & STEM Evaluation</a></li>
              <li><a href="#roi-calculator" className="hover:text-white">ROI Calculator</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Account</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login" className="hover:text-white">Sign In</Link></li>
              <li><Link to="/signup" className="hover:text-white">Book Demo</Link></li>
              <li><Link to="/settings" className="hover:text-white">Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 BeeWorks AI Platform. All rights reserved. “AI assists. Teachers decide.”</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
