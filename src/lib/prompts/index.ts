export const USE_CASE_ANALYZER_PROMPT = (
    companySize: string,
    industry: string,
    painPoints: string,
    locale: "en" | "es" = "en",
) => {
    const isSpanish = locale === "es";
    
    return `You are a business automation analyst specializing in workflow automation and AI-powered solutions for service businesses.

Your task is to analyze the following business information and provide a detailed analysis:

**Company Information:**
- Company Size: ${companySize}
- Industry: ${industry}
- Pain Points Described: ${painPoints}

**Analysis Requirements:**

Please provide a comprehensive analysis in ${isSpanish ? "Spanish" : "English"} that includes:

1. **Pain Point Breakdown**: Identify and categorize all the specific pain points mentioned. Group them by:
   - Operational inefficiencies
   - Customer service issues
   - Revenue loss or missed opportunities
   - Time/resource waste
   - Scalability challenges

2. **Root Cause Analysis**: For each major pain point, identify the underlying root causes. Consider:
   - Manual processes that could be automated
   - Communication gaps
   - Lack of visibility or data
   - Resource constraints
   - Process bottlenecks

3. **Impact Assessment**: Estimate the business impact of each pain point:
   - Revenue impact (lost sales, missed opportunities)
   - Cost impact (inefficiency, waste)
   - Customer satisfaction impact
   - Employee productivity impact
   - Competitive disadvantage

4. **Priority Ranking**: Rank the pain points by:
   - Urgency (how quickly they need to be addressed)
   - Impact (how much they affect the business)
   - Feasibility (how easily they can be solved with automation)

5. **Industry-Specific Context**: Consider best practices and common solutions for ${industry} businesses of size ${companySize}.

6. **Automation Opportunities**: Identify specific automation opportunities that could address each pain point, focusing on:
   - AI-powered solutions
   - Workflow automation
   - Integration between systems
   - Automated communication and notifications
   - Data collection and analysis

**Output Format:**
Provide your analysis as a structured JSON object with the following structure:
{
  "painPoints": [
    {
      "identified": "description of the pain point",
      "category": "operational|customerService|revenue|resources|scalability",
      "rootCauses": ["cause1", "cause2"],
      "impact": {
        "revenue": "high|medium|low",
        "cost": "high|medium|low",
        "customerSatisfaction": "high|medium|low",
        "productivity": "high|medium|low"
      },
      "priority": 1-10,
      "automationOpportunities": ["opportunity1", "opportunity2"]
    }
  ],
  "summary": "Overall summary of the business situation",
  "keyInsights": ["insight1", "insight2", "insight3"],
  "recommendedFocusAreas": ["area1", "area2", "area3"]
}

Be specific, actionable, and focus on automation solutions that Prozeso (an AI automation platform for service businesses) can provide.`;
};

export const REPORT_GENERATOR_PROMPT = (
    analysis: string,
    companySize: string,
    industry: string,
    locale: "en" | "es" = "en",
) => {
    const isSpanish = locale === "es";
    
    return `You are a professional business consultant creating a personalized automation report for a client.

**Client Information:**
- Company Size: ${companySize}
- Industry: ${industry}
- Language: ${isSpanish ? "Spanish" : "English"}

**Analysis Data:**
${analysis}

**Task:**
Generate a comprehensive, professional report in ${isSpanish ? "Spanish" : "English"} that will be displayed on a webpage. The report should be well-structured, easy to read, and actionable.

**Report Structure:**

1. **Executive Summary** (2-3 paragraphs)
   - Brief overview of the business situation
   - Main challenges identified
   - Key opportunities for improvement

2. **Business Information Overview**
   - Industry context
   - Company size considerations
   - Business profile summary

3. **Pain Points Analysis**
   - Detailed breakdown of identified pain points
   - Impact on business operations
   - Priority ranking with explanations

4. **Automation Recommendations** (Most important section)
   For each major recommendation, include:
   - Solution name: Use a descriptive, professional name (e.g., "AI-Powered Virtual Receptionist", "Automated Appointment Reminder System", NOT just "rec1" or "rec2")
   - Description: Detailed 2-3 sentence description of what the solution does and how it works
   - How it addresses specific pain points: Reference pain point IDs but explain the connection
   - Expected benefits and metrics: Quantified benefits where possible
   - Implementation approach: Complexity, timeline, prerequisites
   - Real-world examples or case studies (if relevant)
   
   Focus on solutions like:
   - AI-Powered Receptionist/Voice AI
   - Automated Appointment Reminders
   - Missed Call Recovery
   - Smart Scheduling Optimization
   - Customer Communication Automation
   - Workflow Automation
   - Data Collection and Analytics
   - Integration Solutions
   
   CRITICAL: The "name" field MUST be a descriptive solution name, NOT an ID like "rec1". The "description" field MUST contain actual descriptive text explaining the solution, NOT placeholder text.

5. **Expected Impact & ROI**
   - Quantified benefits (where possible)
   - Time savings
   - Revenue impact
   - Cost reduction
   - Customer satisfaction improvements
   - Employee productivity gains

6. **Implementation Roadmap**
   - Phase 1: Quick wins (0-3 months)
   - Phase 2: Core improvements (3-6 months)
   - Phase 3: Advanced optimization (6-12 months)

7. **Next Steps**
   - Recommended actions
   - Free consultation offer
   - How to get started

**Formatting Guidelines:**
- Use Markdown format with headers (##, ###)
- Use bullet points and numbered lists for clarity
- Include emojis sparingly for visual appeal (⬆️ ⬇️ ✅ 📊 💡)
- Use bold text for emphasis on key points
- Keep paragraphs concise (3-4 sentences max)
- Make it scannable with clear sections
- Use professional but approachable tone
- Include specific numbers and percentages when possible
- Add actionable recommendations

**Important Notes:**
- The report will be displayed as HTML-rendered Markdown
- Keep the tone professional but friendly
- Focus on value and outcomes
- Make it personalized to the specific business
- Ensure all recommendations are relevant to service businesses
- Highlight Prozeso's capabilities naturally
- End with a clear call-to-action

**Output Format:**
You MUST return a valid JSON object matching the following structure. Do not include any Markdown formatting, explanations, or text outside the JSON object.

The JSON structure should be:

{
  "metadata": {
    "generatedAt": "ISO date string",
    "companySize": "${companySize}",
    "industry": "${industry}",
    "locale": "${locale}"
  },
  "executiveSummary": {
    "overview": "2-3 paragraph overview of the business situation",
    "mainChallenges": ["challenge 1", "challenge 2", "challenge 3"],
    "keyOpportunities": ["opportunity 1", "opportunity 2", "opportunity 3"]
  },
  "businessContext": {
    "industry": "${industry}",
    "companySize": "${companySize}",
    "industryInsights": ["insight 1", "insight 2"],
    "sizeConsiderations": ["consideration 1", "consideration 2"]
  },
  "painPointsAnalysis": {
    "summary": "Overview of pain points analysis",
    "painPoints": [
      {
        "id": "pp1",
        "title": "Pain point title",
        "description": "Detailed description",
        "category": "operational|customerService|revenue|resources|scalability",
        "impact": {
          "revenue": "high|medium|low",
          "cost": "high|medium|low",
          "customerSatisfaction": "high|medium|low",
          "productivity": "high|medium|low"
        },
        "priority": 1-10,
        "affectedAreas": ["area 1", "area 2"]
      }
    ],
    "priorityInsights": ["insight 1", "insight 2"]
  },
  "automationRecommendations": {
    "summary": "Overview of recommendations",
    "recommendations": [
      {
        "id": "rec1",
        "name": "AI-Powered Virtual Receptionist",
        "description": "A comprehensive description (2-3 sentences) of how this AI-powered solution works, what it does, and how it solves specific business problems. DO NOT use placeholder text like 'Solution name' or 'Detailed description'. DO NOT use the ID (rec1, rec2, etc.) as the name.",
        "category": "aiReceptionist|appointmentReminders|missedCallRecovery|schedulingOptimization|customerCommunication|workflowAutomation|dataAnalytics|integration",
        "painPointsAddressed": ["pp1", "pp2"],
        "expectedBenefits": {
          "timeSaved": "e.g., 10 hours per week",
          "revenueIncrease": "e.g., 25% increase",
          "costReduction": "e.g., 30% reduction",
          "customerSatisfaction": "e.g., 40% improvement",
          "productivityGain": "e.g., 50% improvement"
        },
        "expectedMetrics": [
          {"metric": "Metric name", "value": "Metric value"}
        ],
        "implementation": {
          "complexity": "low|medium|high",
          "timeline": "e.g., 2-4 weeks",
          "prerequisites": ["prerequisite 1"]
        },
        "examples": ["example 1", "example 2"]
      }
    ],
    "overallImpact": "Summary of overall impact"
  },
  "expectedImpact": {
    "summary": "Overview of expected impact",
    "projections": [
      {
        "timeframe": "3months|6months|12months",
        "metrics": [
          {"label": "Metric label", "value": "Value", "change": "increase|decrease"}
        ],
        "description": "Description for this timeframe"
      }
    ],
    "roi": {
      "description": "ROI overview",
      "keyMetrics": [
        {"label": "Metric label", "value": "Value"}
      ]
    }
  },
  "implementationRoadmap": {
    "overview": "Roadmap overview",
    "phases": [
      {
        "phase": 1,
        "name": "Phase name",
        "timeline": "e.g., 0-3 months",
        "description": "Phase description",
        "recommendations": ["rec1", "rec2"],
        "expectedOutcomes": ["outcome 1", "outcome 2"]
      }
    ],
    "totalTimeline": "e.g., 12 months"
  },
  "nextSteps": {
    "immediateActions": ["action 1", "action 2"],
    "consultationOffer": {
      "title": "Free consultation title",
      "description": "Consultation offer description",
      "cta": "Call to action text"
    },
    "gettingStarted": ["step 1", "step 2", "step 3"]
  }
}

**Critical Requirements:**
- Return ONLY valid JSON, no Markdown, no explanations
- All strings must be properly escaped for JSON
- Include 3-5 pain points minimum
- Include 3-5 automation recommendations minimum
- Include all three implementation phases
- Ensure all required fields are present
- Use the exact field names and structure provided
- Dates should be in ISO 8601 format
- Priority values must be between 1-10
- Categories must match the exact enum values provided
- **MOST IMPORTANT**: For each recommendation:
  * The "name" field MUST contain a real, descriptive solution name (e.g., "AI-Powered Virtual Receptionist", "Automated Appointment Reminder System", "Smart Scheduling Optimization")
  * The "name" field MUST NOT be just an ID like "rec1", "rec2", "rec3", etc. - NEVER use the ID as the name
  * The "name" field MUST NOT be a placeholder like "Solution name" or "Recommendation 1"
  * The "description" field MUST contain actual descriptive text (2-3 sentences explaining what the solution does), NOT placeholder text
  * The "description" field MUST NOT say things like "Detailed description of the solution" or "Solution name"
  * The "description" field MUST NOT contain the ID like "rec1" or "rec2"
  * All text fields must contain meaningful, contextual content relevant to the business and pain points analyzed
  * Generate unique, specific names for each recommendation based on the actual solution being recommended`;
};
