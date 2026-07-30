import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  User,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  GraduationCap,
  LogOut,
  CheckCircle2,
  SlidersHorizontal,
  FolderPlus
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const Navbar: React.FC = () => {
  const { user, autoSaveStatus, switchRole, teacherStats } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isAuthOrLanding = ['/', '/login', '/signup'].includes(location.pathname);

  if (isAuthOrLanding) return null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand & Mobile Sidebar Toggle */}
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center">
              <Logo size="sm" />
            </Link>

            {/* Auto-save Status Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-100/80 rounded-full text-xs font-medium text-slate-600 border border-slate-200/60">
              {autoSaveStatus === 'Saving' ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Saving evaluation...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Auto-saved to cloud</span>
                </>
              )}
            </div>
          </div>

          {/* Center: Quick Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="gold"
              size="sm"
              leftIcon={<FolderPlus className="w-4 h-4" />}
              onClick={() => navigate('/rooms/create')}
            >
              New Room
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Sparkles className="w-4 h-4 text-amber-500" />}
              onClick={() => navigate('/evaluations/sheet-1')}
            >
              Open AI Workspace
            </Button>
          </div>

          {/* Right: Role Switcher & User Profile */}
          <div className="flex items-center gap-3">
            {/* Role Switcher Pill for Easy Evaluation & Demo Testing */}
            <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                onClick={() => switchRole('Teacher')}
                className={`px-3 py-1 rounded-md transition-all ${
                  user.role === 'Teacher'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Teacher View
              </button>
              <button
                onClick={() => switchRole('School Admin')}
                className={`px-3 py-1 rounded-md transition-all ${
                  user.role === 'School Admin'
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin View
              </button>
            </div>

            {/* Notifications Popover Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-white" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notifications</h4>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                      2 Unread
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    <div className="py-2.5 text-xs">
                      <p className="font-semibold text-slate-900">Room 101 AI Evaluation Ready</p>
                      <p className="text-slate-500 mt-0.5">32 student papers processed with step breakdown.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">5 mins ago</span>
                    </div>
                    <div className="py-2.5 text-xs">
                      <p className="font-semibold text-slate-900">Review Required: Diya Patel</p>
                      <p className="text-slate-500 mt-0.5">Discriminant sign step requires teacher confirmation.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">15 mins ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm border border-amber-500/30">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-900">{user.name}</span>
                  <span className="text-[10px] text-slate-500 font-medium">{user.role}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    <Badge variant="gold" size="sm" className="mt-1">
                      {user.schoolName}
                    </Badge>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        navigate('/settings');
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                      Settings & AI Thresholds
                    </button>
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        switchRole(user.role === 'Teacher' ? 'School Admin' : 'Teacher');
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      Switch to {user.role === 'Teacher' ? 'School Admin' : 'Teacher'} Mode
                    </button>
                  </div>
                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        navigate('/login');
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
