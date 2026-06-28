# cs-kanban-column 看板列组件

看板视图中的列容器，包含列标题（带计数徽标）和卡片列表区域。用于需求看板的待审核/已确认/已归档等分类列。

## 标签名

`<cs-kanban-column>`

## data 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `data-status` | 枚举 | 列状态色：`pending` / `confirmed` / `archived` / `default` |

## 子元素

| 类名 | 标签 | 必填 | 说明 |
|------|------|------|------|
| `.column-header` | `<div>` | 是 | 列顶部标题栏 |
| `.column-title` | `<span>` | 是 | 列标题文字 |
| `.column-count` | `<span>` | 否 | 卡片计数徽标 |
| `.column-actions` | `<span>` | 否 | 列操作按钮区（如添加按钮） |
| `.column-body` | `<div>` | 是 | 卡片列表滚动区域，内含 `<cs-kanban-card>` |

## HTML 结构

```html
<cs-kanban-column data-status="pending">
  <div class="column-header">
    <span class="column-title">待审核</span>
    <span class="column-count">3</span>
    <span class="column-actions">
      <cs-button data-variant="text" data-size="sm" data-icon>
        <i class="cses-stratis-plus-01"></i>
      </cs-button>
    </span>
  </div>
  <div class="column-body">
    <cs-kanban-card data-priority="high">
      <!-- ... -->
    </cs-kanban-card>
  </div>
</cs-kanban-column>
```

## 布局规格

| 属性 | 值 | CSS 变量 |
|------|-----|----------|
| 列最小宽度 | 280px | — |
| 列背景色 | neutral-50 | `var(--color-bg-hover)` |
| 列圆角 | 8px | `var(--radius-lg)` |
| 头部内边距 | 12px | `var(--space-sm)` |
| 卡片列表内边距 | 8px | `var(--space-xs)` |
| 卡片间距 | 8px | `var(--space-xs)` |
| 标题字号 | 14px/500 | `var(--typo-cn-14-medium)` |
| 计数徽标字号 | 12px/400 | `var(--typo-cn-12-regular)` |
| 状态顶线宽 | 3px | `var(--border-width-3)` |
