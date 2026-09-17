export type MessageRole = "user" | "assistant";

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
};

export type ProblemInsight = {
  problemType: string;
  facts: string[];
  ideas: string[];
  feelings: string[];
  inertia: string[];
  recommendations: string[];
};

export type ActionPlan = {
  hours24: string[];
  days7: string[];
  days30: string[];
};

export type SessionData = {
  question: string;
  messages: Message[];
  insight: ProblemInsight;
  plan: ActionPlan;
  updatedAt: string;
};
