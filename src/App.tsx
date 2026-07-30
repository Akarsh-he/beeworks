import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { RoomCreationPage } from './pages/RoomCreationPage';
import { EvaluationWorkspacePage } from './pages/EvaluationWorkspacePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PricingPage } from './pages/PricingPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Application Routes */}
            <Route path="/dashboard" element={<TeacherDashboard />} />
            <Route path="/rooms/create" element={<RoomCreationPage />} />
            <Route path="/evaluations/:id" element={<EvaluationWorkspacePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
