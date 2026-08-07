import React from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableRow, TableCell, TableHeadCell } from '../components/ui/Table';
import {
  Building2,
  Users,
  CreditCard,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user, schoolAnalytics, rooms, switchRole } = useApp();

  const teacherActivity = [
    { name: user.name || 'Current Teacher', subject: 'Mathematics', rooms: rooms.length, evaluated: teacherActivityCount(rooms), accuracy: 98.4, speed: '2m 45s' },
  ];

  function teacherActivityCount(rList: any[]) {
    return rList.reduce((acc, r) => acc + (r.evaluatedCount || 0), 0);
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Admin Greeting Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 lg:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>School Principal & Admin Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            School Administration Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Overview for <strong className="text-amber-400">{user.name} ({user.role})</strong> • {user.schoolName}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="gold"
            size="md"
            className="font-bold text-slate-950"
            onClick={() => switchRole('Teacher')}
          >
            Switch to Teacher Mode
          </Button>
        </div>
      </div>

      {/* Admin Core Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Active Teachers</span>
          <div className="text-3xl font-black text-slate-900">{schoolAnalytics.activeTeachers}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">100% Onboarded</p>
        </Card>

        <Card className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Rooms Today</span>
          <div className="text-3xl font-black text-amber-500">{rooms.length}</div>
          <p className="text-[11px] text-slate-500 font-medium">Live Evaluation Rooms</p>
        </Card>

        <Card className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Subscriptions</span>
          <div className="text-3xl font-black text-slate-900">{schoolAnalytics.activeSubscriptions}</div>
          <p className="text-[11px] text-emerald-600 font-semibold">Professional Tier</p>
        </Card>

        <Card className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">School-Wide Accuracy</span>
          <div className="text-3xl font-black text-emerald-600">{schoolAnalytics.schoolWideAccuracy}%</div>
          <p className="text-[11px] text-slate-500 font-medium">Step-mark consistency</p>
        </Card>
      </div>

      {/* Main Grid: Teacher Leaderboard & Room Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Teacher Performance Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 tracking-tight">Teacher Evaluation Activity</h2>
              <p className="text-xs text-slate-500 font-medium">Individual teacher grading throughput & precision</p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <tr>
                <TableHeadCell>Teacher</TableHeadCell>
                <TableHeadCell>Subject</TableHeadCell>
                <TableHeadCell>Rooms</TableHeadCell>
                <TableHeadCell>Evaluated</TableHeadCell>
                <TableHeadCell>Accuracy</TableHeadCell>
                <TableHeadCell>Avg Speed</TableHeadCell>
              </tr>
            </TableHeader>
            <tbody>
              {teacherActivity.map(t => (
                <TableRow key={t.name}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center">
                        {t.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-slate-900 text-xs">{t.name}</span>
                    </div>
                  </TableCell>
                  <TableCell><span className="text-xs font-medium text-slate-700">{t.subject}</span></TableCell>
                  <TableCell><span className="text-xs font-semibold text-slate-900">{t.rooms} Rooms</span></TableCell>
                  <TableCell><span className="text-xs font-bold text-slate-900">{t.evaluated} Copies</span></TableCell>
                  <TableCell><Badge variant="success" size="sm">{t.accuracy}%</Badge></TableCell>
                  <TableCell><span className="text-xs font-semibold text-amber-600">{t.speed}</span></TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Right Col: Active Room Status Overview */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Active Rooms Audit</h2>

          {rooms.length === 0 ? (
            <Card className="p-6 text-center text-xs text-slate-500">
              No active evaluation rooms currently.
            </Card>
          ) : (
            <Card padded={false} className="divide-y divide-slate-100">
              {rooms.map(room => (
                <div key={room.id} className="p-4 space-y-2 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{room.roomName}</h4>
                      <p className="text-[10px] text-slate-500">{room.examTitle}</p>
                    </div>
                    <Badge variant={room.status === 'Active' ? 'warning' : 'success'} size="sm">
                      {room.status}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-600 font-medium">
                    <span>{room.evaluatedCount} / {room.totalSheets} Copies Done</span>
                    <span className="text-emerald-600 font-bold">
                      {room.totalSheets > 0 ? Math.round((room.evaluatedCount / room.totalSheets) * 100) : 0}%
                    </span>
                  </div>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
