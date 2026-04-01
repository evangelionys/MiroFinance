# Symbol 详情页：MiroFinance vs Perplexity Finance 对比分析

> 以 MiroFinance 现有架构为分析框架
> 日期: 2026年3月31日

---

## 分析说明

以 MiroFinance Symbol 详情页最新版本（v3，含 Prompt 0331 调整）的页面结构为骨架，逐区块对比 Perplexity Finance (https://www.perplexity.ai/finance/NVDA) 的对应功能。

标记说明:
- ✅ = 两平台均有
- ⭕ = 仅 MiroFinance 有
- 🔵 = 仅 Perplexity Finance 有
- 🟡 = 两者有但形式不同

---

## 一、页面头部

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| 公司名称 | ✅ | ✅ | ✅ 一致 |
| 股票代码 | ✅ | ✅ | ✅ 一致 |
| 交易所 | ✅ | ✅ | ✅ 一致 |
| 当前价格 + 涨跌 | ✅ | ✅ | ✅ 一致 |
| 盘后价格 | ✅ | ✅ | ✅ 一致 |
| 更新时间戳 | ✅ | ✅ | ✅ 一致（v3新增） |
| Following 按钮 | ✅ | ✅ | ✅ 一致（v3新增，PPX为Watchlist按钮） |
| Price Alert 按钮 | ✅ | ✅ | ✅ 一致（v3新增） |

**差异: 无**

---

## 二、Tab 导航

| Tab | MiroFinance | Perplexity | 状态 |
|-----|:---:|:---:|:---:|
| Overview | ✅ | ✅ | ✅ 一致 |
| Financials | ✅ | ✅ | ✅ 一致 |
| Earnings | ✅ | ✅ | ✅ 一致 |
| Historical Data | ✅ | ✅ | ✅ 一致 |
| Analysis | ✅ | ❌ | ⭕ MiroFinance 独有 Tab |
| Holders | ❌ | ✅ | 🔵 PPX 独有 Tab |
| Insiders | ❌ | ✅ | 🔵 PPX 独有 Tab |
| Politicians | ❌ | ✅ | 🔵 PPX 独有 Tab |
| Filings | ❌ | ✅ | 🔵 PPX 独有 Tab |

---

## 三、Overview Tab — 左栏

### 3.1 价格走势图

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| 折线图模式 | ✅ | ✅ | ✅ 一致 |
| K线图模式 | ✅ | ✅ | ✅ 一致（v3新增） |
| 成交量柱状图（价格图下方） | ✅ | ✅ | ✅ 一致（v3调整位置） |
| 时间范围选择器 (1D-MAX) | ✅ | ✅ | ✅ 一致 |
| 选择时间后显示对应范围文字 | ✅ | ✅ | ✅ 一致（v3新增） |
| OHLCV 悬停提示 | ✅ | ✅ | ✅ 一致 |
| Adv Chart 按钮 (→ TradingView) | ✅ | ❌ | ⭕ MiroFinance 独有（v3新增） |
| SMA 均线叠加 | ❌ | ✅ | 🔵 PPX 有基础 SMA 叠加 |
| 标的对比叠加 | ❌ | ✅ | 🔵 PPX 可叠加其他标的 |

### 3.2 图表下方技术指标

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| Prev Close | ✅ | ✅ | ✅ 一致（v3从Key Stats移至此处） |
| Market Cap | ✅ | ✅ | ✅ 一致 |
| Open | ✅ | ✅ | ✅ 一致 |
| P/E Ratio | ✅ | ✅ | ✅ 一致 |
| Day Range | ✅ | ✅ | ✅ 一致 |
| Dividend Yield | ✅ | ✅ | ✅ 一致 |
| 52W Range | ✅ | ✅ | ✅ 一致 |
| EPS | ✅ | ✅ | ✅ 一致 |
| Volume | ✅ | ✅ | ✅ 一致 |

**差异: 无 — 9 项技术指标完全一致**

### 3.3 Stories & Analysis

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| 新闻列表（标题+来源+时间） | ✅ | ✅ | ✅ 一致（v3合并了 Latest Developments） |
| 新闻情绪标注 (正/负/中) | ✅ | ❌ | ⭕ MiroFinance 独有 |
| AI 生成的新闻关联摘要 | ❌ | ✅ | 🔵 PPX 有 AI 上下文关联 |

### 3.4 已删除的区块（v3）

| 区块 | v3 操作 | PPX 对应 |
|------|---------|---------|
| Notable Price Movement | ❌ 已删除 | PPX 无类似模块 |
| Latest Developments | ❌ 已删除（内容并入 Stories & Analysis） | PPX 用 Recent Developments 列表 |
| Key Issues | ❌ 已删除 | PPX 有 Key Issues（Bull/Bear） |
| Key Statistics 独立卡片 | ❌ 已删除（指标分散到图表下方和 About 中） | PPX 有独立信息卡 |

---

## 四、Overview Tab — 右栏

### 4.1 About 卡片

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| 公司描述段落 | ✅ | ✅ | ✅ 一致 |
| Symbol | ✅ | ✅ | ✅ 一致（v3从 Key Stats 移入） |
| Exchange | ✅ | ✅ | ✅ 一致 |
| Sector | ✅ | ✅ | ✅ 一致 |
| Industry | ✅ | ✅ | ✅ 一致 |
| IPO Date | ✅ | ✅ | ✅ 一致（v3新增） |
| Country | ✅ | ✅ | ✅ 一致（v3新增） |
| CEO | ✅ | ✅ | ✅ 一致 |
| Employees | ✅ | ✅ | ✅ 一致 |
| 成立年份 | ❌ | ✅ | 🔵 PPX 有 Founding Year |

### 4.2 Analyst Consensus

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| 共识评级标签 | ✅ | ✅ | ✅ 一致 |
| 分析师总数 | ✅ | ✅ | ✅ 一致 |
| Buy/Hold/Sell 分布条 | ✅ | ✅ | ✅ 一致 |
| 点击跳转 Analysis Tab | ✅ | 🟡 | ✅ MiroFinance v3新增；PPX 有更多行内展开 |
| 12 月目标价 | ❌ | ✅ | 🔵 PPX 在此处显示目标价 |

### 4.3 已删除的右栏区块（v3）

| 区块 | v3 操作 | PPX 对应 |
|------|---------|---------|
| Earnings (迷你侧边栏) | ❌ 已删除 | PPX 在 Overview 右侧无此模块 |
| Top Holders | ❌ 已删除 | PPX 有独立 Holders Tab |

### 4.4 Peers

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| 同行业标的列表 | ✅ | ✅ | ✅ 一致 |
| 同行价格 + 涨跌 | ✅ | ❌ | ⭕ MiroFinance 独有（v3新增） |
| 同行可点击跳转 | ✅ | ✅ | ✅ 一致 |

---

## 五、Financials Tab

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| Income Statement | ✅ | ✅ | ✅ 一致 |
| Balance Sheet | ✅ | ✅ | ✅ 一致 |
| Cash Flow | ✅ | ✅ | ✅ 一致 |
| Key Stats 子Tab | ✅ | ✅ | ✅ 一致（v3新增） |
| Segments & KPIs 子Tab | ✅ | ✅ | ✅ 一致（v3新增） |
| Ratios 子Tab | ✅ | ✅ | ✅ 一致（v3新增） |
| Annual 视图 | ✅ | ✅ | ✅ 一致 |
| Quarterly 视图 | ✅ | ✅ | ✅ 一致 |
| TTM by Quarter 视图 | ✅ | ✅ | ✅ 一致（v3新增） |
| Adjusted 子Tab | ❌ | ✅ | 🔵 PPX 有 Adjusted 数据 |
| 数据下载 (Excel) | ❌ | ✅ | 🔵 PPX 可导出 Excel |

**Income Statement 行项对比:**

| 行项 | MiroFinance | Perplexity | 状态 |
|------|:---:|:---:|:---:|
| Revenue | ✅ | ✅ | ✅ |
| Cost of Revenue | ✅ | ✅ | ✅ |
| Gross Profit | ✅ | ✅ | ✅ |
| Operating Expenses | ✅ | ✅ | ✅ |
| Operating Income | ✅ | ✅ | ✅ |
| Net Income | ✅ | ✅ | ✅ |
| EBITDA | ✅ | ✅ | ✅ |
| EPS | ✅ | ✅ | ✅ |
| R&D Expenses | ❌ | ✅ | 🔵 |
| SG&A Expenses | ❌ | ✅ | 🔵 |
| Interest Expense | ❌ | ✅ | 🔵 |
| Tax Provision | ❌ | ✅ | 🔵 |
| Shares Outstanding | ❌ | ✅ | 🔵 |

---

## 六、Earnings Tab

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| EPS Estimate vs Actual 柱状图 | ✅ | ✅ | ✅ 一致 |
| Revenue Estimate vs Actual 表格 | ✅ | ✅ | ✅ 一致 |
| Beat/Miss 标识 | ✅ | ✅ | ✅ 一致 |
| Surprise % | ✅ | ✅ | ✅ 一致 |
| 下次财报日期 | ✅ | ✅ | ✅ 一致 |
| 财报电话会议转录 | ❌ | ✅ | 🔵 PPX 独有 |
| 财报电话 AI 实时摘要 | ❌ | ✅ | 🔵 PPX 独有 |
| 公司文档（季报/幻灯片） | ❌ | ✅ | 🔵 PPX 独有 |

---

## 七、Historical Data Tab

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| OHLCV 完整列 | ✅ | ✅ | ✅ 一致 |
| 日/周/月频率切换 | ✅ | ❌ | ⭕ MiroFinance 独有（v3新增） |
| 日期范围筛选 | ✅ | ✅ | ✅ 一致（v3新增） |
| CSV 下载 | ❌ | ✅ | 🔵 PPX 可下载 |

---

## 八、Analysis Tab

| 数据项 | MiroFinance | Perplexity | 状态 |
|--------|:---:|:---:|:---:|
| Analyst Consensus（完整版） | ✅ | ✅ | ✅ 一致（v3新增完整展示） |
| 52W Price Targets (Current/Low/Avg/High) | ✅ | ✅ | ✅ 一致（v3调整为 Current 替代 Median） |
| Upside/Downside 计算 | ✅ | ✅ | ✅ 一致 |
| Analyst Estimates 表格 | ✅ | ✅ | ✅ 一致（v3新增，含 Firm/Analyst/Rating/Target/Upside/Date） |
| Research Reports | ✅ | ✅ | ✅ 一致（v3新增，含 Title/Source/Date/Outlook/View Source） |
| "See more" 链接 | ✅ | ✅ | ✅ 一致 |

---

## 九、Perplexity Finance 独有（MiroFinance 无对应）

| 模块 | 说明 |
|------|------|
| **Holders Tab** | 独立 Tab 展示机构持仓、持仓变化 |
| **Insiders Tab** | 内部人交易记录 |
| **Politicians Tab** | 美国国会议员交易 |
| **Filings Tab** | SEC 文件列表 + AI 摘要 |
| **AI 对话式研究** | 在标的页内嵌对话框，可提问获得上下文感知回答 |
| **Perplexity Tasks** | 定时自动化研究查询 |
| **SMA 均线叠加** | 图表上叠加简单移动平均线 |
| **标的对比叠加** | 图表上叠加其他标的走势对比 |
| **数据下载 (Excel/CSV)** | 财务数据和历史数据导出 |
| **财报电话转录 + AI 摘要** | 实时财报电话会议文本转录和 AI 总结 |
| **Bull/Bear Key Issues** | AI 综合生成的多空结构化观点 |
| **Adjusted 财务数据** | 调整后的财务报表 |
| **Founding Year** | 公司成立年份 |

---

## 十、MiroFinance 独有（Perplexity Finance 无对应）

| 模块 | 说明 |
|------|------|
| **Analysis 独立 Tab** | 完整的分析师估值、目标价、研究报告独立页面 |
| **新闻情绪标注** | 每条新闻附 positive/negative/neutral 彩色圆点 |
| **Adv Chart → TradingView** | 一键跳转 TradingView 高级图表 |
| **日/周/月频率切换** | 历史数据支持 3 种频率 |
| **Peers 价格 + 涨跌** | 同行业标的显示实时价格和涨跌幅 |
| **Price Alert 弹窗** | 详情页内嵌预警设置弹窗 |
| **与投资组合联动** | 标的数据与用户 Portfolio 约束直接关联 |
| **推理链白盒** | 5 步透明推理（平台级功能，非详情页内但相关） |

---

## 十一、汇总统计

| 维度 | 一致 | 仅MiroFinance | 仅Perplexity |
|------|:---:|:---:|:---:|
| 页面头部 | 8 | 0 | 0 |
| 图表 | 7 | 1 | 2 |
| 技术指标 | 9 | 0 | 0 |
| Stories & Analysis | 2 | 1 | 1 |
| About | 9 | 0 | 1 |
| Analyst Consensus | 4 | 0 | 1 |
| Peers | 2 | 1 | 0 |
| Financials | 9 | 0 | 2+ |
| Earnings | 5 | 0 | 3 |
| Historical Data | 2 | 1 | 1 |
| Analysis | 6 | 0 | 0 |
| **总计** | **63** | **4+** | **11+** |

### 结论

经过 v3 (Prompt 0331) 调整后，MiroFinance Symbol 详情页与 Perplexity Finance 的**核心数据项一致率超过 80%**。63 个数据项完全一致，MiroFinance 有 4+ 个独有功能（情绪标注、Adv Chart、频率切换、Peers 价格），Perplexity Finance 有 11+ 个独有功能（主要集中在 Holders/Insiders/Politicians/Filings 等独立 Tab 和 AI 对话式研究）。
