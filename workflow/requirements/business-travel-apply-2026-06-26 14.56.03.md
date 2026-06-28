# 差旅申请

> 文件：`business-travel-apply-2026-06-26.md`
> 创建时间：2026-06-26
> 状态：draft

## 修订记录

| 日期 | 修订人 | 内容 |
|---|---|---|
| 2026-06-26 | 主会话 | 首次采集（按 requirement-agent 5 层 SOP 4 轮对话） |

## WHY · 为什么存在
- **价值**：员工 3 分钟内完成出差前申请提交，领取预算进入审批流
- **不做会怎样**：走邮件/线下审批，预算无法事先冻结，财务对账困难，出差成本失控
- **上下游**：上游=待办（HR 通知/排班需要出差）；下游=审批中心 → 出差期间费用记录 → 报销中心（expense-home）

## WHO · 给谁用
- **主角色**：出差员工 · 赶时间提交（中低频，月 1-2 次，临行前才填，希望 3 分钟内提交完）
- **次角色**：—（部门长 / HR 审批由审批中心承担，不在本页范围）

## DO · 要做什么 + 怎么做
- **唯一主任务**：在抽屉里填差旅申请（基础信息 + 行程 + 费用预估）并提交审批
- **最短步骤（5 步）**：
  1. 进入页面（首屏看到模板/历史/草稿）
  2. 点击 navbar 的 "+ 新建申请" 或点击某个模板/历史项的"复用"按钮
  3. 右侧抽屉打开，预填后修改少量字段
  4. 点击抽屉底部"提交申请"
  5. toast + 抽屉关闭 + 列表刷新并高亮刚提交项
- **唯一主 CTA**：`<cs-button data-variant="primary" data-size="lg">+ 新建申请</cs-button>`，放在 `cs-navbar.slot-action`（fragment 强约束唯一入口）
- **交互形态**：**抽屉填表**（页面是列表 + 右侧抽屉），点击 navbar 主 CTA 或卡片"复用"按钮打开同一个抽屉。**不分步向导**（赶时间用户讨厌点击多次）
- **危险操作**：
  - 提交后撤回需二次确认（在审批中可撤回，已批准不可撤回）
  - 删除草稿需二次确认（不可恢复）
  - 抽屉内填到一半关闭时弹出确认：保存为草稿 / 放弃

## SHOW · 呈现什么 + 怎么组织
- **布局骨架**：列表 + 抽屉
  - `cs-layout > tabbar + body > cs-sidebar(差旅 data-active) + content-wrapper > cs-navbar(差旅首页 active) + main-content > cs-content-header(标题"差旅申请" + page-subtitle + slot-right 搜索) + cs-filter-bar(顶部 tab 切状态) + 业务区(列表) + cs-drawer(右侧抽屉)`
- **F1 字段（必看，5 个）**：
  1. **目的地** — `申请单.destination` — 城市名 + 区域（"北京 · 海淀"）
  2. **出差日期（起止 / 天数）** — `申请单.startDate / endDate` — 格式 "06-28 → 06-30 · 3 天"
  3. **出差事由** — `申请单.reason` — 项目/客户名 + 一句话说明
  4. **预估总金额** — `申请单.budget` — "¥ 8,500"，加粗、tabular-nums
  5. **状态徽标** — `申请单.status` — 草稿 / 待审批 / 已批准 / 已驳回 / 已结束（用 `cs-status-badge`）
- **F2 字段**（要时能看到，折叠/抽屉详情）：审批人 / 审批进度 / 创建时间 / 同行人列表 / 费用明细（机票/住宿/交通/其他）
- **F3 字段**（可隐藏，hover tooltip / 详情页）：申请单 ID / 修改记录 / 附件
- **数据量级**：典型员工 12-24 张/年（月 1-2 次），所有视图**无需分页**（虚拟滚动也不需要），普通列表即可
- **菜单结构（navbar 二级导航 5 项）**：
  1. 申请首页（`data-active` 入口）
  2. 进行中（待审批 + 已批准未出差）
  3. 已完成（已结束 + 已驳回）
  4. 模板库（个人模板 + 公共模板）
  5. 草稿箱
- **分组维度**：
  - 顶部 `cs-filter-bar` 用 tab 切状态（全部 / 草稿 / 待审批 / 已批准 / 已驳回 / 已结束）
  - 列表内**按创建时间 desc** 排序（最新创建在最前）

## EDGE · 边界 + 约束 + 成功
- **空态**：插画 + 文案 "还没有差旅申请，从模板秒开一份吧 →" + 大号 "+ 发起首次差旅" 按钮（与 navbar slot-action 同义但更显眼引导）
- **加载态**：列表骨架屏（5 行卡片占位），抽屉内字段用 `cs-skeleton`
- **错误态**：网络异常显示空状态 + "重新加载" 按钮 + 上次本地缓存（如可用）；抽屉内字段校验失败用 `cs-form-group data-error="..."`
- **成功态**：提交后 4s toast "申请已提交，等待 [审批人] 审批" + 抽屉关闭 + 列表刷新 + 高亮刚提交项（淡蓝底 2s 渐消）。**留在当前 tab 不切**（用户已选）
- **无权限态**：无（全员可用，不需特殊处理）
- **复用既有 cs- 组件**：cs-button / cs-tag / cs-avatar / cs-status-badge / cs-search-trigger / cs-tab-nav / cs-nav-item / cs-drawer / cs-input / cs-select / cs-form-group / cs-textarea / cs-checkbox / cs-skeleton
- **⚠ 缺失需新建**：
  - **`cs-travel-card`** 业务卡片组件 — 列表项专用，三列布局（目的地 + 日期 + 金额）+ 状态徽标；需派 **component-agent** 新建
  - 验证 **`cs-date-range-picker`** 是否存在；不存在则需派 component-agent 新建
- **私有 CSS 前缀**：`--ba-*` / `.ba-*`（business-travel-apply）
- **视口**：仅桌面 1440+
- **成功指标**：
  - 85% 用户 3 分钟内完成填写并提交（从打开抽屉到 toast 弹出）
  - 空态用户首次进入 30% 在 60 秒内打开抽屉

## 派单计划

1. **先派 component-agent**：
   - 新建 `cs-travel-card`（三列布局 + 状态徽标）
   - 验证 `cs-date-range-picker` 是否存在；不存在则一并新建
2. **再派 page-agent**：把本 REQ 整段内容塞进 prompt，让它装配 `pages/business-travel-apply/index.html` + `index.css`
