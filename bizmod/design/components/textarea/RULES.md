# textarea 规则

标签：`<cs-textarea>`

多行文本输入组件，支持垂直调整高度、字数统计、错误态和禁用态。

## 数据来源

CSES新组件库 Figma 文本域设计规范页 + 业务设计稿

## Figma 精确数据

- 最小高度：80px（设计稿） → `var(--spacing-80)`
- 圆角：4px → `var(--radius)`
- 边框：1px solid → `var(--line-width) solid`
- 内边距：8px 12px → `var(--space-xs) var(--space-sm)`
- 字体：PingFang SC 400/14px → `var(--typo-cn-14-regular)`

### Figma 颜色映射

| Figma 原值 | 项目变量 | 用途 |
|-----------|---------|------|
| #e6e6e6 | `var(--color-border)` | 默认边框色 |
| #4757e2 | `var(--cs-color-primary)` | 悬浮 / 聚焦边框色（2026-05-08 起 hover 改主色） |
| #999999 | `var(--color-text-light2)` | 占位符文字 / 字数统计 |
| #4757e2 | `var(--color-primary)` | 聚焦边框色 |
| #f53f3f | `var(--color-error)` | 错误边框色 |
| #333333 | `var(--color-text)` | 输入文字色 |
| #f9f9f9 | `var(--color-bg-disabled)` | 禁用背景色 |
| #ffffff | `var(--color-white)` | 默认背景色 |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-error` | 布尔 | 错误态（红色边框） |
| `data-disabled` | 布尔 | 禁用态（灰色背景，不可交互，不可调整大小） |

## 子元素

| 类名 | 标签 | 说明 |
|------|------|------|
| `.textarea-field` | `<textarea>` | 原生文本域，必须存在 |
| `.textarea-count` | `<span>` | 字数统计（可选），显示在右下方 |

## HTML 写法

```html
<!-- 基础文本域 -->
<cs-textarea>
  <textarea class="textarea-field" placeholder="请输入"></textarea>
</cs-textarea>

<!-- 带字数统计 -->
<cs-textarea>
  <textarea class="textarea-field" placeholder="请输入" maxlength="200"></textarea>
  <span class="textarea-count">0 / 200</span>
</cs-textarea>

<!-- 错误态 -->
<cs-textarea data-error>
  <textarea class="textarea-field">格式错误</textarea>
  <span class="textarea-count">4 / 200</span>
</cs-textarea>

<!-- 禁用态 -->
<cs-textarea data-disabled>
  <textarea class="textarea-field" placeholder="禁用" disabled></textarea>
</cs-textarea>
```

## 交互状态

| 状态 | 边框色 | 背景色 | 文字色 |
|------|--------|--------|--------|
| 默认 | `--color-border` | `--color-white` | `--color-text` |
| 悬浮 | `--cs-color-primary` | `--color-white` | `--color-text` |
| 聚焦 | `--color-primary` | `--color-white` | `--color-text` |
| 错误 | `--color-error` | `--color-white` | `--color-text` |
| 禁用 | `--color-border` | `--color-bg-disabled` | `--color-border` |

## CSS 结构

| 选择器 | 说明 |
|--------|------|
| `cs-textarea` | wrapper，display:flex flex-direction:column |
| `cs-textarea .textarea-field` | 原生 textarea，width 100%，min-height var(--spacing-80) |
| `cs-textarea .textarea-count` | 字数统计，font-size var(--font-size-sm)，color var(--color-text-light2) |
