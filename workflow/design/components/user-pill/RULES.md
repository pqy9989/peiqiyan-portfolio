# user-pill 规则

标签：`<cs-user-pill>`

用户药丸组件，展示头像 + 名称的紧凑标签形式，常用于任务抽屉成员列表、会议参与人等场景。

## 数据来源

- 任务抽屉成员列表
- 会议参与人列表

## Figma 精确数据

- 整体高度：28px → `var(--spacing-28)`
- 圆角：17px（药丸形） → `var(--radius-pill)`
- 内边距：2px 8px 2px 2px → `var(--spacing-2) var(--space-xs) var(--spacing-2) var(--spacing-2)`
- 背景：#f3f4f4 → `var(--color-bg-light)`
- 字体：14px/400 → `var(--typo-cn-14-regular)`
- 文字色：#1d2129 → `var(--color-text)`
- Hover 背景 → `var(--color-bg-lighter)`
- 头像：24×24 圆形 → `var(--sem-size-icon-xl)` + `var(--radius-full)`
- 关闭图标：12px cses-stratis-x-01 → `var(--font-size-xs)`

### Figma 颜色映射

| Figma 原值 | 项目变量 | 用途 |
|-----------|---------|------|
| #f3f4f4 | `var(--color-bg-light)` | 药丸背景 |
| #1d2129 | `var(--color-text)` | 名称文字色 |
| hover bg | `var(--color-bg-lighter)` | 悬停背景 |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-closable` | （布尔，无值） | 显示关闭按钮 |
| `data-type` | `overflow` | 溢出计数器样式（+N） |

## 子元素

| 类名 | 元素 | 说明 |
|------|------|------|
| （子组件） | `<cs-avatar data-size="sm">` | 头像（使用 avatar 组件） |
| `.pill-name` | `<span>` | 用户名称 |
| `.pill-close` | `<button>` | 关闭按钮（内含 `<i class="cses-stratis-x-01">` ） |

## HTML 写法

```html
<!-- 基础用法（文字头像） -->
<cs-user-pill>
  <cs-avatar data-size="sm" data-color="blue"><span class="avatar-text">张</span></cs-avatar>
  <span class="pill-name">张三</span>
</cs-user-pill>

<!-- 图片头像 -->
<cs-user-pill>
  <cs-avatar data-size="sm"><img src="avatar.png" alt=""></cs-avatar>
  <span class="pill-name">张三</span>
</cs-user-pill>

<!-- 可关闭 -->
<cs-user-pill data-closable>
  <cs-avatar data-size="sm" data-color="blue"><span class="avatar-text">张</span></cs-avatar>
  <span class="pill-name">张三</span>
  <button class="pill-close"><i class="cses-stratis-x-01"></i></button>
</cs-user-pill>

<!-- 溢出计数 -->
<cs-user-pill data-type="overflow">
  <span class="pill-name">+3</span>
</cs-user-pill>
```

## 使用场景

- **任务抽屉**：任务成员列表，可关闭移除
- **会议详情**：参与人展示
- **成员选择器**：已选中的成员标签
