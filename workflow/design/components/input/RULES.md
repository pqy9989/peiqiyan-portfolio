# input 规则

标签：`<cs-input>`

通用输入框组件（纯输入框），支持三种尺寸、多种交互状态。搜索功能由分子组件 `cs-search-input` 负责。

## 数据来源

CSES新组件库 Figma 输入框设计规范页 + 业务设计稿

## Figma 精确数据

- 高度：32px（md 默认）
- 圆角：4px → `var(--radius)`
- 边框：1px solid → `var(--line-width) solid`
- 内边距：7px 12px → `var(--spacing-6) var(--space-sm)`
- 字体：PingFang SC 400/14px → `var(--typo-cn-14-regular)`

### Figma 颜色映射

| Figma 原值 | 项目变量 | 用途 |
|-----------|---------|------|
| #e6e6e6 | `var(--color-border)` | 默认边框色 |
| #4757e2 | `var(--cs-color-primary)` | 悬浮 / 聚焦边框色（2026-05-08 起 hover 改为主色） |
| #999999 | `var(--color-text-light2)` | 占位符文字 |
| #f53f3f | `var(--color-error)` | 错误边框色 |
| #333333 | `var(--color-text)` | 输入文字色 |
| #f9f9f9 | `var(--color-bg-disabled)` | 禁用背景色 |
| #ffffff | `var(--color-white)` | 默认背景色 |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-size` | `sm` / `md`(默认) / `lg` | 28px / 32px / 36px |
| `data-focus` | 布尔 | 聚焦态（蓝色边框），真实聚焦通过 `:focus-within` 自动触发 |
| `data-error` | 布尔 | 错误态（红色边框） |
| `data-disabled` | 布尔 | 禁用态（灰色背景，不可交互） |

## 子元素

| 类名 | 标签 | 说明 |
|------|------|------|
| `.input-field` | `<input>` | 原生输入框，必须存在 |

> 注意：不再支持 `.input-prefix` 和 `.input-suffix`。搜索框请使用 `cs-search-input` 分子组件。

## HTML 写法

```html
<!-- 基础输入框 -->
<cs-input>
  <input class="input-field" type="text" placeholder="请输入">
</cs-input>

<!-- 聚焦态 -->
<cs-input data-focus>
  <input class="input-field" type="text" placeholder="聚焦">
</cs-input>

<!-- 错误态 -->
<cs-input data-error>
  <input class="input-field" type="text" value="格式错误">
</cs-input>

<!-- 禁用态 -->
<cs-input data-disabled>
  <input class="input-field" type="text" placeholder="禁用" disabled>
</cs-input>

<!-- 小尺寸 -->
<cs-input data-size="sm">
  <input class="input-field" type="text" placeholder="小尺寸">
</cs-input>

<!-- 大尺寸 -->
<cs-input data-size="lg">
  <input class="input-field" type="text" placeholder="大尺寸">
</cs-input>
```

## 交互状态

| 状态 | 边框色 | 背景色 | 文字色 |
|------|--------|--------|--------|
| 默认 | `--color-border` | `--color-white` | `--color-text` |
| 悬浮 | `--cs-color-primary` | `--color-white` | `--color-text` |
| 聚焦 | `--color-primary` | `--color-white` | `--color-text` |
| 错误 | `--color-error` | `--color-white` | `--color-text` |
| 禁用 | `--color-border` | `--color-bg-disabled` | `--color-border` |

## 尺寸

| 尺寸 | data-size | 高度变量 | 内边距 | 字体 |
|------|-----------|----------|--------|------|
| sm | `sm` | `--sem-size-interactive-xs` (28px) | `--spacing-6` `--space-xs` | `--typo-cn-12-regular` |
| md | 默认 | `--sem-size-interactive-sm` (32px) | `--spacing-6` `--space-sm` | `--typo-cn-14-regular` |
| lg | `lg` | `--sem-size-interactive-md` (36px) | `--space-xs` `--space-md` | `--typo-cn-14-regular` |
