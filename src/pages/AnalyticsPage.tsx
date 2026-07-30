import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableRow, TableCell, TableHeadCell } from '../components/ui/Table';
import {
  BarChart3,
  Clock,
  Zap,
  CheckCircle2,
  FileCheck,
  Download,
  Building2,
  TrendingUp,
  Filter,
  Sparkles
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { schoolAnalytics } = useApp();
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('All');
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const handleExportCSV = () => {
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>School-Wide Academic Analytics</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Analytics & Evaluation Reports</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Track evaluation throughput, teacher time savings, and step-marking accuracy benchmarks across institutions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            leftIcon={<Download className="w-4 h-4" />}
            onClick={handleExportCSV}
          >
            {exportSuccess ? 'Report Downloaded!' : 'Export CSV Report'}
          </Button>
        </div>
      </div>

      {/* Top Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1 */}
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Evaluation Time Saved</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{schoolAnalytics.totalEvaluationTimeSaved}</div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12.4% vs last term
          </p>
        </Card>

        {/* Metric 2 */}
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Productivity Multiplier</span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-500">{schoolAnalytics.productivityMultiplier}</div>
          <p className="text-[11px] text-slate-500 font-medium">Faster than manual grading</p>
        </Card>

        {/* Metric 3 */}
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Step Accuracy</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{schoolAnalytics.schoolWideAccuracy}%</div>
          <p className="text-[11px] text-slate-500 font-medium">Verified by teacher overrides</p>
        </Card>

        {/* Metric 4 */}
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Copies Processed</span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{schoolAnalytics.totalCopiesProcessed.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500 font-medium">Answer sheets evaluated</p>
        </Card>
      </div>

      {/* Interactive Chart Section: Evaluations Over Time */}
      <Card className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Evaluations Over Time</h3>
            <p className="text-xs text-slate-500">Daily paper volume and step accuracy rate</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Subject:</span>
            <select
              value={selectedSubjectFilter}
              onChange={e => setSelectedSubjectFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
            >
              <option value="All">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
            </select>
          </div>
        </div>

        {/* Custom Interactive SVG Trend Visualizer */}
        <div className="h-64 w-full bg-slate-900 rounded-xl p-6 relative flex items-end justify-between gap-2 overflow-hidden border border-slate-800">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-slate-600 w-full" />
            <div className="border-b border-slate-600 w-full" />
            <div className="border-b border-slate-600 w-full" />
          </div>

          {schoolAnalytics.weeklyTrend.map((item, idx) => {
            const maxCount = 3500;
            const barHeightPct = (item.count / maxCount) * 100;

            return (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group relative z-10">
                {/* Bar */}
                <div className="w-full max-w-[48px] bg-slate-800 rounded-t-lg h-44 flex items-end p-1 relative overflow-hidden group-hover:bg-slate-750 transition-colors">
                  <div
                    className="w-full bg-gradient-to-t from-amber-500 to-yellow-400 rounded-t-md transition-all duration-500 group-hover:from-amber-400 group-hover:to-yellow-300"
                    style={{ height: `${barHeightPct}%` }}
                  />
                </div>

                {/* Day Label */}
                <span className="text-xs font-bold text-slate-300">{item.day}</span>

                {/* Hover Tooltip */}
                <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950 text-white text-[10px] p-2 rounded-lg shadow-xl border border-slate-700 pointer-events-none whitespace-nowrap z-20">
                  <p className="font-bold text-amber-400">{item.count.toLocaleString()} Copies</p>
                  <p className="text-emerald-400">Accuracy: {item.accuracy}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Institutional Overview Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Institutional & School Overview</h2>
          <span className="text-xs text-slate-500 font-medium">4 Partner Schools Active</span>
        </div>

        <Table>
          <TableHeader>
            <tr>
              <TableHeadCell>School Name</TableHeadCell>
              <TableHeadCell>Location</TableHeadCell>
              <TableHeadCell>Copies Processed</TableHeadCell>
              <TableHeadCell>Total Time Saved</TableHeadCell>
              <TableHeadCell>Accuracy Rating</TableHeadCell>
              <TableHeadCell>Active Teachers</TableHeadCell>
            </tr>
          </TableHeader>
          <tbody>
            {schoolAnalytics.institutions.map(school => (
              <TableRow key={school.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{school.schoolName}</span>
                      <span className="text-[10px] text-slate-400">ID: {school.id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell><span className="text-xs font-semibold text-slate-700">{school.location}</span></TableCell>
                <TableCell><span className="text-xs font-bold text-slate-900">{school.copiesProcessed.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-xs font-bold text-amber-600">{school.timeSaved}</span></TableCell>
                <TableCell>
                  <Badge variant="success" size="sm">
                    {school.accuracy}%
                  </Badge>
                </TableCell>
                <TableCell><span className="text-xs font-semibold text-slate-700">{school.activeTeachers} Teachers</span></TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
