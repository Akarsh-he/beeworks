import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SlidersHorizontal, User, ShieldCheck, Download, Save, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, setUser } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [schoolName, setSchoolName] = useState(user.schoolName);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(85);
  const [exportFormat, setExportFormat] = useState<string>('Google Classroom');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      email,
      schoolName
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Platform Settings</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage your account preferences, AI confidence thresholds, and gradebook export formats.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Settings */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">User Profile Settings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              label="School / Institution Name"
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              required
            />
            <Select
              label="Current Role"
              options={[
                { value: 'Teacher', label: 'Teacher' },
                { value: 'School Admin', label: 'School Admin' },
              ]}
              value={user.role}
              onChange={e => setUser(prev => ({ ...prev, role: e.target.value as any }))}
            />
          </div>
        </Card>

        {/* AI Step Confidence Threshold Settings */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <SlidersHorizontal className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">AI Confidence & Review Thresholds</h2>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Automatic Review Required Threshold:</span>
              <span className="font-extrabold text-amber-600 text-sm">{confidenceThreshold}%</span>
            </div>
            <input
              type="range"
              min="60"
              max="95"
              step="5"
              value={confidenceThreshold}
              onChange={e => setConfidenceThreshold(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500 italic">
              Steps evaluated with AI confidence below {confidenceThreshold}% will be automatically flagged for teacher manual review.
            </p>
          </div>
        </Card>

        {/* Gradebook Export Format */}
        <Card className="space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Download className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">Gradebook Export Preferences</h2>
          </div>

          <Select
            label="Default Export Format"
            options={[
              { value: 'Google Classroom', label: 'Google Classroom Direct Sync' },
              { value: 'CSV', label: 'CSV Spreadsheet' },
              { value: 'Excel', label: 'Microsoft Excel (.xlsx)' },
              { value: 'PDF Summary', label: 'PDF Report Summary' },
            ]}
            value={exportFormat}
            onChange={e => setExportFormat(e.target.value)}
          />
        </Card>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="font-bold text-slate-950 px-8"
            leftIcon={savedSuccess ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4 text-slate-950" />}
          >
            {savedSuccess ? 'Settings Saved!' : 'Save Preferences'}
          </Button>
        </div>
      </form>
    </div>
  );
};
