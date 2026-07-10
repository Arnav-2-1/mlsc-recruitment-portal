import React from 'react';
import { Card } from '../../common/Card';
import { Clock, HelpCircle, Layers, ShieldCheck, Zap } from 'lucide-react';
export const ExamInfoCard = () => {
  const specs = [
    { icon: Clock, label: "Duration", val: "30 Minutes" },
    { icon: HelpCircle, label: "Questions", val: "20" },
    { icon: Layers, label: "Sections", val: "Aptitude, Technical, Logical" },
    { icon: Zap, label: "Auto Save", val: "Enabled" },
    { icon: ShieldCheck, label: "Secure Browser", val: "Fullscreen Mode Required" }
  ];
  return (
    <Card className="flex flex-col justify-between border-slate-800 bg-slate-900/40">
      <div>
        <h3 className="text-lg font-bold text-slate-200 mb-4 border-b border-slate-800 pb-2">About Examination</h3>
        <div className="space-y-4">
          {specs.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3.5">
              <div className="p-1.5 bg-blue-500/10 border border-blue-500/20 rounded-md mt-0.5">
                <item.icon className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">{item.label}</p>
                <p className="text-sm font-medium text-slate-200">{item.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 p-3 bg-slate-950/60 border border-slate-800 rounded-lg">
        <p className="text-xs text-slate-400 leading-relaxed font-medium">⚠️ <span className="text-amber-400">No Negative Marking.</span> Ensure stable connectivity before launching.</p>
      </div>
    </Card>
  );
};