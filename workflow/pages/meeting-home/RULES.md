# meeting-home 页面规则

会议系统首页（业务页面）。复刻 `fragment/fragment.html` 标准骨架，在 `cs-sidebar` / `cs-navbar` / `main-content` 三个槽位内装配会议业务内容。

## 文件结构

```
pages/meeting-home/
├── index.html      ← 页面骨架 + 业务标签
├── index.css       ← 本页私有 chrome 样式（仅 --mh- 前缀类）
└── RULES.md        ← 本文件
```

## 路径与引用顺序（与根 pages/ 目录的相对路径）

```html
<link rel="stylesheet" href="../../design/css/base.css">
<link rel="stylesheet" href="../../design/fonts/cses-icons.css">
<link rel="stylesheet" href="../../design/fragment/fragment.css">
<link rel="stylesheet" href="../../design/css/page-shell.css">
<!-- 组件库（按需） -->
<link rel="stylesheet" href="../../design/components/window-control/window-control.css">
<link rel="stylesheet" href="../../design/components/search-input/search-input.css">
<link rel="stylesheet" href="../../design/components/tab/tab.css">
<link rel="stylesheet" href="../../design/components/avatar/avatar.css">
<link rel="stylesheet" href="../../design/components/badge/badge.css">
<link rel="stylesheet" href="../../design/components/button/button.css">
<link rel="stylesheet" href="../../design/components/tag/tag.css">
<link rel="stylesheet" href="../../design/components/status-badge/status-badge.css">
<link rel="stylesheet" href="../../design/components/search-trigger/search-trigger.css">
<!-- 本页私有 -->
<link rel="stylesheet" href="./index.css">
```

> 路径备注：本工作区 `pages/` 位于仓库根（与 `design/` 平级），因此私有页面引用设计资源时走 `../../design/...`，而非 `page.md` 范例中的 `../../css/`、`../../fragment/`（那是在 `design/pages/` 下时的写法）。本仓库实际目录结构为 `workflow/{design, pages}` 并列。

## 框架结构（直引 fragment.html 标准布局）

```
<cs-layout>
├── .tabbar                     ← 顶部标签栏（macOS 风格三色按钮 + 全局搜索 + 标签 + 通知 + 头像）
└── .body
    ├── <cs-sidebar>            ← 一级导航（会议项 data-active）
    └── .content-wrapper
        ├── <cs-navbar>         ← 二级导航（会议菜单：首页 / 日程 / 历史 / 录制 + 个人空间）
        └── <main class="main-content">
            ├── .mh-content-header   ← 内容区头部（标题 + 日期 + 搜索触发器）
            └── .mh-scroll
                ├── .mh-quick-actions       ← 主操作区（4 张卡片）
                ├── 今日会议列表             ← 3 张 meeting-card
                └── .mh-section--cols       ← 两列：历史与录制 / 快捷功能
```

**强约束**：`cs-layout` / `.tabbar` / `cs-sidebar` / `cs-navbar` / `.main-content` 的几何参数（宽 / 高 / padding）一律不动，使用 fragment.css 官方样式。

## 调用的组件清单（来自 component-agent）

| 组件 | 标签 | 用途 | 关键属性 |
|------|------|------|---------|
| layout | `<cs-layout>` | 页面根容器 | — |
| sidebar | `<cs-sidebar>` | 一级导航 | `.nav-item[data-active]` |
| navbar | `<cs-navbar>` | 二级导航 | 用 `.inner` / `.slot-header` / `.slot-action` / `.slot-nav` / `.slot-sub` / `.slot-admin` 官方槽位 |
| window-control | `<cs-window-control>` | tabbar 三色按钮 | — |
| search-input | `<cs-search-input>` | tabbar 全局搜索 | `data-variant="gray"` `data-size="sm"` |
| tab | `<cs-tab>` | tabbar 页签 | `data-active` |
| avatar | `<cs-avatar>` | 用户头像 / 参会人 | `data-size="xs"` `data-color="blue/green/orange/purple/sky/pink/red"` |
| badge | `<cs-badge>` | navbar 日程红点角标 | `data-variant="count"` `data-color="danger"` |
| button | `<cs-button>` | 发起会议 / 加入 / 详情 | `data-variant="primary/secondary/text"` `data-size="sm"` `data-icon` |
| tag | `<cs-tag>` | "即将开始" / "有录制" / "仅记录" | `data-color="warning/primary/default"` `data-variant="text"` `data-size="sm"` |
| status-badge | `<cs-status-badge>` | 会议状态（进行中 / 未开始） | `data-status="in-progress/not-started"` |
| search-trigger | `<cs-search-trigger>` | 内容区头部搜索 | — |

**未自创组件**：所有 `cs-*` 标签均使用 component-agent 既有组件，未在 page 层重写组件样式或新建 `cs-*` 类。

## 调用的令牌清单（来自 css-agent）

仅使用既有令牌，未在 page 层硬编码颜色 / 字号 / 间距。涉及到的：

| 类别 | 变量 |
|------|------|
| 颜色 | `--cs-color-text`、`--cs-color-text-light`、`--cs-color-text-light2`、`--cs-color-text-inverse`、`--cs-color-white`、`--cs-color-primary`、`--cs-color-primary-a2`、`--cs-color-border`、`--cs-color-bg-light`、`--cs-color-bg-hover`、`--cs-sem-bg-success`、`--cs-sem-bg-warning`、`--cs-sem-status-info-light`、`--cs-sem-text-success`、`--cs-sem-text-warning`、`--cs-sem-status-info` |
| 字体 | `--typo-cn-12-regular`、`--typo-cn-12-medium`、`--typo-cn-13-regular`、`--typo-cn-14-regular`、`--typo-cn-14-medium`、`--typo-cn-16-medium`、`--typo-cn-18-medium`、`--typo-cn-20-medium`、`--font-weight-medium` |
| 间距 | `--space-3xs`、`--space-2xs`、`--space-xs`、`--space-sm`、`--space-md`、`--spacing-20`、`--spacing-24`、`--spacing-32` |
| 圆角 | `--radius-lg`、`--radius-xl`、`--radius-full` |
| 线宽 | `--line-width` |
| 图标尺寸 | `--cs-sem-size-icon-sm`、`--cs-sem-size-icon-lg`、`--cs-sem-size-icon-xl` |
| 阴影 | `--cs-shadow` |

**未新建任何 css 变量** — 全部走 css/variable.css 既有语义令牌。

## 调用的图标清单（来自 font-agent · 均为 stratis 线性）

| 图标 class | 用途 |
|-----------|------|
| `cses-stratis-search-01` | 全局搜索 / 内容区搜索 |
| `cses-stratis-x-01` | tab 关闭 |
| `cses-stratis-bell-01` | tabbar 通知 |
| `cses-stratis-home-01` | sidebar 工作台 / navbar 会议首页 |
| `cses-stratis-message-circle` | sidebar 消息 |
| `cses-stratis-video-on` | sidebar 会议 / 录制 / 发起会议卡 / 加入按钮 |
| `cses-stratis-book-01` | sidebar 文档 |
| `cses-stratis-file-check-01` | sidebar 审批 |
| `cses-stratis-plus-01` | 发起会议按钮 / 加入会议卡 |
| `cses-stratis-calendar-01` | navbar 我的日程 / 快捷-日历 |
| `cses-stratis-calendar-check` | navbar 我参与的 |
| `cses-stratis-calendar-plus` | 预约会议卡 |
| `cses-stratis-clock-backward` | navbar 历史会议 / 快捷-出席统计 |
| `cses-stratis-users-profiles-01` | navbar 我发起的 / 参会人 meta / 快捷-通讯录 |
| `cses-stratis-user-profile-01` | 主持人 meta |
| `cses-stratis-marker-01` | navbar 会议室预订 / 会议地点 / 快捷-会议室 |
| `cses-stratis-share` | navbar 共享 / 共享屏幕卡 |
| `cses-stratis-settings` | navbar 会议设置 / 快捷-会议设置 |
| `cses-stratis-microphone-01` | 快捷-设备调试 |
| `cses-stratis-link` | 会议卡复制链接（图标按钮） |
| `cses-stratis-chevron-right` | 章节"更多" |
| `cses-stratis-phone-call-01` | 历史项缩略图（仅记录） |

**未在 page 层内联 SVG 图标** — 全部走 cses-* class。

## 私有变量与命名

- 模块前缀：`--mh-*`（meeting-home 缩写），**目前未声明私有 css 变量**（所有取值均能用 `--cs-*` 满足）。如后续需要登记，请同步至 css.md §3.5 "页面前缀登记"。
- 私有 chrome 类前缀：`.mh-*`（CSLM Page 层），仅用于本页 chrome 容器 / 卡片 / 列表 / 网格的 layout 定位，不重写 `cs-*` 组件内部样式。

## 固定几何尺寸说明（QA 警告补注）

页面 chrome 中存在少量 px 字面值，**均为业务 chrome 内部的固定可视尺寸**（非颜色 / 字号 / 间距），属于 page 层允许的局部数值。逐项原因：

| px 值 | 出处 | 原因 |
|------|------|------|
| 72px | `.mh-meeting-card__time-col` 时间列宽度 | 容纳 5 位时间 (HH:MM) + duration 行的最小宽度，与卡片节奏对齐 |
| 48px | `.mh-action-card__icon-wrap` 主操作图标桶 | Figma 主行动图标桶 48×48 规格，与 avatar xl 同尺寸 |
| 40px | `.mh-history-item__thumb` 历史项缩略图 | Figma 副行动图标桶 40×40 规格，与 avatar lg 同尺寸 |
| 3px | `.mh-history-item__dot` meta 分隔点 | 元信息间分隔点固定视觉尺寸 |
| 2px / -6px | 头像描边 / 重叠偏移 | 头像群组叠放视觉效果，无对应语义令牌 |

`.mh-content-header` 高度已改为 `var(--cs-sem-size-header-height)`（64px，与 fragment.css cs-content-header 对齐）。

## 选型决策记录

1. **顶部 tabbar 全套**：直接复刻 fragment.html baseline（window-control / search-input / tab / bell-badge / avatar）。
2. **sidebar 激活态**：使用 `nav-item[data-active]`（fragment.css 已定义"会议"激活样式 = 深底白图标）。
3. **navbar 主操作按钮**：用 `cs-button[data-variant="primary"]` 全宽（width:100%），与 fragment.html "新建" 按钮一致。
4. **navbar 菜单项**：fragment.css 的 `.slot-nav` / `.slot-sub` 只提供槽位 flex 布局，菜单项本身需要业务自定 — 因此创建 `.mh-nav-link` 私有 chrome 类（不冒用组件名 `cs-nav-item`）。这是允许的 page 层私有 chrome。
5. **主操作四卡**：每张卡 = 图标桶 + 标题 + 描述，遵循 Figma 卡片常规结构（CSLM `Block`），不引入新的 `cs-*` 组件。
6. **会议卡 live 态**：用 `--cs-color-primary-a2` 淡阶渐变 + `cs-status-badge[data-status="in-progress"]`，状态文字组件化。
7. **响应式**：1200px 以下四卡 → 两卡、双栏 → 单栏，与 baseline 卡片页一致。

## 不应做的事（自检通过）

- [x] 未自创 sidebar / navbar layout class（如 `.nav-link`、`.nb-item`）— 使用 fragment.css 官方 `.nav-item` / `.slot-nav` / `.slot-sub` 等
- [x] 未硬编码颜色 / 字号 / 间距 — 全部 `var(--cs-*)`
- [x] 未内联 SVG 图标 — 全部 `<i class="cses-stratis-*">`
- [x] 未重写 `cs-*` 组件样式 — 仅通过 `data-*` 控制变体
- [x] 未修改 fragment 容器几何（tabbar 56px / sidebar 97px / navbar 232px / content-header 64px）

## 已知依赖

无外部缺失资源。所有引用的 css 文件、组件、令牌、图标在当前仓库均已存在。
