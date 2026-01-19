
export type ImpactLevel = "high" | "medium" | "low";

export type PainPointCategory = "operational" | "customerService" | "revenue" | "resources" | "scalability";

export interface UseCaseAnalysisResult {
  painPoints: {
    identified: string;
    category: PainPointCategory;
    rootCauses: string[];
    impact: {
      revenue: ImpactLevel;
      cost: ImpactLevel;
      customerSatisfaction: ImpactLevel;
      productivity: ImpactLevel;
    };
    priority: number;
    automationOpportunities: string[];
  }[];
  summary: string;
  keyInsights: string[];
  recommendedFocusAreas: string[];
}

export type Priority = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  category: "operational" | "customerService" | "revenue" | "resources" | "scalability";
  impact: {
    revenue: ImpactLevel;
    cost: ImpactLevel;
    customerSatisfaction: ImpactLevel;
    productivity: ImpactLevel;
  };
  priority: Priority;
  affectedAreas: string[];
}

export interface AutomationRecommendation {
  id: string;
  name: string;
  description: string;
  category: 
    | "aiReceptionist"
    | "appointmentReminders"
    | "missedCallRecovery"
    | "schedulingOptimization"
    | "customerCommunication"
    | "workflowAutomation"
    | "dataAnalytics"
    | "integration";
  painPointsAddressed: string[];
  expectedBenefits: {
    timeSaved?: string;
    revenueIncrease?: string;
    costReduction?: string;
    customerSatisfaction?: string;
    productivityGain?: string;
  };
  expectedMetrics: {
    metric: string;
    value: string;
  }[];
  implementation: {
    complexity: "low" | "medium" | "high";
    timeline: string;
    prerequisites: string[];
  };
  examples?: string[];
}

export interface ImpactProjection {
  timeframe: "3months" | "6months" | "12months";
  metrics: {
    label: string;
    value: string;
    change: "increase" | "decrease";
  }[];
  description: string;
}

export interface ImplementationPhase {
  phase: 1 | 2 | 3;
  name: string;
  timeline: string;
  description: string;
  recommendations: string[];
  expectedOutcomes: string[];
}

export interface BusinessContext {
  industry: string;
  companySize: string;
  industryInsights: string[];
  sizeConsiderations: string[];
}

export interface UseCaseReport {
  metadata: {
    generatedAt: string;
    companySize: string;
    industry: string;
    locale: "en" | "es";
  };
  executiveSummary: {
    overview: string;
    mainChallenges: string[];
    keyOpportunities: string[];
  };
  businessContext: BusinessContext;
  painPointsAnalysis: {
    summary: string;
    painPoints: PainPoint[];
    priorityInsights: string[];
  };
  automationRecommendations: {
    summary: string;
    recommendations: AutomationRecommendation[];
    overallImpact: string;
  };
  expectedImpact: {
    summary: string;
    projections: ImpactProjection[];
    roi: {
      description: string;
      keyMetrics: {
        label: string;
        value: string;
      }[];
    };
  };
  implementationRoadmap: {
    overview: string;
    phases: ImplementationPhase[];
    totalTimeline: string;
  };
  nextSteps: {
    immediateActions: string[];
    consultationOffer: {
      title: string;
      description: string;
      cta: string;
    };
    gettingStarted: string[];
  };
}
