# nav-group 规则

标签：`<cs-nav-group>`

侧边栏可折叠导航分组组件，用于组织"我的任务"、"空间"等导航区块。

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-collapsed` | （布尔，无值） | 折叠状态，隐藏 body，箭头旋转 -90deg |

## 子元素

| 类名 | 说明 |
|------|------|
| `.group-header` | 分组头部（flex row，包含标题和箭头） |
| `.group-title` | 分组标题文字 |
| `.group-arrow` | 展开/折叠箭头（使用 `cses-icons-chevron-down`） |
| `.group-body` | 分组内容区域（包含 cs-nav-item 子项） |

## 样式规格

- **布局**：flex column
- **头部**：flex row，align center，justify space-between，padding `var(--space-xs)`
- **标题**：字体 `var(--typo-cn-12-medium)`，颜色 `var(--color-text-light2)`，text-transform uppercase
- **箭头**：12px（`var(--sem-size-icon-sm)`），颜色 `var(--color-text-light2)`
- **内容区**：flex column，gap `var(--spacing-2)`
- **过渡**：0.2s ease

## Figma 映射

| Figma 值 | CSS 变量 |
|----------|----------|
| font 12px/500 | `var(--typo-cn-12-medium)` |
| arrow 12px | `var(--sem-size-icon-sm)` |
| text color light | `var(--color-text-light2)` |
| header padding 8px | `var(--space-xs)` |
| body gap 8px | `var(--spacing-2)` |

## HTML 写法

```html
<!-- 展开状态（默认） -->
<cs-nav-group>
  <div class="group-header">
    <span class="group-title">我的任务</span>
    <i class="group-arrow cses-icons-chevron-down"></i>
  </div>
  <div class="group-body">
    <!-- cs-nav-item 子项 -->
  </div>
</cs-nav-group>

<!-- 折叠状态 -->
<cs-nav-group data-collapsed>
  <div class="group-header">
    <span class="group-title">空间</span>
    <i class="group-arrow cses-icons-chevron-down"></i>
  </div>
  <div class="group-body">
    <!-- 折叠时隐藏 -->
  </div>
</cs-nav-group>
```

## 使用场景

- **侧边栏导航**：将导航项按功能分组（我的任务、空间、收藏等）
- **可折叠区块**：用户可展开/折叠不常用的导航区块
