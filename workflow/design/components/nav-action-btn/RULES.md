# cs-nav-action-btn 导航操作按钮组件

导航栏内全宽操作按钮，用于新建任务/文档等主要操作入口。

## 标签名

`<cs-nav-action-btn>`

## data 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `data-disabled` | 布尔 | 禁用态 |

## 子元素

| 类名 | 标签 | 必填 | 说明 |
|------|------|------|------|
| `.nav-action-icon` | `<i>` | 否 | 按钮图标，使用 `cses-icons-plus` |
| `.nav-action-label` | `<span>` | 否 | 按钮文本 |

## HTML 结构

```html
<!-- 基础（图标 + 文本） -->
<cs-nav-action-btn>
  <i class="nav-action-icon cses-icons-plus"></i>
  <span class="nav-action-label">新建任务</span>
</cs-nav-action-btn>

<!-- 仅图标 -->
<cs-nav-action-btn>
  <i class="nav-action-icon cses-icons-plus"></i>
</cs-nav-action-btn>

<!-- 禁用 -->
<cs-nav-action-btn data-disabled>
  <i class="nav-action-icon cses-icons-plus"></i>
  <span class="nav-action-label">新建任务</span>
</cs-nav-action-btn>
```

## 布局规格

| 属性 | 值 | CSS 变量 |
|------|-----|----------|
| 高度 | 32px | `--sem-size-interactive-sm` |
| 宽度 | 100%（撑满父容器） | — |
| 圆角 | — | `--radius` |
| 间距（图标与文本） | — | `--space-2xs` |
| 图标尺寸 | 14px | `--sem-size-icon-sm` |

## Figma 颜色映射

| 状态 | Figma 原始值 | CSS 变量 |
|------|-------------|----------|
| 背景色 | — | `--color-primary` |
| 悬停背景 | — | `--color-primary-hover` |
| 文本色 | #ffffff | `--color-text-inverse` |
| 图标色 | #ffffff | `--color-text-inverse` |
| 字体 | 12px/400 | `--typo-cn-12-regular` |

## 状态说明

- **默认**：主色背景 + 白色图标和文本，flex 居中布局
- **悬停**：背景色切换为 `--color-primary-hover`
- **禁用（data-disabled）**：不可交互，降低透明度
