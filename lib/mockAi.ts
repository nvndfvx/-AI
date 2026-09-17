import { ActionPlan, ProblemInsight } from "./types";

const general = "一般决策问题";

export function classifyProblem(question: string): string {
  const q = question.toLowerCase();
  if (/工作|职业|晋升|职场/.test(q)) return "职业/职场决策问题";
  if (/感情|关系|恋爱|婚姻/.test(q)) return "关系/情绪问题";
  if (/学习|技能|提升|成长/.test(q)) return "成长/学习问题";
  if (/金钱|消费|投资|收入/.test(q)) return "财务/资源问题";
  if (/健康|焦虑|压力|睡眠/.test(q)) return "健康/心理问题";
  return general;
}

const content: Record<string, Omit<ProblemInsight, "problemType">> = {
  "职业/职场决策问题": {
    facts: ["问题与工作结果或职业路径有关。", "你有行动基础，但优先级还不够明确。"],
    ideas: ["你可能试图用更努力解决本该用选择解决的问题。", "价值不只是做更多，而是做对优先级。"],
    feelings: ["你可能有被困住的焦虑或对未来的失控感。", "这种状态会降低你判断选择的能力。"],
    inertia: ["过度关注别人认可，忽略自己的优先级。", "把想做什么误认为必须做什么。"],
    recommendations: ["把目标拆成三个可执行动作。", "分开审视愿望、现实条件和风险。"],
  },
  "关系/情绪问题": {
    facts: ["问题包含真实的关系冲突和情绪反应。", "你需要更稳定的表达与边界。"],
    ideas: ["你可能用解释代替表达。", "关系问题不只是对错问题，也是边界和节奏问题。"],
    feelings: ["你可能感到被误解、忽视或失去控制。", "冲突背后可能是不确定性带来的焦虑。"],
    inertia: ["用解释代替表达。", "把他人的情绪变化当成自己的责任。"],
    recommendations: ["先说事实，再说想法，最后说感受。", "用边界思考，而不是试图控制对方的理解。"],
  },
  "成长/学习问题": {
    facts: ["你已经识别到学习或成长路径上的卡点。", "你希望找到反复停下的根本原因。"],
    ideas: ["你可能追求速度，却缺少结构化学习。", "成长依靠反馈闭环，而不只是更多信息。"],
    feelings: ["反复开始又停止会让人疲惫。", "你不缺热情，缺的是稳定反馈和节奏。"],
    inertia: ["目标过大、行动过碎，频繁切换方向。", "只关注开始，不关注反馈和调整。"],
    recommendations: ["设置一个最小可验证行动。", "每周复盘行动、效果和下一步调整。"],
  },
  "财务/资源问题": {
    facts: ["问题与资源配置、成本或风险边界有关。", "价值判断和执行成本之间存在张力。"],
    ideas: ["资源问题本质上也是决策问题。", "需要同时看长期价值和可承受风险。"],
    feelings: ["你可能有不想出错的压力。", "不确定性容易造成冲动与拖延并存。"],
    inertia: ["在不确定中反复拖延，最后被动决定。", "把风险想得过大，却没有主动划定边界。"],
    recommendations: ["先建立最低保障，再考虑扩张。", "明确预算、底线和最坏结果。"],
  },
  "健康/心理问题": {
    facts: ["困扰与身心状态和情绪负担有关。", "需要先稳定节奏，再谈效率。"],
    ideas: ["你可能用压住和硬扛处理情绪。", "减少焦虑不是解决全部问题，而是先恢复判断力。"],
    feelings: ["你可能已经感到疲惫、恐慌或失眠。", "过载状态需要先减压和稳态。"],
    inertia: ["过度压抑情绪，忽略身体和节奏信号。", "把压力全部留给自己，缺少外部支持。"],
    recommendations: ["先处理稳定性，再谈效率。", "把休息、睡眠和情绪恢复纳入行动。"],
  },
  [general]: {
    facts: ["问题还没有被完全拆清楚。", "需要先从现实条件出发。"],
    ideas: ["问题背后可能不是单一答案，而是选择逻辑。", "需要从一次性答案转向最小有效行动。"],
    feelings: ["你可能感到焦虑和不确定。", "不确定本身不意味着选择错误。"],
    inertia: ["想一次性找到答案，而不是建立验证路径。", "过度依赖想法，忽略现实条件和反馈。"],
    recommendations: ["先描述事实，再谈想法和感受。", "从一个最小可执行动作开始。"],
  },
};

export function analyzeQuestion(question: string): ProblemInsight {
  const problemType = classifyProblem(question);
  return { problemType, ...(content[problemType] ?? content[general]) };
}

export function generatePlan(question: string): ActionPlan {
  const type = classifyProblem(question);
  const plan: ActionPlan = {
    hours24: ["把问题拆成事实、想法、感受。", "写下现实条件、风险和最重要的一个决定。", "设定48小时内可执行的第一步。", "记录最想避免的惯性反应。"],
    days7: ["收集两条真实反馈。", "识别最容易误导你的一个思维习惯。", "执行一个小规模行动并复盘。", "把原问题改写成可验证的版本。"],
    days30: ["形成先观察、再判断、后行动的节奏。", "把问题处理成可复用的系统。", "在现实中测试关键决策并记录原因。", "建立个人思维档案。"],
  };
  if (type === "关系/情绪问题") plan.hours24[1] = "写下事件事实、你的解释、感受和需要的边界。";
  if (type === "成长/学习问题") plan.hours24[2] = "只完成一个最小学习动作，不追求系统性完美。";
  if (type === "财务/资源问题") plan.hours24[1] = "列出最低预算、最大风险，以及现在最不能做的事。";
  if (type === "健康/心理问题") plan.hours24[3] = "记录情绪和身体状态，不急着寻找全部答案。";
  return plan;
}
