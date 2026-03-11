# Technical Architecture Plan
## [PRODUCT NAME] — AI-Powered Home Selling System
### Loam Strategy Stack | March 2026

---

## 1. STACK OVERVIEW

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND                          │
│   React 18 + TypeScript + Vite + Tailwind CSS       │
│   Hosted on Vercel (SPA)                            │
├─────────────────────────────────────────────────────┤
│                 API LAYER                           │
│   Vercel Serverless Functions (/api/*.ts)           │
│   Proxies: Anthropic, Stripe, ATTOM/Zillow          │
├─────────────────────────────────────────────────────┤
│               DATA & AUTH                           │
│   Supabase (Postgres + Auth + Storage)              │
│   Reason: Relational data model, SQL joins,         │
│   complex filters across sale phases                │
├─────────────────────────────────────────────────────┤
│              EXTERNAL SERVICES                      │
│   Anthropic Claude API  → AI generation             │
│   Stripe                → Payments                  │
│   Resend                → Transactional email        │
│   ATTOM / Zillow API    → Property data (Phase 2)   │
│   Placekey / Geocodio   → Address normalization      │
└─────────────────────────────────────────────────────┘
```

---

## 2. PROJECT STRUCTURE

```
[app-name]/
├── src/
│   ├── components/
│   │   ├── ui/                    # Base components (Button, Input, Card, Modal)
│   │   ├── layout/               # AppShell, Sidebar, Topbar, PageHeader
│   │   ├── onboarding/           # OnboardingFlow, QuestionCard, ProgressBar
│   │   ├── dashboard/            # DashboardShell, PhaseTracker, MetricCard
│   │   ├── timeline/             # TimelineEngine, PhaseCard, TaskItem
│   │   ├── roi/                  # ROIAdvisor, ImprovementCard, BudgetBar
│   │   ├── listing/              # ListingBuilder, ToneSelector, OutputPanel
│   │   ├── offers/               # OfferDashboard, OfferCard, CompareTable
│   │   ├── contract/             # ContractGenerator, StateSelector, LegalBanner
│   │   └── calculator/           # SavingsCalculator (used on landing page)
│   │
│   ├── pages/
│   │   ├── Landing.tsx           # Public homepage
│   │   ├── Auth.tsx              # Sign up / Log in
│   │   ├── Onboarding.tsx        # 8-question flow
│   │   ├── Dashboard.tsx         # Main app shell
│   │   ├── Timeline.tsx          # Phase + task management
│   │   ├── ROIAdvisor.tsx        # Renovation recommendations
│   │   ├── ListingBuilder.tsx    # AI listing copy
│   │   ├── MLSGuide.tsx          # Static + affiliate content
│   │   ├── Showings.tsx          # Showing scheduler/tracker
│   │   ├── Offers.tsx            # Offer comparison
│   │   ├── Contract.tsx          # Contract generator
│   │   └── Settings.tsx          # Account, billing, profile
│   │
│   ├── contexts/
│   │   ├── UserContext.tsx        # Auth state + user profile
│   │   ├── SaleContext.tsx        # Active sale data (address, phase, tasks)
│   │   └── OnboardingContext.tsx  # Onboarding step state
│   │
│   ├── hooks/
│   │   ├── useUser.ts             # Auth hook
│   │   ├── useSale.ts             # Sale CRUD operations
│   │   ├── useAI.ts               # Claude API calls
│   │   ├── useTasks.ts            # Task completion state
│   │   └── useStripe.ts           # Payment flow
│   │
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client init
│   │   ├── stripe.ts              # Stripe client init
│   │   ├── constants.ts           # App constants, tier definitions
│   │   ├── phases.ts              # Phase definitions + task templates
│   │   └── utils.ts               # Formatting, date math, etc.
│   │
│   ├── types/
│   │   ├── sale.ts                # Sale, Phase, Task interfaces
│   │   ├── user.ts                # User, Subscription interfaces
│   │   ├── offer.ts               # Offer, Comparison interfaces
│   │   └── ai.ts                  # AI request/response interfaces
│   │
│   ├── App.tsx                    # Router + provider wrapping
│   └── main.tsx                   # Entry point
│
├── api/
│   ├── anthropic.ts               # Claude API proxy
│   ├── stripe-checkout.ts         # Stripe session creation
│   ├── stripe-webhook.ts          # Stripe webhook handler
│   ├── property-data.ts           # ATTOM/Zillow proxy (Phase 2)
│   └── send-email.ts              # Resend email proxy
│
├── public/
│   └── [static assets]
│
├── index.html
├── vercel.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 3. DATABASE SCHEMA (Supabase / Postgres)

### users
```sql
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT UNIQUE NOT NULL,
  full_name     TEXT,
  phone         TEXT,
  tier          TEXT DEFAULT 'free',        -- free | basic | pro | premium
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### sales
```sql
CREATE TABLE sales (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID REFERENCES users(id) ON DELETE CASCADE,
  status        TEXT DEFAULT 'prep',        -- prep | pricing | marketing | active | under_contract | closed
  
  -- Property
  address       TEXT NOT NULL,
  city          TEXT,
  state         TEXT,
  zip           TEXT,
  property_type TEXT,                       -- sfh | condo | townhome | multi
  bedrooms      INT,
  bathrooms     NUMERIC(3,1),
  sqft          INT,
  
  -- Onboarding answers
  target_move_date DATE,
  sale_motivation  TEXT,
  home_condition   TEXT,
  prep_budget      TEXT,
  primary_concern  TEXT,
  
  -- AI-generated outputs
  ai_roadmap       JSONB,                   -- phases + dates
  ai_price_range   JSONB,                   -- low/mid/high estimate
  ai_net_proceeds  NUMERIC(12,2),
  
  -- Listing
  listing_price    NUMERIC(12,2),
  list_date        DATE,
  
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### tasks
```sql
CREATE TABLE tasks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id       UUID REFERENCES sales(id) ON DELETE CASCADE,
  phase         TEXT NOT NULL,              -- prep | pricing | marketing | active | offers | closing
  title         TEXT NOT NULL,
  description   TEXT,
  due_date      DATE,
  completed     BOOLEAN DEFAULT FALSE,
  completed_at  TIMESTAMPTZ,
  sort_order    INT DEFAULT 0,
  ai_generated  BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### roi_recommendations
```sql
CREATE TABLE roi_recommendations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id       UUID REFERENCES sales(id) ON DELETE CASCADE,
  rank          INT,
  area          TEXT,                       -- kitchen | living_room | master_bath | etc
  title         TEXT,
  description   TEXT,
  cost_low      NUMERIC(10,2),
  cost_high     NUMERIC(10,2),
  value_add_low NUMERIC(10,2),
  value_add_high NUMERIC(10,2),
  roi_multiplier NUMERIC(5,2),
  action        TEXT DEFAULT 'do',          -- do | skip
  completed     BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### listings
```sql
CREATE TABLE listings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id       UUID REFERENCES sales(id) ON DELETE CASCADE,
  tone          TEXT,                       -- family | luxury | investor | firsttime | movein
  mls_description TEXT,
  zillow_headline TEXT,
  zillow_description TEXT,
  social_post   TEXT,
  feature_sheet TEXT,
  open_house_copy TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### offers
```sql
CREATE TABLE offers (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id       UUID REFERENCES sales(id) ON DELETE CASCADE,
  buyer_name    TEXT,
  offer_price   NUMERIC(12,2),
  financing_type TEXT,                      -- cash | conventional | fha | va
  down_payment_pct NUMERIC(5,2),
  inspection_contingency BOOLEAN,
  appraisal_contingency BOOLEAN,
  financing_contingency BOOLEAN,
  requested_close_date DATE,
  seller_concessions NUMERIC(10,2),
  escalation_clause BOOLEAN,
  escalation_cap NUMERIC(12,2),
  notes         TEXT,
  ai_risk_score INT,                        -- 1-5
  ai_net_proceeds NUMERIC(12,2),
  ai_recommendation TEXT,
  status        TEXT DEFAULT 'received',    -- received | countered | accepted | rejected
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### showings
```sql
CREATE TABLE showings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id       UUID REFERENCES sales(id) ON DELETE CASCADE,
  scheduled_at  TIMESTAMPTZ,
  agent_name    TEXT,
  agent_email   TEXT,
  agent_phone   TEXT,
  buyer_type    TEXT,                       -- agent | direct_buyer
  feedback_rating INT,                      -- 1-5
  feedback_notes TEXT,
  offer_submitted BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)
```sql
-- Users can only see their own data
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own sales" ON sales
  FOR ALL USING (user_id = auth.uid());

-- Cascade to all child tables
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own tasks" ON tasks
  FOR ALL USING (
    sale_id IN (SELECT id FROM sales WHERE user_id = auth.uid())
  );

-- Apply same pattern to: roi_recommendations, listings, offers, showings
```

---

## 4. API LAYER (Vercel Serverless Functions)

### api/anthropic.ts — Core AI Proxy
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { action, payload } = req.body;

  // Route to correct system prompt based on action
  const systemPrompts: Record<string, string> = {
    generate_roadmap: ROADMAP_SYSTEM_PROMPT,
    generate_roi: ROI_SYSTEM_PROMPT,
    generate_listing: LISTING_SYSTEM_PROMPT,
    analyze_offers: OFFER_ANALYSIS_SYSTEM_PROMPT,
    generate_tasks: TASK_SYSTEM_PROMPT,
  };

  const systemPrompt = systemPrompts[action];
  if (!systemPrompt) return res.status(400).json({ error: 'Unknown action' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: 'user', content: JSON.stringify(payload) }]
      })
    });

    const data = await response.json();
    const text = data.content[0]?.text ?? '';

    // Strip JSON fences if present
    const clean = text.replace(/```json\n?|\n?```/g, '').trim();

    try {
      res.status(200).json({ result: JSON.parse(clean) });
    } catch {
      res.status(200).json({ result: text }); // Return as text if not JSON
    }
  } catch (error) {
    console.error('Anthropic error:', error);
    res.status(500).json({ error: 'AI generation failed' });
  }
}
```

### AI System Prompts (constants/prompts.ts)
```typescript
export const ROADMAP_SYSTEM_PROMPT = `
You are an expert real estate strategist helping homeowners sell without an agent.
Given a seller's property details, motivation, condition, and target date,
generate a personalized sale roadmap.

Respond ONLY with valid JSON in this exact format:
{
  "phases": [
    {
      "name": "string",
      "label": "string",
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD",
      "description": "string",
      "keyActions": ["string"]
    }
  ],
  "estimatedListDate": "YYYY-MM-DD",
  "estimatedCloseDate": "YYYY-MM-DD",
  "priceRange": { "low": number, "mid": number, "high": number },
  "topPrepActions": ["string"],
  "marketInsight": "string"
}
`;

export const ROI_SYSTEM_PROMPT = `
You are a home staging and renovation ROI expert.
Given a seller's home condition, budget, and market zip code,
generate ranked improvement recommendations.

Respond ONLY with valid JSON:
{
  "recommendations": [
    {
      "rank": number,
      "area": "string",
      "title": "string",
      "description": "string",
      "costLow": number,
      "costHigh": number,
      "valueAddLow": number,
      "valueAddHigh": number,
      "roiMultiplier": number,
      "action": "do" | "skip",
      "rationale": "string"
    }
  ],
  "budgetAllocation": "string",
  "overImprovementWarning": "string | null"
}
`;

export const LISTING_SYSTEM_PROMPT = `
You are an expert real estate copywriter. Generate professional listing copy
that follows MLS best practices, fair housing compliance, and buyer psychology.

Respond ONLY with valid JSON:
{
  "mlsDescription": "string (max 250 words)",
  "zillowHeadline": "string (max 80 chars)",
  "zillowDescription": "string (max 200 words)",
  "socialPost": "string (max 280 chars)",
  "featureSheet": ["string"],
  "openHouseCopy": "string"
}
`;

export const OFFER_ANALYSIS_SYSTEM_PROMPT = `
You are a real estate transaction expert analyzing competing home purchase offers.
Evaluate each offer on net proceeds, risk, and likelihood to close.

Respond ONLY with valid JSON:
{
  "rankedOffers": [
    {
      "offerId": "string",
      "netProceeds": number,
      "riskScore": number (1-5, 1=lowest risk),
      "strengthScore": number (1-10),
      "flags": ["string"],
      "recommendation": "string"
    }
  ],
  "topRecommendation": "string",
  "rationale": "string",
  "counterOfferSuggestions": { "offerId": "string", "suggestion": "string" }[]
}
`;
```

### api/stripe-checkout.ts
```typescript
import Stripe from 'stripe';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS = {
  basic: process.env.STRIPE_BASIC_PRICE_ID!,
  pro: process.env.STRIPE_PRO_PRICE_ID!,
  premium: process.env.STRIPE_PREMIUM_PRICE_ID!,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { tier, userId, email } = req.body;
  const priceId = PRICE_IDS[tier as keyof typeof PRICE_IDS];

  if (!priceId) return res.status(400).json({ error: 'Invalid tier' });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    metadata: { userId, tier },
    success_url: `${process.env.VITE_APP_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.VITE_APP_URL}/pricing`,
  });

  res.status(200).json({ url: session.url });
}
```

---

## 5. KEY REACT PATTERNS

### SaleContext — Central State
```typescript
// src/contexts/SaleContext.tsx
interface SaleContextType {
  sale: Sale | null;
  tasks: Task[];
  currentPhase: string;
  completionPct: number;
  updateTask: (taskId: string, completed: boolean) => Promise<void>;
  updateSale: (updates: Partial<Sale>) => Promise<void>;
  generateROI: () => Promise<void>;
  generateListing: (tone: string) => Promise<void>;
}
```

### useAI Hook — All Claude Calls
```typescript
// src/hooks/useAI.ts
export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async (action: string, payload: object) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/anthropic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload }),
      });
      const data = await res.json();
      return data.result;
    } catch (err) {
      setError('Generation failed. Please try again.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generate, loading, error };
}
```

---

## 6. ENVIRONMENT VARIABLES

### Server-side (.env — never exposed to client)
```
ANTHROPIC_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
STRIPE_PREMIUM_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
SUPABASE_SERVICE_ROLE_KEY=...
ATTOM_API_KEY=...           # Phase 2
```

### Client-side (VITE_ prefix — safe to expose)
```
VITE_SUPABASE_URL=https://[project].supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_APP_URL=https://[yourdomain].com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## 7. VERCEL CONFIGURATION

```json
{
  "rewrites": [
    {
      "source": "/((?!api/.*).*)",
      "destination": "/index.html"
    }
  ],
  "functions": {
    "api/anthropic.ts": { "maxDuration": 30 },
    "api/stripe-webhook.ts": { "maxDuration": 10 }
  }
}
```

---

## 8. BUILD & DEPLOY SEQUENCE

```bash
# 1. Scaffold
npm create vite@latest [app-name] -- --template react-ts
cd [app-name]

# 2. Core dependencies
npm install react-router-dom @supabase/supabase-js stripe
npm install -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p

# 3. UI utilities
npm install clsx tailwind-merge lucide-react

# 4. Forms & validation
npm install react-hook-form zod @hookform/resolvers

# 5. Git + GitHub
git init && git add . && git commit -m "init"
gh repo create [app-name] --private --source=. --push

# 6. Vercel
vercel link
vercel env add ANTHROPIC_API_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
# ... (all server-side vars)

# 7. Supabase
# - Create project at supabase.com
# - Run schema migrations
# - Enable Auth (email/password + magic link)
# - Enable RLS on all tables
# - Copy URL + anon key to VITE_ vars

# 8. Stripe
# - Create products: Basic ($199), Pro ($299), Premium ($499)
# - Copy price IDs to env vars
# - Set up webhook → /api/stripe-webhook

# 9. First deploy
vercel --prod
```

---

## 9. MVP BUILD TIMELINE

### Week 1 — Foundation
- Project scaffold + routing + Supabase auth
- Landing page + savings calculator
- Vercel serverless functions (Anthropic proxy + Stripe)
- Deploy to production (empty shell)

### Week 2 — Onboarding + Dashboard
- 8-question onboarding flow
- AI roadmap generation (Claude)
- Dashboard shell + phase tracker
- Task list with completion tracking
- Database schema + RLS live

### Week 3 — Core Features
- ROI Renovation Advisor (AI generation + display)
- Listing Builder (all 5 tones, all outputs)
- MLS Guide (static content + affiliate links)

### Week 4 — Payments + Polish
- Stripe checkout integration
- Tier-based feature gating
- Loading states + error handling
- Mobile responsive pass
- Beta launch to 10 real users

### Week 5–6 — Phase 2 Start
- Showing Scheduler
- Offer Comparison Dashboard
- Contract templates (Utah + Florida + Texas)

---

## 10. THIRD-PARTY INTEGRATIONS MAP

| Service | Purpose | When | Cost |
|---------|---------|------|------|
| Anthropic API | All AI generation | Day 1 | ~$0.003/1K tokens |
| Supabase | Database + Auth | Day 1 | Free → $25/mo |
| Vercel | Hosting + functions | Day 1 | Free → $20/mo |
| Stripe | Payments | Week 4 | 2.9% + $0.30/txn |
| Resend | Transactional email | Week 3 | Free → $20/mo |
| Geocodio | Address normalization | Day 1 | $0.001/lookup |
| ATTOM Data | Property comps | Phase 2 | ~$200/mo |
| Houzeo API | Flat-fee MLS affiliate | Phase 2 | Revenue share |

---

*Architecture Owner: Mike Hill / Loam Strategy*
*Stack: React + TypeScript + Vite + Tailwind + Supabase + Vercel*
*Last Updated: March 2026*
