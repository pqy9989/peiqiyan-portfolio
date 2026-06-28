# select 规则

标签：`<cs-select>`

选择器组件，模拟原生 select 外观，支持尺寸、状态变体。

## Figma 精确数据

- 高度：32px（md，默认）→ `var(--sem-size-interactive-sm)`；sm: 24px → `var(--sem-size-interactive-xs)`；lg: 40px → `var(--sem-size-interactive-md)`
- 边框：1px #e6e6e6 → `var(--line-width) solid var(--color-border)`
- 圆角：4px → `var(--radius)`
- 内边距：0 8px → `0 var(--space-xs)`
- 字体：14px/400 → `var(--typo-cn-14-regular)`
- 箭头图标尺寸：16px → `var(--sem-size-icon-md)`

### Figma 颜色映射

| Figma 原值 | 项目变量 | 用途 |
|-----------|---------|------|
| #e6e6e6 | `var(--color-border)` | 默认边框 |
| #4757e2 | `var(--cs-color-primary)` | 悬浮 / 聚焦边框色（2026-05-08 起 hover 改主色） |
| #999999 | `var(--color-text-light2)` | 占位符文字 / 箭头颜色 |
| #4857e2 | `var(--color-primary)` | 聚焦/展开边框 |
| #333333 | `var(--color-text)` | 选中值文字 |
| #f9f9f9 | `var(--color-bg-disabled)` | 禁用背景 |
| red/500 | `var(--sem-border-error)` | 错误边框 |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-size` | `sm` / `md`(默认) / `lg` | 24px / 32px / 40px |
| `data-disabled` | 布尔 | 禁用态 |
| `data-error` | 布尔 | 错误态 |
| `data-open` | 布尔 | 展开态（箭头旋转、主色边框） |

## 子元素

| 类名 | 标签 | 说明 |
|------|------|------|
| `.select-value` | `<span>` | 已选值显示 |
| `.select-placeholder` | `<span>` | 占位符文字（与 .select-value 互斥） |
| `.select-arrow` | `<i>` | 下拉箭头图标（cses-stratis-chevron-down） |

## HTML 写法

```html
<!-- 默认（有值） -->
<cs-select>
  <span class="select-value">选项一</span>
  <i class="select-arrow cses-stratis-chevron-down"></i>
</cs-select>

<!-- 占位符 -->
<cs-select>
  <span class="select-placeholder">请选择</span>
  <i class="select-arrow cses-stratis-chevron-down"></i>
</cs-select>

<!-- 展开态 -->
<cs-select data-open>
  <span class="select-value">选项一</span>
  <i class="select-arrow cses-stratis-chevron-down"></i>
</cs-select>

<!-- 错误态 -->
<cs-select data-error>
  <span class="select-value">选项一</span>
  <i class="select-arrow cses-stratis-chevron-down"></i>
</cs-select>

<!-- 禁用态 -->
<cs-select data-disabled>
  <span class="select-value">选项一</span>
  <i class="select-arrow cses-stratis-chevron-down"></i>
</cs-select>

<!-- 小尺寸 -->
<cs-select data-size="sm">
  <span class="select-value">选项一</span>
  <i class="select-arrow cses-stratis-chevron-down"></i>
</cs-select>
```

## 交互状态

| 状态 | 边框色 | 箭头 |
|------|--------|------|
| 默认 | `--color-border` | 向下 |
| 悬浮 | `--cs-color-primary` | 向下 |
| 展开 | `--color-primary` | 旋转 180deg |
| 错误 | `--sem-border-error` | 向下 |
| 禁用 | `--color-border` + 半透明 | 向下 |
