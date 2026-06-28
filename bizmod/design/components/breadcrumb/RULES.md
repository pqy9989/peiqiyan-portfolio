# breadcrumb 规则

标签：`<cs-breadcrumb>`

顶栏空间内导航面包屑，展示当前页面在层级中的位置。

## 数据来源

- 任务管理 Figma 顶栏-空间内导航-有面包屑

## Figma 精确数据

- 文字：14px/400 → `var(--typo-cn-14-regular)`
- 文字色：→ `var(--color-text-light2)`
- 当前项文字色：→ `var(--color-text)`
- 当前项字重：→ `var(--font-weight-medium)`
- 悬停色：→ `var(--color-primary)`
- 项间距：→ `var(--space-2xs)`
- 分隔图标：cses-stratis-chevron-right，12px → `var(--font-size-xs)`
- 分隔图标色：→ `var(--color-text-light2)`

## 结构

```
cs-breadcrumb                    ← flex row, align center, gap var(--space-2xs)
├── .breadcrumb-item             ← 可点击文字链接
├── .breadcrumb-separator        ← chevron-right 图标
├── .breadcrumb-item             ← 可点击文字链接
├── .breadcrumb-separator        ← chevron-right 图标
└── .breadcrumb-item[data-current] ← 当前页（不可点击）
```

## 属性

| 属性 | 元素 | 说明 |
|------|------|------|
| `data-current` | `.breadcrumb-item` | 标记当前页（最后一项），加粗且不响应悬停 |

## HTML 写法

```html
<!-- 基础用法 -->
<cs-breadcrumb>
  <span class="breadcrumb-item">首页</span>
  <span class="breadcrumb-separator"><i class="cses-stratis-chevron-right"></i></span>
  <span class="breadcrumb-item">项目空间</span>
  <span class="breadcrumb-separator"><i class="cses-stratis-chevron-right"></i></span>
  <span class="breadcrumb-item" data-current>前端组件库</span>
</cs-breadcrumb>

<!-- 链接形式 -->
<cs-breadcrumb>
  <a class="breadcrumb-item" href="#">首页</a>
  <span class="breadcrumb-separator"><i class="cses-stratis-chevron-right"></i></span>
  <span class="breadcrumb-item" data-current>任务管理</span>
</cs-breadcrumb>
```

## 使用场景

- **任务管理顶栏**：空间内导航层级展示
- **项目空间**：多级目录导航
- **设置页面**：设置分类层级
