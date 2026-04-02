// ============================================================
// MiroFinance Demo Mock Data
// ============================================================

// --- Portfolio Holdings (Command Center 1.1) ---
export const portfolioSummary = {
  totalValue: 136272.21,
  dayChange: -1391.05,
  dayChangePct: -1.01,
};

export const holdings = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 171.24, change: -7.44, changePct: -4.16, weight: 12.57, volume: '366,191', avgVol: '176.96M', prevClose: 178.68, open: 176.07, dayLow: 171.14, dayHigh: 176.51, w52Low: 86.62, w52High: 212.18, quantRating: 4.2, analystRating: 4.5, wallStreetRating: 4.3 },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 365.97, change: -5.07, changePct: -1.37, weight: 13.43, volume: '67,037', avgVol: '35.12M', prevClose: 371.04, open: 370.82, dayLow: 363.19, dayHigh: 374.72, w52Low: 344.79, w52High: 555.45, quantRating: 3.8, analystRating: 4.6, wallStreetRating: 4.4 },
  { symbol: 'GOOG', name: 'Alphabet Inc', price: 280.74, change: -8.85, changePct: -3.06, weight: 20.60, volume: '26,563', avgVol: '21.62M', prevClose: 289.59, open: 286.19, dayLow: 279.05, dayHigh: 286.52, w52Low: 142.66, w52High: 350.15, quantRating: 4.0, analystRating: 4.3, wallStreetRating: 4.1 },
  { symbol: 'TCEHY', name: 'Tencent Holdings', price: 62.74, change: -1.62, changePct: -2.52, weight: 4.60, volume: '4.75M', avgVol: '3.34M', prevClose: 64.36, open: 63.27, dayLow: 62.58, dayHigh: 63.45, w52Low: 52.30, w52High: 87.68, quantRating: 3.5, analystRating: 3.9, wallStreetRating: 3.7 },
  { symbol: 'MTCH', name: 'Match Group', price: 30.81, change: 0.47, changePct: 1.55, weight: 11.30, volume: '4.25M', avgVol: '5.41M', prevClose: 30.34, open: 30.00, dayLow: 30.00, dayHigh: 31.08, w52Low: 26.39, w52High: 39.20, quantRating: 2.8, analystRating: 3.2, wallStreetRating: 3.0 },
  { symbol: 'BTC-USD', name: 'Bitcoin USD', price: 67830, change: -957.54, changePct: -1.39, weight: 4.98, volume: '304,199', avgVol: '-', prevClose: 68790, open: 68790, dayLow: 67560, dayHigh: 69120, w52Low: 60230, w52High: 126220, quantRating: null, analystRating: null, wallStreetRating: null },
  { symbol: 'XAUUSD', name: 'Gold Spot', price: 4431.38, change: 51.42, changePct: 1.17, weight: 32.52, volume: '-', avgVol: '-', prevClose: 4379.96, open: 4404.88, dayLow: 4375.62, dayHigh: 4475.29, w52Low: 2966.66, w52High: 5608.35, quantRating: null, analystRating: null, wallStreetRating: null },
];

// --- Investment Recommendations (Command Center 1.2) ---
export const recommendations = [
  {
    id: 'rec-1',
    title: 'Consider Reducing NVDA Position Ahead of Export Restrictions',
    urgency: 'high',
    timestamp: '2h ago',
    sourceCount: 4,
    sources: ['Reuters', 'Bloomberg', 'WSJ', 'CNBC'],
    summary: 'New U.S. chip export controls targeting AI accelerators could impact NVIDIA\'s China revenue by 15-20%. Given your 12.57% portfolio weight, consider trimming exposure.',
    tickers: [{ symbol: 'NVDA', price: 171.24, changePct: -4.16 }],
    detail: '## Signal\nU.S. Commerce Department announced expanded export restrictions on advanced AI chips to China and Southeast Asia, effective Q3 2026.\n\n## Impact\nNVIDIA derives ~22% of data center revenue from China. New restrictions could reduce FY2027 revenue guidance by **$4-6B**. Sell-side consensus EPS cut expected at 8-12%.\n\n## Portfolio Context\nYour NVDA position (12.57% weight) creates concentrated sector exposure. Total tech weight: **46.6%**, exceeding your 40% cap.\n\n## Recommendation\nReduce NVDA by 3-5% of portfolio. Reallocate to defensive assets (Gold/Treasuries) to bring tech weight within constraint bounds.',
  },
  {
    id: 'rec-2',
    title: 'Increase Gold Allocation as Macro Hedge',
    urgency: 'medium',
    timestamp: '5h ago',
    sourceCount: 3,
    sources: ['Fed Minutes', 'World Gold Council', 'Bloomberg'],
    summary: 'Fed minutes signal prolonged higher-for-longer stance. Gold shows strong momentum and provides portfolio hedge against stagflation scenario.',
    tickers: [{ symbol: 'XAUUSD', price: 4431.38, changePct: 1.17 }],
    detail: '## Signal\nFOMC minutes revealed hawkish bias with members noting persistent services inflation. Market pricing shifted to expect only 1 rate cut in 2026.\n\n## Impact\nGold historically outperforms in late-cycle/stagflationary environments. Current momentum: **+18% YTD**. Central bank buying at 290 tonnes in Q1.\n\n## Recommendation\nAdd 3-5% gold allocation through physical-backed ETF (GLD). Improves portfolio Sharpe ratio from 1.12 to 1.24.',
  },
  {
    id: 'rec-3',
    title: 'MTCH Earnings Beat — Reassess Hold Rating',
    urgency: 'low',
    timestamp: '1d ago',
    sourceCount: 2,
    sources: ['Seeking Alpha', 'TechCrunch'],
    summary: 'Match Group reported Q1 revenue +8% YoY above consensus. New AI-powered matching features driving user engagement. Quant rating may upgrade.',
    tickers: [{ symbol: 'MTCH', price: 30.81, changePct: 1.55 }],
    detail: '## Signal\nMTCH Q1 2026: Revenue $892M (+8% YoY, beat by $24M). RPP +11%. Monthly active users stabilized at 16.2M.\n\n## Impact\nAI-driven "Vibe Check" feature increased match rates by 22%. Management raised FY2026 guidance to $3.65-3.72B.\n\n## Recommendation\nMaintain current position. Set price alert at $35 for potential profit-taking. If Quant Rating upgrades to Buy, consider adding 2-3%.',
  },
  {
    id: 'rec-4',
    title: 'BTC Approaching Key Support — Monitor for Entry',
    urgency: 'medium',
    timestamp: '8h ago',
    sourceCount: 3,
    sources: ['Glassnode', 'CoinDesk', 'CryptoQuant'],
    summary: 'Bitcoin testing $67K support with declining exchange reserves. On-chain metrics suggest accumulation phase. Watch for bounce confirmation.',
    tickers: [{ symbol: 'BTC-USD', price: 67830, changePct: -1.39 }],
    detail: '## Signal\nBTC exchange reserves hit 2-year low. Long-term holder supply ratio at 78.4%. Realized cap at all-time high.\n\n## Impact\nHistorical pattern: When exchange reserves drop below 2.2M BTC with rising realized cap, median 90-day return is **+34%**.\n\n## Recommendation\nSet limit buy at $65,500 for additional 1-2% allocation. Stop-loss at $58,000.',
  },
  {
    id: 'rec-5',
    title: 'GOOG Antitrust Risk — Consider Partial Hedge',
    urgency: 'medium',
    timestamp: '12h ago',
    sourceCount: 5,
    sources: ['NYT', 'Reuters', 'Bloomberg', 'The Verge', 'WSJ'],
    summary: 'DOJ antitrust ruling could force Google to divest Chrome browser. Potential structural changes may impact advertising revenue moat. GOOG is your largest position at 20.6%.',
    tickers: [{ symbol: 'GOOG', price: 280.74, changePct: -3.06 }, { symbol: 'META', price: 612.45, changePct: -1.80 }],
    detail: '## Signal\nDOJ filed final remedies proposal in US v. Google antitrust case. Potential outcomes include Chrome divestiture, default search agreement restrictions, and data sharing mandates.\n\n## Impact\nChrome divestiture could reduce Google\'s search distribution advantage by 30-40%. Advertising revenue at risk: estimated **$15-20B** annual impact in bear case.\n\n## Portfolio Context\nGOOG is your largest position at 20.6% weight. Combined with MSFT (13.43%), big tech exposure is **34%** of portfolio.\n\n## Recommendation\nConsider protective puts on 30-50% of GOOG position. Alternatively, trim 5% and rotate into META which benefits from Google\'s regulatory constraints.',
  },
];

// --- News & Analysis for Home (portfolio-related) ---
export const homeNewsAnalysis = [
  { id: 'hna-1', category: 'News', title: 'NVIDIA Blackwell Ultra Chips Begin Mass Production in Q3', summary: 'TSMC confirms ramp-up of NVIDIA\'s next-gen Blackwell Ultra chips. Production yield rates above 80%, suggesting strong supply chain execution.', image: '📰', sourceCount: 3, sources: ['Reuters', 'Bloomberg', 'TSMC IR'], time: '1h ago', tickers: [{ symbol: 'NVDA', price: 171.24, changePct: -4.16 }] },
  { id: 'hna-2', category: 'Analysis', title: 'Gold\'s Rally Has Room to Run — Central Bank Demand Structural', summary: 'World Gold Council data shows central bank purchases at record pace. De-dollarization trend and geopolitical hedging create structural demand floor above $4,000/oz.', image: '📊', sourceCount: 2, sources: ['FT', 'World Gold Council'], time: '3h ago', tickers: [{ symbol: 'XAUUSD', price: 4431.38, changePct: 1.17 }] },
  { id: 'hna-3', category: 'News', title: 'Microsoft Azure Q2 Revenue Growth Decelerates to 28%', summary: 'Azure growth slowed from 33% to 28% QoQ. Management attributes to base effects and enterprise spending normalization. Copilot adoption remains strong at 100M+ users.', image: '📰', sourceCount: 4, sources: ['Bloomberg', 'CNBC', 'The Verge', 'Microsoft IR'], time: '5h ago', tickers: [{ symbol: 'MSFT', price: 365.97, changePct: -1.37 }] },
  { id: 'hna-4', category: 'Analysis', title: 'Tencent Gaming Rebound: WeChat Mini-Games Driving Monetization', summary: 'Tencent\'s gaming segment returned to growth with new mobile titles. WeChat ecosystem driving user engagement and in-app purchases across China market.', image: '📊', sourceCount: 2, sources: ['SCMP', 'Niko Partners'], time: '8h ago', tickers: [{ symbol: 'TCEHY', price: 62.74, changePct: -2.52 }] },
  { id: 'hna-5', category: 'News', title: 'Bitcoin ETF Outflows Slow — Institutional Rotation Not Capitulation', summary: 'After 3 weeks of outflows, Bitcoin ETF data shows flows stabilizing. BlackRock\'s IBIT saw $340M inflow, suggesting institutional rotation rather than exit.', image: '📰', sourceCount: 3, sources: ['CoinDesk', 'Bloomberg', 'Glassnode'], time: '12h ago', tickers: [{ symbol: 'BTC-USD', price: 67830, changePct: -1.39 }] },
];

// --- Alpha Returns (Command Center 1.3) ---
export const alphaReturns = {
  totalReturn: 18.4,
  benchmarkReturn: 12.1,
  totalAlpha: 6.3,
  period: 'Last 12 Months',
  breakdown: [
    { category: 'Market Beta', value: 12.1, color: '#94a3b8', description: 'Passive market exposure return — not charged', actions: ['S&P 500 benchmark tracking', 'Broad market participation'] },
    { category: 'Information Alpha', value: 2.8, color: '#3b82f6', description: 'Edge from earlier signal detection and analysis', actions: ['Identified NVDA supply chain recovery 2 weeks before consensus', 'Early detection of MTCH user engagement turnaround via alt data', 'Anticipated gold breakout via central bank flow analysis'] },
    { category: 'Execution Alpha', value: 1.9, color: '#8b5cf6', description: 'Value from disciplined execution and timing', actions: ['Avoided panic selling during March VIX spike (saved ~2.3%)', 'Systematic rebalancing captured mean-reversion in GOOG', 'Limit order optimization saved avg 0.12% per trade'] },
    { category: 'Tax & Structure Alpha', value: 1.6, color: '#06b6d4', description: 'Savings from tax-loss harvesting and structure optimization', actions: ['Tax-loss harvested TCEHY in Q1, saving $18.4K in taxes', 'Deferred NVDA gains via options overlay structure', 'Optimized holding period for long-term capital gains treatment'] },
  ],
  monthlyAlpha: [
    { month: 'Apr', alpha: 0.8 }, { month: 'May', alpha: 0.3 }, { month: 'Jun', alpha: -0.2 },
    { month: 'Jul', alpha: 0.9 }, { month: 'Aug', alpha: 0.5 }, { month: 'Sep', alpha: -0.4 },
    { month: 'Oct', alpha: 1.1 }, { month: 'Nov', alpha: 0.7 }, { month: 'Dec', alpha: 0.4 },
    { month: 'Jan', alpha: 0.6 }, { month: 'Feb', alpha: 0.9 }, { month: 'Mar', alpha: 0.7 },
  ],
};

// --- Health Score (Asset Optimizer 2.1) ---
export const healthScore = {
  overall: 3.36,
  maxScore: 5,
  breakdown: [
    { label: 'Strong Buy', count: 0, color: '#16a34a' },
    { label: 'Buy', count: 1, color: '#22c55e' },
    { label: 'Neutral', count: 3, color: '#eab308' },
    { label: 'Sell', count: 1, color: '#f97316' },
    { label: 'Strong Sell', count: 0, color: '#dc2626' },
    { label: 'Not Covered', count: 2, color: '#9ca3af' },
  ],
  diagnosis: 'Portfolio health is moderate. Consider reviewing MTCH (Quant: Hold) and increasing exposure to higher-rated positions.',
  holdingScores: [
    { symbol: 'NVDA', score: 4.2, rating: 'Buy', factors: { valuation: 3.5, growth: 4.8, profitability: 4.6, momentum: 3.9, revisions: 4.4 } },
    { symbol: 'MSFT', score: 3.8, rating: 'Neutral', factors: { valuation: 3.0, growth: 3.5, profitability: 4.8, momentum: 3.6, revisions: 4.1 } },
    { symbol: 'GOOG', score: 4.0, rating: 'Buy', factors: { valuation: 3.8, growth: 4.0, profitability: 4.5, momentum: 3.7, revisions: 4.0 } },
    { symbol: 'TCEHY', score: 3.5, rating: 'Neutral', factors: { valuation: 3.9, growth: 3.3, profitability: 3.8, momentum: 3.2, revisions: 3.3 } },
    { symbol: 'MTCH', score: 2.8, rating: 'Neutral', factors: { valuation: 3.2, growth: 2.5, profitability: 2.8, momentum: 2.6, revisions: 2.9 } },
    { symbol: 'BTC-USD', score: null, rating: 'N/A', factors: null },
    { symbol: 'XAUUSD', score: null, rating: 'N/A', factors: null },
  ],
};

// --- Constraints & Risk (Asset Optimizer 2.2) ---
export const constraints = {
  riskTolerance: { maxDrawdown: 15, current: 12.8 },
  cashFlowRatio: { minimum: 10, current: 14.2 },
  sectorConcentration: { max: 40, current: 46.6, sector: 'Technology' },
  cryptoExposure: { max: 10, current: 4.98 },
};

export const riskFactors = [
  {
    title: 'Extreme Technology & Semiconductor Concentration Risk',
    severity: 'high',
    description: 'Portfolio is overwhelmingly concentrated in tech and semiconductor exposure. NVDA, MSFT, GOOG, and TCEHY collectively represent ~51% of holdings. A single sector shock could trigger correlated drawdowns exceeding your 15% max drawdown tolerance.',
    action: 'Reduce tech allocation to below 40% by trimming NVDA or GOOG. Redeploy into sectors with low tech correlation such as healthcare, utilities, or consumer staples.',
  },
  {
    title: 'Correlated High-Beta Drawdown Risk',
    severity: 'high',
    description: 'NVDA, GOOG, MSFT, and TCEHY are all high-beta growth assets that move in the same direction under macro stress. With VIX elevated near 26, correlated drawdowns are likely to occur. Simulated stress test shows potential portfolio drawdown of 18.2%.',
    action: 'Add a dedicated low-beta or inverse-correlation hedge, such as adding a position in a broad-based bond ETF (AGG) or a minimum-volatility equity ETF (USMV) targeting at least 10-15% of the portfolio.',
  },
  {
    title: 'Geopolitical & Macro Stagflation Sensitivity',
    severity: 'medium',
    description: 'The portfolio is acutely vulnerable to ongoing U.S.-China trade tensions and stagflationary pressures. TCEHY faces direct regulatory risk, while NVDA and GOOG face indirect export control impacts. Current gold position provides partial hedge.',
    action: 'Consider adding geopolitical hedge via U.S.-China tensions ETF or broadening commodity exposure beyond gold to include energy and agriculture.',
  },
  {
    title: 'Insufficient Fixed Income Allocation',
    severity: 'medium',
    description: 'Zero allocation to bonds or fixed-income instruments. In a rising rate environment, this leaves the portfolio without a traditional safe haven during equity selloffs. The portfolio relies entirely on gold for defensive positioning.',
    action: 'Allocate 10-15% to short-duration treasury bonds or TIPS to provide income and reduce overall portfolio volatility.',
  },
];

// --- Macro Intelligence (3.1) ---
export const macroTabs = {
  US: {
    indexes: [
      { name: 'Dow Jones', value: 45959.43, change: -470.06, changePct: -1.01, sparkline: [46200, 46400, 46100, 46300, 45959] },
      { name: 'S&P 500', value: 6477.13, change: -114.77, changePct: -1.74, sparkline: [6550, 6520, 6490, 6500, 6477] },
      { name: 'Nasdaq', value: 21408.08, change: -521.74, changePct: -2.38, sparkline: [21800, 21700, 21500, 21600, 21408] },
      { name: 'Russell 2000', value: 2198.45, change: -28.33, changePct: -1.27, sparkline: [2230, 2220, 2210, 2205, 2198] },
    ],
    commodities: [
      { name: 'Crude Oil', value: 96.34, change: 1.86, changePct: 1.96 },
      { name: 'Gold', value: 4430.66, change: 50.70, changePct: 1.16 },
      { name: 'Silver', value: 32.15, change: 0.42, changePct: 1.32 },
      { name: 'Natural Gas', value: 2.87, change: -0.05, changePct: -1.71 },
    ],
  },
  Stock: [
    { symbol: 'AAPL', price: 242.56, change: -3.21, changePct: -1.31 },
    { symbol: 'AMZN', price: 218.34, change: -4.56, changePct: -2.05 },
    { symbol: 'TSLA', price: 178.92, change: -8.34, changePct: -4.46 },
    { symbol: 'META', price: 612.45, change: -11.23, changePct: -1.80 },
    { symbol: 'NVDA', price: 171.24, change: -7.44, changePct: -4.16 },
    { symbol: 'JPM', price: 245.67, change: 1.23, changePct: 0.50 },
  ],
  Crypto: [
    { symbol: 'Bitcoin', price: 67720.25, change: -1066.38, changePct: -1.55 },
    { symbol: 'Ethereum', price: 2065.73, change: -52.18, changePct: -2.46 },
    { symbol: 'Solana', price: 186.08, change: -9.72, changePct: -4.96 },
    { symbol: 'XRP', price: 1.16, change: -0.03, changePct: -2.52 },
  ],
  Currency: [
    { pair: 'EUR/USD', value: 1.0842, change: 0.0012, changePct: 0.11 },
    { pair: 'GBP/USD', value: 1.2956, change: -0.0023, changePct: -0.18 },
    { pair: 'USD/JPY', value: 156.78, change: 0.45, changePct: 0.29 },
    { pair: 'USD/CNH', value: 7.2845, change: 0.0134, changePct: 0.18 },
  ],
  Treasuries: [
    { name: 'US 2Y', yield: 4.72, change: 0.03 },
    { name: 'US 5Y', yield: 4.38, change: 0.02 },
    { name: 'US 10Y', yield: 4.52, change: -0.01 },
    { name: 'US 30Y', yield: 4.68, change: -0.02 },
  ],
};

// --- Macro Opportunities (3.2) ---
export const macroOpportunities = [
  {
    id: 'opp-1',
    title: 'European Central Bank Rate Cut Creates Bond Opportunity',
    urgency: 'high',
    timestamp: '3h ago',
    sourceCount: 3,
    sources: ['ECB Press Release', 'Reuters', 'Bloomberg'],
    summary: 'ECB cut rates by 25bps to 3.25%, signaling further easing. European government bonds and rate-sensitive equities poised to benefit.',
    tickers: [{ symbol: 'IEAC', price: 122.45, changePct: 0.85 }],
    detail: '## Signal\nECB cut deposit facility rate to 3.25%. Forward guidance indicates 2-3 more cuts through 2026.\n\n## Impact\nEuropean sovereign yields declining. German 10Y Bund yield fell 8bps to 2.18%.\n\n## Recommendation\nConsider 5-7% allocation to European IG bond ETF (IEAC) or rate-sensitive European equity ETF.',
  },
  {
    id: 'opp-2',
    title: 'India GDP Growth Accelerates — EM Allocation Opportunity',
    urgency: 'medium',
    timestamp: '1d ago',
    sourceCount: 4,
    sources: ['India Statistics Ministry', 'Bloomberg', 'CNBC', 'JPMorgan Research'],
    summary: 'India Q1 GDP growth at 7.8% YoY, exceeding forecasts. Manufacturing PMI at 58.2. Foreign portfolio inflows accelerating.',
    tickers: [{ symbol: 'INDA', price: 58.32, changePct: 2.15 }],
    detail: '## Signal\nIndia GDP growth 7.8% vs 7.2% expected. Manufacturing PMI 58.2 (expansion). FPI inflows $3.2B in March.\n\n## Impact\nNifty 50 up 12% YTD. India weight in MSCI EM index rising to **19.8%** from 16.3%.\n\n## Recommendation\nConsider 3-5% allocation to India-focused ETF (INDA). EM diversification uncorrelated with China tech.',
  },
  {
    id: 'opp-3',
    title: 'Copper Supply Deficit Widening — Commodity Play',
    urgency: 'medium',
    timestamp: '2d ago',
    sourceCount: 3,
    sources: ['ICSG Report', 'LME Data', 'Goldman Sachs Commodities'],
    summary: 'Global copper supply deficit expected to reach 500K tonnes in 2026. EV and AI data center demand driving structural shortage.',
    tickers: [{ symbol: 'COPX', price: 42.85, changePct: 3.22 }, { symbol: 'FCX', price: 52.10, changePct: 2.45 }],
    detail: '## Signal\nGlobal copper deficit of 285K tonnes in H1 2026. LME inventories at 15-year low. Supply response requires 5-7 years.\n\n## Impact\nCopper futures up **22% YTD** to $4.85/lb. Mining equities outperforming S&P 500 by 15%.\n\n## Recommendation\nConsider 2-3% allocation via copper miners ETF (COPX). Adds commodity diversification beyond gold.',
  },
];

// --- Workspace Research History (4) ---
export const researchHistory = [
  { id: 'r-1', title: 'NVDA Export Control Impact Analysis', status: 'completed', date: 'Mar 26, 2026', type: 'deep-research', summary: 'Comprehensive analysis of U.S. chip export restrictions impact on NVIDIA revenue and competitive positioning.' },
  { id: 'r-2', title: 'Gold vs Treasury Hedge Comparison', status: 'completed', date: 'Mar 24, 2026', type: 'deep-research', summary: 'Comparative analysis of gold and treasury bonds as portfolio hedges in current macro environment.' },
  { id: 'r-3', title: 'MTCH AI Feature ROI Assessment', status: 'completed', date: 'Mar 22, 2026', type: 'analysis', summary: 'Assessment of Match Group\'s new AI-powered matching features and their impact on user engagement and monetization.' },
  { id: 'r-4', title: 'Portfolio Tax Optimization Strategy Q2', status: 'in-progress', date: 'Mar 27, 2026', type: 'deep-research', summary: 'Identifying tax-loss harvesting opportunities and optimal holding period strategies for Q2 2026.' },
  { id: 'r-5', title: 'Emerging Market Allocation Review', status: 'completed', date: 'Mar 20, 2026', type: 'analysis', summary: 'Review of EM allocation strategy with focus on India, Vietnam, and Brazil growth trajectories.' },
];

// --- Alerts (5) ---
export const priceAlerts = [
  { id: 'a-1', symbol: 'NVDA', type: 'price', condition: 'below', targetPrice: 165.00, currentPrice: 171.24, status: 'active', createdAt: 'Mar 25, 2026' },
  { id: 'a-2', symbol: 'GOOG', type: 'price', condition: 'above', targetPrice: 300.00, currentPrice: 280.74, status: 'active', createdAt: 'Mar 20, 2026' },
  { id: 'a-3', symbol: 'BTC-USD', type: 'movement', condition: 'change', threshold: 5, currentPrice: 67830, status: 'active', createdAt: 'Mar 22, 2026' },
  { id: 'a-4', symbol: 'MSFT', type: 'price', condition: 'below', targetPrice: 350.00, currentPrice: 365.97, status: 'active', createdAt: 'Mar 18, 2026' },
];

export const alertNotifications = [
  { id: 'n-1', type: 'price', symbol: 'NVDA', message: 'NVDA dropped 4.16% today to $171.24, approaching your $165.00 alert target.', timestamp: '2h ago', read: false, severity: 'warning' },
  { id: 'n-2', type: 'constraint', title: 'Sector Concentration Warning', message: 'Technology sector weight (46.6%) exceeds your 40% maximum constraint. Consider rebalancing.', timestamp: '5h ago', read: false, severity: 'high' },
  { id: 'n-3', type: 'constraint', title: 'Drawdown Approaching Limit', message: 'Simulated max drawdown (12.8%) is within 2.2% of your 15% tolerance. Portfolio stress test triggered.', timestamp: '1d ago', read: true, severity: 'warning' },
  { id: 'n-4', type: 'price', symbol: 'GOOG', message: 'GOOG fell 3.06% today. Now 6.4% below your $300 target alert.', timestamp: '3h ago', read: false, severity: 'info' },
  { id: 'n-5', type: 'price', symbol: 'BTC-USD', message: 'BTC-USD daily movement of -1.39%. Within normal range of your 5% movement alert.', timestamp: '6h ago', read: true, severity: 'info' },
  { id: 'n-6', type: 'constraint', title: 'Cash Flow Ratio Healthy', message: 'Flexible cash flow ratio at 14.2%, well above your 10% minimum requirement.', timestamp: '1d ago', read: true, severity: 'success' },
];
