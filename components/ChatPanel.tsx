"use client";

import { FormEvent, useState } from "react";
import { Message } from "@/lib/types";

export function ChatPanel({ messages, onSend }: { messages: Message[]; onSend: (content: string) => void }) {
  const [draft, setDraft] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const value = draft.trim();
    if (value) { onSend(value); setDraft(""); }
  };
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
    <div className="mb-4"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">追问模式</p><h2 className="mt-1 text-xl font-bold">问题对话</h2></div>
    <div className="mb-4 h-[420px] space-y-3 overflow-y-auto rounded-2xl bg-slate-50 p-3">
      {messages.map((message) => <div key={message.id} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === "user" ? "ml-auto bg-violet-600 text-white" : "bg-white text-slate-700 shadow-sm"}`}>{message.content}</div>)}
    </div>
    <form onSubmit={submit} className="flex gap-3"><input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="输入你的真实困扰..." className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-400 focus:bg-white" /><button className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700">发送</button></form>
  </div>;
}
