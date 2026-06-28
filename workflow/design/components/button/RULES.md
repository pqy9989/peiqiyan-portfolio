# button 规则

标签：`<cs-button>`

通用按钮组件，支持三种变体、三种尺寸、图标和下拉。

## 数据来源

CSES新组件库 Figma `6G4kofC17HJTi91bvbX4bZ` 节点 `8:2359`「按钮」

## Figma 精确数据

- 高度：33px（设计稿） → 项目取 32px（md）
- 圆角：8px → `var(--radius-lg)`
- 内边距：8px 16px → `var(--space-xs) var(--space-md)`
- 图标间距：4px → `var(--space-2xs)`
- 字体：PingFang SC 400/12px → `var(--typo-cn-12-regular)`

### Figma 颜色映射

| Figma 原值 | 项目变量 | 用途 |
|-----------|---------|------|
| #4757e2 | `var(--color-primary)` | 一级常态背景 |
| #6874e7 | `var(--color-primary-hover)` | 一级悬浮背景（Figma 值偏浅，项目变量 #4958de） |
| #2a38bf | `var(--color-primary-active)` | 一级点击背景（Figma 值偏深，项目变量 #4351cd） |
| #d9d9d9 | `var(--sem-bg-disabled)` | 一级禁用背景 |
| #ffffff | `var(--color-text-inverse)` | 一级文字色 |
| #e6e6e6 | `var(--color-border)` | 二级描边色 |
| #333333 | `var(--color-text)` | 二/三级常态文字 |
| 二级 hover 文字+边框 | `var(--cs-color-primary)` | 二级悬浮文字+描边（2026-05-08 起改主色，原为 #666666）|
| #999999 | `var(--color-text-light2)` | 一级禁用文字 |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-variant` | `primary`(默认) / `secondary` / `text` | 一级/二级/三级 |
| `data-size` | `sm` / `md`(默认) / `lg` | 28px / 32px / 36px |
| `data-icon` | 布尔 | 纯图标按钮（正方形） |
| `data-dropdown` | 布尔 | 带下拉箭头 |
| `data-disabled` | 布尔 | 禁用态 |
| `data-loading` | 布尔 | 加载态 |
| `data-hover` | 布尔 | 悬浮态模拟（预览用） |
| `data-pressed` | 布尔 | 选中/按下态模拟（预览用） |

## 在 header 槽位中的尺寸约定

当本组件出现在 `cs-content-header` 或 `cs-navbar` 的槽位中、与搜索框（`cs-search-input` / `cs-search-trigger`）同行时，高度必须等于 **`var(--cs-sem-size-interactive-sm)` = 32px**，与搜索框对齐。

对应到本组件：

- `cs-button` 必须使用**默认尺寸**（即不写 `data-size`，相当于 `md` = 32px）。
- **禁止**在 header 槽位使用 `data-size="sm"`（28px）或 `data-size="lg"`（36px），它们会破坏与搜索框的视觉对齐。
- 其它属性（`data-variant` / `data-icon` / `data-dropdown` / `data-disabled` / `data-loading`）不受此约束影响，按需使用。

## 子元素

| 类名 | 标签 | 说明 |
|------|------|------|
| `.btn-icon` | `<i>` | 图标（cses-stratis-help 类名） |
| `.btn-label` | `<span>` | 按钮文字 |
| `.btn-dropdown` | `<i>` | 下拉箭头图标（cses-stratis-chevron-down） |

## HTML 写法

```html
<!-- 一级 纯文字 -->
<cs-button><span class="btn-label">按钮</span></cs-button>

<!-- 一级 图标+文字 -->
<cs-button><i class="btn-icon cses-stratis-plus-01"></i><span class="btn-label">新建</span></cs-button>

<!-- 二级 带下拉 -->
<cs-button data-variant="secondary" data-dropdown>
  <span class="btn-label">筛选</span>
  <i class="btn-dropdown cses-stratis-chevron-down"></i>
</cs-button>

<!-- 三级 纯图标 -->
<cs-button data-variant="text" data-icon>
  <i class="btn-icon cses-stratis-dot-horizontal"></i>
</cs-button>

<!-- 禁用 -->
<cs-button data-disabled><span class="btn-label">按钮</span></cs-button>
```

## 交互状态

| 状态 | 一级 Primary | 二级 Secondary | 三级 Text |
|------|-------------|---------------|-----------|
| 常态 | 蓝底白字 | 白底描边黑字 | 无底黑字 |
| 悬浮 | 蓝底变浅 | 主色文字+主色描边 | 主色淡阶底（primary-a2） |
| 点击 | 蓝底变深 | 不变 | 灰底加深 |
| 禁用 | 灰底灰字 | 描边灰字 | 无底灰字 |
