import { ProblemInsight } from "@/lib/types";

export function InsightPanel({ insight }: { insight: ProblemInsight }) {
  const cards = [["事实", insight.facts], ["想法", insight.ideas], ["感受", insight.feelings], ["惯性", insight.inertia], ["建议", insight.recommendations]];
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft"><div className="mb-4"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">认知层 · 显形</p><h2 className="mt-1 text-xl font-bold">问题分析</h2></div><div className="mb-4 rounded-2xl bg-emerald-50 p-4"><p className="text-xs uppercase tracking-[0.2em] text-emerald-700">问题类型</p><p className="mt-2 text-lg font-bold">{insight.problemType}</p></div><div className="space-y-4">{cards.map(([title, items]) => <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><h3 className="mb-3 text-sm font-bold text-slate-600">{title}</h3><ul className="space-y-2">{items.map((item) => <li key={item} className="flex gap-2 text-sm text-slate-700"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-500" />{item}</li>)}</ul></div>)}</div></div>;
}
