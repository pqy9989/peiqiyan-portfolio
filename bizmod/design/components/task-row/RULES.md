# cs-task-row 任务行组件

任务管理列表视图中的主要重复行元素，采用两行布局：第一行为任务标题+状态标签，第二行为活动头像+活动描述。支持状态药丸、优先级、日期、空间/项目等列。

## Figma 来源

节点 27:12567

## 标签名

`<cs-task-row>`

## data 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `data-completed` | 布尔 | 已完成态，标题显示删除线并变灰，其余列降低透明度 |

## 子元素

| 类名 | 标签 | 必填 | 说明 |
|------|------|------|------|
| `.task-checkbox` | `<span>` | 否 | 复选框插槽（40px），内部放置 `<cs-checkbox>` |
| `.task-info` | `<span>` | 是 | 任务信息区（flex:1），包含标题行和活动行 |
| `.task-title-row` | `<span>` | 是 | 第一行：标题 + 状态标签 + 操作按钮 |
| `.task-title` | `<span>` | 是 | 任务名称，14px，溢出省略 |
| `.task-tag` | `<span>` | 否 | 状态标签（即将过期/已过期），通过 `data-type` 区分 |
| `.task-actions` | `<span>` | 否 | hover 操作图标组（编辑/详情/更多） |
| `.task-activity` | `<span>` | 否 | 第二行：活动头像 + 活动描述 |
| `.activity-avatars` | `<span>` | 否 | 小头像容器（20px 头像） |
| `.activity-text` | `<span>` | 否 | 活动描述文字（12px #999） |
| `.task-status` | `<span>` | 否 | 状态列（80px），内部放置 `.task-status-pill` |
| `.task-status-pill` | `<span>` | 否 | 状态药丸徽标，通过 `data-status` 区分 |
| `.task-priority` | `<span>` | 否 | 优先级列（80px），旗帜图标 + 文字 |
| `.task-date` | `<span>` | 否 | 日期列（120px），格式 "09月22日 17:56" |
| `.task-space` | `<span>` | 否 | 空间/项目列（140px） |

## data-type（状态标签变体）

| 值 | 含义 | 样式 |
|------|------|------|
| `warning` | 即将过期 | bg: `--sem-bg-warning`，text: `--color-warning` |
| `danger` | 已过期 | bg: `--sem-bg-error`，text: `--color-error` |

## data-status（状态药丸变体）

| 值 | 含义 | 样式 |
|------|------|------|
| `in-progress` | 进行中 | bg: `--color-primary-disabled`，text: `--color-primary` |
| `not-started` | 未开始 | bg: `--color-border`，text: `--color-text` |
| `completed` | 已完成 | bg: `--sem-bg-success`，text: `--color-success` |

## data-level（优先级变体）

| 值 | 含义 | 颜色变量 |
|------|------|----------|
| `urgent` | 紧急 | `--color-error` (#f53f3f) |
| `important` | 重要 | `--color-warning` (#ff7d00) |
| `normal` | 普通/一般 | `--color-text-light2` (#999) |
| `low` | 较低 | `--color-icon-muted` (#c9c9c9) |

## HTML 结构

```html
<!-- 完整结构 -->
<cs-task-row>
  <span class="task-checkbox">
    <cs-checkbox>
      <span class="checkbox-inner">
        <i class="checkbox-icon cses-stratis-check-contained"></i>
      </span>
    </cs-checkbox>
  </span>
  <span class="task-info">
    <span class="task-title-row">
      <span class="task-title">任务标题</span>
      <span class="task-tag" data-type="warning">即将过期</span>
      <span class="task-actions">
        <i class="cses-stratis-edit-01" title="编辑"></i>
        <i class="cses-stratis-list" title="详情"></i>
        <i class="cses-stratis-dot-horizontal" title="更多"></i>
      </span>
    </span>
    <span class="task-activity">
      <span class="activity-avatars">
        <cs-avatar data-size="xs">张</cs-avatar>
      </span>
      <span class="activity-text">张明修改了截止时间为'03.30 18:00'</span>
    </span>
  </span>
  <span class="task-status">
    <span class="task-status-pill" data-status="in-progress">进行中</span>
  </span>
  <span class="task-priority" data-level="urgent">
    <i class="cses-stratis-alert-triangle"></i>
    紧急
  </span>
  <span class="task-date">09月22日 17:56</span>
  <span class="task-date">03月30日 18:00</span>
  <span class="task-space">XPA的空间 / 目 开...</span>
</cs-task-row>

<!-- 已完成 -->
<cs-task-row data-completed>
  <span class="task-checkbox">
    <cs-checkbox data-checked>
      <span class="checkbox-inner">
        <i class="checkbox-icon cses-stratis-check-contained"></i>
      </span>
    </cs-checkbox>
  </span>
  <span class="task-info">
    <span class="task-title-row">
      <span class="task-title">已完成的任务</span>
    </span>
    <span class="task-activity">
      <span class="activity-avatars">
        <cs-avatar data-size="xs">赵</cs-avatar>
      </span>
      <span class="activity-text">赵宇将状态变更为'已完成'</span>
    </span>
  </span>
  <span class="task-status">
    <span class="task-status-pill" data-status="completed">已完成</span>
  </span>
  <span class="task-date">03月25日 18:00</span>
</cs-task-row>

<!-- 最简结构 -->
<cs-task-row>
  <span class="task-checkbox">
    <cs-checkbox>
      <span class="checkbox-inner">
        <i class="checkbox-icon cses-stratis-check-contained"></i>
      </span>
    </cs-checkbox>
  </span>
  <span class="task-info">
    <span class="task-title-row">
      <span class="task-title">仅标题的任务</span>
    </span>
  </span>
</cs-task-row>
```

## 布局规格

| 属性 | 值 | CSS 变量 |
|------|-----|----------|
| 最小高度 | 64px | — |
| 内边距 | 8px 16px | `var(--space-xs) var(--space-md)` |
| 信息区行间距 | 4px | `var(--space-2xs)` |
| 标题行元素间距 | 4px | `var(--space-2xs)` |
| 活动行元素间距 | 4px | `var(--space-2xs)` |
| 底部边框 | 1px | `var(--line-width) solid var(--color-border)` |
| 复选框列宽 | 40px | `var(--spacing-40)` |
| 状态列宽 | 80px | — |
| 优先级列宽 | 80px | — |
| 日期列宽 | 120px | — |
| 空间列宽 | 140px | — |

## Figma 颜色映射

| 元素 | Figma 原始值 | CSS 变量 |
|------|-------------|----------|
| 标题文字 | #333 | `--color-text` |
| 标题字体 | 14px/400 | `--typo-cn-14-regular` |
| 活动文字 | #999 | `--color-text-light2` |
| 活动字体 | 12px/400 | `--typo-cn-12-regular` |
| 活动头像 | 20px | `--spacing-20` |
| 悬停背景 | — | `--color-bg-hover` |
| 底部边框 | #e6e6e6 | `--color-border` |
| 已完成标题 | #999 + line-through | `--color-text-light2` |
| 即将过期标签 bg | #ffefe0 | `--sem-bg-warning`（最接近 --color-orange-100 = #ffedd4） |
| 即将过期标签 text | #ff7d00 | `--color-warning` |
| 已过期标签 bg | #ffebeb | `--sem-bg-error`（最接近 --color-red-100 = #ffe2e2） |
| 已过期标签 text | #f53f3f | `--color-error` |
| 进行中药丸 bg | #ced3ff | `--color-primary-disabled` |
| 进行中药丸 text | #4857e2 | `--color-primary` |
| 未开始药丸 bg | #e6e6e6 | `--color-border` |
| 未开始药丸 text | #333 | `--color-text` |
| 紧急优先级 | #f53f3f | `--color-error` |
| 重要优先级 | #ff7d00 | `--color-warning` |
| 普通优先级 | #999 | `--color-text-light2` |
| 较低优先级 | #c9c9c9 | `--color-icon-muted` |
| 日期文字 | #333 | `--color-text` |
| 空间文字 | #999 | `--color-text-light2` |
| 状态标签高度 | 23px | — |
| 状态标签圆角 | 4px | `--radius` |
| 状态标签 padding | 0 10px | `--spacing-10` |
| 药丸高度 | 24px | `--spacing-24` |
| 药丸最小宽度 | 48px | `--spacing-48` |
| 药丸圆角 | 12px | `--radius-xl` |

## 状态说明

- **默认**：白色背景，底部 1px 分隔线，flex 行布局居中对齐，min-height 64px
- **悬停**：背景色变为 `--color-bg-hover`，显示操作图标（编辑/详情/更多）
- **已完成（data-completed）**：标题添加删除线+变灰，其余列降低 opacity 至 0.5

## 注意事项

- 旗帜图标：字体库无 flag 图标，使用 `cses-stratis-alert-triangle`（火焰）替代
- 操作图标：详情使用 `cses-stratis-list`，更多使用 `cses-stratis-dot-horizontal`
- 即将过期/已过期 bg 使用最接近的语义变量（`--sem-bg-warning` / `--sem-bg-error`），与 Figma 原值有微小色差
