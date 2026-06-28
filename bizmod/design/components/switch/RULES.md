# Switch 开关组件

开关切换组件，用于在两种状态间切换（开/关）。

## 基本信息

- **标签**：`<cs-switch>`
- **设计来源**：Figma「单选&多选&开关」规范
- **尺寸变体**：Large（默认 40×24）、Small（28×16）

## HTML 结构

```html
<cs-switch>
  <div class="switch-track">
    <div class="switch-knob"></div>
  </div>
</cs-switch>
```

## data 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `data-checked` | 布尔 | 开启状态，旋钮滑向右侧 |
| `data-disabled` | 布尔 | 禁用状态，不可交互 |
| `data-size="sm"` | 枚举 | 小尺寸 28×16（默认大尺寸 40×24） |

## 子元素

| 类名 | 说明 |
|------|------|
| `.switch-track` | 滑轨（pill 形背景容器） |
| `.switch-knob` | 旋钮（白色圆形，随状态切换位置） |

## Figma → CSS 变量映射

### 颜色

| 状态 | Figma 色值 | CSS 变量 |
|------|-----------|----------|
| 开启背景 | `#4757e2` | `var(--color-primary)` |
| 关闭背景 | `#999999` | `var(--color-text-light2)` |
| 开启禁用背景 | `#ced3ff` | `var(--color-primary-disabled)` |
| 关闭禁用背景（大） | `#c9cdd4` | `var(--color-neutral-300)` |
| 关闭禁用背景（小） | `#f2f3f5` | `var(--color-bg-light)` |
| 旋钮颜色 | `#ffffff` | `var(--color-white)` |

### 尺寸

| 属性 | Figma 值 | CSS 变量 | 备注 |
|------|----------|----------|------|
| 大轨道宽 | 40px | `var(--spacing-40)` | |
| 大轨道高 | 24px | `var(--sem-size-interactive-xs)` | |
| 大旋钮直径 | 20px | `var(--spacing-20)` | 24 - 2×2 |
| 小轨道宽 | 28px | `var(--spacing-28, 28px)` | token 无精确值，使用 fallback |
| 小轨道高 | 16px | `var(--sem-size-icon-md)` | |
| 小旋钮直径 | 12px | `var(--spacing-12, 12px)` | token 无精确值，使用 fallback |
| 旋钮内间距 | 2px | `var(--spacing-2)` | |
| 轨道圆角 | 999px | `var(--radius-pill)` | pill 形 |
| 旋钮圆角 | 9999px | `var(--radius-full)` | 正圆 |

### 缺失 token 备注

- `--spacing-28`（28px）：小尺寸轨道宽度，token.css 中无此值，CSS 中使用 fallback 写法 `var(--spacing-28, 28px)`
- `--spacing-12`（12px）：小尺寸旋钮直径，token.css 中无此值，CSS 中使用 fallback 写法 `var(--spacing-12, 12px)`

## 状态组合

| 组合 | 选择器 |
|------|--------|
| 关闭 | `cs-switch` |
| 开启 | `cs-switch[data-checked]` |
| 关闭禁用 | `cs-switch[data-disabled]` |
| 开启禁用 | `cs-switch[data-checked][data-disabled]` |
| 小关闭 | `cs-switch[data-size="sm"]` |
| 小开启 | `cs-switch[data-size="sm"][data-checked]` |
| 小关闭禁用 | `cs-switch[data-size="sm"][data-disabled]` |
| 小开启禁用 | `cs-switch[data-size="sm"][data-checked][data-disabled]` |
