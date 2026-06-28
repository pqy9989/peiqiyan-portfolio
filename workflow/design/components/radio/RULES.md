# radio 规则

标签：`<cs-radio>`

单选框组件，用于在一组选项中选择单个值。

## 数据来源

CSES 会议设计（投票场景 12px）+ 旧设计规范（表单场景 14px）

## Figma 精确数据

- 尺寸：14×14（旧规范 md）、12×12（会议投票 sm）
- 形状：圆形 → `var(--radius-full)`
- 边框宽度：1px → `var(--line-width)`
- 内部圆点：6px → `var(--spacing-6)`（md）、4px → `var(--space-2xs)`（sm）
- 图标文字间距：6px → `var(--spacing-6)`
- 文字样式：PingFang SC 400/14px → `var(--typo-cn-14-regular)`

### Figma 颜色映射

| Figma 原值 | 项目变量 | 用途 |
|-----------|---------|------|
| #e6e6e6 | `var(--color-border)` | 未选中边框 |
| #4757e2 | `var(--color-primary)` | 选中边框 + 圆点 |
| #4757e2 | `var(--cs-color-primary)` | 悬浮 / 选中边框色（2026-05-08 起 hover 改主色） |
| #f9f9f9 | `var(--color-bg-disabled)` | 禁用未选中背景 |
| #ced3ff | `var(--color-primary-disabled)` | 禁用选中边框 + 圆点 |
| #ffffff | `var(--color-white)` | 默认背景 |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-checked` | 布尔 | 选中态，显示内部圆点 |
| `data-disabled` | 布尔 | 禁用态 |
| `data-size` | `sm` / `md`(默认) | 12px / 14px |

## 子元素

| 类名 | 标签 | 说明 |
|------|------|------|
| `.radio-inner` | `<span>` | 圆形外框容器 |
| `.radio-dot` | `<span>` | 内部圆点（默认隐藏，data-checked 时显示） |
| `.radio-label` | `<span>` | 文字标签（可选） |

## HTML 写法

```html
<!-- 未选中 -->
<cs-radio>
  <span class="radio-inner"><span class="radio-dot"></span></span>
  <span class="radio-label">选项文字</span>
</cs-radio>

<!-- 选中 -->
<cs-radio data-checked>
  <span class="radio-inner"><span class="radio-dot"></span></span>
  <span class="radio-label">选项文字</span>
</cs-radio>

<!-- 禁用未选中 -->
<cs-radio data-disabled>
  <span class="radio-inner"><span class="radio-dot"></span></span>
  <span class="radio-label">选项文字</span>
</cs-radio>

<!-- 禁用选中 -->
<cs-radio data-checked data-disabled>
  <span class="radio-inner"><span class="radio-dot"></span></span>
  <span class="radio-label">选项文字</span>
</cs-radio>

<!-- 小尺寸（会议投票） -->
<cs-radio data-size="sm" data-checked>
  <span class="radio-inner"><span class="radio-dot"></span></span>
  <span class="radio-label">选项文字</span>
</cs-radio>

<!-- 纯圆圈（无文字） -->
<cs-radio data-checked>
  <span class="radio-inner"><span class="radio-dot"></span></span>
</cs-radio>
```

## 交互状态

| 状态 | 边框 | 背景 | 圆点 |
|------|------|------|------|
| 未选中 | `--color-border` | `--color-white` | 隐藏 |
| 悬浮 | `--cs-color-primary` | `--color-white` | — |
| 选中 | `--color-primary` | `--color-white` | `--color-primary` |
| 禁用未选中 | `--color-border` | `--color-bg-disabled` | 隐藏 |
| 禁用选中 | `--color-primary-disabled` | `--color-white` | `--color-primary-disabled` |
