# search-trigger 规则

标签：`<cs-search-trigger>`

数据来源：Figma 节点 82:1450

搜索触发按钮。点击触发搜索面板，非输入框。

## Figma 精确数据

- 尺寸：150x32
- 背景：#F5F5F5 → `var(--cs-color-bg-light)`
- 圆角：8px → `var(--radius-lg)`
- 内边距：6px 12px
- 间距：4px
- 文字：14px/400 #999 → `var(--typo-cn-14-regular)`
- 图标：12x12 #999 → `cses-sousuo`

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-size` | `sm` / `md`(默认) | 尺寸 28px / 32px |

## 在 header 槽位中的尺寸约定

当本组件出现在 `cs-content-header` 或 `cs-navbar` 的槽位中、与同行控件（`cs-button` / `cs-view-switcher` / `cs-search-input`）一起出现时，高度必须等于 **`var(--cs-sem-size-interactive-sm)` = 32px**。

对应到本组件：

- `cs-search-trigger` 默认尺寸即 32px（`md`），按默认用即可。
- **禁止**在 header 槽位使用 `data-size="sm"`（28px）或任何更小档（如 `xs` = 24px），它们会破坏与同行按钮 / view-switcher 的对齐。

## 结构

```html
<cs-search-trigger>
  <span class="trigger-text">搜索</span>
  <i class="trigger-icon cses-sousuo"></i>
</cs-search-trigger>
```

## 子元素

| 元素 | 说明 |
|------|------|
| `.trigger-text` | 占位文字（左侧） |
| `.trigger-icon` | 搜索图标（右侧） |
