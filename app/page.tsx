"use client";

import { useEffect, useState } from "react";
import { ActionPlanPanel } from "@/components/ActionPlanPanel";
import { ChatPanel } from "@/components/ChatPanel";
import { InsightPanel } from "@/components/InsightPanel";
import { analyzeQuestion, generatePlan } from "@/lib/mockAi";
import { readSession, saveSession } from "@/lib/storage";
import { ActionPlan, Message, ProblemInsight } from "@/lib/types";

const welcome: Message = { id: "welcome", role: "assistant", content: "你好，我是追根 AI。告诉我你的困扰，我会帮助你区分事实、想法和感受。", createdAt: new Date().toISOString() };
const defaultInsight: ProblemInsight = { problemType: "一般决策问题", facts: ["问题还没有被完全拆清楚。"], ideas: ["需要从最小有效行动开始。"], feelings: ["不确定感是决策开始前的正常状态。"], inertia: ["想一次性找到答案。"], recommendations: ["先描述事实，再谈想法和感受。"] };
const defaultPlan: ActionPlan = { hours24: ["把问题拆成事实、想法、感受。"], days7: ["识别最容易误导你的思维习惯。"], days30: ["形成稳定的决策节奏。"] };

export default function HomePage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [insight, setInsight] = useState(defaultInsight);
  const [plan, setPlan] = useState(defaultPlan);
  useEffect(() => { const saved = readSession(); if (saved) { setQuestion(saved.question); setMessages(saved.messages); setInsight(saved.insight); setPlan(saved.plan); } }, []);
  const handleSend = (content: string) => {
    const now = new Date().toISOString();
    const nextInsight = analyzeQuestion(content);
    const nextPlan = generatePlan(content);
    const nextMessages: Message[] = [...messages, { id: `user-${Date.now()}`, role: "user", content, createdAt: now }, { id: `assistant-${Date.now()}-reply`, role: "assistant", content: "我已经接收到你的问题。接下来我会分析问题类型、现实条件，以及可能影响你的思维惯性。", createdAt: now }];
    setQuestion(content); setMessages(nextMessages); setInsight(nextInsight); setPlan(nextPlan);
    saveSession({ question: content, messages: nextMessages, insight: nextInsight, plan: nextPlan, updatedAt: now });
  };
  return <main className="min-h-screen bg-slate-100"><div className="mx-auto max-w-7xl p-6"><header className="mb-6 rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 p-6 text-white shadow-soft"><p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-100">引导式问题解决</p><h1 className="mt-2 text-3xl font-black">追根 AI</h1><p className="mt-2 text-sm text-violet-100">{question ? `当前主题：${question}` : "从一个真实问题开始，逐步看清自己。"}</p></header><section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-5">{[["认知层", "显形"], ["决策层", "称重"], ["执行层", "施压"], ["反馈层", "回炉"], ["元认知层", "分析惯性"]].map(([label, value]) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft"><p className="text-xs font-semibold text-slate-500">{label}</p><p className="mt-2 font-bold">{value}</p></div>)}</section><section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.95fr]"><ChatPanel messages={messages} onSend={handleSend} /><div className="space-y-6"><InsightPanel insight={insight} /><ActionPlanPanel plan={plan} /></div></section></div></main>;
}
