# cs-search-input

搜索输入框组件，带搜索图标和可选清除按钮。

## 标签

`<cs-search-input>`

## 文件

| 文件 | 用途 |
|------|------|
| `search-input.css` | 组件样式 |
| `search-input.html` | 组件预览（展示所有变体） |
| `RULES.md` | 本文件 |

## HTML 结构

```html
<cs-search-input>
  <i class="search-icon cses-stratis-search-01"></i>
  <input class="search-field" type="text" placeholder="搜索">
  <i class="search-clear cses-stratis-x-01"></i>
</cs-search-input>
```

## 子元素

| 类名 | 元素 | 说明 |
|------|------|------|
| `.search-icon` | `<i>` | 左侧搜索图标（cses-stratis-search-01），14px |
| `.search-field` | `<input>` | 原生输入框 |
| `.search-clear` | `<i>` | 右侧清除按钮（cses-stratis-x-01），10px，默认隐藏 |

## data 属性

| 属性 | 值 | 说明 |
|------|------|------|
| `data-variant` | `white`（默认） / `gray` | 背景变体 |
| `data-size` | `sm` / `md`（默认） / `lg` | 尺寸 |
| `data-error` | 布尔 | 错误态 |
| `data-has-value` | 布尔 | 有值时显示清除按钮 |

## 在 header 槽位中的尺寸约定

当本组件出现在 `cs-content-header` 或 `cs-navbar` 的槽位中、与同行控件（`cs-button` / `cs-view-switcher` / `cs-search-trigger`）一起出现时，高度必须等于 **`var(--cs-sem-size-interactive-sm)` = 32px**。

对应到本组件：

- `cs-search-input` 必须使用**默认尺寸**（即不写 `data-size`，相当于 `md` = 32px）。
- **禁止**在 header 槽位使用 `data-size="sm"`（`--sem-size-interactive-xs`，更小）或 `data-size="lg"`（`--sem-size-interactive-md`，更大），它们会破坏与同行控件的对齐。
- `data-variant`（`white` / `gray`）不影响高度，按需选用。

## 变体

### 背景

| 变体 | 背景 | 边框 |
|------|------|------|
| white（默认） | `var(--color-white)` | `var(--color-border)` |
| gray | `var(--color-bg-light)` | `var(--color-border)` |

### 尺寸

| 尺寸 | 高度变量 | 内边距 |
|------|----------|--------|
| sm | `var(--sem-size-interactive-xs)` | `var(--spacing-6) var(--space-xs)` |
| md（默认） | `var(--sem-size-interactive-sm)` | `var(--spacing-6) var(--space-sm)` |
| lg | `var(--sem-size-interactive-md)` | `var(--space-xs) var(--space-md)` |

## 交互状态

| 状态 | 边框颜色 |
|------|----------|
| default | `var(--color-border)` |
| hover | `var(--color-primary)` |
| focus-within | `var(--color-primary)` |
| filled | `var(--color-border)`（同默认） |
| error | `var(--color-error)` |

## Figma 映射

| Figma 原始值 | CSS 变量 |
|-------------|----------|
| #ffffff | `var(--color-white)` |
| #f5f5f5 | `var(--color-bg-light)` |
| #e6e6e6 | `var(--color-border)` |
| #999999 | `var(--color-text-light2)` |
| 240x32 | width: 240px, height: `var(--sem-size-interactive-sm)` |
| 7px 12px | `var(--spacing-6) var(--space-sm)` |
| 4px radius | `var(--radius)` |
| 14px/400 | `var(--typo-cn-14-regular)` |
| cses-stratis-search-01 | 搜索图标，14px `var(--sem-size-icon-sm)` |
| cses-stratis-x-01 | 清除图标，`var(--spacing-10)` |

## 引用方式

```html
<link rel="stylesheet" href="../../../components/desktop/search-input/search-input.css">
```
