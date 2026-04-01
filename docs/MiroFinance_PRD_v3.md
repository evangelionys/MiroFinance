# MiroFinance 产品需求文档 (PRD)

> 版本: v3.0 | 日期: 2026年4月1日
> AI 驱动的智能财富管理平台

---

## 一、产品架构

```
MiroFinance
├── 认证层（Login / Register）
├── 投资组合管理层（Plaid 绑定 / 手动输入 / 切换 / 增删改）
├── 4 大核心 Tab
│   ├── Home（首页仪表盘）
│   ├── Markets（宏观情报）
│   ├── Research（深度研究 + 选股器）
│   └── Notifications（预警通知）
├── Symbol 详情页（标的下钻分析）
└── 全局组件
    ├── 侧边导航栏（含 Research History + 用户账号）
    └── AI 对话输入框（Research Tab 除外）
```

---

## 二、认证模块

### 2.1 登录页 (Login)

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 左侧品牌面板 | 展示产品亮点（lg 以上显示），含 3 项核心指标卡片 | — |
| 邮箱输入框 | Mail 图标，placeholder: "you@example.com" | — |
| 密码输入框 | Lock 图标，点击 Eye 图标切换密码可见性 | — |
| "记住我" 复选框 | 记忆登录状态 | — |
| "忘记密码" 链接 | 点击跳转（Demo 中无实际功能） | — |
| "Sign In" 按钮 | 提交 → 800ms 加载动画 → 设置 user 状态 → 跳转 Home | — |
| "Create account" 链接 | 切换到注册页 | — |
| 错误提示 | 红色横幅显示在表单上方 | — |

### 2.2 注册页 (Register)

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 左侧 3 步引导面板 | 展示注册流程（lg 以上显示） | — |
| 姓名输入框 | User 图标，必填 | — |
| 邮箱输入框 | Mail 图标，必填 | — |
| 密码输入框 | Lock 图标，placeholder: "Letters + numbers, min 8 chars" | — |
| 确认密码输入框 | Lock 图标，必填 | — |
| 密码校验规则 | ≥8 位 + 必须同时含字母和数字 + 两次一致 | — |
| "Create Account" 按钮 | 校验 → 800ms 延迟 → 设置 user 状态 | — |

---

## 三、投资组合管理模块

### 3.1 空状态 (EmptyPortfolio)

| 元素 | 交互逻辑 |
|------|---------|
| Briefcase 图标 + "No Portfolio Yet" 标题 | 居中展示 |
| "Connect Broker" 按钮 | **直接**打开 CreatePortfolioModal（plaid 模式），跳过选择步骤 |
| "Enter Manually" 按钮 | **直接**打开 CreatePortfolioModal（manual 模式） |

> 仅 Home 和需要组合的页面展示空状态；Markets、Research、Notifications 无需组合即可访问。

### 3.2 创建投资组合 — 券商绑定 (Plaid)
**参考竞品: Plaid Link**

| 步骤 | 元素 | 交互逻辑 |
|------|------|---------|
| 1 | 券商搜索框 | 输入关键词实时过滤，12 个预置券商 |
| 2 | 券商网格 (2列) | 点击选中高亮，选中后 Connect 按钮激活 |
| 3 | 连接加载页 | 2s 加载动画，自动推进到成功页 |
| 4 | 成功确认页 | 显示同步持仓数 + 组合价值，点击 Done 完成 |

> 自动以券商名称命名（如 "Robinhood Portfolio"），无需手动输入名称。

### 3.3 创建投资组合 — 手动输入
**参考竞品: Seeking Alpha Portfolio 添加持仓**

| 步骤 | 元素 | 交互逻辑 |
|------|------|---------|
| 1 | 组合名称输入（可选） | 默认 "Manual Portfolio" |
| 2 | 标的搜索框 | 输入名称/代码，下拉匹配（25 个预置标的，最多显示 10 条） |
| 3 | Lot 录入表单 | 选择标的后弹出：Shares / Avg Cost（自动填充当日价格）/ Date / Buy or Sell |
| 4 | 已添加持仓列表 | 以卡片展示，可删除 |
| 5 | "Create Portfolio" 按钮 | 至少 1 个 Lot 后激活 |

### 3.4 投资组合切换器 (PortfolioSwitcher)

| 元素 | 交互逻辑 |
|------|---------|
| 下拉触发按钮 | 显示当前组合名称 + 展开箭头 |
| "All Portfolios" 选项 | 总账户视图（默认） |
| 单个组合行 | 名称 + 类型图标（Link2=Plaid / PenLine=手动） |
| 铅笔图标 | 行内编辑 → 输入框 → Enter 保存 / Escape 取消 |
| 垃圾桶图标 | 删除组合（若删除当前激活则切回 All） |
| "+ Create New Portfolio" | 打开创建弹窗 |

> 仅在 Home Tab 内展示，不在顶部 header 中。

---

## 四、Home Tab (CommandCenter)

### 4.1 持仓概览

#### 配置饼图
| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 环形图 (Donut) | 7 色循环，展示各标的权重占比 | Seeking Alpha Portfolio |
| 饼图扇区 | **点击跳转 Symbol 详情页** | — |
| 图例 | 下方彩点 + Symbol + 百分比 | — |

#### 健康评分 (Portfolio Health)
| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 圆环仪表盘 | 0-5 分，颜色：红 <3 / 黄 3-4 / 绿 4+ | **Seeking Alpha Health Score** |
| 评级分布 | Buy/Neutral/Sell/Not Covered 各计数 | **Seeking Alpha** |
| 诊断文本 | AI 生成的优化建议摘要 | — |

#### 持仓明细表
| 列 | 说明 | 参考竞品 |
|----|------|---------|
| Symbol | 可点击跳转详情页，含公司名称副标题 | **Seeking Alpha Portfolio Summary** |
| Price | 当前价格 | Seeking Alpha |
| Change | 涨跌额，红/绿 | Seeking Alpha |
| Change % | 涨跌幅，红/绿 | Seeking Alpha |
| Volume | 成交量 | Seeking Alpha |
| Open | 开盘价 | Seeking Alpha |
| Prev Close | 前收盘价 | Seeking Alpha |
| Day Range | 日内区间 | Seeking Alpha |
| 52W Range | 52 周区间 | Seeking Alpha |
| Rating | Quant + Analyst 合并均值，颜色徽标 | **Seeking Alpha Quant Rating** |

### 4.2 Investment Recommendations

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 数量 | **5 条**推荐 | — |
| 紧急程度徽标 | high (红) / medium (橙) / low (蓝) | — |
| "X sources" 文字 | 点击展开/收起来源列表（标签芯片） | — |
| 时间戳 | 相对时间（如 "2h ago"） | — |
| 标题 | 14px 加粗 | — |
| 摘要 | 12px 描述文本 | — |
| **Symbol 标签 tag** | 含标的代码 + 当日价格 + 涨跌箭头，**点击跳转详情页** | **MiroFinance 独有** |
| 展开箭头 (↓) | 点击展开投资推荐原因（**Markdown 文本**，含 ## 标题和 **加粗**） | — |
| "View History →" 按钮 | 模块底部，打开完整历史列表 | — |

### 4.3 News & Analysis

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 数量 | **5 条**新闻/分析（与用户持仓相关） | — |
| 筛选标签 | All / News / Analysis 三选一 | — |
| 类别徽标 | News (蓝) / Analysis (橙) | — |
| 来源 + 时间 | 10px 灰色文字 | — |
| 标题 + 摘要 | 13px 标题 + 11px 摘要 | — |
| 标的芯片 | **点击跳转 Symbol 详情页** | — |
| "View History →" 按钮 | 模块底部，打开完整历史列表 | — |

### 4.4 Risk Factors

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 2 列网格卡片 | 4 条风险因子 | **Perplexity Finance Risk Factors** |
| 严重程度徽标 | high (红) / medium (橙) | Perplexity Finance |
| 展开/收起箭头 | 点击展开详细描述 + 推荐操作（蓝底高亮框） | Perplexity Finance |

### 4.5 Historical Returns & Alpha Attribution

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 4 张概览卡片 | Total Return / Benchmark / Total Alpha / View Breakdown | — |
| **日度 Performance 折线图** | 3 条曲线：Portfolio (蓝) + S&P 500 Benchmark (灰虚线) + Alpha (绿) | **MiroFinance 独有** |
| "View Alpha Breakdown" 按钮 | 切换显示 Alpha 饼图 + 4 维拆解卡片 | — |
| Alpha 4 维拆解 | Market Beta / Information Alpha / Execution Alpha / Tax & Structure Alpha，每类含具体动作归因 | **MiroFinance 独有** |

---

## 五、Markets Tab (MacroIntelligence)

**布局: 双栏（左 1fr + 右 340px）**

### 5.1 左栏 — 市场概览
**参考竞品: Yahoo Finance 首页 Tab 导航**

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| Tab 导航 | US Markets / Crypto / Rates / Commodities / Currencies | **Yahoo Finance** |
| 横向滚动卡片 | 每个标的含名称 + Symbol + 价格 + 涨跌% + 迷你走势图 | **Yahoo Finance** |

**各 Tab 标的（与 Yahoo Finance 一致）:**

| Tab | 标的 |
|-----|------|
| US Markets | S&P Futures, Dow Futures, Nasdaq Futures, Russell 2000 Futures, VIX, Gold, Bitcoin USD, CBOE 10Y T-Note |
| Crypto | Bitcoin, XRP, Ethereum, Tether USDt, BNB, Solana, Dogecoin |
| Rates | 13-Wk Bond, 5-Yr Bond, 10-Yr Bond, 30-Yr Bond, 2Y/10Y T-Note Futures, iShares 20+ Treasury Bond ETF |
| Commodities | Crude Oil, Gold, Silver, Copper, Natural Gas, Brent Crude, Platinum |
| Currencies | EUR/USD, USD/JPY, USD/GBP, USD/AUD, USD/CAD, USD/MXN, USD/HKD |

### 5.2 左栏 — Opportunities

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 卡片格式 | **与 Home Investment Recommendations 完全一致** | — |
| 紧急程度 + sources + 标题 + 摘要 + Symbol tags + 展开详情 | 同 Home 格式 | — |
| 无限瀑布流 | "Scroll for more opportunities..." 提示 | — |

### 5.3 左栏 — News & Analysis

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 格式 | **与 Home News & Analysis 一致**，但无 "View History" 按钮 | — |
| 筛选标签 | All / News / Research / Analysis（4 个） | — |
| 10 条聚合内容 | 含 emoji 图标 + 类别徽标 + 来源时间 + 标题摘要 + 标的芯片 | — |
| 展示方式 | **无限瀑布流列表** | — |

### 5.4 右栏 — Watchlist
**参考竞品: Perplexity Finance Watchlist**

| 元素 | 交互逻辑 |
|------|---------|
| 彩色圆形头像 | 每个标的独立颜色 |
| 名称 + 标签 + 价格 + 涨跌% | Perplexity Finance 格式 |
| 分页控件 | ← 1/2 → |

### 5.5 右栏 — Top Gainers / Losers / Active
**参考竞品: Perplexity Finance**

| 元素 | 交互逻辑 |
|------|---------|
| 3 个 Tab | Gainers / Losers / Active 切换 |
| 每行 | 灰色头像 + 名称 + Symbol · Exchange + 价格 + 涨跌% |
| "See all >" 链接 | 底部 |

### 5.6 右栏 — Equity Sectors
**参考竞品: Perplexity Finance Equity Sectors**

| 元素 | 交互逻辑 |
|------|---------|
| 11 个行业 | Technology / Energy / Consumer Cyclical / Consumer Defensive / Communication Services / Industrials / Financial Services / Utilities / Basic Materials / Real Estate / Healthcare |
| 每行 | 行业名 + 价格 + ↗/↘ 涨跌徽标（红/绿背景） |

---

## 六、Research Tab (Workspace)

### 6.1 Deep Research

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 大文本输入框 (136px 高) | 自然语言输入研究查询 | **Perplexity AI Deep Research** |
| "Upload files or images" 按钮 | 附加本地文档/图片 | — |
| "Start Research" 按钮 | 提交启动 AI 研究 | — |

> Research Tab **不显示**底部 ChatBar（已在代码中条件隐藏）。

### 6.2 Stock Screener

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 搜索输入框 + "Screen" 按钮 | 自然语言描述选股条件 | — |
| 4 个快捷提示词 | 一键填入预设查询 | — |
| AI Screening Summary | 蓝底卡片，Sparkles 图标，AI 解释筛选逻辑 | **MiroFinance 独有** |
| 结果表格 | **13 列**（对齐截图格式） | **Yahoo Finance Screener** |

**Screening Results 表格列:**

| # | 列名 | 说明 |
|---|------|------|
| 1 | # | 排名序号 |
| 2 | Symbol | 加粗，可点击跳转详情页 |
| 3 | Name | 公司名称（截断） |
| 4 | Price (Intraday) | 当前价格 |
| 5 | Change | 涨跌额，红/绿 |
| 6 | Change % | 涨跌幅，红/绿 |
| 7 | Volume | 成交量 |
| 8 | Avg Vol (3M) | 3 个月平均成交量 |
| 9 | Market Cap | 市值 |
| 10 | P/E (TTM) | 市盈率 |
| 11 | 52 Week Range | 含进度条可视化 |
| 12 | Region | 地区（如 US） |
| 13 | Sector | 行业板块 |

---

## 七、Notifications Tab (Alerts)

### 7.1 通知列表

| 元素 | 交互逻辑 |
|------|---------|
| 严重程度图标 | 红色圆=high / 橙色=warning / 蓝色=info / 绿色=success |
| 未读标记 | 蓝色左侧边框 + 蓝色圆点 |
| 标的/标题 + 消息 + 时间戳 | 预警类型区分：价格预警显示 Symbol，约束预警显示标题 |

### 7.2 Active Alerts 表格

| 列 | 说明 |
|----|------|
| Symbol | 可点击跳转详情页 |
| Type | Price / Movement 徽标 |
| Condition | ↓ Below $X / ↑ Above $X / ±X% |
| Current Price | 当前价格 |
| Status | Active 绿色徽标 |
| Created | 创建日期 |
| Delete | 🗑 垃圾桶图标，点击删除该预警 |

### 7.3 创建预警弹窗

| 元素 | 交互逻辑 |
|------|---------|
| Symbol 搜索 | 输入股票/代币 |
| Alert Criteria | Target Price / Movement Amount 切换 |
| 目标值 | 价格或百分比 |
| Notification Platform | In-app and Email / In-app only / Email only |
| Default Query | 预警触发时 AI 执行的分析提示词 |
| Cancel / Save | 关闭或保存 |

---

## 八、Symbol 详情页 (SymbolDetail)
**参考竞品: Perplexity Finance (主要) + Yahoo Finance + Seeking Alpha**

### 8.1 页面头部

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| ← 返回按钮 | 回到上一页面 | — |
| Symbol 图标 + 公司名 + 代码 · 交易所 | — | PPX |
| **Follow 按钮** | 点击切换跟踪状态（心形图标填充变化） | **Perplexity Finance** |
| **Price Alert 按钮** | 弹出预警设置弹窗 | **Perplexity Finance** |

### 8.2 Tab 导航

| Tab | 说明 | 参考竞品 |
|-----|------|---------|
| Overview | 价格 + 图表 + 新闻 + 公司信息 | **Perplexity Finance** |
| Financials | 三表 + Key Stats + Segments + Ratios | **Perplexity Finance** |
| Earnings | EPS + Revenue 预估 vs 实际 | PPX + Yahoo Finance |
| Historical Data | OHLCV 完整表格 | PPX + Yahoo Finance |
| Analysis | 分析师共识 + 目标价 + 估值 + 研报 | **Perplexity Finance** |

### 8.3 Overview Tab — 左栏

#### 价格头部

| 元素 | 参考竞品 |
|------|---------|
| 当前价格 (32px) + 涨跌额/幅 (16px) | PPX |
| **更新时间戳** "As of Mar 30, 2026 4:00 PM EDT" | PPX |
| 盘后价格 + 涨跌 | PPX |
| **时间范围标签** (如 "Past Year") | PPX |

#### 价格+成交量复合图

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 时间范围选择器 | 1D / 5D / 1M / 6M / YTD / 1Y / 5Y / MAX | PPX |
| **Line / Candle 切换** | 折线图 ↔ K线图 | PPX |
| **Adv Chart 按钮** | 跳转 TradingView 高级图表（新窗口） | **MiroFinance 独有** |
| 价格折线图/K线图 | OHLCV 悬停提示 | PPX |
| **成交量柱状图** | 在价格图**下方**独立区域 | PPX |
| **技术指标 (3×3 网格)** | Prev Close / Market Cap / Open / P/E / Day Range / Dividend Yield / 52W Range / EPS / Volume | PPX |

#### Stories & Analysis

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 新闻列表 | 合并了原 Latest Developments 内容 | PPX |
| 情绪标注圆点 | positive (绿) / negative (红) / neutral (灰) | **MiroFinance 独有** |
| 来源 + 时间戳 | — | PPX |

### 8.4 Overview Tab — 右栏

#### About 卡片

| 元素 | 参考竞品 |
|------|---------|
| 公司描述段落 | PPX |
| Symbol / Exchange / Sector / Industry | PPX |
| **IPO Date** | PPX |
| **Country** | PPX |
| CEO / Employees | PPX + Yahoo Finance |

#### Analyst Consensus

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 共识评级 + 分析师数量 | — | PPX |
| Buy/Hold/Sell 分布条 | — | PPX |
| **"Details →" 链接** | 点击跳转 Analysis Tab | — |

#### Peers

| 元素 | 交互逻辑 | 参考竞品 |
|------|---------|---------|
| 同行业标的列表 | 每行含 Symbol + Name + **Price + 涨跌%** | PPX（MiroFinance 增加了价格） |
| 点击标的 | 跳转（计划中） | — |

### 8.5 Financials Tab
**参考竞品: Perplexity Finance Financials**

| 元素 | 交互逻辑 |
|------|---------|
| 子Tab | Income Statement / Balance Sheet / Cash Flow / **Key Stats** / **Segments & KPIs** / **Ratios** |
| 视图切换 | **Annual / Quarterly / TTM** |

**Income Statement 行项:**
Revenue, Cost of Revenue, Gross Profit, Operating Expenses, Operating Income, Net Income, EBITDA, EPS

**Balance Sheet 行项:**
Total Assets, Total Liabilities, Total Equity, Cash, Total Debt, Current Ratio

**Cash Flow 行项:**
Operating CF, Investing CF, Financing CF, CapEx, Free Cash Flow

### 8.6 Earnings Tab

| 元素 | 参考竞品 |
|------|---------|
| EPS Estimate vs Actual 柱状图 | PPX + Yahoo Finance |
| Revenue + EPS 对比表格 (每季度) | PPX |
| Beat/Miss 标识 | PPX |
| 下次财报日期 | PPX |

### 8.7 Historical Data Tab
**参考竞品: Perplexity Finance + Yahoo Finance**

| 元素 | 交互逻辑 |
|------|---------|
| **时间范围选择器** | **1D / 5D / 1M / 6M / YTD / 1Y / 5Y / MAX** 按钮组（默认 5Y） |
| OHLCV 表格 | Date / Open / High / Low / Close / Volume |

### 8.8 Analysis Tab
**参考竞品: Perplexity Finance Analysis**

| 元素 | 说明 |
|------|------|
| **Analyst Consensus** | 共识评级 + Buy/Hold/Sell 分布条 |
| **52W Price Targets** | **Current** / Low / Average / High（4 格卡片） |
| Upside/Downside 计算 | 蓝底高亮，百分比显示 |
| **Analyst Estimates 表格** | Firm / Analyst / Rating (彩色徽标) / 52W Target (含 prior) / Upside% / Date |
| "See more" 链接 | 底部 |
| **Research Reports** | Title / Source / Date / Outlook (Bullish/Neutral) / "View Source" 按钮 |

---

## 九、全局组件

### 9.1 侧边导航栏 (Sidebar)

| 区域 | 元素 | 交互逻辑 |
|------|------|---------|
| Logo | MiroFinance "M" 图标 + 品牌名 | — |
| 主导航 | Home / Markets / Research / Notifications | 点击切换页面，清除 Symbol 详情视图 |
| Notifications 徽标 | 红色圆形，显示未读数（如 3） | — |
| **Research History** | 可展开列表，显示历史研究任务 | — |
| 列表项 | 状态图标(完成/进行中) + 标题 + 日期 + 展开箭头 | — |
| 展开内容 | **任务摘要 + "View Full Report →" 链接** | — |
| **用户账号** | 头像 + 名字 + 邮箱 + 退出按钮 | — |

### 9.2 AI 对话输入框 (ChatBar)

| 元素 | 交互逻辑 |
|------|---------|
| Sparkles 图标 | 品牌标识 |
| 文本输入框 | "Ask AI anything about your portfolio, markets, or research..." |
| 📎 附件按钮 | title="Upload files or images"，支持文件 + 图片 |
| 已上传文件标签 | 可删除 |
| 发送按钮 | Primary 蓝色 |
| 提示文字 | "Conversations are saved to your Workspace" |

> **Research Tab 不显示 ChatBar**（该 Tab 有自己的 Deep Research 输入框）。

---

## 十、设计系统

### 色彩体系

| Token | 色值 | 用途 |
|-------|------|------|
| primary | #1e40af | CTA、激活态 |
| primary-light | #3b82f6 | 悬停态 |
| primary-50 | #eff6ff | 浅色背景 |
| green | #16a34a | 正值、成功 |
| red | #dc2626 | 负值、高严重度 |
| orange | #ea580c | 警告 |
| surface | #ffffff | 卡片 |
| bg | #f8f9fc | 页面背景 |
| border | #e5e7eb | 分割线 |

### 字体
- **字体**: Inter (system-ui 回退)
- **标题**: 16-24px, font-bold
- **正文**: 12-13px, font-medium
- **标签**: 10-11px, font-medium

### 组件规范
- **卡片**: 白色背景、1px border、12px 圆角、20px 内边距
- **徽标**: 胶囊形状、彩色背景 + 文字
- **表格**: 悬停高亮、数字右对齐
- **图表**: Recharts 库

---

## 十一、技术栈

| 技术 | 版本/说明 |
|------|---------|
| React | 19.x |
| Vite | 8.x |
| Tailwind CSS | 4.x |
| Recharts | 3.x（折线图/柱状图/饼图/复合图） |
| Lucide React | 1.x（图标库） |

---

## 十二、文件结构

```
src/
├── main.jsx
├── App.jsx                           # 根组件：认证 + 路由 + 全局状态
├── index.css                         # Tailwind + 主题变量
├── components/
│   ├── Sidebar.jsx                   # 导航 + Research History + 用户账号
│   ├── ChatBar.jsx                   # AI 对话（📎 附件上传）
│   ├── ReasoningChain.jsx            # 推理链（已弃用，保留组件）
│   ├── PortfolioSwitcher.jsx         # 组合切换下拉
│   ├── CreatePortfolioModal.jsx      # 组合创建（券商搜索 + 标的搜索 + Lot 录入）
│   └── EmptyPortfolio.jsx            # 空状态
├── pages/
│   ├── Login.jsx                     # 登录
│   ├── Register.jsx                  # 注册（密码含字母+数字）
│   ├── CommandCenter.jsx             # Home（持仓 + 推荐 + 新闻 + 风险 + Alpha）
│   ├── MacroIntelligence.jsx         # Markets（双栏：市场数据 + 机会 + Watchlist）
│   ├── Workspace.jsx                 # Research（Deep Research + Stock Screener）
│   ├── Alerts.jsx                    # Notifications（通知 + Active Alerts + 创建预警）
│   └── SymbolDetail.jsx             # Symbol 详情（5 Tab + Follow + Alert）
└── data/
    ├── mockData.js                   # 组合 + 推荐 + 新闻 + 宏观数据
    └── symbolDetailData.js           # 7 个标的完整数据
```
