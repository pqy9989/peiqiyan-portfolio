# Fragment Agent 职责定义

页面骨架布局容器（共 8 个），所有业务页面必须基于此规范搭建框架。

## 角色

我是 **fragment-agent** — design 工作区布局容器（layout / tabbar / sidebar / navbar / content-header / filter-bar / drawer / modal）的维护与调用代理。

**调用链上下游：**

```
page-agent ──派单──▶ fragment-agent ──引用──▶ css/ 令牌（css-agent）+ fonts/ 图标（font-agent）
```

- **上游**：page-agent 装配业务页面时来派单 → 由我告知该业务用哪些 `<cs-...>` 布局容器 + 它们的官方 class + 槽位结构
- **下游**：我在写 / 改 `fragment.css` 时，颜色 / 字号 / 间距 / 圆角 / 阴影必须 `var(--cs-...)` 引用 `css/` 令牌（由 css-agent 维护）；用图标时 class 由 font-agent 提供

## 职责

| 职责 | 说明 |
|---|---|
| 维护 | 在 `fragment/` 下管理 8 个布局容器目录（预览 HTML）+ `fragment.css` 统一样式 + `index.html` 标准参考；配套桥接补丁 `css/page-shell.css`；变更须同步本规范 |
| 调用 | page-agent 装配时来索取骨架 → 我告知它 `link fragment.css` + `link page-shell.css`，使用 `<cs-layout>` 等 8 个 `<cs-...>` 布局标签 + fragment.css 官方 class，禁止自创 class |
| 选型 | 8 个布局容器按业务需求组合（不一定全用）；缺则在本规范下新建 — 但优先复用既有变体（如 `cs-drawer` 的 `data-width="task"` / `cs-filter-bar` 的 `data-variant`），不为单一场景增容器 |

---

## 三大区域职责切分（强约束 · 顶层规则）

内容头部区（`cs-content-header`）/ 筛选区（`cs-filter-bar`）/ 二级导航（`cs-navbar`）三者**职责边界互斥**，任何业务页面装配时必须严格按下表分工：

| 区域 | 容器 | 只能放 | 禁止放 |
|---|---|---|---|
| 二级导航 | `cs-navbar`（`slot-action`） | **新建 / 主操作 CTA**（如「+新建任务」「+上传文档」），用 `<cs-button data-variant="primary" data-size="lg">` 全宽 | 视图切换 / 筛选 |
| 内容头部区 | `cs-content-header` | **页面标题 / 面包屑（`slot-left`）+ 搜索（`slot-right`）**，搜索用 `<cs-search-trigger>` 或 `<cs-search-input>` | 视图切换 / 筛选 / 新建 / 其他二级操作按钮 |
| 筛选区 | `cs-filter-bar` | **筛选条件 / 视图切换 / 标签切换 / 排序**等内容查询操作 | 新建 / 全局搜索（若 `cs-content-header` 已有搜索） |

### 互斥规则

- `cs-content-header` 与 `cs-filter-bar` **不得放置重复功能**。
- **搜索**：默认在 `cs-content-header.slot-right`；若 `cs-filter-bar` 已使用 `data-variant="search"` 变体，则 `cs-content-header.slot-right` 不再放搜索。
- **视图切换**（卡片/网格/列表/看板/甘特图等）：**只在** `cs-filter-bar`，不得放入 `cs-content-header.slot-right`。
- **筛选**（下拉条件、状态计数、标签切换）：**只在** `cs-filter-bar`。
- **新建 / 主 CTA**：**只在** `cs-navbar.slot-action`，不得放入 `cs-content-header.slot-right`。

页面装配时，违反任一条互斥规则视为骨架错误，需 page-agent / fragment-agent 重新分流。

---

## 目录结构

```
fragment/
├── fragment.css          所有布局容器的统一样式文件
├── layout/               主框架骨架（预览 HTML）
├── tab-bar/              顶部标签栏（预览 HTML）
├── sidebar/              一级侧边栏（预览 HTML）
├── navbar/               二级导航面板（预览 HTML）
├── content-header/       内容区顶栏（预览 HTML）
├── filter-bar/           筛选栏（预览 HTML）
├── drawer/               抽屉面板（预览 HTML）
├── modal/                模态弹窗（预览 HTML）
├── index.html            布局容器总览页（标准参考）
├── test-nav.html         导航测试页
└── RULES.md              本文件
```

## 样式文件

所有布局容器的样式统一写在 `fragment/fragment.css` 中，各子目录仅保留预览 HTML。

页面引用方式：
```html
<link rel="stylesheet" href="../../fragment/fragment.css">
```

### 配套文件：page-shell.css

`css/page-shell.css` 是 fragment.css 的**桥接补丁**，专门解决「fragment 骨架仍可用但部分子组件已被删除」的场景。任何使用 fragment 整套骨架的业务页面**都必须 link 它**：

```html
<link rel="stylesheet" href="../../css/page-shell.css">
```

补丁覆盖范围（仅 4 块，全部在 tabbar 内）：

| 已删 cs- 组件 | 桥接 class（page-shell.css 提供） | 必须复刻的内部布局（来自原组件 RULES） |
|---|---|---|
| `<cs-window-control>` | `.tabbar .win-ctrl` + 3 个 `.ctrl-dot[data-c="close|min|max"]` | gap:6px / 三色 macOS 圆点 |
| `<cs-tab>` | `.tabbar .page-tab` / `.page-tab.is-active` / `.page-tab[data-active]` + 子 `.tab-label` `.tab-close` | **`justify-content: space-between`**（文字左 / 叉号右）— 原组件 SPACE_BETWEEN，漏了会左挤 |
| `<cs-search-trigger>` | `<cs-search-input class="ah-top-search">`（透明底 + 半透明边框） | 232×30 / `display:inline-flex` / `gap:8px`（图标 + 输入框） |
| 通知铃 + 红点角标 | `.tabbar .notice-wrap` + `.notice-icon` + `.notice-badge` | `notice-wrap` 必须 `position:relative`，红点 `position:absolute` 偏移 -4/-7 |

### 🚫 桥接铁律：必须复刻原组件的**内部布局**，不只是尺寸/颜色

写或改 `page-shell.css` 时，必须先读被替代组件的 `RULES.md` / `.css` 找到下列**关键属性**全部抄过来：

| 属性 | 为什么必复刻 |
|---|---|
| `display` / `flex-direction` | 决定子元素堆叠方向 |
| `justify-content` / `align-items` | 决定子元素对齐（**最容易漏**，如 cs-tab 的 SPACE_BETWEEN）|
| `gap` | 决定子元素间距 |
| 子元素的 `.label` / `.close` 等 sub-class 样式 | 桥接组件要支持原 HTML 的子元素结构 |
| `position` 链（如 wrap/badge） | 决定绝对定位锚点 |

#### 历史反例（曾导致样式 bug）

| 桥接组件 | 漏掉的属性 | 症状 | 修补 |
|---|---|---|---|
| `.page-tab`（替代 `cs-tab`） | `justify-content: space-between` + `.tab-label`/`.tab-close` 子样式 | 文字 + 叉号挤在一起靠左 | 补 `space-between` + `.tab-label{flex:1}` + `.tab-close{flex-shrink:0}` |

写桥接前的 checklist：
1. 找到原组件 `RULES.md`（或 git 历史中的 `.css`）
2. 列出 ① 容器 display/flex 属性 ② 子元素 class 列表 ③ 各子元素样式
3. 一条一条抄进 page-shell.css，并在 PR 里贴出原文档对照截图
4. 写完后**视觉对比**至少 1 个使用该组件的现役页面，文字/图标位置必须 1:1

**page-shell.css 不再覆盖 sidebar / navbar 内部子元素** — 这些一律用 fragment.css 的官方 class（见下"page shell 写法清单"）。

## ⚠️ page shell 写法清单（强约束，1:1 还原 baseline）

写任何使用 fragment 整套骨架的页面时，**严禁自创 class**。如需业务 chrome（如审批分类、存储计数、消息红点），**优先 link 同模块 baseline 页面的 .css**：

```html
<link rel="stylesheet" href="../../pages/<同模块 baseline>/<同模块 baseline>.css">
```

例如审批类页面 link `pages/approval-home/approval-home.css`，文档库类页面 link `pages/doc-library-home/doc-library-home.css`，依此类推。

### 各容器内必须使用的 fragment.css 官方 class

| 容器 | 必用 class |
|---|---|
| `.tabbar` | `.top-left` / `.top-right`（或别名 `.tabbar-left` / `.tabbar-right`） |
| `<cs-sidebar>` | `.logo` `.logo-text` `.nav` `.nav-group` `.nav-item` `.nav-icon` `.nav-label` `.divider`；选中态 `data-active` |
| `<cs-navbar>` | `.inner` + 6 个 slot：`.slot-header` / `.slot-action` / `.slot-nav` / `.slot-sub` / `.slot-admin` / `.slot-bottom` |
| `<cs-content-header>` | `.slot-left` / `.slot-right` |

### 历史反例（曾导致样式漂移的自创 class，禁止再用）

| 自创 class | 应换成 |
|---|---|
| `.nav-link` | `.nav-item` + `.nav-icon` + `.nav-label`（fragment.css） |
| `.nb-item` `.nb-count` `.nb-section-title` | `.side-item` `.sub-item` `.group-title`（baseline approval-home.css） |
| 自定义 navbar slot-action 全宽按钮 | 用 `<cs-button data-variant="primary" data-size="lg">`（baseline 已通过 `.slot-action cs-button { width:100% }` 强制全宽） |

## 页面层禁止覆盖 fragment 间距（强约束）

fragment 容器 / 槽位的 **`padding` / `margin` / `gap` / `width` / `height`** 由 `fragment.css` 单一持有，**严禁在页面 `index.css` 里覆盖**。

具体禁止：

| 禁止写法 | 应做 |
|---|---|
| `cs-navbar { padding: ... }` / `cs-navbar .inner { gap: ... }` | navbar 外 padding 8px、inner gap 16px 都由 fragment.css 提供；如需调整反馈 fragment-agent 改 fragment.css |
| `cs-navbar .slot-header { padding-bottom: ... }` / `.slot-action { margin-top: ... }` 等给槽位加 padding/margin | 槽位间距由 `.inner` 的 `gap` 统一控制；想让某段更松或更紧 → 改 fragment.css 的 gap，不要在 page 层 patch 单个槽位 |
| `cs-content-header { padding: ... }` / `.slot-left { gap: ... }` | content-header 几何（H:64 p:0,16）由 fragment.css 持有 |
| `cs-filter-bar { margin: ... }` / `.filter-left { gap: ... }` | filter-bar margin/padding/gap 由 fragment.css 持有，包括各 variant 的内部对齐 |
| 在页面层写 `height: 32px` 等硬编码控件高度 | 见 §6 内部控件高度一致：用组件默认或调 `data-size` 档位 |

**允许在 page 层做的**：

- 给**业务自创的私有 class**（如 `.task-kpi-card` / `.task-shortcut__icon` 等）设 padding / margin / gap
- 给业务内容容器（`.main-content` 内自己包的 `.task-scroll` / `.task-grid` 等）设间距
- 给 cs- 组件用 `data-variant` / `data-size` 切换组件库已提供的尺寸档

**理由**：fragment 间距一旦在多个页面被各自 patch，后续要全站调整就得逐页扫描；保持单一持有可以让"改 fragment.css → 所有页面同步生效"成立。

如果默认间距确实不符合业务需要，应反馈 fragment-agent 调整 fragment.css（连带更新 fragment.md 规范），而不是在页面层叠加补丁。

## 基本规则

1. 布局容器使用 `cs-` 前缀自定义标签，和组件一致
2. 布局容器 = 布局外壳 + 槽位（slot），内部内容由页面填充
3. 布局容器只负责定位和尺寸，不负责业务逻辑和内容样式

## 页面引用规则（核心）

生成任何业务页面时，必须以 `fragment/index.html` 为标准参考，完整引用布局结构。

### 不可修改的区域

以下区域**原样复制，禁止修改结构、尺寸、样式**：

| 区域 | 标签 | 规范要求 |
|------|------|---------|
| 标签栏 | `.tabbar` | 原样引用（window-control + 搜索框 + tab 标签 + 通知 + 头像），H:56 |

### 结构不变、内容按业务替换的区域

以下区域**外壳结构、尺寸、样式完全按照布局规范**，仅内部文字/图标/按钮按业务场景替换：

| 区域 | 标签 | 规范要求 |
|------|------|---------|
| 一级导航 | `<cs-sidebar>` | W:97，logo + nav-group + nav-item 结构不变，仅替换图标和文字 |
| 二级导航 | `<cs-navbar>` | W:232，`<cs-navbar> > .inner` + 六个槽位结构不变，内部导航项按业务组合 |
| 内容区顶栏 | `<cs-content-header>` | H:64，slot-left + slot-right 结构不变，底部 1px 边框，内部标题/按钮按业务替换 |
| 筛选区 | `<cs-filter-bar>` | flex 布局不变，上下间距 4px，内部筛选项按业务替换（不需要时可省略） |
| 内容区 | `.main-content` | flex:1 + min-height:0 + flex-direction:column 不变，内部填充业务内容 |

## 主内容区间距规则

`.main-content` 内部各区域的间距和边距规范：

| 区域 | 间距/边距 | 说明 |
|------|---------|------|
| `<cs-content-header>` | 底部 border 1px `var(--cs-color-border)` | 标题栏与下方内容的分隔线 |
| `<cs-filter-bar>` | margin: 4px 0（`var(--space-2xs)`），padding: 0 16px | 筛选区上下 4px 间距，左右 16px 内边距 |
| 业务内容区 | padding: 0 16px（`var(--space-md)`） | 内容区左右 16px 边距，与筛选区对齐 |
| 底部状态栏 | H:18，flex-shrink:0 | 固定高度，不可收缩 |

**所有水平内边距统一为 16px（`var(--space-md)`）**，确保内容区顶栏、筛选区、业务内容区左右对齐。

## 整体布局层级

```
cs-layout（100% × 100vh）
├── .tabbar                    — 标签栏 H:56（不可修改）
└── .body                      — 主体区 flex row（padding-right: 8px 留视觉间隔）
    ├── cs-sidebar             — 一级导航 W:97（结构不变，图标文字可换）
    └── .content-wrapper       — 内容包裹 flex:1 r:8
        ├── cs-navbar          — 二级导航 W:232（结构不变，内容按业务）
        └── .main-content      — 主内容区 flex:1（结构不变，内部按业务）
            ├── cs-content-header  — 顶栏 H:64 border-bottom p(0,16)
            ├── cs-filter-bar      — 筛选区 margin:4px 0 p(0,16)
            ├── 业务内容区         — flex:1 p(0,16) 滚动
            └── 底部状态栏         — H:18 固定
```

## 与 components 的区别

- **fragment/**：布局容器壳（sidebar、navbar、drawer），负责定位和尺寸
- **components/**：原子/分子组件（button、checkbox、tag），负责内容和交互

页面通过 fragment 搭骨架，用 components 填内容。

---

## 1. layout（主框架布局）

标签：`<cs-layout>`　|　数据来源：Figma 节点 21:1266

### 分层架构

```
cs-layout 100%×100vh r:0 VERTICAL overflow:hidden
├── .tabbar        W:FILL  H:FIXED(56)
└── .body          W:FILL  H:FILL grow:1 min-height:0  padding-right:8px
    ├── .sidebar   W:FIXED(97)  H:FILL
    └── .content-wrapper  W:FILL H:FILL grow:1 min-height:0 r:8 overflow:hidden
        ├── cs-navbar / .navbar-container  W:FIXED(232) H:FILL
        └── .main-content  W:FILL H:FILL grow:1 min-height:0
            ├── slot-topbar    H:FIXED(64)
            ├── slot-filter    H:FIXED(40)
            ├── slot-content   H:FILL grow:1
            └── slot-bottom    H:FIXED(18)
```

### 精确数据

| 容器 | 尺寸 | 自适应 | 间距 | 背景 | 圆角 |
|------|------|--------|------|------|------|
| 根 | 100%×100vh | W:FILL H:FILL | — | — | r:0 |
| tabbar | Wx56 | W:FILL H:FIXED | p(6,16,6,16) g:8 | bg(#2C2A3A) | — |
| body | WxH | W:FILL H:FILL grow:1 min-height:0 | p(0,8,8,0) | bg(#2C2A3A) | — |
| sidebar | 97xH | W:FIXED H:FILL | p(12,16,16,16) g:24 | bg(#2C2A3A) | — |
| content-wrapper | WxH | W:FILL H:FILL grow:1 min-height:0 | — | — | r:8 |
| cs-navbar | 232xH | W:FIXED H:FILL | — | bg(#F7F9FC) | — |
| main-content | WxH | W:FILL H:FILL grow:1 min-height:0 | — | bg(#fff) | — |

### 高度自适应规则

- **`min-height: 0`** 必须设在 `.body`、`.content-wrapper`、`.main-content` 上
- **`overflow: hidden`** 设在 `cs-layout` 根容器和 `.content-wrapper` 上
- **内容滚动** 只在 `.main-content` 内部的滚动容器中进行
- 页面 body 需要：`body { margin: 0; padding: 0; overflow: hidden; height: 100vh; }`

### 自适应规则

- **W:FILL** = 宽度撑满（flex: 1）
- **H:FILL grow:1** = 高度撑满（flex: 1）
- **W:FIXED / H:FIXED** = 固定像素
- **min-height:0** = 约束 flex 子元素不超出父容器

### 交互定位规则

所有页面级交互元素的定位边界是 `.main-content`（position: relative）：
- 抽屉：从 .main-content 右侧滑出
- 弹窗遮罩：覆盖 .main-content

---

## 2. tab-bar（标签栏）

标签：`<cs-tabbar>` 或 `<div class="tabbar">`　|　数据来源：Figma 节点 15:61496

W:FILL H:FIXED(56)，bg(#2C2A3A)，p(6,16) g:8 HORIZONTAL SPACE_BETWEEN。

### 结构

```
tabbar W:FILL H:FIXED(56) SPACE_BETWEEN
├── 左侧组  W:HUG g:8
│   ├── 窗口控制  W:65px margin-right:8px
│   ├── 搜索框    W:FIXED(232)
│   └── 标签区    W:HUG — cs-tab 160×44（选中 tab 带关闭按钮 cses-cross）
└── 右侧组  W:HUG g:14
    ├── 通知铃铛  cses-tongzhi 20px（可带红色角标）
    └── 用户头像  cs-avatar xs circle
```

### 右侧组规则

右侧组只包含**通知铃铛 + 用户头像**，不放消息图标。通知铃铛可带红色数字角标。

### 生产页面推荐类名（强约束）

为避免页面各自覆盖导致样式漂移，业务页面 tabbar 必须优先使用以下标准类名：

- 左侧组：`.tabbar-left`（或兼容旧写法 `.top-left`）
- 右侧组：`.tabbar-right`（或兼容旧写法 `.top-right`）
- 窗口控制：`.tabbar-window-control`
- 搜索框：`.tabbar-search`
- 通知容器：`.tabbar-notice`
- 角标：`.notice-badge`

> 以上类名由 `fragment/fragment.css` 提供统一样式，页面层禁止再次改写这些类的几何参数。

### 搜索框防错规则（强约束）

1. tabbar 搜索框必须使用 `cs-search-input.tabbar-search`。
2. 即使使用 `data-variant="gray"`，在 tabbar 中也必须是**透明底 + 半透明边框**。
3. 禁止在页面 CSS 中为 tabbar 搜索框再次设置背景色（白底/灰底）。

### 几何参数固定值（强约束）

以下参数在业务页面中不得改动：

- `window-control`: `width: 65px`, `margin-right: 8px`
- `search-input`: `232x30`, `padding: 4px 16px`
- `left-group gap`: `8px`
- `right-group gap`: `14px`
- `notice-icon`: `20px`
- `notice-badge`: `top:-4`, `right:-7`, `16x16`, `font-size:10`

### 对齐规则

**搜索框左边缘必须与下方 navbar 左边缘对齐。**
sidebar(97px) = padding-left(16) + 窗口控制(65) + margin-right(8) + gap(8) = 97px ✓

### 验收清单（tabbar）

每次新页面出图后，至少检查以下 5 项：

1. 标签栏高度是否为 `56`
2. 窗口控制是否为 `65 + mr8`
3. 搜索框是否为 `232x30` 且“仅边框无底色”
4. 右侧组间距是否为 `14`
5. 通知角标位置与尺寸是否为 `-4/-7 + 16x16`

### Figma 精确数据

| 元素 | 尺寸 | 间距 | 背景 | 字体 |
|------|------|------|------|------|
| tabbar | W:FILL×56 | p(6,16) g:8 | #2C2A3A | — |
| 窗口控制 | 65×16 | 三点 16×16 gap:6 | 红#FF6E5C 黄#F4BE4F 绿#61C654 | — |
| 搜索框 | 232×30 | p(4,16) | 透明 border:rgba(255,255,255,0.15) | 14px/400 #999 |
| Tab | 160×44 | p(8,16) SPACE_BETWEEN | #413F50 | 14px/400 #FFF |
| 通知图标 | 24×24 | — | badge: #FF0004 | — |
| 头像 | 20×20 | — | — | — |

---

## 3. sidebar（一级侧边栏）

标签：`<cs-sidebar>`　|　数据来源：Figma 节点 64-1432

97px 宽，深色背景。p(12,16,16,16) gap:24。

### 子元素

| 元素 | 说明 |
|------|------|
| `.logo` | Logo 42x42 r:8，**背景必须 transparent**（不加任何底色，由 logo 图自身承担配色，避免双层背景遮挡） |
| `.nav` | 导航列表 gap:24 |
| `.nav-group` | 导航分组 gap:20 |
| `.divider` | 分割线 44px 宽 |
| `.nav-item` | 导航项 65x56，`data-active` 选中态 |
| `.nav-icon` | 图标容器 24x24，只放线性图标 |
| `.nav-label` | 文字 14px |

### 导航项状态

| 状态 | 背景 | 颜色 |
|------|------|------|
| 默认 | 无 | `--cs-color-icon-navprimary-default`(#8c8c8d) |
| hover | `--cs-color-bg-active-dark`(#413F50) | `--cs-color-icon-navprimary-active`(白) |
| 选中(data-active) | `--cs-color-bg-active-dark`(#413F50) | `--cs-color-icon-navprimary-active`(白) |

### 图标对照表

> 一律使用 **stratis-*** 线性图标族（`fill: none; stroke: currentColor`），与 sidebar 「只放线性图标」的子元素规则保持一致。  
> 已废弃的旧 Iconfont 中文拼音类名（如 `cses-gongzuotai1` / `cses-tianxie`）见文末"历史反例"。

| 顺序 | 导航项 | 图标类名 |
|----|--------|---------|
| 1 | 工作台 | `cses-stratis-home-01` |
| 2 | 导向 | `cses-stratis-compass` |
| 3 | 消息 | `cses-stratis-message-circle` |
| 4 | 任务 | `cses-stratis-check-square-broken` |
| 5 | 会议 | `cses-stratis-video-on` |
| 6 | 文档 | `cses-stratis-book-01` |
| 7 | 表单 | `cses-stratis-file-edit-01` |
| 8 | 审批 | `cses-stratis-file-check-01` |

#### 历史反例（曾混进过的非线性 / 非 stratis 类名）

| 错误用法 | 问题 | 修正 |
|---|---|---|
| `cses-tianxie`（"表单"用过） | 来自 Iconfont 中文拼音集，是面性图标，与线性 sidebar 风格冲突 | 改 `cses-stratis-file-edit-01` |
| `cses-stratis-eye-open`（"文档库"用过） | 字体 SVG 源不完整，缺主轮廓，只渲染瞳孔小圆点 | 改 `cses-stratis-book-01`（语义也更对） |

---

## 4. navbar（二级导航面板）

标签：`<cs-navbar>`　|　数据来源：Figma 节点 34-3418、37-1363

灰底(#F7F9FC) + 白色圆角内卡 + 六个区域槽位。W:232 由 layout 控制。

### 六个区域

```
cs-navbar（p:8 bg:#F7F9FC）
└── .inner（bg:#fff p(8,8,0,8) gap:16 r:12）
    ├── ① .slot-header  — 标题+副标题
    ├── ② .slot-action  — 新建按钮（蓝色主色，页面级主 CTA）
    ├── ③ .slot-nav     — 主菜单（固定高度，不可滚动）
    ├── ④ .slot-sub     — 副菜单（flex:1 可滚动）
    ├── ⑤ .slot-admin   — 后台管理入口
    └── ⑥ .slot-bottom  — 存储空间
```

每个区域不一定都有，按业务所需放置。

### slot-action 职责（强约束）

`slot-action` 是页面**唯一的主操作 CTA 入口**，承担"新建 / 上传 / 发起"类页面级核心动作：

- **必用组件**：`<cs-button data-variant="primary" data-size="lg">`（主色蓝、大号），需要全宽时在本页 `index.css` 写 `.slot-action cs-button { width: 100% }`。
- **典型示例**：「+新建任务」「+上传文档」「+发起审批」「+新建会议」。
- **禁止内容**：
  - 视图切换（卡片/列表/看板/甘特图）→ 应在 `cs-filter-bar`
  - 筛选 / 排序 / 标签切换 → 应在 `cs-filter-bar`
  - 全局搜索 → 应在 `cs-content-header.slot-right`（或 `cs-filter-bar[data-variant="search"]`，两者互斥）
  - 多个并列按钮 → 主 CTA 只放 1 个；次要操作下放到内容头部或筛选区对应位置

### ① 标题区（slot-header）规则

标题区必须包含**主标题 + 副标题描述**，结构如下：

```html
<div class="slot-header" style="display:flex;flex-direction:column;gap:4px;">
  <div style="display:flex;align-items:center;justify-content:space-between;">
    <span style="font-size:16px;font-weight:600;color:#333;">业务名称</span>
    <img src="../../assets/icon-nav-collapse.svg" width="16" height="16" alt="收起">
  </div>
  <span style="font-size:12px;color:#999;">一句话业务描述</span>
</div>
```

各业务标题与描述：

| 业务 | 标题 | 副标题描述 |
|------|------|---------|
| 文档库 | 文档库 | 智能文档，让协同创作更高效 |
| 项目管理 | 项目管理 | 高效协作，轻松管理项目任务 |
| 会议 | 会议 | 随时随地，高效开会 |

### 导航项状态（③区一级菜单）

| 状态 | 背景 | 图标/文字颜色 | 圆角 |
|------|------|---------|------|
| 默认 | 无 | #333333 | r:8 |
| 选中/悬停 | rgba(72,87,226,0.08) | #4857E2 | r:8 |

### 不同业务拼装示例

- **文档库**（①②③④⑤⑥ 全用）：标题"文档库"+描述+`slot-action`"+ 上传文档"+菜单+空间列表+管理后台+存储空间
- **任务管理**（①②③）：标题"项目管理"+描述+`slot-action`"+ 新建任务"+我的任务/全部任务/已完成/收藏
- **会议**（①②③）：标题"会议"+描述+`slot-action`"+ 新建会议"+会议首页/我的会议/日程/纪要

---

## 5. content-header（内容区顶栏）

标签：`<cs-content-header>`　|　数据来源：Figma 节点 82:1250

W:FILL H:FIXED(64)，bg(#fff)，p(0,16)，底部边框 1px #E6E6E6。

### 结构

```
cs-content-header H:64 p(0,16) bg:#fff border-bottom:#E6E6E6
├── .slot-left  — 标题 / 面包屑（flex:1）
└── .slot-right — 搜索（flex-shrink:0），仅放 cs-search-trigger / cs-search-input
```

### slot-right 只放搜索（强约束）

`cs-content-header.slot-right` **只能**放置以下两种之一：

- `<cs-search-trigger>` — 触发型搜索按钮（150x32 灰底，文字"搜索"+ 搜索图标），点击后展开为输入框 / 弹出搜索面板。
- `<cs-search-input>` — 直接的搜索输入框（已展开态）。

**禁止**在 `slot-right` 放置：

- 视图切换（列表/看板/甘特图等）→ 应在 `cs-filter-bar`
- 筛选 / 排序按钮 → 应在 `cs-filter-bar`
- 新建 / 上传 / 主 CTA → 应在 `cs-navbar.slot-action`
- 其他二级操作按钮（更多、设置、分享等）→ 按性质分别下放到 `cs-filter-bar` 或 `cs-navbar.slot-action`

> 若 `cs-filter-bar` 使用 `data-variant="search"` 变体，则 `slot-right` 留空（搜索互斥规则）。

```html
<cs-content-header>
  <div class="slot-left">
    <span class="page-title">首页</span>
  </div>
  <div class="slot-right">
    <cs-search-trigger>
      <span class="trigger-text">搜索</span>
      <i class="trigger-icon cses-sousuo"></i>
    </cs-search-trigger>
  </div>
</cs-content-header>
```

### .page-title / .page-subtitle 官方样式（强约束）

`fragment.css` 已为 `cs-content-header .slot-left` 内的标题 / 副标题定义官方样式，**业务页面禁止在 index.css 里重复定义或覆盖这两个 class 的字号 / 字重 / 颜色**。

| class | 令牌 | 渲染结果 |
|---|---|---|
| `.page-title` | `font: var(--typo-cn-18-medium)` + `font-weight: var(--font-weight-semibold)` + `line-height: 1.4` + `color: var(--cs-color-text)` | 18px / 600 / 行高 1.4 / #333333 |
| `.page-subtitle` | `font: var(--typo-cn-12-regular)` + `color: var(--cs-color-text-light2)` | 12px / 400 / 行高 20px / #999999 |

使用写法（标题 + 副标题上下叠，`:has(.page-subtitle)` 自动 column 布局）：

```html
<cs-content-header>
  <div class="slot-left">
    <span class="page-title">报销中心</span>
    <span class="page-subtitle">把每张发票变成一次顺畅的报销</span>
  </div>
  <div class="slot-right">
    <cs-search-trigger>...</cs-search-trigger>
  </div>
</cs-content-header>
```

只有标题、无副标题时，仅用 `.page-title`，布局保持水平居中（`align-items: center` 默认值生效）。

### 不同业务

- **文档库首页**：left = "首页" 18px/600，right = `cs-search-trigger`（上传 / 新建在 `cs-navbar.slot-action`）
- **文档库子页**：left = 面包屑，right = `cs-search-trigger`（上传 / 新建仍在 `cs-navbar.slot-action`）
- **任务管理**：left = "我的任务" 18px/600，right = `cs-search-trigger`（视图切换在 `cs-filter-bar`，新建任务在 `cs-navbar.slot-action`）
- **简单页面**：left = 标题，right = `cs-search-trigger`（若无搜索需求可留空）

### ⚠️ 陷阱：标题 + 副标题 上下叠（column 方向）

`fragment.css` 里 `cs-content-header .slot-left` 默认 `align-items: center`（针对单标题场景的垂直居中）。
**如果你想要标题 + 副标题上下叠**，光设 `flex-direction: column` 是不够的——
`align-items: center` 在 column 方向下变成**水平居中**，标题不靠左。

正确写法（页面级 index.css 必须复刻这个特异性，至少和 fragment 持平）：

```css
/* ✅ 正确：cs-content-header 前缀盖住默认 align-items */
cs-content-header .slot-left {
  flex-direction: column;
  align-items: flex-start;        /* 关键：column 下要 flex-start，否则标题被横向居中 */
  gap: var(--space-3xs);
}
```

```css
/* ❌ 错误：特异性不够，align-items: center 没被盖住 */
.slot-left {
  flex-direction: column;
  gap: var(--space-3xs);
}
```

历史教训：审批页 plan-1/2/3 + 会议页 plan-2/3 都因为这个写错过。

---

## 6. filter-bar（筛选栏）

标签：`<cs-filter-bar>`

### 间距规则

筛选区与上方 `<cs-content-header>` 和下方业务内容区之间各保持 **4px** 间距（`var(--space-2xs)`）。通过筛选区自身的 margin 实现。

### 与 content-header / navbar 的职责互斥（强约束）

三者职责严格切分，违反任一条视为骨架错误：

| 区域 | 容器 | 承担 | 禁止 |
|---|---|---|---|
| 二级导航 | `cs-navbar.slot-action` | 新建 / 主操作 CTA | 视图切换 / 筛选 |
| 内容头部区 | `cs-content-header` | 标题 / 面包屑 + 搜索 | 视图切换 / 筛选 / 新建 / 其他操作按钮 |
| 筛选区 | `cs-filter-bar` | 筛选 / 视图切换 / 标签切换 / 排序 | 新建 / 全局搜索（若 content-header 已有搜索） |

具体细则：

- **筛选 / 视图切换 / 标签切换 / 排序**：均**只在** `cs-filter-bar`，不可上移到 `cs-content-header.slot-right`。
- **新建 / 主 CTA**：**禁止**放在 `cs-filter-bar`，必须放在 `cs-navbar.slot-action`。
- **搜索互斥**：
  - 默认搜索在 `cs-content-header.slot-right`，筛选区不再放搜索。
  - 若使用 `cs-filter-bar[data-variant="search"]`，则 `cs-content-header.slot-right` 留空，二者只能选其一。
  - 任何情况下不得在 content-header 与 filter-bar 中同时出现搜索框。

### 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-variant` | `tabs`(默认) / `dropdowns` / `filters` / `search` | 四种业务变体 |

### 通用结构

```
cs-filter-bar
├── .filter-left  — 左侧内容（flex:1）
└── .filter-right — 右侧工具（flex-shrink:0）
```

### 内部控件高度一致（强约束）

filter-bar 同行的所有控件（`.filter-tab` / `.filter-count` / `cs-select` / `cs-button` / `cs-view-switcher` / `.filter-tool` / 搜索输入框等）必须**视觉高度一致**，但**不强制写死具体像素值**：

- 优先使用各组件的**默认高度**让它们自然对齐（多数控件默认 `--cs-sem-size-interactive-sm` = 32px，或同档的视觉高度）
- 若某个控件高度偏离同行，调整该组件的**尺寸档**（`data-size="sm"` / `"md"` / `"lg"` 之类）使其落到与同行一致的档位，而不是在页面层强写 `height: 32px`
- **禁止**在页面 `index.css` 里给 `cs-filter-bar` 内任一控件硬编码 `height` 覆盖组件默认 —— 一旦组件库后续统一调档，这种页面层硬编码会变成需要全站重扫的样式漂移源
- 实在没有合适档位让组件天然对齐时，应反馈给 component-agent 在组件层加变体，而不是在页面层 patch

> 与 content-header.slot-right 的"32px 对齐搜索"是不同语境：那是为了与搜索框同高的**确定值约定**；filter-bar 这里是**一致即可**，让组件默认尺寸决定具体值。

### 变体一：tabs（标签切换）

数据来源：Figma 节点 82:1266。适用于文档库首页等。

左侧：标签切换（最近更新 / 最近使用 / 我的收藏），选中项蓝色文字
右侧：视图切换图标（卡片/网格/列表/详情）+ 分割线 + 更多按钮

```
cs-filter-bar[data-variant="tabs"]
├── .filter-left  — 标签项（选中项蓝色+底线）
└── .filter-right — 视图切换图标组 | 更多
```

#### .filter-tab 推荐写法（强约束）

每一项标签**必须**用 `<button class="filter-tab" type="button">`（无障碍），不要用 `<span>` / `<a>`。
激活态用 `data-active` 布尔属性，**不要**自己加 `::after` 伪元素画下划线。

```html
<cs-filter-bar data-variant="tabs">
  <div class="filter-left">
    <button class="filter-tab" data-active type="button">待我处理</button>
    <button class="filter-tab" type="button">我发起的</button>
  </div>
</cs-filter-bar>
```

#### .filter-tab 下划线的实现机制（**禁止重复实现**）

激活态下划线由 **`fragment.css` 的 `border-bottom: 2px solid var(--cs-color-primary)`** 提供。
`fragment.css` 已内置 `<button>` 默认值的清理（`appearance:none / border:0 / border-radius:0 / background:transparent`），保证下划线为直角直线。

页面层 **禁止** 出现以下任一写法（历史 bug 全在这里）：

| 错误写法 | 后果 |
|---|---|
| `.filter-tab[data-active]::after { ... }` 画下划线 | 与 `border-bottom` 双下划线叠加 |
| `.filter-tab { border: 0 }` | 把 `border-bottom` 一起干掉，下划线消失 |
| `.filter-tab { border-radius: var(--radius-...) }` | 下划线两端变圆头 |
| `.filter-tab { background: var(--cs-color-...) }` 给非激活态加底色 | 视觉变 segmented control，偏离 tabs 设计 |

如确有视觉差异需求（如带数字角标的 `.badge` / `.filter-count`），仅添加角标本身的样式，**不要**碰 `.filter-tab` 主体的 border / radius / background。

### 变体二：dropdowns（下拉筛选组）

数据来源：Figma 节点 82:1300。适用于人事考勤、日程等。

左侧：多个下拉筛选器（职位范围 + 周期 + 日期范围 + 负责人）
右侧：无

```
cs-filter-bar[data-variant="dropdowns"]
├── .filter-left  — 下拉筛选器组（select + date-picker 等）
└── .filter-right — （通常为空）
```

### 变体三：filters（标签+下拉混合）

数据来源：Figma 节点 82:1399。适用于任务管理等。

左侧：计数标签（全部 5 / 即将过期 4，选中项蓝色）+ 下拉筛选组（分组/时间范围/优先级/项目/任务合集）
右侧：筛选图标 + 设置图标

```
cs-filter-bar[data-variant="filters"]
├── .filter-left  — 计数标签 + 下拉筛选器组
└── .filter-right — 筛选 + 设置图标
```

### 变体四：search（搜索+工具）

数据来源：Figma 节点 82:1463。适用于通讯录、人员管理等。

左侧：搜索输入框（"请输入姓名、手机号..."）
右侧：筛选图标 + 设置图标

```
cs-filter-bar[data-variant="search"]
├── .filter-left  — 搜索输入框
└── .filter-right — 筛选 + 设置图标
```

> 使用本变体时，`cs-content-header.slot-right` 必须留空（搜索互斥）。

### 业务选择指南

| 业务场景 | 推荐变体 | 说明 |
|---------|---------|------|
| 文档库首页 | `tabs` | 标签切换文档分类 + 视图切换 |
| 任务管理 | `filters` | 状态计数 + 多维度筛选 |
| 人事考勤/日程 | `dropdowns` | 多个下拉条件组合 |
| 通讯录/人员列表 | `search` | 搜索为主 + 筛选辅助（此时 content-header 不放搜索） |

---

## 7. drawer（抽屉面板）

标签：`<cs-drawer>` + `<cs-drawer-overlay>`

从 `.main-content` 右侧滑出，position: absolute。

### 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-open` | 布尔 | 打开 |
| `data-width` | sm/md/lg/xl/full/task | 400 / 560 / 720 / 960 / 撑满 / **633（任务详情专用，左侧 16px 圆角 + 左侧投影）** |

### 结构

```
cs-drawer-overlay（遮罩 data-visible 显示）
cs-drawer
├── .slot-header — 头部（标题+关闭）
├── .slot-body   — 内容（flex:1 可滚动）
└── .slot-footer — 底部（按钮）
```

---

## 8. modal（模态弹窗）

标签：`<cs-modal>`

覆盖 `.main-content`，position: absolute，居中显示。

### 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-open` | 布尔 | 打开 |
| `data-size` | sm/md/lg | 480/640/800 |

### 结构

```
cs-modal（遮罩+居中）
└── .dialog（白色圆角卡片）
    ├── .slot-header — 标题+关闭
    ├── .slot-body   — 内容（flex:1 可滚动）
    └── .slot-footer — 底部按钮（右对齐）
```

---

## 布局容器索引（8 个）

| 容器 | 标签 | 尺寸 | 说明 |
|------|------|------|------|
| layout | `<cs-layout>` | 100% × 100vh | 主框架骨架 |
| tab-bar | `.tabbar` | W:FILL × H:56 | 顶部标签栏 |
| sidebar | `<cs-sidebar>` | W:97 × H:FILL | 一级侧边栏（深色） |
| navbar | `<cs-navbar>` | W:232 × H:FILL | 二级导航面板（灰底白卡） |
| content-header | `<cs-content-header>` | W:FILL × H:64 | 内容区顶栏 |
| filter-bar | `<cs-filter-bar>` | W:FILL × H:40 | 筛选栏 |
| drawer | `<cs-drawer>` | W:400~960 / 633(task) × H:FILL | 抽屉面板 |
| modal | `<cs-modal>` | 480/640/800 × auto | 模态弹窗 |
