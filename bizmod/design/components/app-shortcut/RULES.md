# cs-app-shortcut 应用快捷入口组件

应用快捷入口网格项，彩色图标 + 名称标签，用于"我的常用"和"企业应用"区域。

## 标签名

`<cs-app-shortcut>`

## data 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `data-color` | 枚举 | 图标背景色：`blue` / `orange` / `green` / `red` / `purple` / `sky` / `pink` / `yellow`，默认 blue |
| `data-size` | 枚举 | 尺寸：`sm`(32px图标) / `md`(40px图标，默认) / `lg`(48px图标) |
| `data-shape` | 枚举 | 图标形状：默认圆角方形 / `circle`(圆形) |

## 子元素

| 类名 | 标签 | 必填 | 说明 |
|------|------|------|------|
| `.shortcut-icon` | `<span>` | 是 | 图标容器（圆角方形，彩色背景） |
| `.shortcut-label` | `<span>` | 是 | 应用名称（12px） |

## HTML 结构

```html
<cs-app-shortcut data-color="orange">
  <span class="shortcut-icon">
    <i class="cses-stratis-calendar-01"></i>
  </span>
  <span class="shortcut-label">打卡</span>
</cs-app-shortcut>
```

## 布局规格

| 属性 | 值 | CSS 变量 |
|------|-----|----------|
| 图标容器尺寸 | 40px | `var(--spacing-40)` |
| 图标容器圆角 | 8px | `var(--radius-lg)` |
| 图标字号 | 20px | `var(--font-size-xl)` |
| 标签字号 | 12px/400 | `var(--typo-cn-12-regular)` |
| 标签颜色 | 灰色 | `var(--color-text-light)` |
| 内部间距 | 8px | `var(--space-xs)` |
| 整体宽度 | 80px（推荐网格单元） | — |
