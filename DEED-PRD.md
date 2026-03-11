# Product Requirements Document
## [PRODUCT NAME TBD] — AI-Powered Home Selling System
### Version 1.0 | Loam Strategy | March 2026

---

## 1. EXECUTIVE SUMMARY

### The Problem
Selling a home without an agent costs sellers nothing upfront — but the process is so overwhelming that 67% of FSBO sellers eventually surrender and hire an agent anyway. The problem isn't capability. It's the absence of a trusted system to guide them through every decision, every phase, every piece of paperwork. They don't need a listing tool. They need a strategist.

### The Solution
An AI-powered selling system that acts as a project manager, strategist, marketing assistant, and transaction coordinator — guiding confident homeowners from pre-sale prep through closing, saving them 3%+ in commission while delivering a professional-grade experience.

### The Differentiator
Every competitor starts at the listing. We start at the strategy. The ROI Advisor and Timeline Engine activate *before* a seller lists — delivering value immediately, building loyalty early, and ensuring sellers arrive at their listing date better prepared than any agent-listed home at the same price point.

### The Positioning
**Not a FSBO tool. A selling system.**
For confident homeowners who want control, professional process, and to keep their 3%.

---

## 2. NAMING OPTIONS

### Recommended Names (with rationale)

**DEED** *(Top Pick)*
Clean, powerful, one word. Means the legal transfer of ownership — the whole point of the process. Memorable, domain-friendly, no baggage. `deed.com` likely taken but `getdeed.com`, `usedeed.com`, `deedapp.com` are viable. Feels like a brand that could scale.

**KEYD** *(Strong Contender)*
Modern spelling of "keyed" — as in, you now hold the keys to your own sale. Short, distinctive, searchable. `keydhome.com` or `keydsell.com` work well.

**HOLDCLOSE** *(Positioning-forward)*
"Hold" as in hold your equity, "Close" as in close the deal. Communicates the financial outcome directly. `holdclose.com` likely available.

**VEND** *(Bold/Simple)*
Latin root for "to sell." One syllable. Brand-ready. `vend.co` or `vendapp.com`. Risk: could feel too generic without strong brand execution.

**CLASP** *(Unexpected)*
A clasp seals things shut — the close. Distinctive, memorable, stands out from every "Home" and "Sale" named competitor. `clasp.app` or `getclasap.com`.

**HOMEWARD** *(Warmth + Direction)*
Implies the journey toward your next chapter. Emotionally resonant, broad appeal. `homewardapp.com` likely available.

### Recommendation
**DEED** if you want authority and scale.
**KEYD** if you want modern/startup energy.
**HOLDCLOSE** if you want the positioning baked into the name.

---

## 3. TARGET USER

### Primary User: The Confident Seller
- Homeowner with 5–20 years in the home, significant equity
- Age 35–58, college-educated, tech-comfortable
- Financially motivated — the 3% savings is meaningful ($10K–$25K+ at their price point)
- Has done their research, knows what FSBO is, just needs a system
- Not anti-agent — simply doesn't see the value at that price
- Influenced by stories like Robert Levine's (the video that sparked this concept)

### Secondary User: The Experienced Repeat Seller
- Has sold a home before, knows the process broadly
- Frustrated by the agent experience — slow, opaque, commission-heavy
- Wants control over timing, pricing, and negotiations
- Likely to sell again or refer others

### Who This Is NOT For
- First-time sellers with no real estate knowledge (high support burden)
- Distressed sellers with legal complications
- Sellers in markets with unusual disclosure requirements (early versions)

---

## 4. CORE USER FLOW (MVP)

```
LANDING PAGE
    ↓
[Savings Calculator] — personalized hook before signup
    ↓
SIGN UP / CREATE ACCOUNT
    ↓
SMART ONBOARDING (8 questions)
· Address & home details
· Target move-out date
· Sale motivation
· Current home condition
· Prep budget
· Prior FSBO experience
· Biggest fear about selling solo
· How they heard about us
    ↓
AI GENERATES:
· Personalized sale roadmap
· Estimated market value range
· Net proceeds projection
· Recommended improvement priority list
    ↓
DASHBOARD (home base)
    ↓
┌─────────────────────────────────────────────┐
│  PHASE 1: PREP      │  PHASE 2: PRICE       │
│  · ROI Advisor      │  · Pricing Assistant  │
│  · Task checklist   │  · Comp analyzer      │
├─────────────────────┼───────────────────────┤
│  PHASE 3: MARKET    │  PHASE 4: TRANSACT    │
│  · Listing Builder  │  · Offer Comparison   │
│  · MLS Guidance     │  · Contract Generator │
│  · Showing Tracker  │  · Attorney Connect   │
└─────────────────────┴───────────────────────┘
    ↓
CLOSING CHECKLIST + SUCCESS STATE
    ↓
[Referral prompt + testimonial capture]
```

---

## 5. FEATURE SPECIFICATIONS

### 5.1 SAVINGS CALCULATOR (Pre-auth, Homepage)
**Purpose:** Convert visitors before they sign up. Make the value visceral and personal.

**Inputs:**
- Home sale price (slider: $100K–$3M, default $450K)

**Outputs:**
- Traditional agent commission (3% of price)
- App cost ($299 fixed)
- Net savings (dynamic)

**Behavior:**
- Live updates on slider move
- No sign-up required to use
- Primary CTA below calculator: "Keep your [X]. Start your roadmap →"

**Success Metric:** Calculator-to-signup conversion rate ≥ 25%

---

### 5.2 SMART ONBOARDING (8 Questions)
**Purpose:** Collect the data needed to personalize the roadmap. Make the user feel understood immediately.

**Questions:**
1. Property address (used for AVM + market data)
2. Home type (SFH, condo, townhome, multi-family)
3. Bedrooms / Bathrooms / Square footage
4. Target move-out date
5. Primary sale motivation (relocating / downsizing / upsizing / financial / investment)
6. Current home condition (move-in ready / good shape / needs cosmetic work / fixer)
7. Pre-sale improvement budget (ranges)
8. Biggest concern about selling solo (pricing right / legal paperwork / finding buyers / negotiating / all of the above)

**Outputs generated by AI:**
- Personalized sale roadmap (phase names + approximate dates)
- Estimated market value range (via AVM API or Claude analysis)
- Net proceeds projection (price estimate minus app cost minus estimated closing costs)
- Top 3 recommended prep actions based on condition + budget

**UX Notes:**
- Progress bar visible throughout
- One question per screen on mobile
- "Why we ask" micro-copy on each question (builds trust)
- Final screen = "Your roadmap is ready" with preview before full dashboard loads

---

### 5.3 AI TIMELINE ENGINE (Dashboard Hero)
**Purpose:** The most valuable feature per user research. Give sellers a project manager they've never had.

**Phases:**
1. Prep (weeks 1–2)
2. Pricing (week 3)
3. Marketing (week 4)
4. Active (listing live — days to weeks)
5. Offers & Negotiation
6. Under Contract
7. Closing

**Per Phase:**
- Phase description + what to expect
- Task checklist (AI-generated based on their onboarding answers)
- Deadlines tied to their target move-out date
- Templates relevant to that phase
- AI tips ("Based on your Cooper City market, Tuesday listings see 18% more views")

**AI Personalization Inputs:**
- Target date → drives all deadline math
- Home condition → adjusts prep phase tasks
- Market (zip code) → informs timing recommendations
- Sale motivation → adjusts tone ("you're relocating — here's how to run parallel timelines")

**Task Completion:**
- Users can check off tasks
- Completion % shown on dashboard
- Overdue tasks flagged in amber
- Completed phase triggers visual celebration + next phase unlock

---

### 5.4 ROI RENOVATION ADVISOR
**Purpose:** Help sellers spend smart pre-sale. This feature alone justifies the app cost.

**Inputs:**
- Pre-sale budget (from onboarding, editable)
- Home condition by room/area (form)
- Zip code / market (from onboarding)

**Process:**
- Claude analyzes inputs against known ROI data for home improvements
- Cross-references neighborhood price ceiling to avoid over-improving
- Generates ranked recommendations

**Outputs:**
- Ranked improvement list (1–N) with:
  - Estimated cost range
  - Estimated value add
  - ROI multiplier (e.g., "7x")
  - "Do This" / "Skip This" flag
  - Specific room/area targeted
- Budget allocation suggestion ("With $5K, do items 1, 2, and 3")
- "Over-improvement warning" if budget exceeds ceiling

**UX Notes:**
- Results presented as a ranked card list
- Each card expandable with more detail
- "Mark as Complete" tracks what they've done
- Skip items can be archived (not deleted)

---

### 5.5 SMART LISTING BUILDER
**Purpose:** Generate professional listing copy across all channels in minutes.

**Inputs:**
- Home details (pre-populated from onboarding, editable)
- Top highlights (free text, guided prompts)
- Neighborhood selling points (free text)
- Listing price
- Tone selector (5 options)

**Tones:**
1. Family-Focused
2. Luxury & Refined
3. Investor Appeal
4. First-Time Buyer
5. Move-In Ready / Turnkey

**Outputs (all generated simultaneously):**
- MLS description (250 words, compliant format)
- Zillow-optimized headline + description
- Open house handout copy
- Social media post (Facebook + Instagram)
- Feature highlight sheet (bullet format)

**Behavior:**
- One-click regeneration per section
- Inline editing of any generated text
- Copy-to-clipboard per section
- Download all as PDF (open house packet)

**AI Prompt Strategy:**
- System prompt includes MLS best practices, keyword guidance, and fair housing compliance reminders
- User inputs structured as JSON for reliable output
- Output parsed and displayed in separate panels

---

### 5.6 MLS ACCESS GUIDE
**Purpose:** FSBO sellers still need the MLS. Remove the confusion around how to get listed.

**Content:**
- Explanation of what the MLS is and why it matters
- Step-by-step guide to flat-fee MLS listing
- State-specific provider comparison table:
  - Provider name
  - Cost
  - Listing duration
  - Syndication reach
  - Rating
  - Direct affiliate link
- FAQ: "Will buyers' agents show my home?" "Do I need to offer a buyer's agent commission?"

**Affiliate Strategy:**
- Negotiate referral agreements with 3–5 national flat-fee MLS providers
- Track clicks and conversions via UTM parameters
- Revenue: $15–$40 per referral conversion

---

### 5.7 SHOWING SCHEDULER & TRACKER
**Purpose:** Give sellers a simple command center for managing buyer interest.

**Features:**
- Request a showing form (shareable link for buyers/agents)
- Calendar view of scheduled showings
- Pre/post showing checklist (prep reminders + feedback request)
- Feedback log per showing (rating + notes)
- Follow-up prompt ("It's been 48 hours — send a follow-up?")

**Integrations (Phase 2):**
- Google Calendar sync
- Automated email confirmation to buyers/agents

---

### 5.8 OFFER COMPARISON DASHBOARD
**Purpose:** Strip emotion from the offer review process. Show sellers which deal is actually best.

**Inputs (per offer):**
- Offer price
- Financing type (cash / conventional / FHA / VA)
- Down payment %
- Inspection contingency (yes/no/waived)
- Appraisal contingency (yes/no/waived)
- Financing contingency (yes/no/waived)
- Requested closing date
- Seller concessions requested
- Escalation clause details (if applicable)

**Outputs:**
- Side-by-side comparison table
- Net proceeds per offer (after estimated concessions + carrying cost)
- Risk score per offer (1–5, based on contingencies + financing type)
- AI recommendation with plain-English rationale
- "What to counter" suggestion per offer

**Ranked Views:**
- Strongest overall
- Highest net proceeds
- Lowest risk / most likely to close
- Fastest close

---

### 5.9 CONTRACT GENERATOR
**Purpose:** Generate a usable starting contract. Always paired with attorney review CTA.

**Inputs:**
- Property details (from profile)
- Accepted offer terms (from Offer Dashboard or manual entry)
- State (determines template)

**Outputs:**
- State-specific purchase agreement (pre-populated)
- Addendum templates (inspection, HOA, seller's disclosure)
- Closing cost estimate worksheet

**Legal Compliance:**
- Prominent disclaimer on every contract screen: "This is an AI-generated template. Always have a licensed real estate attorney review before signing."
- Attorney referral marketplace embedded (flat-fee review: $149–$299)
- Track referral conversions as revenue stream

**State Coverage (MVP):**
- Utah, Florida, Texas, Arizona, Nevada, Colorado (high FSBO volume states)
- Expand by 10 states per quarter post-launch

---

### 5.10 PRICING ASSISTANT (Phase 2)
**Purpose:** Help sellers price with data, not hope.

**Inputs:**
- Address (from onboarding)
- Home specs

**Outputs:**
- Comparable sales (3–6 month lookback, 0.5 mile radius)
- Price per sqft analysis
- Days on market for comps
- Suggested list price range
- "Price to sell in X days" scenarios

**Data Sources:**
- Zillow API / RapidAPI real estate endpoints
- ATTOM Data (if budget allows)
- Or Claude-generated estimates with comp data user provides

---

## 6. MVP SCOPE

### Must Ship (Day 1)
- [ ] Landing page with savings calculator
- [ ] Auth (sign up / log in / forgot password)
- [ ] Smart onboarding (8 questions → AI roadmap generation)
- [ ] Dashboard shell with phase progress
- [ ] AI Timeline Engine (task list + deadlines)
- [ ] ROI Renovation Advisor
- [ ] Smart Listing Builder (all 5 tones, all outputs)
- [ ] MLS Access Guide (static content + affiliate links)
- [ ] Stripe payment ($199 / $299 / $499 tiers)

### Ship Within 30 Days
- [ ] Showing Scheduler & Tracker
- [ ] Offer Comparison Dashboard
- [ ] Basic contract templates (top 6 states)

### Phase 2 (60–90 Days)
- [ ] Attorney referral marketplace
- [ ] Pricing Assistant with real comp data
- [ ] Google Calendar integration
- [ ] Email notification system
- [ ] Referral program
- [ ] Mobile optimization pass
- [ ] Additional state contract coverage

---

## 7. MONETIZATION

### Pricing Tiers

| Tier | Price | Target User |
|------|-------|-------------|
| Basic | $199 | Budget-conscious, simple sale |
| Pro | $299 | Most users — complete system |
| Premium | $499 | High-value homes, complex markets |

### Additional Revenue Streams
- Flat-fee MLS referral affiliate: $15–$40/conversion
- Attorney referral marketplace: 20% of attorney fee
- Premium add-ons: Professional photography vendor referrals, home stager referrals
- Future: B2B licensing to credit unions, relocation companies

### Unit Economics (Pro Tier)
- CAC target: < $40 (SEO + content-driven)
- LTV: $299 + ~$50 affiliate revenue = ~$349
- LTV:CAC ratio target: 8:1
- Break-even: 67 Pro users/month = ~$20K MRR

---

## 8. SUCCESS METRICS

### Week 1–4
- Waitlist signups: 500+
- Landing page conversion (visit → signup): ≥ 8%
- Calculator engagement: ≥ 60% of visitors interact

### Month 1–3 (Post-Launch)
- Paying users: 50+
- Onboarding completion rate: ≥ 80%
- Timeline Engine daily active usage: ≥ 40% of paid users
- Listing Builder usage: ≥ 75% of paid users

### Month 3–6
- Homes sold via platform: 25+
- Average sale time (list to contract): < 21 days
- NPS score: ≥ 60
- Referral rate: ≥ 20% of users refer 1+ person

---

## 9. NON-GOALS (MVP)

These are explicitly out of scope for v1:
- Native mobile app (web-first, mobile-responsive)
- Real-time buyer-seller messaging
- Automated MLS submission (requires brokerage license)
- Mortgage integration
- iBuyer comparison tools
- Live chat support (async only for MVP)

---

## 10. RISKS & MITIGATIONS

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| FSBO.com ships AI features before us | High | Differentiate on ROI Advisor + Timeline depth, not listing tools |
| Users abandon mid-process | Medium | Progress saves, email re-engagement, "pick up where you left off" |
| Legal liability from contract templates | Medium | Attorney review CTA mandatory, prominent disclaimer, ToS language |
| AI generates inaccurate ROI estimates | Medium | Frame as "estimates based on national averages" + user can override |
| Low SEO traction early | Medium | Target long-tail keywords: "how to sell my home without a realtor [state]" |
| State-specific contract complexity | High | Launch with 6 states, expand methodically with attorney review |

---

## 11. OPEN QUESTIONS

1. **Name:** DEED / KEYD / HOLDCLOSE / other — decide before domain purchase
2. **AVM Data:** Use Claude estimates initially vs. integrate Zillow/ATTOM API from day one?
3. **State licensing:** Do we need a real estate license to generate contracts? (Consult attorney)
4. **MLS affiliate:** Which flat-fee MLS providers to approach first? (Houzeo, ListWithFreedom, Beycome)
5. **Launch market:** Utah-first for close-network validation, or national from day one?

---

*Document Owner: Mike Hill / Loam Strategy*
*Last Updated: March 2026*
*Status: Draft — Pre-Build*
