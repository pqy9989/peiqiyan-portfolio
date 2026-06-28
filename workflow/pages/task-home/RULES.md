# task-home — 任务工作台首页

> 任务管理模块的入口页。用户进入后能一眼掌握"今天要做什么、有哪些临期/逾期、整体进度、最近协作动态"，并能快速进入具体任务、切换视图、新建任务。

## 三大区域分流（强约束，与 `fragment.md` 顶层规则严格对齐）

| 区域 | 容器 | 本页放了什么 | 严守的"禁止放" |
|---|---|---|---|
| 二级导航 主 CTA | `cs-navbar > .slot-action` | **唯一** `<cs-button data-variant="primary" data-size="lg">「+ 新建任务」`，由本页 css `.slot-action cs-button { width: 100% }` 强制全宽 | 视图切换、筛选、其他并列按钮 |
| 内容头部 左 | `cs-content-header > .slot-left` | 标题"任务工作台" + `.page-subtitle`「6 月 25 日 · 周三 · 你今天还有 4 项要处理」（由 `fragment.css :has(.page-subtitle)` 自动 column + flex-start） | 任何按钮 |
| 内容头部 右 | `cs-content-header > .slot-right` | **只有** `<cs-search-trigger>` 一个，触发文案"搜索任务" | 视图切换、筛选、新建、任何其他二级操作按钮 |
| 筛选区 | `cs-filter-bar[data-variant="filters"]` | 左：5 个计数标签（概览 / 今日 8 / 临期 5 / 已逾期 3 / 已完成 42） + 分割线 + 4 个下拉（时间范围 / 优先级 / 项目 / 负责人）；右：`cs-view-switcher`（列表/看板/日历） + 排序图标 + 筛选图标 | 新建按钮、第二个搜索框 |

搜索互斥：本页搜索放在 `cs-content-header.slot-right`，filter-bar **未**使用 `data-variant="search"`。

## main-content 模块排布（业务内容自由发挥区，独立设计）

```
.main-content
├── cs-content-header                标题+副标题 / 搜索
├── cs-filter-bar[filters]           计数标签+下拉 / 视图+排序
├── .task-scroll  (flex:1 滚动)
│   ├── .task-kpi-row                4 张 KPI 卡（进行中 / 待开始 / 已逾期 / 今日完成）
│   ├── .task-grid-2col (1.4:1)
│   │   ├── .task-card--today        今日任务（上午 / 下午 / 晚些时候 三时段 · 8 行 cs-task-row）
│   │   └── .task-card--alert        需要尽快处理（3 逾期红条 + 4 临期黄条 + CTA 处理按钮）
│   ├── .task-grid-2col (1.4:1)
│   │   ├── .task-card               我负责的项目（2×2 小卡：色点 / 进度条 / 头像群 / 百分比）
│   │   └── .task-card               最近动态（5 条时间线：@我 / 指派 / 完成 / 改时间 / 加子任务）
│   └── .task-shortcut-bar           快捷创建（模板 / 邮件 / 扫码 / 同步日历，4 个虚线卡 — 次级动作）
└── .task-statusbar (H:18)           共 53 项 · 1 分钟前同步
```

KPI / 项目卡 / 红区 都用 `var(--cs-color-error|warning|primary|success)` 区分语义，不硬编码 hex。

## 用到的组件清单

| 组件 | 用途 |
|---|---|
| `cs-avatar` | tabbar 头像 / 任务行活动头像 / 项目成员头像 / 动态时间线头像 |
| `cs-button` | navbar slot-action 全宽 primary "+新建任务" |
| `cs-search-input` | tabbar 全局搜索 |
| `cs-search-trigger` | content-header.slot-right 搜索 |
| `cs-select` | filter-bar 4 个下拉（时间范围 / 优先级 / 项目 / 负责人） |
| `cs-status-badge` | 今日任务行状态药丸（in-progress / not-started） |
| `cs-tag` | 优先级（`data-variant="text"` 紧急/重要） + 红区时间标签（已逾期 N 天 / 今日到期 / N 天后到期） |
| `cs-task-row` | 今日任务 8 行 |
| `cs-checkbox` | task-row 内的复选框（task-row RULES 强制带） |
| `cs-view-switcher` | filter-bar 列表 / 看板 / 日历切换 |
| `cs-sidebar` / `cs-navbar` / `cs-content-header` / `cs-filter-bar` / `cs-layout` | fragment 骨架 |

## 用到的语义令牌

颜色：`--cs-color-primary` / `-primary-a2` / `-primary-hover`，`--cs-color-error` / `--cs-sem-bg-error`，`--cs-color-warning` / `--cs-sem-bg-warning`，`--cs-color-success` / `--cs-sem-bg-success`，`--cs-color-text` / `-light` / `-light2`，`--cs-color-border` / `-bg-light` / `-bg-secondary` / `-bg-app-dark` / `-white` / `-bg-hover`，`--color-purple-500` / `-sky-500` / `-pink-500`（项目色点）。

字体：`--typo-cn-12-regular` / `-13-regular` / `-14-regular` / `-16-medium`；`--font-weight-regular|medium|semibold`。

间距：`--space-3xs|2xs|xs|sm|md`（2/4/8/12/16），所有 padding/gap 走 4 的倍数。

圆角：`--radius`（4） / `--radius-lg`（8） / `--radius-pill`。

图标尺寸 / 交互高度：`--cs-sem-size-icon-md`（16）；`--cs-sem-size-interactive-sm`（32，header 同行控件统一对齐）。

## 用到的图标（全部来自 `design/fonts/icons-list.txt`，已逐一核对存在）

`cses-stratis-search-01 / -x-01 / -bell-01 / -home-01 / -compass / -message-circle / -check-square-broken / -video-on / -book-01 / -file-edit-01 / -file-check-01 / -plus-01 / -send-01 / -users-profiles-01 / -star-01 / -check-contained / -chevron-down / -chevron-right / -flame-01 / -alarm-01 / -settings / -layout-left / -sort-vertical-01 / -filter / -list / -grid-01 / -calendar-01 / -progress / -clock-01 / -alert-triangle / -arrow-up-right / -trend-up-01 / -sun-up / -sun-02 / -moon-01 / -mail-01 / -scan / -arrow-refresh-01 / -arrow-refresh-02 / -file-multiple / -lightning-01 / -user-profile-check / -edit-01 / -add-square-01`

无任何 `cses-` 中文拼音类（已废弃）；无 `cses-icons-*`（非清单内）。

## 强约束自检

- [x] 框架结构 link 引用 `design/fragment/fragment.html` 的官方骨架（cs-layout / tabbar / cs-sidebar / cs-navbar / cs-content-header / cs-filter-bar / main-content），未改其几何
- [x] navbar 内严格使用 `.slot-header / .slot-action / .slot-nav / .slot-sub / .slot-admin / .slot-bottom` 六个官方 slot；不自创 nb-* / nav-link 等历史反例
- [x] 二级导航主 CTA（"+ 新建任务"）只此一处，placed in `slot-action`，`<cs-button data-variant="primary" data-size="lg">` + 本页 `.slot-action cs-button { width: 100% }` 强制全宽
- [x] content-header.slot-right 只放 `cs-search-trigger`；视图切换 / 筛选 / 新建均不进 content-header
- [x] filter-bar 用 `data-variant="filters"`（任务管理推荐变体），承担"标签计数 + 下拉筛选 + 视图切换 + 排序"；不放新建、不放第二搜索
- [x] tabbar 使用 baseline 官方 class（`.tabbar-left/.tabbar-right/.win-ctrl/.ah-top-search/.page-tab/.notice-wrap/.notice-badge`），不重写几何
- [x] header 槽位组合控件高度统一 32px：`cs-search-trigger` 默认 32 / `cs-button` 不写 data-size 默认 32 / `cs-view-switcher` 默认 32 / `cs-select` `data-size="sm"` 24（filter-bar 内一行允许 24px 下拉，不在 header）；filter-bar 不属于 header 槽位
- [x] 间距优先 4 的倍数；所有 padding/gap/margin 通过 `--space-*` 与 `--spacing-*`
- [x] 颜色 / 字号 / 圆角 / 阴影通通使用 `var(--cs-*)` / `var(--cs-sem-*)` / `var(--color-purple|sky|pink-500)` 令牌；无原始 hex（除 `task-card-shadow` 内一处低透明阴影合成值，符合 fragment 阴影写法约定）
- [x] 图标 class 全部来自 `fonts/icons-list.txt`，无 `cses-icons-*` / `cses-sousuo` 等清单外名
- [x] `var(--space-lg)` 已在 variable.css 显式补齐成 20px，可用；本页未使用 `var(--space-lg)`，避免误用风险
- [x] `cs-content-header .slot-left` 中标题+副标题用 `.page-subtitle`，触发 fragment.css `:has(.page-subtitle)` 自动 column + flex-start，避免"标题被横向居中"的历史 bug
- [x] 不读、不参考 `pages/` 下任何其他已生成页面（含上一版 task-home 自身），所有模块排布、卡片层级、网格切分独立设计
- [x] 本页未在主区出现"+ 新建任务"重复 CTA（task-shortcut-bar 的 4 项是"模板 / 邮件 / 扫码 / 同步日历"次级动作，与 navbar 主 CTA 语义不重叠）
- [x] 路径前缀：pages/task-home/ 在两级深处，引用 `../../design/...` 正确
