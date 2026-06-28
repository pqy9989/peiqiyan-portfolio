# cs-notice-item 通知列表项组件

通知公文区域列表项，圆点/图标 + 标题 + 日期，支持"新"标记。

## 标签名

`<cs-notice-item>`

## data 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `data-new` | 布尔 | 是否为新通知（显示蓝色圆点） |
| `data-type` | 枚举 | 类型：`notice`（通知，默认）/ `document`（公文） |

## 子元素

| 类名 | 标签 | 必填 | 说明 |
|------|------|------|------|
| `.notice-dot` | `<span>` | 否 | 新通知圆点（6px 蓝色） |
| `.notice-title` | `<span>` | 是 | 通知标题（14px，单行省略） |
| `.notice-date` | `<span>` | 否 | 日期（12px 灰色，右对齐） |

## HTML 结构

```html
<cs-notice-item data-new>
  <span class="notice-dot"></span>
  <span class="notice-title">关于开展2024年度员工体检的通知</span>
  <span class="notice-date">2024-03-15</span>
</cs-notice-item>

<cs-notice-item>
  <span class="notice-title">OA系统维护升级公告</span>
  <span class="notice-date">2024-03-12</span>
</cs-notice-item>
```

## 布局规格

| 属性 | 值 | CSS 变量 |
|------|-----|----------|
| 条目上下间距 | 12px | `var(--space-sm)` |
| 圆点尺寸 | 6px | — |
| 圆点颜色 | 主色蓝 | `var(--color-primary)` |
| 标题字号 | 14px/400 | `var(--typo-cn-14-regular)` |
| 日期字号 | 12px/400 | `var(--typo-cn-12-regular)` |
| 日期颜色 | 灰色 | `var(--color-text-light2)` |
