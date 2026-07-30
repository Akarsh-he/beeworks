import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const AppLayout: React.FC = () => {
  const location = useLocation();

  const isPublicPage = ['/', '/login', '/signup'].includes(location.pathname);
  const isWorkspacePage = location.pathname.startsWith('/evaluations');

  if (isPublicPage) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className={`flex-1 overflow-y-auto ${isWorkspacePage ? 'p-0' : 'p-6 lg:p-8'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
