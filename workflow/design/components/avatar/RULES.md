# avatar 规则

标签：`<cs-avatar>`

头像组件，用于用户、群组的图像展示。

## 数据来源

- 消息设计稿 `lhlUfcxtPy6Vs5gJoyke64`（聊天头像 40×40，群组头像组件 1:124~1:167）
- 任务管理 `u20fmHv0ItyHTSVNC1JJss`（负责人头像 20×20 RECT r:38 IMAGE fill）
- 文档库 `rlrdc7MpDwzRcpLIWkMZgs`（编辑者头像 14×14 ELLIPSE）
- 旧设计规范 `d9kycxUY4aY265OHlImwdr`（抽屉内 20×20、28×28 ELLIPSE IMAGE fill）

## Figma 精确数据

| 场景 | 元素 | 尺寸 | 形状 |
|------|------|------|------|
| 消息列表头像 | INSTANCE `头像` | 40×40 | 圆形 |
| 任务负责人 | RECT r:38 IMAGE | 20×20 | 圆形 |
| 任务协同人 | RECT r:38 IMAGE | 24×24 | 圆形 |
| 文档编辑者 | ELLIPSE IMAGE | 14×14 | 圆形 |
| 抽屉用户胶囊 | ELLIPSE IMAGE | 20×20 / 28×28 | 圆形 |
| 会议参与者 | ELLIPSE IMAGE | 48×48 | 圆形 |
| Logo/空间图标 | RECT r:8 | 42×42 | 圆角方 |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-size` | `xs`(20) / `sm`(24) / `md`(32，默认) / `lg`(40) / `xl`(48) | 尺寸 |
| `data-shape` | `circle`(默认) / `square`(r:8) | 形状 |
| `data-color` | `blue`/`red`/`green`/`orange`/`purple`/`pink`/`sky` | 文字头像背景色 |

## 子元素

| 元素 | 用途 |
|------|------|
| `<img>` | 图片头像 |
| `.avatar-text` | 文字头像（首字母） |
| `.avatar-icon` | 图标头像（默认占位，使用 cses-stratis-user-profile-01） |
| `.avatar-status` | 在线状态点（需加 data-online/busy/away/offline） |

## HTML 写法

```html
<!-- 图片头像 -->
<cs-avatar data-size="lg"><img src="photo.jpg" alt=""></cs-avatar>

<!-- 文字头像 -->
<cs-avatar data-color="blue"><span class="avatar-text">张</span></cs-avatar>

<!-- 图标头像（默认） -->
<cs-avatar><i class="avatar-icon cses-stratis-user-profile-01"></i></cs-avatar>

<!-- 方形 -->
<cs-avatar data-shape="square"><img src="logo.png" alt=""></cs-avatar>

<!-- 带在线状态 -->
<cs-avatar data-size="lg">
  <img src="photo.jpg" alt="">
  <span class="avatar-status" data-online></span>
</cs-avatar>
```

## 尺寸对照

| data-size | 像素 | CSS 变量 | 字号 | 图标尺寸 | 状态点 |
|-----------|------|---------|------|---------|--------|
| xs | 20px | `--spacing-20` | 10px | 12px | 6px |
| sm | 24px | `--spacing-24` | 10px | 14px | 8px |
| md | 32px | `--sem-size-interactive-sm` | 12px | 16px | 8px |
| lg | 40px | `--spacing-40` | 14px | 20px | 10px |
| xl | 48px | `--spacing-48` | 16px | 24px | 10px |


## 颜色方案（2026-05-09 起：低饱和浅底深字）

**默认**：未传 `data-color` 时背景 `--color-blue-100`、文字 `--color-blue-700`（之前为 -500 主色 + 白字）。

**变体**：所有 `data-color="blue|red|green|orange|purple|pink|sky"` 统一改为：
- 背景：对应色 `-100` 浅底
- 文字：对应色 `-700` 深字（`.avatar-text` `.avatar-icon` 都继承这个色）

**变更原因**：原 -500 满饱和方案在密集场景（任务行、看板、消息列表）容易抢视觉焦点；改成浅底深字后整体更克制，可读性提升。

**历史**：
- 2026-05-08：默认从 `--cs-color-bg-lighter` 灰底改为 `--cs-color-primary` 主色
- 2026-05-09：默认从主色 -500 改为 `-100` 浅底 + `-700` 深字（当前方案）

业务页中如需多色头像区分用户，仍按 `data-color="blue|green|orange|red|purple|sky|pink"` 循环。
