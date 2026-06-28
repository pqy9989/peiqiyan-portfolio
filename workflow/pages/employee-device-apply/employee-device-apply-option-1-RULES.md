# pages/employee-device-apply-option-1 装配规则

> 装配目标：员工设备申请 · option-1 套餐卡片墙方案
> 关联 REQ：`requirements/employee-device-apply-2026-06-26/employee-device-apply-req.md`
> 关联 PROTO：`requirements/employee-device-apply-2026-06-26/proto/option-1.md`
> 状态：完成（无阻塞）

## 1. 结构骨架（按 PROTO option-1.md）

```
tabbar
├ sidebar（一级：设备入口 data-active）
└ content-wrapper
   ├ navbar（二级导航）
   │   ├ slot-header：标题「设备申请」+ 副标题
   │   ├ slot-action：唯一主 CTA「+ 新建申请」(primary)  ◀── 唯一主 CTA 落位
   │   ├ slot-nav：4 项（套餐选择 data-active / 我的申请 / 设备目录 / 草稿箱）
   │   ├ slot-sub：新员工提示卡
   │   ├ slot-admin：IT 资产后台
   │   └ slot-bottom：联系 IT 支持
   └ main-content
      ├ cs-content-header
      │   ├ slot-left：标题「套餐选择」+ 副标题（自动 column，触发 :has(.page-subtitle)）
      │   └ slot-right：cs-search-trigger（不放主 CTA）✅
      ├ cs-filter-bar[data-variant="tabs"]
      │   ├ filter-left：7 个 .filter-tab（全部 / 草稿 / 待审批 / 已批准 / 发货中 / 已领取 / 已驳回）
      │   └ filter-right：filter-tool「岗位筛选」
      └ .eda-scroll（滚动主区）
          ├ .eda-section「推荐套餐」(eda-package-grid · 4 张卡片墙)
          ├ .eda-section.eda-my「我的申请」（折叠，默认展开 · 3 条记录）
          └ .eda-bottom-tip 引导提示

   ↳ cs-drawer-overlay + cs-drawer[data-width="lg"]（点卡片 / 主 CTA 共用）
      ├ slot-header：标题 + 关闭
      ├ slot-body：套餐预览 + 表单（交付地址 / 期望到货日 / 备注 + 折叠"更多字段"）
      └ slot-footer：取消 / 保存草稿 / 提交申请(primary)
```

## 2. 复用了哪些 cs-* 组件

| 组件 | 用途 | data-* 变体 |
|---|---|---|
| `cs-layout` | 整页骨架 | — |
| `cs-sidebar` | 一级导航 | `nav-item[data-active]` 设备 |
| `cs-navbar` | 二级导航 | `slot-header / slot-action / slot-nav / slot-sub / slot-admin / slot-bottom` 全槽位 |
| `cs-content-header` | 内容头 | `slot-left:has(.page-subtitle)` 自动 column |
| `cs-filter-bar` | 状态切片 | `data-variant="tabs"` |
| `cs-search-input` | tabbar 顶部搜索 | `data-variant="gray" data-size="sm"` |
| `cs-search-trigger` | 内容头右侧搜索触发 | — |
| `cs-button` | 主 CTA 与卡片次 CTA | `data-variant="primary" / "secondary"`、`data-size="sm"` |
| `cs-tag` | 库存徽标 | `data-color="success" / "warning"`、`data-size="sm"` |
| `cs-status-badge` | 申请状态徽标 | `data-status="in-progress" / "pending" / "not-started"` |
| `cs-avatar` | tabbar 头像 | `data-size="xs" data-shape="circle" data-color="blue"` |
| `cs-drawer-overlay` + `cs-drawer` | 填表抽屉 | `data-width="lg"` |
| `cs-form-group` | 抽屉表单字段 | `data-required`、`data-direction="horizontal"`（更多字段折叠区） |
| `cs-select` | 交付地址下拉 | — |
| `cs-input` | 期望到货日 / 联系电话 / 工号 / 部门长 | — |
| `cs-textarea` | 备注 | — |

> 桥接类（page-shell.css）：`.win-ctrl / .ctrl-dot / .ah-top-search / .page-tab / .notice-wrap`

## 3. F1 字段落位（与 PROTO option-1.md 一致）

| F1 字段 | 实际落位 | 实现 |
|---|---|---|
| 套餐识别（name + suitablePositions） | 卡片头 `.eda-pkg__title` + `.eda-pkg__suit` | 4 张套餐卡片墙 |
| 设备清单 + 库存状态 | 卡片中部 `.eda-pkg__items` + 头部 `.eda-pkg__stock`（`cs-tag`） | 设备列表 + 现货/部分缺货 |
| 预估总价 + 期望到货日 | 卡片底 `.eda-pkg__price-num` + `.eda-pkg__eta`（tabular-nums） | font-variant-numeric tabular-nums |
| 申请状态徽标 + 审批进度 | "我的申请" 折叠区 `cs-status-badge` + `.eda-apply__progress` | 5 段进度（提交/部门长/IT/备货/已领取） |

## 4. 状态切换实现（filter-bar tabs）

- 用 `cs-filter-bar[data-variant="tabs"]` 自带 underline 风格的 `.filter-tab[data-active]` 视觉
- Tab 顺序严格按 REQ：**全部 / 草稿 / 待审批 / 已批准 / 发货中 / 已领取 / 已驳回**
- Tab 旁的次级计数用私有 `.eda-tab-count` 小药丸（与 active 状态联动变为主色）
- 切换交互由 interaction-agent Phase B 注 JS；HTML 仅给出钩子标记（`[data-active]` + 文本计数）

## 5. 抽屉交互钩子（domain = `eda`）

| 触发位置 | data-eda-action | 说明 |
|---|---|---|
| navbar slot-action 主 CTA | `open-drawer`（id=`navOpenDrawer`） | 打开空抽屉 |
| 套餐卡片整张 | `open-create data-eda-pkg="<id>"` | 打开抽屉并预填套餐 |
| 套餐卡片"一键领取"按钮 | `open-create data-eda-pkg="<id>"` | 同上（按钮自己挂钩子，依赖 closest 委托优先级避免冒泡） |
| 申请条目整行 | `open-detail data-eda-id="<id>"` | 详情（后续派 sub 页） |
| 申请条目"跟踪物流" | `track data-eda-id="<id>"` | 物流面板 |
| 申请条目"撤回申请" | `withdraw data-eda-id="<id>"` | 二次确认（REQ 危险操作） |
| 申请条目"继续填写" | `resume-draft data-eda-id="<id>"` | 恢复草稿 |
| "我的申请"折叠头 | `toggle-my` | 折叠/展开 body |
| drawer 头部 X | `close-drawer` | 关抽屉 |
| drawer 底取消 | `cancel-drawer` | 关抽屉 + 提示「保存草稿/放弃」 |
| drawer 底保存草稿 | `save-draft` | 草稿入库 |
| drawer 底提交 | `submit-create` | 提交 → toast → 关抽屉 → 高亮新项 `.is-new` |
| drawer 内"更换套餐" | `swap-pkg` | 切回套餐列表 |

## 6. 字段映射 · 抽屉表单

按 REQ DO 段第 3 步「补 3 个字段：交付地址、期望到货日、备注」：
- 交付地址 → `cs-form-group[data-required]` + `cs-select` 默认带 HR 工位
- 期望到货日 → `cs-form-group[data-required]` + `cs-input + calendar icon`
- 备注 → `cs-form-group` + `cs-textarea`
- 折叠"更多字段"：联系电话 / 工号 / 部门长（F2 字段，水平表单组）

## 7. 私有 CSS 前缀清单（`.eda-* / --eda-*`）

- 令牌：`--eda-card-radius / --eda-card-pad / --eda-grid-gap / --eda-section-gap / --eda-icon-{color}-bg/fg / --eda-new-highlight / --eda-text-tabular`
- 类：
  - 套餐墙：`.eda-package-grid / .eda-pkg / .eda-pkg__head/__icon/__heading/__title/__suit/__stock/__items/__foot/__price/__price-num/__eta/__cta`
  - 我的申请：`.eda-my / .eda-my__head/__caret/__title/__count/__body`、`.eda-apply / .eda-apply__main/__title/__name/__items/__hint/__progress/__step/__dot/__side/__price/__eta/__act`
  - 抽屉：`.eda-drw__head/__head-left/__title/__sub/__close/__body/__pkg/__pkg-head/__pkg-heading/__pkg-name/__pkg-suit/__pkg-price/__pkg-items/__pkg-swap/__form/__more/__more-body/__foot/__btn`
  - 杂项：`.eda-scroll / .eda-section / .eda-section__head/__title/__sub / .eda-tab-count / .eda-nav-badge / .eda-tips / .eda-bottom-tip`

## 8. 与 REQ 的偏差

| 项 | REQ 描述 | 实际 | 说明 |
|---|---|---|---|
| 推荐套餐数量 | "卡片墙 3-4 列" | 4 张 | 桌面 1440+ → 4 列；≤1280 自适应回 3 列 |
| 套餐图标 | REQ 未规定 | 用 `cses-stratis-laptop-01 / edit-01 / file-edit-01 / message-chat-01` 区分 | 业务文案中文，自填 |
| "我的申请"默认状态 | "默认折叠" | **默认展开** | 为了首屏让验收看到状态徽标 + 审批进度。可由 interaction-agent 切默认 `aria-expanded="false"` |
| 价格 | REQ 示例 `¥18,500` | 4 个套餐分别 24,800 / 28,600 / 18,500 / 12,800 | 给到价格梯度便于设计评审 |

> 上一条「默认展开」为偏差项，建议主会话确认：交付时是否切回 `aria-expanded="false"`。

## 9. 自检清单

- [x] **唯一主 CTA**：`+ 新建申请` 仅在 `navbar.slot-action` 出现，content-header `slot-right` 仅放搜索 ✅
- [x] 不同义 CTA 检查：navbar slot-action 主 CTA 名 = "新建申请"；content-header.slot-right 仅有 search-trigger（无按钮）→ **不同义** ✅
- [x] `grep var(--space-lg)`：HTML/CSS 都未使用（已使用 `--spacing-20 / --space-md` 等显式阶） ✅
- [x] `.slot-left` 未硬覆盖 `flex-direction:column`，依赖 fragment.css 的 `:has(.page-subtitle)` 自动切换 ✅
- [x] 路径前缀：pages 在 `pages/<name>/` 下用两级 `../../design/` ✅
- [x] 所有图标 class 经 `grep` 与 `design/fonts/icons-list.txt` 比对，**0 未声明** ✅
  - 注：原本想用的 `cses-stratis-monitor-01` 不存在 → 替换为 `cses-stratis-tv`（语义最接近的"显示器"图标）
- [x] 不读 `pages/` 下其他已生成页面（每页独立设计） ✅
- [x] pageType 默认 `main` —— 完整 shell + slot-nav active + 主 CTA + 抽屉交互钩子 ✅
- [x] 列表卡片 / 卡片内按钮 / 申请行 / drawer 入口 → 全部用 `data-eda-action` 钩子，**未** 包 `<a href>` 或 `e.stopPropagation()` ✅
- [x] 整张卡片可点 → `<article data-eda-action="open-create" data-eda-pkg="...">` 挂顶层；嵌入的"一键领取" `<cs-button>` 挂自己的 action，依赖 closest 优先级 ✅

## 10. 缺失组件清单（建议派 component-agent）

> 目前可用本套件 + 私有类完成全部装配，**无强阻塞**。下列为「装配过程中识别到的可复用机会」，建议主会话评估优先级。

| 建议组件 | 用途 | 推荐命名 | 必要性 |
|---|---|---|---|
| 进度条 / 步骤指示器（5 段） | "我的申请"行内审批进度（提交 → 部门长 → IT → 备货 → 已领取） | `cs-step-tracker` 或 `cs-progress-steps`（`data-step data-status`） | **中**：当前用 `.eda-apply__progress` 手搓，跨业务（审批中心、订单中心）会重复。 |
| 套餐 / 商品卡片 | 主信息密度的 3-4 列卡片墙；含 icon + 标题 + 副标题 + 列表 + 价格区 + CTA | `cs-package-card`（`data-variant="default/featured"`、`data-stock="ok/low/out"`） | **中-高**：option-1/2、HR 福利申请、IT 资产采购都可复用；目前用 `.eda-pkg__*` 手搓。 |
| 折叠分区（章节级） | 列表区"我的申请"折叠头 + body，与抽屉内 `<details>` 不同维度 | `cs-collapse-section`（`data-collapsed`） | **低**：目前用原生 `<button aria-expanded>` + CSS 已经够用。 |
| 物流跟踪/状态时间线 | option-2 物流状态字段（F1#5） | `cs-timeline` 或 `cs-shipping-track` | **低**：option-1 暂未要求 F1#5 落位；option-2 装配时再评估。 |
| 弹出提示卡片（navbar 内） | 新员工 / 套餐说明等浮层 | `cs-tip-card`（`data-variant`） | **低**：当前用 `.eda-tips` 手搓在 navbar slot-sub。 |

---

## 最终装配状态：**完成**（无阻塞）

- 4 张套餐卡片墙 + 7 个状态 tab + 折叠"我的申请" + 右抽屉，全部按 PROTO 结构骨架到位
- F1 4 个字段（option-1 不含 F1#5 物流字段）按落位表 100% 命中
- 主 CTA 唯一性、自检清单、图标白名单、私有前缀全部通过
- 偏差项 1 处（"我的申请"默认展开），其余与 REQ + PROTO 一致
