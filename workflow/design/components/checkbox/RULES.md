# cs-checkbox 复选框组件

复选框组件，用于多选场景，支持选中、半选、禁用状态及多种尺寸。

## 标签名

`<cs-checkbox>`

## data 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `data-checked` | 布尔 | 选中态 |
| `data-indeterminate` | 布尔 | 半选态（部分选中） |
| `data-disabled` | 布尔 | 禁用态 |
| `data-size` | `"sm"` / `"md"` / `"lg"` | 尺寸，默认 lg(16px) |

## 子元素

| 类名 | 标签 | 必填 | 说明 |
|------|------|------|------|
| `.checkbox-inner` | `<span>` | 是 | 复选框方块容器 |
| `.checkbox-icon` | `<i>` | 是 | 勾选图标，放在 `.checkbox-inner` 内，使用 `cses-stratis-check-contained` |
| `.checkbox-label` | `<span>` | 否 | 文本标签 |

## HTML 结构

```html
<!-- 基础（未选中） -->
<cs-checkbox>
  <span class="checkbox-inner">
    <i class="checkbox-icon cses-stratis-check-contained"></i>
  </span>
  <span class="checkbox-label">标签文本</span>
</cs-checkbox>

<!-- 选中 -->
<cs-checkbox data-checked>
  <span class="checkbox-inner">
    <i class="checkbox-icon cses-stratis-check-contained"></i>
  </span>
  <span class="checkbox-label">已选中</span>
</cs-checkbox>

<!-- 半选 -->
<cs-checkbox data-indeterminate>
  <span class="checkbox-inner">
    <i class="checkbox-icon cses-stratis-check-contained"></i>
  </span>
  <span class="checkbox-label">部分选中</span>
</cs-checkbox>

<!-- 禁用 -->
<cs-checkbox data-disabled>
  <span class="checkbox-inner">
    <i class="checkbox-icon cses-stratis-check-contained"></i>
  </span>
  <span class="checkbox-label">禁用</span>
</cs-checkbox>

<!-- 禁用 + 选中 -->
<cs-checkbox data-disabled data-checked>
  <span class="checkbox-inner">
    <i class="checkbox-icon cses-stratis-check-contained"></i>
  </span>
  <span class="checkbox-label">禁用已选</span>
</cs-checkbox>

<!-- 小尺寸 -->
<cs-checkbox data-size="sm" data-checked>
  <span class="checkbox-inner">
    <i class="checkbox-icon cses-stratis-check-contained"></i>
  </span>
  <span class="checkbox-label">小尺寸</span>
</cs-checkbox>

<!-- 无标签（纯复选框） -->
<cs-checkbox data-checked>
  <span class="checkbox-inner">
    <i class="checkbox-icon cses-stratis-check-contained"></i>
  </span>
</cs-checkbox>
```

## 尺寸规格

| data-size | 方块尺寸 | CSS 变量 | 来源 |
|-----------|----------|----------|------|
| `"sm"` | 12x12 | `--sem-size-icon-xs` | 文档库设计稿 |
| `"md"` | 14x14 | `--sem-size-icon-sm` | 旧设计规范 |
| `"lg"`（默认） | 16x16 | `--sem-size-icon-md` | 新组件库 |

## Figma 颜色映射

| 状态 | Figma 原始值 | CSS 变量 |
|------|-------------|----------|
| 选中背景 | #4757e2 | `--color-primary` |
| 选中图标 | #ffffff | `--color-text-inverse` |
| 未选中边框 | #e6e6e6 | `--color-border` |
| 悬停边框 | #999999 | `--color-text-light2` |
| 禁用未选中背景 | #f9f9f9 | `--color-bg-disabled` |
| 禁用未选中边框 | #e6e6e6 | `--color-border` |
| 禁用选中背景 | #ced3ff | `--color-primary-disabled` |
| 方块背景（默认） | #ffffff | `--color-white` |
| 圆角 | 2px | `--radius-2` |
| 边框宽度 | 1px | `--line-width` |

## 状态说明

- **未选中（默认）**：白色背景 + 灰色边框，悬停时边框变深
- **选中（data-checked）**：主色背景 + 白色勾选图标
- **半选（data-indeterminate）**：主色背景 + 白色横线（用于全选中的部分选中状态）
- **禁用（data-disabled）**：不可交互，降低视觉强度
- **禁用 + 选中**：浅主色背景 + 白色勾选图标

## 交互状态（2026-05-08 起统一）

| 状态 | 边框色 | 描述 |
|---|---|---|
| 默认 | `var(--cs-color-border)` | — |
| **悬浮** | **`var(--cs-color-primary)`** | 鼠标移入边框变主色（之前为 `--color-text-light2` 灰色）|
| 选中 | `var(--cs-color-primary)` | 内部填充主色 |
| 禁用 | `var(--cs-color-border)` | 灰色不响应 |
