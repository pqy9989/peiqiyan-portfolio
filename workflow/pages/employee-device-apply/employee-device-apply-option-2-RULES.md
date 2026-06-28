# employee-device-apply-option-2 · 装配决策

> 关联 REQ：`requirements/employee-device-apply-2026-06-26/employee-device-apply-req.md`
> 关联 PROTO：`requirements/employee-device-apply-2026-06-26/proto/option-2.md`
> 装配方案：工作台 3 卡块并排（推荐 / 进行中 / 物流跟踪）+ 右抽屉，**无 filter-bar**
> 装配状态：完成（依赖 cs-* 组件全部存在）

## 1. 布局骨架（fragment）

| 容器 | 内容 |
|---|---|
| `<cs-layout>` | 全屏 100vh |
| `.tabbar` | 原样复制 baseline（窗口控制 + 全局搜索 + tab + 通知 + 头像） |
| `<cs-sidebar>` | 一级导航 8 项，最后一项「人事」`data-active` 选中 |
| `<cs-navbar>` | 二级导航 4 项（套餐选择 active / 我的申请 / 设备目录 / 草稿箱），`slot-action` 放唯一主 CTA `+ 新建申请` |
| `<cs-content-header>` | 标题「套餐选择」+ 副标题 + `cs-search-trigger`；**不放主 CTA**（符合 fragment 互斥规则） |
| `<main class="main-content">` 内 `.eda-workbench` | grid 3 列（1.25fr / 1fr / 1fr）放 3 个生命周期卡块，**不引入 cs-filter-bar** |
| `<cs-drawer data-width="md">` | 提交申请抽屉（560px），navbar 主 CTA + 卡块 A「一键领取」共用 |
| `<cs-drawer-overlay>` | 抽屉遮罩 |

### 关键互斥校验
- ✅ 主 CTA「+ 新建申请」**仅在** `cs-navbar.slot-action`
- ✅ content-header.slot-right 只放 `cs-search-trigger`
- ✅ 无 `cs-filter-bar`（option-2 用 3 卡块切片替代状态 tab）
- ✅ 没有 `.slot-left { flex-direction: column }` 这种直接覆盖，依赖 fragment.css `:has(.page-subtitle)` 自动样式

## 2. 复用的 cs-* 组件

| 组件 | 使用位置 | 变体 |
|---|---|---|
| `cs-window-control` | tabbar | 默认 |
| `cs-search-input` | tabbar 全局搜索 | `data-variant="gray" data-size="sm"` |
| `cs-tab` | tabbar 业务标签 | `data-active` |
| `cs-avatar` | tabbar 用户头像 | `data-size="xs" data-shape="circle" data-color="blue"` |
| `cs-sidebar` | 一级导航 | — |
| `cs-navbar` | 二级导航壳 | — |
| `cs-nav-item` | navbar slot-nav 的 4 项菜单 | `data-active` |
| `cs-button` | navbar 主 CTA / 卡块次 CTA / 抽屉底部 | `data-variant=primary/secondary/text`、`data-size=lg/md/sm` |
| `cs-content-header` | 内容顶栏 | — |
| `cs-search-trigger` | content-header 搜索入口 | 默认 |
| `cs-tag` | 卡块 head 计数标签 / 套餐库存状态 | `data-color=primary/success/warning/info`、`data-size="sm"`、`data-variant="text"` |
| `cs-status-badge` | 卡块 B/C 申请状态徽标 | `data-status=pending/approved/in-progress` |
| `cs-drawer` + `cs-drawer-overlay` | 右抽屉 | `data-width="md"` 560px |
| `cs-form-group` | 抽屉表单组（地址 / 期望到货日 / 备注） | `data-required` |
| `cs-input` | 期望到货日输入 | 默认 |
| `cs-select` | 交付地址选择 | 默认 |
| `cs-textarea` | 备注 | 默认 |

> 全部从 `design/components/INDEX.md` 现有清单复用，**未自创任何 cs-* 组件**。

## 3. F1 字段落位（按 PROTO 表格严格执行）

| F1 字段 | 落位 | DOM 标记 |
|---|---|---|
| 套餐识别（name + suitablePositions） | 卡块 A 主体 + B/C 顶部识别行 | `.eda-package__name` / `.eda-progress-card__title` / `.eda-shipping-card__title` |
| 设备清单 + 库存状态 | 卡块 A | `.eda-items` + 顶部 `cs-tag data-color=success/warning`（现货可领 / 3 天到货） |
| 预估总价 + 期望到货日 | 卡块 A 底部 | `.eda-package__price`（¥ 18,500，tabular-nums）+ `.eda-package__eta`（最快 07-05 送达） |
| 申请状态徽标 + 审批进度 | 卡块 B | `cs-status-badge` + `.eda-stepbar`（含 "第 2 / 4 步" + `.eda-steps` 4 节点进度条） |
| 物流状态 + 预计到货日 | 卡块 C | `.eda-ship-status`（京东物流 + 单号）+ `.eda-ship-status__eta`（预计 06-30 送达）+ `.eda-ship-timeline` 3 段时间线 |

## 4. 生命周期切片实现（option-2 的关键差异）

三卡块横排，每块承担一类信息密度：

- **A · 推荐（1.25fr）**：3 个匹配岗位的套餐（研发岗 / 销售岗 / 设计岗），各自含完整设备清单 + 库存 + 总价 + ETA + 「一键领取」次 CTA。第一张套餐 `eda-package--featured` 用主色描边 + 蓝色 shadow 强调推荐主推
- **B · 进行中（1fr）**：2 张流转中申请，每张含 `cs-status-badge`（待审批 / 已批准）+ 4 节点 stepper（提交 → 部门长 → IT → 备货）+ 元信息（审批人 / 提交时间）+ 「撤回」「查看详情」次 CTA。stepper 用 done(绿) / current(主色 ring) / 默认(灰) 三态
- **C · 物流跟踪（1fr）**：1 张运输中订单 + 物流主视觉（蓝渐变 + 卡车图标 + 单号 + 预计到货日）+ 3 段物流时间线 + 收货地址 + 「物流详情」「联系 IT」次 CTA

不再用 tab 切状态：**三类信息同屏可见**，新员工进页 → 直接看到「推荐套餐 → 已提交申请进度 → 在路上物流」三段同时呈现。

## 5. 与 option-1 的结构层面差异

| 维度 | option-1 | option-2（本页） |
|---|---|---|
| 主区结构 | `cs-filter-bar tabs` + 套餐卡片墙（grid） | 工作台 3 卡块（grid 1.25fr/1fr/1fr） |
| 状态切片 | filter-bar tab 切（全部/草稿/待审批/...） | 3 卡块按生命周期天然切片，无 tab |
| 视线动作 | tab 点击 → 列表刷新 → 视线跳动 | 三段同屏一眼可见 |
| 进入抽屉 | 点卡片 → 抽屉 / navbar CTA → 抽屉 | 点卡块 A 套餐「一键领取」 / navbar CTA → 抽屉 |
| 物流呈现 | 状态徽标 + ETA 标签 | 独立卡块 C：时间线 + 主视觉 + 物流单号 |

不是只换配色字号——结构层面 filter-bar 完全缺席，主区 grid 也不同。

## 6. 抽屉表单字段（DO 段 3 字段）

- 顶部：已选套餐预览（设备清单 + 预估总价显示在抽屉内）
- F1-3 → 表单 3 字段：
  1. 交付地址（`cs-select`，默认入职登记地址）— required
  2. 期望到货日（`cs-input`，日期）— required
  3. 备注（`cs-textarea`）— 可选
- F2 折叠的「联系电话 + 工号」放底部只读区
- 底部：保存草稿（text）+ 提交申请（primary）

## 7. 私有 CSS 命名

全部 `--eda-*` token 和 `.eda-*` class，不影响其他模块：

```
--eda-block-recommend-bg / --eda-block-progress-bg / --eda-block-shipping-bg
--eda-card-radius / --eda-card-shadow / --eda-divider
.eda-workbench / .eda-block / .eda-block__*
.eda-package / .eda-package__* / .eda-items / .eda-item
.eda-progress-card / .eda-stepbar / .eda-steps / .eda-step
.eda-shipping-card / .eda-ship-status / .eda-ship-timeline / .eda-ship-step
.eda-drawer__* / .eda-form-section / .eda-selected-pkg / .eda-contact
.eda-side-group / .eda-side-item   (navbar 副菜单)
```

间距全部走 `--space-2xs/xs/sm/md` + `--spacing-20`，未硬编码 4 的倍数。

## 8. 偏差与待 QA 关注

- **没有偏差**：F1/F2 落位、菜单 4 项、主 CTA 位置、互斥规则全部按 REQ + PROTO 执行
- 演示用 `<script>` 仅绑定抽屉打开/关闭（navbar 主 CTA + 3 个「一键领取」按钮 → open；右上 X / overlay 点击 → close），不引入任何业务 JS
- 待 QA：
  - 卡块 B stepper 在卡片宽度较窄时（option-2 grid 1fr 列 ≈ 350px 左右）的 4 节点 label 是否换行 — 现用 `white-space: nowrap` 短词避让
  - 卡块 C 物流时间线在 1 单时是否过空，目前已加 `.eda-shipping-tip` 帮助文案
  - 推荐卡块 A 主推套餐的蓝色高亮是否与 secondary `cs-button` 颜色冲突 — 当前主推卡用 primary，其它两张用 secondary 区分

## 9. 缺失组件清单（请主会话决定是否派 component-agent 新建）

经评估，**本次装配未发现强需求缺失组件**。但以下两项若主会话希望进一步组件化、可派单：

| 候选组件 | 用途 | 推荐命名 | 优先级 |
|---|---|---|---|
| 步进进度条 | 卡块 B 审批进度 4 节点 stepper（done / current / pending 三态 + 连线）目前用页面层 `.eda-stepbar` 实现 | `cs-stepper`（`data-variant="horizontal"`、`data-current="2"`） | 中（多场景可复用：审批 / 报销 / 入职流程） |
| 物流时间线 | 卡块 C 物流 3 段历史 + 主视觉条 目前用页面层 `.eda-ship-timeline` 实现 | `cs-timeline`（`data-variant="vertical"`、子项 `data-status="done/current/pending"`） | 低（垂直时间线在文档评论 / 任务日志也有需求，但语义偏物流强场景） |

不缺其他原子组件 — 所有按钮 / 标签 / 输入 / 抽屉 / 表单组都从 INDEX.md 复用。

---

## 自检清单（已逐条 ✓）

- [x] navbar slot-action「+ 新建申请」与 content-header.slot-right 不重复（content-header 只放搜索）
- [x] `grep "var(--space-lg)"` 0 命中（variable.css 已 alias 到 20px，亦未使用）
- [x] 无 `.slot-left { flex-direction: column }` 直接覆盖，副标题用 `.page-subtitle` 触发 fragment.css `:has` 自动样式
- [x] 引用路径 `../../design/...` 与两级层级匹配
- [x] 没有 cs-filter-bar（option-2 不需要）
- [x] 所有 `cses-*` 图标在 `design/fonts/icons-list.txt` 中查得到
- [x] 抽屉 + overlay 用官方 `cs-drawer` + `cs-drawer-overlay`，未自创容器
