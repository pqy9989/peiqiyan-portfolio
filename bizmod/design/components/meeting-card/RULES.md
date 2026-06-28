# meeting-card 规则

标签：`<cs-meeting-card>`

会议列表中的单条会议信息卡片组件，展示时间、标题、参会人和操作按钮。

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-active` | （布尔，无值） | 当前进行中的会议（高亮背景） |
| `data-past` | （布尔，无值） | 已结束的会议（降低透明度） |

## 子元素

| 类名 | 说明 |
|------|------|
| `.meeting-time` | 左侧时间区域 |
| `.time-start` | 开始时间文字 |
| `.time-duration` | 时长文字 |
| `.meeting-content` | 中间内容区域（flex:1） |
| `.meeting-title` | 会议标题 |
| `.meeting-meta` | 元信息（地点、主持人） |
| `.meeting-attendees` | 参会人头像组 |
| `.meeting-actions` | 右侧操作区域 |
| `.meeting-type` | 会议类型标签 |

## 样式规格

- **内边距**：`var(--space-sm) var(--space-md)`
- **底部边框**：`var(--line-width) solid var(--color-border)`
- **悬浮**：背景 `var(--color-bg-hover)`
- **布局**：flex row，间距 `var(--space-sm)`
- **时间区**：flex column，居中对齐，最小宽度 `var(--spacing-48)`
  - 时间：`var(--typo-cn-14-medium)`，颜色 `var(--color-text)`
  - 时长：`var(--typo-cn-12-regular)`，颜色 `var(--color-text-light2)`
- **内容区**：flex:1，flex column，间距 `var(--space-2xs)`
  - 标题：`var(--typo-cn-14-medium)`，颜色 `var(--color-text)`
  - 元信息：`var(--typo-cn-12-regular)`，颜色 `var(--color-text-light2)`
- **操作区**：flex column，align flex-end，间距 `var(--space-2xs)`
- **类型标签**：`var(--typo-cn-12-regular)`，背景 `var(--color-bg-light)`，圆角 `var(--radius)`

## 引用组件

- `cs-status-badge` — 会议状态
- `cs-button` — 加入按钮（sm 尺寸）
- `cs-avatar` — 参会人头像组（sm 尺寸）

## Figma 映射

| Figma 值 | CSS 变量 |
|----------|----------|
| padding 8px 16px | `var(--space-sm) var(--space-md)` |
| gap 8px | `var(--space-sm)` |
| time min-width 48px | `var(--spacing-48)` |
| font 14px/500 | `var(--typo-cn-14-medium)` |
| font 12px/400 | `var(--typo-cn-12-regular)` |
| content gap 4px | `var(--space-2xs)` |
| border-bottom 1px | `var(--line-width) solid var(--color-border)` |

## HTML 写法

```html
<cs-meeting-card>
  <div class="meeting-time">
    <span class="time-start">09:00</span>
    <span class="time-duration">1小时</span>
  </div>
  <div class="meeting-content">
    <span class="meeting-title">产品需求评审会议</span>
    <span class="meeting-meta">会议室 A301 · 张三主持</span>
    <div class="meeting-attendees">
      <cs-avatar data-size="sm">李</cs-avatar>
      <cs-avatar data-size="sm">王</cs-avatar>
    </div>
  </div>
  <div class="meeting-actions">
    <cs-status-badge data-status="in-progress">
      <span class="status-dot"></span>
      <span class="status-text">进行中</span>
    </cs-status-badge>
    <cs-button data-size="sm"><span class="btn-label">加入</span></cs-button>
  </div>
</cs-meeting-card>

<!-- 带类型标签 -->
<cs-meeting-card>
  <div class="meeting-time">
    <span class="time-start">14:00</span>
    <span class="time-duration">2小时</span>
  </div>
  <div class="meeting-content">
    <span class="meeting-title">头脑风暴会议</span>
    <span class="meeting-meta">线上会议 · 王五主持</span>
  </div>
  <div class="meeting-actions">
    <cs-status-badge data-status="not-started">
      <span class="status-dot"></span>
      <span class="status-text">未开始</span>
    </cs-status-badge>
    <span class="meeting-type">头脑风暴</span>
  </div>
</cs-meeting-card>
```

## 使用场景

- **会议列表页**：展示当天或未来的会议安排
- **日程视图**：日历中的会议条目
- **侧边栏**：即将到来的会议快捷列表
