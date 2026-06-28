# tag 规则

标签：`<cs-tag>`

小型标签/徽标组件，支持语义颜色、尺寸和可关闭功能。

## Figma 精确数据

- 高度：22px（md，默认）/ 18px（sm）
- 内边距：0 8px → `0 var(--space-xs)`；sm: 0 6px → `0 var(--spacing-6)`
- 圆角：4px → `var(--radius)`；pill → `var(--radius-pill)`
- 字体：12px/400 → `var(--typo-cn-12-regular)`；sm: 10px → `var(--font-size-xs)`
- 图标间距：4px → `var(--space-2xs)`

### Figma 颜色映射

| Figma 原值 | 项目变量 | 用途 |
|-----------|---------|------|
| #f5f5f5 (neutral/100) | `var(--color-bg-light)` | default 背景 |
| #333333 | `var(--color-text)` | default 文字 |
| rgba(72,87,226,0.08) | `var(--color-primary-a2)` | primary 背景 |
| #4857e2 | `var(--color-primary)` | primary 文字 |
| green/100 | `var(--sem-bg-success)` | success 背景 |
| green/500 | `var(--sem-text-success)` | success 文字 |
| orange/100 | `var(--sem-bg-warning)` | warning 背景 |
| orange/500 | `var(--sem-text-warning)` | warning 文字 |
| red/100 | `var(--sem-bg-error)` | danger 背景 |
| red/500 | `var(--sem-text-error)` | danger 文字 |
| sky/100 | `var(--sem-status-info-light)` | info 背景 |
| sky/500 | `var(--sem-status-info)` | info 文字 |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-variant` | `text` / （默认 filled） | text=纯文字无背景，用于优先级标签；默认=填充背景，用于状态标签 |
| `data-color` | `default`(默认) / `primary` / `success` / `warning` / `danger` / `info` | 语义颜色 |
| `data-size` | `sm` / `md`(默认) | 18px / 22px |
| `data-closable` | 布尔 | 显示关闭按钮 |
| `data-shape` | `round` | pill 圆角 |

## 子元素

| 类名 | 标签 | 说明 |
|------|------|------|
| `.tag-label` | `<span>` | 标签文字 |
| `.tag-close` | `<i>` | 关闭按钮图标（cses-stratis-x-01） |

## HTML 写法

```html
<!-- 填充标签（默认），用于状态 -->
<cs-tag data-color="warning"><span class="tag-label">即将过期</span></cs-tag>
<cs-tag data-color="danger"><span class="tag-label">已过期</span></cs-tag>

<!-- 纯文字标签，用于优先级 -->
<cs-tag data-variant="text" data-color="danger"><span class="tag-label">紧急</span></cs-tag>
<cs-tag data-variant="text" data-color="warning"><span class="tag-label">普通</span></cs-tag>
<cs-tag data-variant="text" data-color="default"><span class="tag-label">较低</span></cs-tag>

<!-- 可关闭标签 -->
<cs-tag data-color="danger" data-closable>
  <span class="tag-label">危险</span>
  <i class="tag-close cses-stratis-x-01"></i>
</cs-tag>

<!-- 小尺寸 -->
<cs-tag data-size="sm" data-color="success">
  <span class="tag-label">成功</span>
</cs-tag>

<!-- pill 圆角 -->
<cs-tag data-shape="round" data-color="info">
  <span class="tag-label">信息</span>
</cs-tag>
```

## 关闭按钮悬浮态（2026-05-08 起）

`.tag-close:hover` 默认 hover 背景从 `rgba(0, 0, 0, 0.06)`（灰色）改为 `var(--cs-color-primary-a2)`（主色 8% 透明），与全局 `--cs-color-bg-hover` 主色化策略对齐。

各色变体（primary / success / warning / danger / info）的 close hover 背景仍保留各自语义色，不动。
