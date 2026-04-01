# MiroFinance 产品文档

> AI 驱动的智能财富管理平台
> 版本: Demo 原型 v2.0 | 日期: 2026年3月

---

## 1. 产品概述

MiroFinance 是一个 AI 驱动的智能财富管理平台，将先进的推理能力与机构级投资组合分析相结合。平台提供个性化投资建议、透明的 AI 推理链、多维风险分析和宏观情报。

**目标用户:** 个人投资者、家族办公室、财富管理机构和投资顾问

**技术栈:** React 19 + Vite + Tailwind CSS v4 + Recharts + Lucide Icons

---

## 2. 产品架构

```
MiroFinance
├── 认证层
│   ├── 登录（邮箱 + 密码）
│   └── 注册（邮箱 + 密码，须含字母和数字）
│
├── 投资组合管理层
│   ├── 创建投资组合
│   │   ├── 券商账户绑定（Plaid，支持搜索）
│   │   └── 手动输入持仓（标的搜索 + Lot 录入）
│   ├── 投资组合切换器（总账户 / 单个组合）
│   └── 投资组合增删改查
│
├── 5 大核心模块
│   ├── 1. Command Center（首页仪表盘）
│   ├── 2. Asset Optimizer（约束条件参数）
│   ├── 3. Macro Intelligence（宏观情报）
│   ├── 4. Workspace（工作台/深度研究）
│   └── 5. Notifications（预警通知）
│
├── Symbol 详情页（单标的下钻分析）
│
└── 全局组件
    ├── 侧边导航栏
    ├── AI 对话输入框（+ 按钮上传文件/图片）
    └── 推理链组件（共享组件）
```

---

## 3. 认证流程

### 3.1 登录页
- **输入项:** 邮箱地址 + 密码
- **功能:** 密码可见性切换、"记住我"、"忘记密码"
- **布局:** 左侧品牌面板 + 右侧表单

### 3.2 注册页
- **输入项:** 姓名 + 邮箱 + 密码 + 确认密码
- **密码规则:** 最少 8 位，**必须同时包含字母和数字**
- **布局:** 左侧 3 步引导 + 右侧表单

---

## 4. 投资组合管理

### 4.1 空状态
用户无组合时，**Command Center** 和 **Asset Optimizer** 显示空状态，两个按钮**直接进入**对应创建模式（无中间选择步骤）：
- "Connect Broker" → 直接进入券商选择
- "Enter Manually" → 直接进入手动输入

### 4.2 创建 — 券商绑定（Plaid）
| 步骤 | 说明 |
|------|------|
| 1 | **搜索券商**（支持搜索过滤，12个预置券商） |
| 2 | 选择券商并点击 Connect |
| 3 | 加载动画 → 绑定成功 |
| 4 | 自动以券商名称命名（无需手动命名） |

### 4.3 创建 — 手动输入
| 步骤 | 说明 |
|------|------|
| 1 | **标的搜索**（输入名称或代码，下拉显示匹配结果，25个预置标的） |
| 2 | 选择标的后弹出 **Lot 录入表单** |
| 3 | 填写：Shares数、Avg Cost（自动填充当日价格）、Date、Transaction Type (Buy/Sell) |
| 4 | Save Lot → 标的以卡片形式展示，可删除 |
| 5 | 可继续搜索添加更多标的 |

### 4.4 组合切换器（顶部下拉）
- "All Portfolios" 总账户（默认）
- 单个组合（名称 + 类型图标）
- 行内编辑、删除、新建

---

## 5. 核心模块

### 5.1 Command Center（首页仪表盘）

#### 持仓概览
| 组件 | 说明 |
|------|------|
| 总价值 | 组合总市值 + 当日变动 |
| 配置饼图 | 环形图，**点击标的可跳转详情页** |
| Portfolio Health | 健康评分仪表盘 + 评级分布（Buy/Neutral/Sell/Not Covered） |
| 持仓明细表 | Symbol、Price、Change、Change%、Volume、Open、Prev Close、Day Range、52W Range、Rating（Quant+Analyst合并） |

#### 投资建议（3-5条）
| 字段 | 说明 |
|------|------|
| 紧急程度徽标 | high / medium / low |
| 来源 + 时间戳 | 政策公告 / 财报 / 分析 |
| 标题 + 摘要 | 可执行建议 |
| 推理链白盒 | 5 步透明推理（可展开） |

#### 风险因子（2列网格）
位于投资建议和 Alpha 归因之间，可展开查看详情和推荐操作。

#### 历史收益与 Alpha 归因
| 组件 | 说明 |
|------|------|
| 概览卡片 | Total Return / Benchmark / Total Alpha |
| **日度 Performance 折线图** | 3 条曲线：Portfolio（蓝）+ S&P 500 Benchmark（灰虚线）+ **Alpha（绿）** |
| 四维拆解 | Market Beta / Information Alpha / Execution Alpha / Tax & Structure Alpha |

---

### 5.2 Asset Optimizer（约束条件参数）

仅保留交互式约束条件参数模块：

| 约束条件 | 控件 |
|----------|------|
| Max Drawdown Tolerance | 滑块 5%–30% |
| Min Cash Flow Ratio | 滑块 5%–30% |
| Sector Concentration Cap | 滑块 20%–60% |
| Crypto Exposure Cap | 滑块 0%–25% |

下方 Current Status 进度条实时显示当前值 vs 上限。

---

### 5.3 Macro Intelligence（宏观情报）

**双栏布局**：

#### 左栏
**市场概览（Tab 导航）** — 横向滚动卡片 + 迷你走势图
| Tab | 标的（与 Yahoo Finance 一致） |
|-----|------|
| US Markets | S&P Futures, Dow Futures, Nasdaq Futures, Russell 2000 Futures, VIX, Gold, Bitcoin USD, CBOE 10Y T-Note |
| Crypto | Bitcoin, XRP, Ethereum, Tether USDt, BNB, Solana, Dogecoin |
| Rates | 13-Wk Bond, 5-Yr Bond, 10-Yr Bond, 30-Yr Bond, 2Y T-Note Futures, 10Y T-Note Futures, iShares 20+ Treasury Bond ETF |
| Commodities | Crude Oil, Gold, Silver, Copper, Natural Gas, Brent Crude, Platinum |
| Currencies | EUR/USD, USD/JPY, USD/GBP, USD/AUD, USD/CAD, USD/MXN, USD/HKD |

**投资机会** — 瀑布流，新闻触发，可展开推理链

#### 右栏
| 模块 | 格式 |
|------|------|
| Watchlist | Perplexity Finance 风格，含分页 |
| Gainers / Losers / Active | Tab 切换，含 See all 链接 |
| Equity Sectors | 11 个行业，含价格和涨跌标签 |

---

### 5.4 Workspace（工作台/深度研究）

#### 发起新研究
| 字段 | 说明 |
|------|------|
| Research Query | 大文本输入框，自然语言提问 |
| Upload Files | 附加本地文档 |
| Start Research | 启动 AI 分析 |

#### 研究历史
历史任务列表：状态图标、标题、类型徽标、日期、可展开摘要

---

### 5.5 Notifications（预警通知）

#### 通知列表
按时间排序的预警事件：严重程度图标、标的/标题、消息、时间戳、已读标记

**预警类型：** 价格预警 + 约束条件预警

#### Active Alerts 表格
| 列 | 说明 |
|----|------|
| Symbol | 可点击跳转详情 |
| Type | Price / Movement |
| Condition | ↓ Below / ↑ Above / ±% |
| Current Price | 最新价格 |
| Status | Active |
| Created | 创建日期 |
| **Delete** | 垃圾桶图标，点击删除 |

#### 创建预警弹窗
标的搜索 + 条件选择（Target Price / Movement Amount）+ 通知平台 + AI 查询提示词

---

## 6. Symbol 详情页

点击平台内任意标的代码进入。双栏布局，参考 Perplexity Finance + Yahoo Finance 风格。

### Tab 导航
Overview | Financials | Earnings | Historical Data | Analysis

### Overview — 左栏
| 区块 | 说明 |
|------|------|
| 价格头部 | 当前价格、涨跌额/幅、盘后价格 |
| **价格+成交量复合图** | 折线图 + 灰色成交量柱状图，OHLCV 悬停提示，8 个时间范围选择器 |
| Notable Price Movement | AI 生成的价格驱动因素摘要 |
| Stories & Analysis | 2×2 新闻卡片网格 + 情绪标点 |
| Latest Developments | 完整新闻列表 |
| Key Issues | 正/负面议题颜色编码卡片 |

### Overview — 右栏
| 区块 | 说明 |
|------|------|
| **Key Statistics** | Symbol, Exchange, Sector, Industry, Prev Close, Open, Day Range, 52W Range, Market Cap, **P/E Ratio (TTM)**, **Forward P/E**, **PEG Ratio**, **Price/Sales**, **EPS (TTM)**, Dividend & Yield, Beta, Volume, Avg Volume, **Shares Outstanding**, **Revenue/Share**, Profit Margin |
| **About + 公司信息** | 公司描述 + **CEO** + **员工数量** |
| Analyst Consensus | 共识评级、Buy/Hold/Sell 分布条、分析师数量、目标价 |
| Earnings (Mini) | 下次财报日期、近4季度 EPS 预估 vs 实际 |
| **Top Holders** | 机构持仓排名（名称 + 持股比例） |
| Peers | 同行业标的芯片 |

### Financials Tab
| 子Tab | 说明 |
|-------|------|
| **Income Statement** | Revenue, Cost of Revenue, Gross Profit, Operating Expenses, Operating Income, Net Income, EBITDA, EPS |
| **Balance Sheet** | Total Assets, Total Liabilities, Total Equity, Cash, Total Debt, Current Ratio |
| **Cash Flow** | Operating CF, Investing CF, Financing CF, CapEx, Free Cash Flow |

支持 **Annual / Quarterly** 切换

### Earnings Tab
| 组件 | 说明 |
|------|------|
| EPS 柱状图 | Estimate vs Actual，颜色标识 Beat/Miss |
| **Revenue 表格** | 每季度 Rev Estimate vs Actual + EPS Estimate vs Actual + Beat/Miss |
| 下次财报日期 | 带日历图标 |

### Historical Data Tab
| 列 | 说明 |
|----|------|
| Date | 时间周期 |
| **Open** | 开盘价 |
| **High** | 最高价 |
| **Low** | 最低价 |
| **Close** | 收盘价 |
| **Volume** | 成交量 |
| Change | 周期环比变化% |

### Analysis Tab
分析师目标价（Low / Average / Median / High）+ 上行/下行空间计算

### 支持的标的
NVDA、MSFT、GOOG、TCEHY、MTCH、BTC-USD、XAUUSD（每个均有完整数据）

---

## 7. 全局组件

### 7.1 侧边导航栏
- MiroFinance Logo + 品牌名
- 5 个导航项：Command Center、Asset Optimizer、Macro Intelligence、Workspace、**Notifications**
- Notifications 项上的未读数量红色徽标
- 底部 "AI Engine Online" 状态指示器

### 7.2 AI 对话输入框（底部，所有页面）
- Sparkle 图标 + 文本输入
- **"+" 按钮**（点击弹出菜单：Upload File / Upload Image）
- 已上传文件以标签形式展示在输入框上方，可删除
- 发送按钮
- 提示文字："Conversations are saved to your Workspace for future reference"

### 7.3 推理链组件（共享）
5 步可视化推理链：Signal Detection → Impact Analysis → Portfolio Context → Constraint Check → Recommendation

---

## 8. 设计系统

### 色彩体系
| Token | 色值 | 用途 |
|-------|------|------|
| primary | #1e40af | CTA、激活态、链接 |
| primary-light | #3b82f6 | 悬停态 |
| green | #16a34a | 正值、成功 |
| red | #dc2626 | 负值、高严重度 |
| orange | #ea580c | 警告 |
| surface | #ffffff | 卡片 |
| bg | #f8f9fc | 页面背景 |
| text-primary | #111827 | 标题 |
| text-secondary | #6b7280 | 正文 |
| text-tertiary | #9ca3af | 标签 |

### 字体: Inter (system-ui), 标题 16-24px, 正文 12-13px, 标签 10-11px

### 组件: 白色卡片 12px 圆角, 胶囊徽标, 悬停高亮表格, Recharts 图表

---

## 9. 文件结构

```
src/
├── main.jsx                          # 入口文件
├── App.jsx                           # 根组件：认证、组合状态、路由
├── index.css                         # Tailwind 配置 + 主题变量
├── components/
│   ├── Sidebar.jsx                   # 左侧导航
│   ├── ChatBar.jsx                   # 底部 AI 对话（+ 按钮上传）
│   ├── ReasoningChain.jsx            # 推理链步骤
│   ├── PortfolioSwitcher.jsx         # 组合切换下拉菜单
│   ├── CreatePortfolioModal.jsx      # 组合创建（搜索券商 + 标的搜索 + Lot 录入）
│   └── EmptyPortfolio.jsx            # 空状态引导
├── pages/
│   ├── Login.jsx                     # 登录
│   ├── Register.jsx                  # 注册（密码含字母+数字）
│   ├── CommandCenter.jsx             # 模块1：仪表盘（含健康评分+风险因子+Alpha折线图）
│   ├── AssetOptimizer.jsx            # 模块2：约束条件参数
│   ├── MacroIntelligence.jsx         # 模块3：宏观情报（双栏+Yahoo数据）
│   ├── Workspace.jsx                 # 模块4：深度研究
│   ├── Alerts.jsx                    # 模块5：通知（支持删除预警）
│   └── SymbolDetail.jsx              # 标的详情（OHLCV+三表+持股人+CEO）
└── data/
    ├── mockData.js                   # 组合、建议、宏观数据
    └── symbolDetailData.js           # 标的详情（7个标的完整OHLCV+三表+持股人数据）
```

---

## 10. 用户流程

```
[登录/注册]
    │
    ▼
[无组合] ── Connect Broker（直接进入券商选择）
         └─ Enter Manually（直接进入标的搜索+Lot录入）
    │
    ▼
[Command Center]
    ├── 查看持仓 ── 点击标的/饼图 ── [Symbol 详情页]
    │                                    ├── Overview（价格+成交量图、Key Stats含PEG/P/S/CEO/Holders）
    │                                    ├── Financials（三表 + 年度/季度切换）
    │                                    ├── Earnings（EPS+Revenue 预估vs实际）
    │                                    ├── Historical（OHLCV 完整表格）
    │                                    └── Analysis（分析师目标价）
    ├── 查看投资建议 ── 展开推理链
    ├── 查看风险因子 ── 展开详情+建议操作
    ├── 查看 Alpha 归因 ── 日度三线折线图 + 四维拆解
    │
    ├── [Asset Optimizer] ── 4个约束条件滑块 + 当前状态进度条
    ├── [Macro Intelligence] ── 市场Tab(Yahoo数据) + 机会瀑布流 + Watchlist + Gainers/Losers + Sectors
    ├── [Workspace] ── 研究查询 + 上传文件 + 历史记录
    └── [Notifications] ── 通知列表 + Active Alerts(可删除) + 创建预警
```
