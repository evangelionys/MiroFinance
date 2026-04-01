# MiroFinance Product Document

> AI-Powered Wealth Intelligence Platform
> Version: Demo Prototype v1.0 | Date: March 2026

---

## 1. Product Overview

MiroFinance is an AI-powered wealth intelligence platform that combines advanced reasoning capabilities with institutional-grade portfolio analytics. The platform provides personalized investment recommendations, transparent AI reasoning chains, multi-dimensional risk analysis, and macro intelligence — all unified in a clean, modern interface.

**Target Users:** Individual investors, family offices, wealth managers, and financial advisors.

**Tech Stack:** React 19 + Vite + Tailwind CSS v4 + Recharts + Lucide Icons

---

## 2. Product Architecture

```
MiroFinance
├── Authentication Layer
│   ├── Login (Email + Password)
│   └── Register (Email + Password)
│
├── Portfolio Management Layer
│   ├── Portfolio Creation
│   │   ├── Broker Connection (via Plaid)
│   │   └── Manual Position Input
│   ├── Portfolio Switcher (All / Individual)
│   └── Portfolio CRUD (Create / Edit / Delete)
│
├── 5 Core Modules
│   ├── 1. Command Center (Homepage)
│   ├── 2. Asset Optimizer
│   ├── 3. Macro Intelligence
│   ├── 4. Workspace (Deep Research)
│   └── 5. Alerts
│
├── Symbol Detail Page (per-asset drill-down)
│
└── Global Components
    ├── Sidebar Navigation
    ├── AI Chat Bar (all pages)
    └── Reasoning Chain (shared component)
```

---

## 3. Authentication Flow

### 3.1 Login Page
- **Input:** Email address + Password
- **Features:** Password visibility toggle, "Remember me" checkbox, "Forgot password" link
- **Layout:** Left branding panel (product highlights, key metrics) + Right form panel
- **Post-login:** Routes to Command Center with empty state if no portfolio exists

### 3.2 Register Page
- **Input:** Full name + Email + Password + Confirm password
- **Validation:** Password minimum 8 characters, password match check
- **Layout:** Left panel with 3-step onboarding guide + Right form panel
- **Post-register:** Routes to Command Center with empty state

---

## 4. Portfolio Management

### 4.1 Empty State
When a user has no portfolio, **Command Center** and **Asset Optimizer** display an empty state with two CTAs:
- "Connect Broker" — initiates Plaid flow
- "Enter Manually" — opens manual position input

**Macro Intelligence**, **Workspace**, and **Alerts** are accessible without a portfolio.

### 4.2 Create Portfolio — Broker Connection (Plaid)
| Step | Screen | Description |
|------|--------|-------------|
| 1 | Choose Method | Select "Connect Broker via Plaid" or "Enter Positions Manually" |
| 2 | Broker Selection | Grid of 8 brokers: Robinhood, Charles Schwab, Fidelity, TD Ameritrade, Interactive Brokers, E\*TRADE, Vanguard, Coinbase |
| 3 | Connecting | Loading animation — "Securely syncing your portfolio data via Plaid..." |
| 4 | Success | Confirmation with synced position count and portfolio value |

### 4.3 Create Portfolio — Manual Input
| Field | Type | Description |
|-------|------|-------------|
| Portfolio Name | Text (optional) | User-defined label |
| Symbol | Text (uppercase) | Ticker symbol (e.g., NVDA) |
| Shares | Number | Quantity held |
| Avg Cost ($) | Number | Average cost basis per share |

Users can add/remove position rows dynamically. Manual portfolios can be supplemented later.

### 4.4 Portfolio Switcher (Header Dropdown)
- **"All Portfolios"** — Combined view of all portfolios (default)
- **Individual Portfolios** — Each shows name, type icon (link for Plaid, pen for manual), and type label
- **Inline Edit** — Click pencil icon to rename inline
- **Delete** — Click trash icon to remove (auto-switches to "All" if active portfolio deleted)
- **Create New** — Button at bottom of dropdown

---

## 5. Core Modules

### 5.1 Command Center (Homepage)

The primary dashboard showing portfolio overview and AI-generated investment recommendations.

#### 5.1.1 Portfolio Overview
| Component | Description |
|-----------|-------------|
| **Total Value** | Portfolio total with day change ($) and day change (%) |
| **Allocation Pie Chart** | Donut chart showing weight distribution across holdings |
| **Holdings Table** | Full data table with columns: Symbol, Price, Change, Change%, Weight, Volume, Prev Close, Day Range, 52W Range, Quant Rating, Analyst Rating |

**Clickable Symbols:** Every symbol in the table is clickable, navigating to the **Symbol Detail Page**.

#### 5.1.2 Investment Recommendations (3-5 items)
Each recommendation card includes:
| Field | Description |
|-------|-------------|
| **Urgency Badge** | high (red) / medium (orange) / low (blue) |
| **Source** | Trigger type: Policy Announcement, Fed Minutes, Earnings Report, Technical Analysis |
| **Source Icon** | News / Analysis / Earnings icon |
| **Timestamp** | Relative time (e.g., "2h ago") |
| **Title** | Actionable recommendation headline |
| **Summary** | 1-2 sentence description |
| **Reasoning Chain** | Expandable 5-step AI reasoning (see Section 6) |

#### 5.1.3 Historical Returns & Alpha Attribution
| Component | Description |
|-----------|-------------|
| **Summary Cards** | Total Return, Benchmark (S&P 500), Total Alpha, "View Breakdown" toggle |
| **Monthly Alpha Chart** | Bar chart showing monthly alpha (blue = positive, red = negative) |
| **Alpha Composition Pie** | Donut chart of alpha sources (excluding Market Beta) |
| **4-Dimension Breakdown** | Detailed cards for each alpha category |

**Alpha Categories:**
| Category | Color | Description |
|----------|-------|-------------|
| Market Beta | Gray | Passive market exposure return — not charged |
| Information Alpha | Blue | Edge from earlier signal detection and analysis |
| Execution Alpha | Purple | Value from disciplined execution and timing |
| Tax & Structure Alpha | Cyan | Savings from tax-loss harvesting and structure optimization |

Each category includes specific action attributions (e.g., "Avoided panic selling during March VIX spike (saved ~2.3%)").

---

### 5.2 Asset Optimizer

Portfolio health diagnostics and constraint-based risk management.

#### 5.2.1 Health Score
| Component | Description |
|-----------|-------------|
| **Score Gauge** | Circular gauge showing overall score (X / 5.00) with color coding |
| **Rating Breakdown** | Count of holdings by rating: Strong Buy, Buy, Neutral, Sell, Strong Sell, Not Covered |
| **Individual Scores** | Per-holding score and rating badge |
| **Diagnosis Text** | AI-generated recommendation summary |

#### 5.2.2 Factor Heatmap Table
Color-coded table showing per-holding scores across 5 factor dimensions:
- Valuation
- Growth
- Profitability
- Momentum
- Revisions

Color logic: Green (≥4.0), Yellow (≥3.0), Red (<3.0)

#### 5.2.3 Constraint Parameters (Interactive)
| Constraint | Control | Display |
|------------|---------|---------|
| Max Drawdown Tolerance | Range slider (5%–30%) | Progress bar with current vs. limit |
| Min Cash Flow Ratio | Range slider (5%–30%) | Progress bar with current vs. limit |
| Tech Sector Concentration | Display only | Progress bar (40% cap) |
| Crypto Exposure | Display only | Progress bar (10% cap) |

Bar colors: Green (safe), Yellow (approaching limit), Red (exceeded).

#### 5.2.4 Risk Factors
Expandable risk cards with:
| Field | Description |
|-------|-------------|
| **Title** | Risk description |
| **Severity Badge** | high (red) / medium (orange) |
| **Description** | Detailed risk explanation |
| **Recommended Action** | Highlighted action box with specific steps |

---

### 5.3 Macro Intelligence

Global market overview and AI-identified investment opportunities.

#### 5.3.1 Market Overview (Tab Navigation)
| Tab | Content |
|-----|---------|
| **US** | Indexes (Dow Jones, S&P 500, Nasdaq, Russell 2000 with sparklines) + Commodities (Crude Oil, Gold, Silver, Natural Gas) |
| **Stock** | Table of major stocks (AAPL, AMZN, TSLA, META, NVDA, JPM) with price/change |
| **Crypto** | Cards for Bitcoin, Ethereum, Solana, XRP |
| **Currency** | Cards for EUR/USD, GBP/USD, USD/JPY, USD/CNH |
| **Treasuries** | Cards for US 2Y, 5Y, 10Y, 30Y yield and basis point change |

#### 5.3.2 Opportunities
News-triggered global investment opportunities. Same card format as Command Center recommendations:
- Source + Timestamp
- Title + Summary
- Expandable Reasoning Chain

---

### 5.4 Workspace (Deep Research)

AI-powered deep research interface for custom analysis.

#### 5.4.1 New Research Form
| Field | Description |
|-------|-------------|
| **Target Selector** | Clickable symbol chips from portfolio holdings (optional) |
| **Research Query** | Large textarea for natural language query |
| **Upload Files** | Button to attach local documents |
| **Start Research** | Submit button to initiate AI analysis |

#### 5.4.2 Research History
List of past research tasks with:
| Field | Description |
|-------|-------------|
| **Status Icon** | Completed (green check) / In-progress (blue spinner) |
| **Title** | Research task name |
| **Type Badge** | "Deep Research" (blue) or "Analysis" (green) |
| **Status Badge** | "completed" or "in-progress" |
| **Date** | Completion or creation date |
| **Expandable Summary** | Click to reveal summary and "View Full Report" link |

---

### 5.5 Alerts

Price monitoring and constraint violation notifications.

#### 5.5.1 Notifications
Chronological list of alert events with:
| Field | Description |
|-------|-------------|
| **Severity Icon** | Colored circle icon (red = high, orange = warning, blue = info, green = success) |
| **Symbol/Title** | Price alerts show symbol; constraint alerts show title |
| **Message** | Descriptive notification text |
| **Timestamp** | Relative time |
| **Read Indicator** | Blue dot for unread, left border highlight |

**Alert Types:**
1. **Price Alerts** — triggered when asset price approaches target
2. **Constraint Alerts** — triggered when portfolio metrics violate user constraints

#### 5.5.2 Active Alerts Table
| Column | Description |
|--------|-------------|
| Symbol | Asset ticker (clickable to detail page) |
| Type | "Price" or "Movement" badge |
| Condition | "↓ Below $X" / "↑ Above $X" / "±X% change" |
| Current Price | Latest price |
| Status | Active badge |
| Created | Creation date |

#### 5.5.3 Create Alert Modal
| Field | Description |
|-------|-------------|
| Symbol Search | Text input for stock/token/fund |
| Alert Criteria | Toggle: "Target Price" or "Movement Amount" |
| Target Value | Price target or percentage threshold |
| Notification Platform | Dropdown: In-app + Email + Mobile / In-app only / Email only |
| Default Query | AI prompt to execute when alert triggers |

---

## 6. Symbol Detail Page

Accessed by clicking any symbol across the platform. Layout follows a 2-column design inspired by Perplexity Finance.

### Left Column
| Section | Description |
|---------|-------------|
| **Price Header** | Current price (large), change ($), change (%), after-hours price and change |
| **Price Chart** | Interactive line chart with time range selectors: 1D, 5D, 1M, 6M, YTD, 1Y, 5Y, MAX |
| **Notable Price Movement** | AI-generated summary of recent price drivers |
| **Stories & Analysis** | 2×2 grid of news cards with sentiment dots (green/red) |
| **Latest Developments** | Chronological list of all news with source and timestamp |
| **Key Issues** | Color-coded issue cards (red background for negative, green for positive) |

### Right Column
| Section | Description |
|---------|-------------|
| **Key Statistics** | Symbol, Exchange, Sector, Industry, Prev Close, Open, Day Range, 52W Range, Market Cap, P/E Ratio, Forward P/E, EPS, Dividend, Beta, Volume, Avg Volume, Profit Margin |
| **About** | Company/asset description paragraph |
| **Analyst Consensus** | Consensus rating (Strong Buy/Buy/Hold/Sell), horizontal bar (Buy/Hold/Sell distribution), analyst count, Avg/High/Low price targets |
| **Earnings (Mini)** | Next earnings date, last 4 quarters EPS estimate vs actual with Beat/Miss labels |
| **Peers** | Clickable peer symbol chips |

### Tab Navigation
| Tab | Content |
|-----|---------|
| **Overview** | Full 2-column layout above |
| **Financials** | Annual financial table: Revenue, Net Income, Gross Margin, Operating Margin |
| **Earnings** | EPS bar chart (estimate vs actual), last quarter detail card, next earnings date |
| **Historical Data** | Price table with period-over-period change percentages |
| **Analysis** | Analyst price targets (Low/Avg/Median/High), upside/downside calculation |

### Supported Symbols
NVDA, MSFT, GOOG, TCEHY, MTCH, BTC-USD, XAUUSD (with full data for each)

---

## 7. Global Components

### 7.1 Sidebar Navigation
- MiroFinance logo + brand name
- 5 navigation items with icons and active state highlighting
- Alert badge (unread count) on Alerts item
- "AI Engine Online" status indicator in footer
- Clicking any nav item clears symbol detail view

### 7.2 AI Chat Bar (Bottom, All Pages)
- Sparkle icon + text input placeholder: "Ask AI anything about your portfolio, markets, or research..."
- Paperclip (file attach) button
- Send button
- Helper text: "Conversations are saved to your Workspace for future reference"

### 7.3 Reasoning Chain (Shared Component)
Expandable 5-step visual reasoning chain used in Recommendations and Opportunities:
| Step | Icon | Purpose |
|------|------|---------|
| Signal Detection | Search | What triggered this recommendation |
| Impact Analysis | BarChart | Quantified market/financial impact |
| Portfolio Context | Brain | How it relates to user's holdings |
| Constraint Check | Shield | Compliance with user constraints |
| Recommendation | Lightbulb | Specific actionable advice |

Each step shows as a node on a vertical timeline with detailed explanation text.

---

## 8. Design System

### Color Palette
| Token | Value | Usage |
|-------|-------|-------|
| `primary` | #1e40af | CTAs, active states, links |
| `primary-light` | #3b82f6 | Hover states |
| `primary-50` | #eff6ff | Light backgrounds, badges |
| `green` | #16a34a | Positive values, success states |
| `red` | #dc2626 | Negative values, high severity |
| `orange` | #ea580c | Warnings, medium severity |
| `surface` | #ffffff | Cards, panels |
| `bg` | #f8f9fc | Page background |
| `border` | #e5e7eb | Dividers, card borders |
| `text-primary` | #111827 | Headlines, primary content |
| `text-secondary` | #6b7280 | Body text, descriptions |
| `text-tertiary` | #9ca3af | Labels, timestamps, hints |

### Typography
- Font: Inter (system-ui fallback)
- Headlines: 16-24px, font-bold
- Body: 12-13px, font-medium
- Labels: 10-11px, font-medium

### Component Patterns
- **Cards:** White background, 1px border, 12px border-radius, 20px padding
- **Badges:** Pill shape, colored background + text (green/red/blue/orange variants)
- **Tables:** Zebra hover, sticky headers, right-aligned numbers
- **Charts:** Recharts library, minimal grid, rounded bar corners

---

## 9. File Structure

```
src/
├── main.jsx                          # Entry point
├── App.jsx                           # Root: auth, portfolio state, routing
├── index.css                         # Tailwind config + theme tokens
├── components/
│   ├── Sidebar.jsx                   # Left navigation
│   ├── ChatBar.jsx                   # Bottom AI chat input
│   ├── ReasoningChain.jsx            # Expandable reasoning steps
│   ├── PortfolioSwitcher.jsx         # Header dropdown for portfolio management
│   ├── CreatePortfolioModal.jsx      # Multi-step portfolio creation
│   └── EmptyPortfolio.jsx            # Empty state CTA
├── pages/
│   ├── Login.jsx                     # Authentication - login
│   ├── Register.jsx                  # Authentication - register
│   ├── CommandCenter.jsx             # Module 1: Dashboard
│   ├── AssetOptimizer.jsx            # Module 2: Health & risk
│   ├── MacroIntelligence.jsx         # Module 3: Market data
│   ├── Workspace.jsx                 # Module 4: Deep research
│   ├── Alerts.jsx                    # Module 5: Notifications
│   └── SymbolDetail.jsx              # Per-symbol detail page
└── data/
    ├── mockData.js                   # Portfolio, recommendations, macro data
    └── symbolDetailData.js           # Per-symbol detail data (7 symbols)
```

---

## 10. User Flow Summary

```
[Login/Register]
    │
    ▼
[No Portfolio] ──── Create Portfolio ──── [Plaid Broker] or [Manual Input]
    │                                              │
    ▼                                              ▼
[Command Center] ◄──────────────────── Portfolio Created
    │
    ├── View Holdings Table ── Click Symbol ── [Symbol Detail Page]
    ├── View Recommendations ── Expand Reasoning Chain
    ├── View Alpha Attribution ── Expand Breakdown
    │
    ├── [Asset Optimizer] ── Health Score + Constraints + Risk Factors
    ├── [Macro Intelligence] ── Market Tabs + Opportunities
    ├── [Workspace] ── New Research + History
    └── [Alerts] ── Notifications + Active Alerts + Create Alert
```
