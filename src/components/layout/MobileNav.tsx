import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  LayoutDashboard,
  FolderPlus,
  Sparkles,
  BarChart3,
  Building2,
  CreditCard,
  Settings,
  GraduationCap,
  LogOut,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { user, switchRole } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Teacher Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Create Room',
      path: '/rooms/create',
      icon: FolderPlus,
    },
    {
      name: 'AI Workspace',
      path: '/evaluations/sheet-1',
      icon: Sparkles,
      highlight: true,
    },
    {
      name: 'Analytics & Reports',
      path: '/analytics',
      icon: BarChart3,
    },
    {
      name: 'School Admin View',
      path: '/admin/dashboard',
      icon: Building2,
      badge: 'Admin',
    },
    {
      name: 'Pricing Plans',
      path: '/pricing',
      icon: CreditCard,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: Settings,
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Slide-out Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative w-4/5 max-w-xs bg-slate-900 text-slate-300 min-h-full flex flex-col justify-between p-5 z-10 shadow-2xl border-r border-slate-800"
          >
            <div>
              {/* Header with Logo and Close Button */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <Logo variant="light" size="md" />
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                  aria-label="Close Mobile Navigation"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Role Switcher Pill in Mobile Drawer */}
              <div className="mt-4 p-2 bg-slate-800/90 rounded-xl border border-slate-700">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2 px-1">
                  Active Mode
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold">
                  <button
                    onClick={() => {
                      switchRole('Teacher');
                      onClose();
                    }}
                    className={`py-2 px-2 rounded-lg transition-all text-center min-h-[44px] flex items-center justify-center ${
                      user.role === 'Teacher'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    Teacher
                  </button>
                  <button
                    onClick={() => {
                      switchRole('School Admin');
                      onClose();
                    }}
                    className={`py-2 px-2 rounded-lg transition-all text-center min-h-[44px] flex items-center justify-center ${
                      user.role === 'School Admin'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              {/* Core Navigation Items */}
              <div className="mt-6">
                <div className="px-1 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
                  Platform Menu
                </div>
                <nav className="space-y-1.5">
                  {navItems.map(item => {
                    const Icon = item.icon;
                    const isActive =
                      location.pathname === item.path ||
                      (item.path.startsWith('/evaluations') && location.pathname.startsWith('/evaluations'));

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all min-h-[44px] ${
                          isActive
                            ? item.highlight
                              ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                              : 'bg-slate-800 text-white font-semibold border border-slate-700'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${item.highlight ? 'text-slate-950' : isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-400/20 text-amber-400 border border-amber-400/30">
                            {item.badge}
                          </span>
                        )}
                        {item.highlight && <ChevronRight className="w-4 h-4 text-slate-950" />}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Bottom Actions & User Profile */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="w-9 h-9 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="text-xs font-bold text-white truncate">{user.name}</span>
                  <span className="text-[10px] text-slate-400 truncate">{user.schoolName}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  navigate('/login');
                }}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 transition-colors min-h-[44px]"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>

              <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/80">
                <div className="flex items-center gap-2 mb-1 text-amber-400 text-xs font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>BeeWorks v2.4</span>
                </div>
                <p className="text-[10px] text-slate-400 italic">“AI assists. Teachers decide.”</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
