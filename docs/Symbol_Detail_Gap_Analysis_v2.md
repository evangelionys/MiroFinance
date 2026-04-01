# Symbol 详情页数据项对比分析 v2

> 以 MiroFinance 现有结构为分析框架
> 对比: Perplexity Finance (PPX) / Seeking Alpha (SA) / Yahoo Finance (YF)
> 日期: 2026年3月

---

## 分析框架说明

以 MiroFinance Symbol 详情页的 **5 个 Tab + 右侧栏** 结构为骨架，逐一比对每个区块中的数据项在 4 个平台的覆盖情况。

标记说明:
- ✅ = 该平台有此数据项
- ❌ = 该平台无此数据项
- 🟡 = 有类似功能但形式不同

---

## 一、页面头部

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 公司名称 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 股票代码 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 交易所 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 当前价格 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 涨跌额 ($) | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 涨跌幅 (%) | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 盘后/盘前价格 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 更新时间戳 | ❌ | ✅ | ✅ | ✅ | **MiroFinance 缺失** — 三家竞品均显示 |
| 关注/加入自选 按钮 | ❌ | ✅ | ✅ | ✅ | **MiroFinance 缺失** — 三家竞品均有 |
| 加入组合 按钮 | ❌ | ❌ | ❌ | ✅ | YF 独有 |

---

## 二、Overview Tab — 左栏

### 2.1 价格走势图

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 折线图 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 成交量柱状图 | ✅ | ✅ | ✅ | ✅ | 四平台共有（v2新增） |
| OHLCV 悬停提示 | ✅ | ✅ | 🟡 | ✅ | 四平台共有（v2新增）；SA为简化版 |
| 时间范围选择器 (1D-MAX) | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| K线/蜡烛图 | ❌ | ✅ | ✅ | ✅ | **MiroFinance 缺失** — 三家竞品均有 |
| 技术指标 (SMA/EMA/MACD/RSI) | ❌ | ✅ | ✅ | ✅ | **MiroFinance 缺失** — 三家竞品均有 |
| 标的对比叠加 | ❌ | ✅ | ✅ | ✅ | **MiroFinance 缺失** — 三家竞品均有 |
| 图表类型切换 (线/K线/面积) | ❌ | ✅ | ❌ | ✅ | PPX + YF 有 |
| 画线工具 | ❌ | ❌ | ❌ | ✅ | YF 独有 |
| 全屏模式 | ❌ | ❌ | ❌ | ✅ | YF 独有 |
| 时间间隔选择 (1m/5m/15m/1h) | ❌ | ❌ | ❌ | ✅ | YF 独有 |

### 2.2 Notable Price Movement

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| AI 生成的价格驱动摘要 | ✅ | ✅ | ❌ | ❌ | **MiroFinance + PPX 共有**，SA/YF 无 |

### 2.3 Stories & Analysis

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 新闻卡片网格 | ✅ | 🟡 | 🟡 | 🟡 | MiroFinance 2×2 网格独特；竞品用列表 |
| 新闻标题 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 新闻来源 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 时间戳 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 情绪标注 (正/负/中) | ✅ | ❌ | ❌ | ❌ | **MiroFinance 独有** |
| 新闻缩略图 | ❌ | ❌ | 🟡 | ✅ | YF 有缩略图；SA 文章有头图 |
| 新闻摘要/片段 | ❌ | ✅ | 🟡 | ✅ | PPX + YF 有摘要文本 |

### 2.4 Latest Developments

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 按时间排序的新闻列表 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| "View all" 链接 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 新闻类型筛选器 | ❌ | ❌ | ✅ | ❌ | SA 独有（可按 Earnings/M&A/SEC 等筛选） |

### 2.5 Key Issues

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 正/负面议题颜色编码卡片 | ✅ | 🟡 | 🟡 | ❌ | MiroFinance 红/绿色块；PPX 有 Key Issues + Bull/Bear；SA 有 Bulls Say / Bears Say |
| AI 生成的影响评论 | ✅ | ✅ | ❌ | ❌ | MiroFinance + PPX 共有 |

---

## 三、Overview Tab — 右栏

### 3.1 Key Statistics

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| Symbol | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Exchange | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Sector | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Industry | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Prev Close | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Open | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Day Range | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 52W Range | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Market Cap | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| P/E Ratio (TTM) | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Forward P/E | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| PEG Ratio | ✅ | ✅ | ✅ | ✅ | 四平台共有（v2新增） |
| Price/Sales | ✅ | ✅ | ✅ | ✅ | 四平台共有（v2新增） |
| EPS (TTM) | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Dividend & Yield | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Beta | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Volume | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Avg Volume | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Shares Outstanding | ✅ | ❌ | ✅ | ✅ | MiroFinance + SA + YF（v2新增渲染） |
| Revenue/Share | ✅ | ❌ | ❌ | ✅ | MiroFinance + YF（v2新增渲染） |
| Profit Margin | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Bid / Ask | ❌ | ❌ | ❌ | ✅ | YF 独有 |
| Price/Book | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| EV/EBITDA | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| EV/Revenue | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| Enterprise Value | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| Short Interest / Short % | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| Ex-Dividend Date | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| 1Y Target Estimate | ❌ | ❌ | ❌ | ✅ | YF 独有（Summary 内联） |
| 50日/200日均线 | ❌ | ❌ | ❌ | ✅ | YF 独有 |
| Return on Equity (ROE) | ❌ | ❌ | ✅ | ✅ | SA + YF 有 |
| Return on Assets (ROA) | ❌ | ❌ | ✅ | ✅ | SA + YF 有 |
| Quarterly Revenue Growth | ❌ | ❌ | ❌ | ✅ | YF 独有 |
| Float / Insider % / Institution % | ❌ | ❌ | ✅ | ✅ | SA + YF 有 |

### 3.2 About + 公司信息

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 公司描述段落 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| CEO | ✅ | ✅ | ❌ | ✅ | MiroFinance + PPX + YF（v2新增） |
| 员工数量 | ✅ | ✅ | ❌ | ✅ | MiroFinance + PPX + YF（v2新增） |
| 成立年份 | ❌ | ✅ | ❌ | ❌ | PPX 独有 |
| 公司官网链接 | ❌ | ❌ | ❌ | ✅ | YF 独有 |

### 3.3 Analyst Consensus

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 共识评级标签 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 分析师总数 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Buy/Hold/Sell 分布 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 目标价 (Avg/High/Low) | ✅ | ✅ | ✅ | 🟡 | MiroFinance + PPX + SA 完整；YF 仅显示均值 |
| 目标价 (Median) | ✅ | ❌ | ✅ | ❌ | MiroFinance + SA |
| 评级月度趋势变化 | ❌ | ❌ | ❌ | ✅ | YF 独有（近4月趋势） |
| 量化评级 (Quant Rating) | ❌ | ❌ | ✅ | ❌ | SA 独有 |
| 作者评级 (SA Authors) | ❌ | ❌ | ✅ | ❌ | SA 独有 |
| 五因子评分 (A-F) | ❌ | ❌ | ✅ | ❌ | SA 独有 |
| 公允价值估算 | ❌ | ❌ | ❌ | ✅ | YF 独有 (Morningstar) |

### 3.4 Earnings (迷你侧边栏)

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 下次财报日期 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 近4季 EPS 预估 vs 实际 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Beat/Miss 标签 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |

### 3.5 Top Holders

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 机构持仓排名 | ✅ | ✅ | ❌ | ✅ | MiroFinance + PPX + YF（v2新增） |
| 持仓名称 + 比例 | ✅ | ✅ | ❌ | ✅ | 同上 |
| 持仓股数 + 市值 | ❌ | ❌ | ❌ | ✅ | YF 独有（更详细） |
| 共同基金持仓 | ❌ | ❌ | ❌ | ✅ | YF 独有 |
| 内部人交易 | ❌ | ✅ | ❌ | ✅ | PPX + YF 有 |
| 国会议员交易 | ❌ | ✅ | ❌ | ❌ | PPX 独有 |
| Insider/Institution 持股比例 | ❌ | ❌ | ❌ | ✅ | YF 独有 |

### 3.6 Peers

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 同行业标的芯片列表 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| 同行价格 + 涨跌 | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 显示同行价格 |
| 多维对比表 | ❌ | ❌ | ✅ | ❌ | SA 独有（最多6标的并排对比） |

---

## 四、Financials Tab

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| Income Statement | ✅ | ✅ | ✅ | ✅ | 四平台共有（v2升级为完整） |
| Balance Sheet | ✅ | ✅ | ✅ | ✅ | 四平台共有（v2新增） |
| Cash Flow | ✅ | ✅ | ✅ | ✅ | 四平台共有（v2新增） |
| Annual / Quarterly 切换 | ✅ | ✅ | ✅ | ✅ | 四平台共有（v2新增） |
| Revenue | ✅ | ✅ | ✅ | ✅ | |
| Cost of Revenue | ✅ | ✅ | ✅ | ✅ | |
| Gross Profit | ✅ | ✅ | ✅ | ✅ | |
| Operating Expenses | ✅ | ✅ | ✅ | ✅ | |
| Operating Income | ✅ | ✅ | ✅ | ✅ | |
| Net Income | ✅ | ✅ | ✅ | ✅ | |
| EBITDA | ✅ | ✅ | ✅ | ✅ | |
| EPS | ✅ | ✅ | ✅ | ✅ | |
| Total Assets | ✅ | ✅ | ✅ | ✅ | |
| Total Liabilities | ✅ | ✅ | ✅ | ✅ | |
| Total Equity | ✅ | ✅ | ✅ | ✅ | |
| Cash & Equivalents | ✅ | ✅ | ✅ | ✅ | |
| Total Debt | ✅ | ✅ | ✅ | ✅ | |
| Current Ratio | ✅ | ❌ | ✅ | ✅ | |
| Operating Cash Flow | ✅ | ✅ | ✅ | ✅ | |
| CapEx | ✅ | ✅ | ✅ | ✅ | |
| Free Cash Flow | ✅ | ✅ | ✅ | ✅ | |
| TTM by Quarter 视图 | ❌ | ❌ | ✅ | ❌ | SA 独有 |
| Common Size (% of Revenue) | ❌ | ❌ | ✅ | ❌ | SA 独有 |
| 10年历史数据 | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA有10年, YF有4-5年 |
| 数据导出 (CSV/Excel/PDF) | ❌ | ✅ | ✅ | ✅ | **MiroFinance 缺失** — 三家竞品均有 |
| 行项 hover 迷你图 | ❌ | ❌ | ✅ | ❌ | SA 独有 |
| R&D / SG&A 明细 | ❌ | ❌ | ✅ | ✅ | SA + YF 有更多明细行 |

---

## 五、Earnings Tab

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| EPS Estimate vs Actual 柱状图 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Revenue Estimate vs Actual 表格 | ✅ | ✅ | ✅ | ✅ | 四平台共有（v2新增） |
| 下次财报日期 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Surprise % | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| EPS 修正趋势 (7d/30d/60d/90d) | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| Revenue 修正趋势 | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| 未来预估 (当季/次季/当年/次年) | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| 增长预估 (5Y CAGR) | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| 财报电话会议转录 | ❌ | ✅ | ✅ | ❌ | PPX + SA 有 |
| 财报电话 AI 实时摘要 | ❌ | ✅ | ❌ | ❌ | PPX 独有 |
| 财报电话音频回放 | ❌ | ❌ | ✅ | ❌ | SA 独有 |

---

## 六、Historical Data Tab

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| Date 列 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Open 列 | ✅ | ✅ | ❌ | ✅ | v2 新增 |
| High 列 | ✅ | ✅ | ❌ | ✅ | v2 新增 |
| Low 列 | ✅ | ✅ | ❌ | ✅ | v2 新增 |
| Close 列 | ✅ | ✅ | ✅ | ✅ | 四平台共有 |
| Volume 列 | ✅ | ✅ | ❌ | ✅ | v2 新增 |
| Change % 列 | ✅ | ❌ | ❌ | ❌ | MiroFinance 独有 |
| Adj Close 列 | ❌ | ❌ | ❌ | ✅ | YF 独有 |
| 日期范围筛选 | ❌ | ✅ | ❌ | ✅ | **MiroFinance 缺失** — PPX + YF 有 |
| 日/周/月频率切换 | ❌ | ❌ | ❌ | ✅ | YF 独有 |
| CSV 下载 | ❌ | ✅ | ❌ | ✅ | **MiroFinance 缺失** — PPX + YF 有 |
| 股息/拆分筛选 | ❌ | ❌ | ❌ | ✅ | YF 独有 |

---

## 七、Analysis Tab

| MiroFinance 数据项 | MiroFinance | PPX | SA | YF | 备注 |
|-------------------|:---:|:---:|:---:|:---:|------|
| 目标价 Low/Avg/Median/High | ✅ | ✅ | ✅ | 🟡 | MiroFinance 最完整 |
| Upside/Downside 计算 | ✅ | 🟡 | ✅ | ❌ | MiroFinance + SA |
| 增长预估表 (当季/当年/5Y) | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| 与行业/板块/SPX对比 | ❌ | ❌ | ✅ | ✅ | **MiroFinance 缺失** — SA + YF 有 |
| 估值指标详细表 | ❌ | ❌ | ✅ | ✅ | SA 有估值 Tab + YF 有 Key Statistics |
| 动量/表现归因 | ❌ | ❌ | ✅ | ❌ | SA 独有 (Momentum Tab) |

---

## 八、MiroFinance 无对应 Tab 但竞品有的模块

| 竞品模块 | PPX | SA | YF | 建议 |
|---------|:---:|:---:|:---:|------|
| **Options 期权链** | ❌ | ❌ | ✅ | YF 独有，专业需求 |
| **ESG/可持续发展评分** | ❌ | ❌ | ✅ | YF 独有 |
| **Dividends 独立 Tab** | ❌ | ✅ | 🟡 | SA 独有（含4维股息评级） |
| **Valuation 独立 Tab** | ❌ | ✅ | ❌ | SA 独有（含估值 A-F 评级） |
| **Growth 独立 Tab** | ❌ | ✅ | ❌ | SA 独有 |
| **Profitability 独立 Tab** | ❌ | ✅ | ❌ | SA 独有 |
| **Momentum 独立 Tab** | ❌ | ✅ | ❌ | SA 独有 |
| **SEC Filings / 公告** | ✅ (PPX) | ❌ | ❌ | PPX 独有（含 AI 摘要） |
| **社区讨论** | ❌ | 🟡 | ✅ | YF Conversations / SA Analysis 评论 |
| **AI 对话式研究** | ❌ | ❌ | ❌ | PPX 独有（详情页内嵌 AI 对话） |
| **Perplexity Tasks 定时研究** | ❌ | ❌ | ❌ | PPX 独有 |
| **国会议员交易** | ❌ | ❌ | ❌ | PPX 独有 |

---

## 九、汇总统计

### MiroFinance 当前覆盖率

| 类别 | MiroFinance 有 | 三家竞品共有但MiroFinance缺失 | 仅部分竞品有 |
|------|:---:|:---:|:---:|
| 页面头部 | 7 项 | **2 项**（时间戳、关注按钮） | 1 |
| 图表 | 4 项 | **3 项**（K线、技术指标、标的对比） | 3 |
| Key Stats | 21 项 | **0 项** | 10+ |
| About | 4 项 | 0 项 | 1 |
| Analyst | 6 项 | 0 项 | 5 |
| Earnings | 4 项 | **0 项**（核心已覆盖） | 5 |
| Financials | 21 项 | **1 项**（数据导出） | 4 |
| Historical | 7 项 | **0 项** | 3 |
| Analysis | 2 项 | 0 项 | 3 |
| **总计** | **76 项** | **6 项** | 35+ |

### 三家竞品均有但 MiroFinance 仍缺失的 6 项

| # | 数据项 | 优先级 | 说明 |
|---|--------|--------|------|
| 1 | 更新时间戳 | P0 | 价格头部显示最后更新时间 |
| 2 | 关注/加入自选按钮 | P0 | 在标的页一键加入 Watchlist |
| 3 | K线/蜡烛图 | P1 | 图表类型切换 |
| 4 | 技术指标 (SMA/EMA) | P1 | 至少提供基础均线叠加 |
| 5 | 标的对比叠加 | P1 | 多标的走势对比 |
| 6 | 数据导出 (CSV) | P1 | 财务/历史数据下载 |

### MiroFinance 独有优势（竞品均无）

| # | 数据项 | 说明 |
|---|--------|------|
| 1 | 新闻情绪标注 | 每条新闻 positive/negative/neutral 彩色圆点 |
| 2 | Stories & Analysis 2×2 网格 | 独特的卡片式新闻布局 |
| 3 | Historical Change % 列 | 历史数据中计算并显示环比变化率 |
| 4 | 与投资组合联动 | 详情页数据与用户 Portfolio 约束直接关联 |
| 5 | 推理链白盒 | 5 步透明推理，从信号到建议 |
| 6 | 个性化投资建议 | 基于持仓 + 约束条件的定制建议 |
