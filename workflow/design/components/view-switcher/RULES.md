# view-switcher 规则

标签：`<cs-view-switcher>`

视图切换组件，用于在列表/卡片/网格等视图模式之间切换的图标按钮组。

## 数据来源

- 任务管理视图切换
- 文档库视图切换

## Figma 精确数据

- 高度：Figma 原稿 30px → 项目取 32px（`var(--cs-sem-size-interactive-sm)`），以对齐 header 同行控件（search-input / search-trigger / button md）
- 容器：flex row, gap:0, border 1px → `var(--border-width) solid var(--color-border)`, border-radius 8px → `var(--radius-lg)`
- 每项内边距：8px → `var(--space-xs)`
- 图标尺寸：14-16px → `var(--sem-size-icon-sm)`
- 默认图标色：#86909c → `var(--color-text-light2)`
- 激活背景：#e8f3ff → `var(--color-selected)`
- 激活图标色：#165DFF → `var(--color-primary)`
- Hover 背景：#f2f3f5 → `var(--color-bg-hover)`
- 分隔线：1px border-right → `var(--border-width) solid var(--color-border)`

### Figma 颜色映射

| Figma 原值 | 项目变量 | 用途 |
|-----------|---------|------|
| #e5e6eb | `var(--color-border)` | 容器边框 + 分隔线 |
| #86909c | `var(--color-text-light2)` | 默认图标色 |
| #e8f3ff | `var(--color-selected)` | 激活项背景 |
| #165DFF | `var(--color-primary)` | 激活项图标色 |
| #f2f3f5 | `var(--color-bg-hover)` | Hover 背景 |

## 属性

| 属性 | 作用于 | 值 | 说明 |
|------|--------|-----|------|
| `data-active` | `.view-item` | （布尔，无值） | 激活/选中状态 |

## 在 header 槽位中的尺寸约定

当本组件出现在 `cs-content-header` 或 `cs-navbar` 的槽位中、与搜索框（`cs-search-input` / `cs-search-trigger`）同行时，高度必须等于 **`var(--cs-sem-size-interactive-sm)` = 32px**，与搜索框对齐。

对应到本组件：

- `cs-view-switcher` 默认高度即 32px（`var(--cs-sem-size-interactive-sm)`），按默认用即可，无需额外属性。
- 本组件不暴露 `data-size`，**不要**通过外层 wrapper / 自定义 CSS 强行改高度。

## 子元素

| 类名 | 元素 | 说明 |
|------|------|------|
| `.view-item` | `<span>` | 单个视图选项，内含图标 `<i>` |

## 常用图标

| 图标类名 | 视图模式 |
|----------|----------|
| `cses-stratis-list` | 列表视图 |
| `cses-stratis-grid-01` | 卡片视图 |
| `cses-stratis-grid-01` | 网格视图 |

## HTML 写法

```html
<!-- 两视图切换 -->
<cs-view-switcher>
  <span class="view-item" data-active><i class="cses-stratis-list"></i></span>
  <span class="view-item"><i class="cses-stratis-grid-01"></i></span>
</cs-view-switcher>

<!-- 三视图切换 -->
<cs-view-switcher>
  <span class="view-item" data-active><i class="cses-stratis-list"></i></span>
  <span class="view-item"><i class="cses-stratis-grid-01"></i></span>
  <span class="view-item"><i class="cses-stratis-grid-01"></i></span>
</cs-view-switcher>
```

## 使用场景

- **任务管理**：列表/看板视图切换
- **文档库**：列表/网格视图切换
- **文件管理**：列表/缩略图/详情视图切换
