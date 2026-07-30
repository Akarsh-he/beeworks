import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Table, TableHeader, TableRow, TableCell, TableHeadCell } from '../components/ui/Table';
import { CheckCircle2, Sparkles, HelpCircle, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const plans = [
    {
      name: "Starter / Individual",
      priceMonthly: "$15",
      priceAnnual: "$12",
      copiesLimit: "100 copies / month",
      description: "Ideal for individual teachers trying AI-assisted step evaluation.",
      features: [
        "100 handwritten copies / month",
        "Step-by-step math evaluation",
        "Manual mark overrides & notes",
        "Export to CSV & PDF",
        "Standard Email Support",
      ],
      cta: "Start Free Trial",
      highlight: false
    },
    {
      name: "Professional Teacher",
      priceMonthly: "$29",
      priceAnnual: "$24",
      copiesLimit: "1,000 copies / month",
      description: "Best for active subject teachers managing multiple class sections.",
      features: [
        "1,000 handwritten copies / month",
        "Advanced Math & Science step OCR",
        "Instant Gradebook Integration",
        "Unlimited Room Creations",
        "Priority 24/7 Teacher Support",
        "AI Accuracy Guarantee",
      ],
      cta: "Get Started Now",
      highlight: true
    },
    {
      name: "Enterprise / School-Wide",
      priceMonthly: "Custom",
      priceAnnual: "Custom",
      copiesLimit: "Unlimited copies",
      description: "For entire school departments, school chains & districts.",
      features: [
        "Unlimited copies across all grades",
        "Dedicated School Admin Dashboard",
        "Custom SIS & LMS Integrations",
        "FERPA & Data Privacy Compliance",
        "Dedicated Account Manager",
        "On-Premise / Hybrid Deployment",
      ],
      cta: "Contact Sales / Book Demo",
      highlight: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Transparent School Pricing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Flexible Plans Designed for Teachers & Schools
        </h1>
        <p className="text-slate-600 text-sm font-medium">
          Choose a plan that fits your evaluation volume. Every plan includes full teacher override control.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
            className="w-12 h-6 bg-slate-900 rounded-full p-1 transition-colors relative"
          >
            <div
              className={`w-4 h-4 bg-amber-400 rounded-full transition-transform ${
                billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-bold ${billingCycle === 'annual' ? 'text-slate-900' : 'text-slate-400'}`}>
            Annual Billing
          </span>
          <span className="px-2 py-0.5 text-[10px] font-extrabold bg-amber-400 text-slate-950 rounded-full">
            SAVE 20%
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map(plan => (
          <Card
            key={plan.name}
            hoverable
            className={`flex flex-col justify-between relative ${
              plan.highlight
                ? 'border-2 border-amber-500 shadow-xl ring-2 ring-amber-400/20 bg-slate-900 text-white'
                : 'bg-white text-slate-900'
            }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                RECOMMENDED FOR SCHOOLS
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className={`text-lg font-bold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs mt-1 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-amber-400">
                  {billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly}
                </span>
                <span className={`text-xs font-bold ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                  / month
                </span>
              </div>

              <div className={`p-2.5 rounded-lg text-xs font-bold ${plan.highlight ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-slate-700'}`}>
                {plan.copiesLimit}
              </div>

              <ul className="space-y-3 text-xs">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlight ? 'text-amber-400' : 'text-emerald-600'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <Button
                variant={plan.highlight ? 'gold' : 'primary'}
                size="lg"
                className="w-full font-bold"
                onClick={() => navigate('/signup')}
              >
                {plan.cta}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Feature Comparison Matrix */}
      <div className="space-y-4 pt-8">
        <h2 className="text-xl font-black text-slate-900 text-center tracking-tight">Detailed Feature Matrix</h2>

        <Table>
          <TableHeader>
            <tr>
              <TableHeadCell>Platform Feature</TableHeadCell>
              <TableHeadCell>Starter ($12/mo)</TableHeadCell>
              <TableHeadCell>Professional ($24/mo)</TableHeadCell>
              <TableHeadCell>Enterprise (Custom)</TableHeadCell>
            </tr>
          </TableHeader>
          <tbody>
            <TableRow>
              <TableCell><span className="font-bold">Step-by-step Automated Marking</span></TableCell>
              <TableCell>✓ Included</TableCell>
              <TableCell><span className="text-emerald-600 font-bold">✓ Included</span></TableCell>
              <TableCell><span className="text-emerald-600 font-bold">✓ Included</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><span className="font-bold">Handwritten Math OCR Recognition</span></TableCell>
              <TableCell>Standard</TableCell>
              <TableCell><span className="text-amber-600 font-bold">Advanced Neural OCR</span></TableCell>
              <TableCell><span className="text-amber-600 font-bold">Custom Trained Models</span></TableCell>
            </TableRow>
            <TableRow>
              <TableCell><span className="font-bold">Teacher Score Override</span></TableCell>
              <TableCell>✓ 100% Control</TableCell>
              <TableCell>✓ 100% Control</TableCell>
              <TableCell>✓ 100% Control</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><span className="font-bold">Gradebook Export</span></TableCell>
              <TableCell>CSV & PDF</TableCell>
              <TableCell>CSV, PDF, Excel & Google</TableCell>
              <TableCell>Direct SIS API Sync</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><span className="font-bold">Support SLA</span></TableCell>
              <TableCell>Email (48h)</TableCell>
              <TableCell><span className="text-blue-600 font-bold">Priority (2h)</span></TableCell>
              <TableCell><span className="text-blue-600 font-bold">24/7 Dedicated Team</span></TableCell>
            </TableRow>
          </tbody>
        </Table>
      </div>
    </div>
  );
};
