export type AutomationDetail = {
  id: string;
  hero: {
    tagline: string;
    outcomes: string[]; // bullets
  };
  problem: string;
  solution: string;
  steps: { title: string; body: string }[];
  metrics: { kpi: string; label: string }[];
  stack: string[];
};

export const DETAILS: Record<string, AutomationDetail> = {
  "lead-enrichment": {
    id: "lead-enrichment",
    hero: {
      tagline: "Enrich new leads and auto-route to the right owner with SLAs.",
      outcomes: [
        "6h/week saved for sales ops",
        "Faster first response",
        "Cleaner CRM data",
      ],
    },
    problem:
      "Leads arrive incomplete and manually assigned. Slow responses cost meetings and revenue, while reps waste time fixing data.",
    solution:
      "We capture leads from forms/ads, validate fields, enrich from public sources, score, and route by rules (territory, product, capacity). Alerts fire on SLA breaches.",
    steps: [
      {
        title: "Capture & validate",
        body: "Webhook intake from forms/ads → schema validation → dedupe in CRM.",
      },
      {
        title: "Enrich & score",
        body: "Lookup company/site data, size, tech, and intent signals → score for priority.",
      },
      {
        title: "Assign & notify",
        body: "Round-robin or rules engine assigns owner, creates tasks, and notifies in Slack/email.",
      },
      {
        title: "Log & monitor",
        body: "Runs, errors, and latency visible in dashboard with alerting.",
      },
    ],
    metrics: [
      { kpi: "-60%", label: "Time to first response" },
      { kpi: "+22%", label: "Qualified meetings" },
      { kpi: "99.9%", label: "Workflow uptime" },
    ],
    stack: ["HubSpot", "Google Sheets", "Resend", "Slack"],
  },

  "abandoned-cart": {
    id: "abandoned-cart",
    hero: {
      tagline: "Recover revenue from checkout drop-offs automatically.",
      outcomes: [
        "Win back orders",
        "Personalized nudges",
        "Inventory-aware flows",
      ],
    },
    problem:
      "Shoppers abandon carts and never return. Manual follow-ups are inconsistent and ignore inventory/pricing changes.",
    solution:
      "We detect drop-offs, segment by recency/value, and trigger email/SMS with dynamic content and live inventory checks.",
    steps: [
      {
        title: "Detect & segment",
        body: "Track cart status and score by value/recency/propensity.",
      },
      {
        title: "Personalize",
        body: "Template with product images, price, promo windows, and shipping ETA.",
      },
      {
        title: "Send & iterate",
        body: "Staggered reminders with A/B content; suppress on purchase.",
      },
    ],
    metrics: [
      { kpi: "+8–15%", label: "Recovered revenue" },
      { kpi: "<5m", label: "Time to first reminder" },
      { kpi: "99%", label: "Delivery rate" },
    ],
    stack: ["Shopify", "Stripe", "Resend"],
  },

  "weekly-reporting": {
    id: "weekly-reporting",
    hero: {
      tagline:
        "Automated KPI rollups delivered to stakeholders every Monday 9am.",
      outcomes: ["Single source of truth", "Audit-ready", "Zero manual work"],
    },
    problem:
      "Analysts spend Fridays copying metrics into decks/spreadsheets; stakeholders get stale, inconsistent numbers.",
    solution:
      "We aggregate KPIs, run checks, and deliver reports (CSV/PDF) to inbox and Slack channels with links to raw data.",
    steps: [
      {
        title: "Extract",
        body: "Query Postgres/BigQuery and API sources with typed adapters.",
      },
      {
        title: "Validate",
        body: "Outlier and completeness checks; alert on anomalies.",
      },
      {
        title: "Deliver",
        body: "Compose PDF/CSV and send to groups with run links and logs.",
      },
    ],
    metrics: [
      { kpi: "8h/week", label: "Ops time saved" },
      { kpi: "100%", label: "Run coverage" },
      { kpi: "<2m", label: "Report latency" },
    ],
    stack: ["PostgreSQL", "BigQuery", "Google Drive", "Slack"],
  },
};
