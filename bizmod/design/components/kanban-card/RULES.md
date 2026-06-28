# cs-kanban-card 看板卡片组件

需求看板中的卡片项，用于展示需求编号、标题、标签和元信息。支持不同状态列（待审核/已确认/已归档）。

## 标签名

`<cs-kanban-card>`

## data 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `data-priority` | 枚举 | 优先级：`high` / `medium` / `low` |
| `data-dragging` | 布尔 | 拖拽中状态 |

## 子元素

| 类名 | 标签 | 必填 | 说明 |
|------|------|------|------|
| `.kanban-header` | `<div>` | 是 | 顶部区域（编号 + 优先级标签） |
| `.kanban-id` | `<span>` | 是 | 需求编号（如 REQ-0001） |
| `.kanban-title` | `<span>` | 是 | 需求标题 |
| `.kanban-tags` | `<div>` | 否 | 标签区域，内含 `<cs-tag>` |
| `.kanban-footer` | `<div>` | 否 | 底部元信息（日期、头像等） |
| `.kanban-date` | `<span>` | 否 | 日期信息 |
| `.kanban-assignee` | `<span>` | 否 | 负责人头像 |

## HTML 结构

```html
<cs-kanban-card data-priority="high">
  <div class="kanban-header">
    <span class="kanban-id">REQ-0001</span>
  </div>
  <span class="kanban-title">文档库首页</span>
  <div class="kanban-tags">
    <cs-tag data-color="primary" data-size="sm">页面设计</cs-tag>
  </div>
  <div class="kanban-footer">
    <span class="kanban-date">03-28</span>
    <span class="kanban-assignee">
      <cs-avatar data-size="xs"></cs-avatar>
    </span>
  </div>
</cs-kanban-card>
```

## 布局规格

| 属性 | 值 | CSS 变量 |
|------|-----|----------|
| 内边距 | 12px | `var(--space-sm)` |
| 元素间距 | 8px | `var(--space-xs)` |
| 卡片圆角 | 8px | `var(--radius-lg)` |
| 卡片边框 | 1px | `var(--line-width) solid var(--color-border)` |
| 编号字号 | 12px/400 | `var(--typo-en-12-regular)` |
| 标题字号 | 14px/500 | `var(--typo-cn-14-medium)` |
| 日期字号 | 12px/400 | `var(--typo-cn-12-regular)` |
| 优先级左边线宽 | 3px | `var(--border-width-3)` |
