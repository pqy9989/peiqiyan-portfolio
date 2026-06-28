# status-badge 规则

标签：`<cs-status-badge>`

状态徽标组件，彩色圆点 + 状态文字，用于任务/会议列表的状态展示。

## 数据来源

- 任务管理 Figma（任务状态标识）
- 会议 Figma（会议状态标识）

## Figma 精确数据

- 布局：inline-flex, align center, gap → `var(--space-2xs)`
- 圆点：6x6 → `var(--spacing-6)` x `var(--spacing-6)`，圆角 → `var(--radius-full)`
- 文字：12px/400 → `var(--typo-cn-12-regular)`

## 结构

```
cs-status-badge[data-status="xxx"]
├── .status-dot     ← 6x6 彩色圆点
└── .status-text    ← 状态文字标签
```

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-status` | `not-started` / `in-progress` / `completed` / `overdue` / `paused` / `cancelled` / `closed` | 状态类型 |

## 状态颜色对照

| data-status | 含义 | 圆点颜色 | 文字颜色 |
|-------------|------|---------|---------|
| not-started | 未开始 | `--color-text-light2` | `--color-text-light2` |
| in-progress | 进行中 | `--color-primary` | `--color-primary` |
| completed | 已完成 | `--color-success` | `--color-success` |
| overdue | 已逾期 | `--color-error` | `--color-error` |
| paused | 已暂停 | `--color-warning` | `--color-warning` |
| cancelled | 已取消 | `--color-neutral-300` | `--color-neutral-300` |
| closed | 已关闭 | `--color-text-light2` | `--color-text-light2` |

## HTML 写法

```html
<!-- 基础用法 -->
<cs-status-badge data-status="in-progress">
  <span class="status-dot"></span>
  <span class="status-text">进行中</span>
</cs-status-badge>

<!-- 配合任务名使用 -->
<div style="display: flex; align-items: center; gap: 8px;">
  <cs-status-badge data-status="completed">
    <span class="status-dot"></span>
    <span class="status-text">已完成</span>
  </cs-status-badge>
  <span>任务名称</span>
</div>
```

## 使用场景

- **任务列表**：展示任务当前状态（未开始/进行中/已完成/已逾期）
- **会议列表**：展示会议状态（进行中/已结束/已取消）
- **项目看板**：卡片上的状态标签
