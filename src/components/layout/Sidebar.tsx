import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderPlus,
  Sparkles,
  BarChart3,
  Building2,
  CreditCard,
  Settings,
  HelpCircle,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { user } = useApp();
  const location = useLocation();

  const navItems = [
    {
      name: 'Teacher Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      roles: ['Teacher', 'School Admin']
    },
    {
      name: 'Create Room',
      path: '/rooms/create',
      icon: FolderPlus,
      roles: ['Teacher', 'School Admin']
    },
    {
      name: 'AI Workspace',
      path: '/evaluations/sheet-1',
      icon: Sparkles,
      highlight: true,
      roles: ['Teacher', 'School Admin']
    },
    {
      name: 'Analytics & Reports',
      path: '/analytics',
      icon: BarChart3,
      roles: ['Teacher', 'School Admin']
    },
    {
      name: 'School Admin View',
      path: '/admin/dashboard',
      icon: Building2,
      badge: 'Admin',
      roles: ['Teacher', 'School Admin']
    },
    {
      name: 'Pricing Plans',
      path: '/pricing',
      icon: CreditCard,
      roles: ['Teacher', 'School Admin']
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
      roles: ['Teacher', 'School Admin']
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-4 shrink-0 border-r border-slate-800">
      <div>
        {/* Prominent Sidebar Top Branding Logo */}
        <div className="px-3 py-3 mb-4 border-b border-slate-800 flex items-center justify-between">
          <NavLink to="/dashboard" className="flex items-center">
            <Logo variant="light" size="md" />
          </NavLink>
        </div>

        {/* Navigation Label */}
        <div className="px-3 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
          Core Platform
        </div>

        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path.startsWith('/evaluations') && location.pathname.startsWith('/evaluations'));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: linkActive }) => {
                  const active = linkActive || (item.path.startsWith('/evaluations') && location.pathname.startsWith('/evaluations'));
                  return `flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all ${
                    active
                      ? item.highlight
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-slate-800 text-white font-semibold border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`;
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-slate-950' : isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-amber-400/20 text-amber-400 border border-amber-400/30">
                    {item.badge}
                  </span>
                )}
                {item.highlight && <ChevronRight className="w-3.5 h-3.5 text-slate-950" />}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Banner in Sidebar */}
      <div className="mt-8 pt-4 border-t border-slate-800">
        <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/80 text-left">
          <div className="flex items-center gap-2 mb-1.5 text-amber-400 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Core Principle</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug italic font-serif">
            “AI assists. Teachers decide.”
          </p>
          <div className="mt-2 text-[10px] text-slate-500 font-sans font-medium flex items-center justify-between">
            <span>BeeWorks v2.4</span>
            <span className="text-emerald-400">● Live</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
