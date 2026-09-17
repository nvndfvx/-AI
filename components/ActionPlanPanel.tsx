import { ActionPlan } from "@/lib/types";

export function ActionPlanPanel({ plan }: { plan: ActionPlan }) {
  const sections = [["24小时", plan.hours24], ["7天", plan.days7], ["30天", plan.days30]];
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft"><div className="mb-4"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">执行层 · 施压</p><h2 className="mt-1 text-xl font-bold">行动方案</h2></div><div className="space-y-4">{sections.map(([title, items]) => <div key={title} className="rounded-2xl border border-slate-200 bg-amber-50 p-4"><h3 className="mb-3 text-lg font-bold">{title}</h3><ul className="space-y-2">{items.map((item) => <li key={item} className="flex gap-2 text-sm text-slate-700"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />{item}</li>)}</ul></div>)}</div></div>;
}
