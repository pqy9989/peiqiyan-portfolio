# thumbnail 规则

标签：`<cs-thumbnail>`

文件类型图标与文档预览图片缩略图组件。

## 数据来源

- 旧设计规范 `d9kycxUY4aY265OHlImwdr` 节点 `4:21211`「文件」— COMPONENT_SET 10 种文件类型
- 文档库 `rlrdc7MpDwzRcpLIWkMZgs`（文档卡片封面图片）

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-type` | `image`（默认） / `file-icon` | 类型 |
| `data-size` | `sm`(24) / `md`(32，默认) / `lg`(48) | 尺寸 |
| `data-filetype` | `pdf`/`word`/`doc`/`excel`/`sheet`/`ppt`/`image`/`video`/`audio`/`text`/`txt`/`zip`/`mindmap`/`unknown` | 文件类型着色 |

## Figma 文件类型颜色映射

| 文件类型 | Figma 原值 | 项目变量 |
|---------|-----------|---------|
| PDF | #FA4E4E | `var(--color-filetype-pdf)` |
| Word | #4876F9 | `var(--color-filetype-word)` |
| Excel | #32BD79 | `var(--color-filetype-excel)` |
| PPT | #FF9333 | `var(--color-filetype-ppt)` |
| 图片 | #F6AD00 | `var(--color-filetype-image)` |
| 视频 | #7C8EEE | `var(--color-filetype-video)` |
| 音频 | #F16C00 | `var(--color-filetype-audio)` |
| 文本 | #8289AD | `var(--color-filetype-text)` |
| 压缩 | #576A95 | `var(--color-filetype-zip)` |
| 未知 | #CCCCCC | `var(--color-filetype-unknown)` |
| 脑图 | — | `var(--color-filetype-mindmap)` |

> 这些颜色变量新增在 `css/variable.css` 的「文件类型色」区段。

## HTML 写法

```html
<!-- 带颜色的文件类型图标 -->
<cs-thumbnail data-type="file-icon" data-filetype="pdf">
  <i class="cses-stratis-file-01"></i>
</cs-thumbnail>

<cs-thumbnail data-type="file-icon" data-filetype="word" data-size="lg">
  <i class="cses-stratis-file-01"></i>
</cs-thumbnail>

<!-- 图片预览 -->
<cs-thumbnail data-type="image" data-size="lg">
  <img src="preview.jpg" alt="">
</cs-thumbnail>
```

## 可用文件类型图标

cses-stratis-file-01、cses-stratis-file-01、cses-stratis-file-01、cses-stratis-file-01、cses-stratis-image、cses-stratis-file-01、cses-stratis-file-01、cses-stratis-file-01、cses-stratis-file-01、cses-stratis-file-01、cses-stratis-grid-01

## 尺寸对照

| data-size | 像素 | CSS 变量 |
|-----------|------|---------|
| sm | 24px | `--spacing-24` |
| md | 32px | `--spacing-32` |
| lg | 48px | `--spacing-48` |
