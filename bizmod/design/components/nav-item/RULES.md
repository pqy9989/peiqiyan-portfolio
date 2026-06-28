# nav-item 规则

标签：`<cs-nav-item>`

二级侧边栏/导航栏中的导航条目，支持图标、文字和右侧徽标。

## 数据来源

Figma 二级侧边栏/navbar 导航项

## Figma 精确数据

- 高度：32px → `var(--sem-size-interactive-sm)`
- 内边距：6px 8px → `var(--spacing-6) var(--space-xs)`
- 圆角：6px → `var(--radius)`
- 字体：PingFang SC 400/14px → `var(--typo-cn-14-regular)`
- 图标尺寸：16px → `var(--sem-size-icon-md)`
- 间距：8px → `var(--space-xs)`

### Figma 颜色映射

| Figma 原值 | 项目变量 | 用途 |
|-----------|---------|------|
| #333333 | `var(--color-text)` | 默认文字色 |
| #4757e2 | `var(--color-primary)` | 激活态文字色 |
| — | `var(--color-bg-hover)` | 悬浮态背景 |
| — | `var(--color-selected)` | 激活态背景 |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-active` | 布尔 | 激活/选中态 |

## 子元素

| 类名 | 标签 | 说明 |
|------|------|------|
| `.nav-icon` | `<i>` | 图标（可选，cses-icons-xxx 类名，16px） |
| `.nav-label` | `<span>` | 导航文字 |
| `.nav-suffix` | `<span>` | 右侧后缀区域（可放 cs-badge 或计数） |

## HTML 写法

```html
<!-- 带图标 -->
<cs-nav-item>
  <i class="nav-icon cses-icons-wendang"></i>
  <span class="nav-label">文档库</span>
</cs-nav-item>

<!-- 激活态 -->
<cs-nav-item data-active>
  <i class="nav-icon cses-icons-renwu"></i>
  <span class="nav-label">任务</span>
</cs-nav-item>

<!-- 纯文字 -->
<cs-nav-item>
  <span class="nav-label">全部文档</span>
</cs-nav-item>

<!-- 带徽标 -->
<cs-nav-item>
  <i class="nav-icon cses-icons-xiaoxi"></i>
  <span class="nav-label">消息</span>
  <span class="nav-suffix"><cs-badge data-color="danger">3</cs-badge></span>
</cs-nav-item>
```

## 交互说明

- 默认态：普通文字色
- 悬浮态：背景变浅
- 激活态：背景高亮 + 文字变为主题色，图标颜色继承
