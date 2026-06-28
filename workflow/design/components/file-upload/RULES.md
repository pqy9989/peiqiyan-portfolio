# file-upload 规则

标签：`<cs-file-upload>`

文件上传项组件，用于展示已选择/上传中/已完成/失败的文件条目。

## 数据来源

- 旧设计规范 文件页 Component 223（文件上传项 278×75）

## Figma 精确数据

| 属性 | Figma 值 | CSS 变量 |
|------|----------|---------|
| 宽度 | 278px（弹性） | — |
| 高度 | 75px（最小） | — |
| 边框 | 1px solid #e5e5e5 | `var(--color-border)` |
| 圆角 | 12px | `var(--radius-lg)` |
| 内边距 | 8px | `var(--space-xs)` |
| 间距 | 10px | `var(--spacing-10)` |
| 缩略图 | 40×40 | `var(--spacing-40)` |
| 文件名 | 14px/400 | `var(--typo-cn-14-regular)` |
| 文件名色 | — | `var(--color-text)` |
| 文件大小 | 12px/400 | `var(--typo-cn-12-regular)` |
| 文件大小色 | #8c8c8d | `var(--color-text-light2)` |
| 关闭按钮 | 16px | button.upload-close |
| 错误边框 | — | `var(--color-error)` |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-status` | `default`(默认) / `uploading` / `done` / `error` | 上传状态 |

## 子元素

| 元素 | 用途 |
|------|------|
| `.upload-icon` | 缩略图区域（使用 cs-thumbnail） |
| `.upload-info` | 信息区域（文件名 + 大小 + 进度条） |
| `.upload-name` | 文件名（溢出省略） |
| `.upload-size` | 文件大小 |
| `.upload-close` | 关闭/取消按钮 |
| `.upload-done-icon` | 完成勾选图标（done 状态显示） |
| `.upload-retry-icon` | 重试图标（error 状态显示） |

## 状态行为

| 状态 | 边框 | 操作区 | 进度条 |
|------|------|--------|--------|
| default | `var(--color-border)` | 关闭按钮 | 隐藏 |
| uploading | `var(--color-border)` | 关闭按钮 | — |
| done | `var(--color-border)` | 绿色勾选图标 | 隐藏 |
| error | `var(--color-error)` | 红色重试图标 | 隐藏 |

## 依赖组件

- `cs-thumbnail` — 文件类型缩略图

## HTML 写法

```html
<!-- 默认状态 -->
<cs-file-upload>
  <cs-thumbnail class="upload-icon" data-type="file-icon" data-size="lg">
    <i class="cses-stratis-file-01"></i>
  </cs-thumbnail>
  <div class="upload-info">
    <span class="upload-name">文档.pdf</span>
    <span class="upload-size">2.4 MB</span>
  </div>
  <button class="upload-close"><i class="cses-stratis-x-01"></i></button>
</cs-file-upload>

<!-- 上传中 -->
<cs-file-upload data-status="uploading">
  <cs-thumbnail class="upload-icon" data-type="file-icon" data-size="lg">
    <i class="cses-stratis-file-01"></i>
  </cs-thumbnail>
  <div class="upload-info">
    <span class="upload-name">报表.xlsx</span>
    <span class="upload-size">5.2 MB</span>
  </div>
  <button class="upload-close"><i class="cses-stratis-x-01"></i></button>
</cs-file-upload>

<!-- 完成 -->
<cs-file-upload data-status="done">
  <cs-thumbnail class="upload-icon" data-type="file-icon" data-size="lg">
    <i class="cses-stratis-file-01"></i>
  </cs-thumbnail>
  <div class="upload-info">
    <span class="upload-name">文档.pdf</span>
    <span class="upload-size">3.7 MB</span>
  </div>
  <button class="upload-close"><i class="cses-stratis-x-01"></i></button>
  <i class="upload-done-icon cses-stratis-check-contained-circle"></i>
</cs-file-upload>

<!-- 错误 -->
<cs-file-upload data-status="error">
  <cs-thumbnail class="upload-icon" data-type="file-icon" data-size="lg">
    <i class="cses-stratis-file-01"></i>
  </cs-thumbnail>
  <div class="upload-info">
    <span class="upload-name">备份.zip</span>
    <span class="upload-size">58.3 MB</span>
  </div>
  <button class="upload-close"><i class="cses-stratis-x-01"></i></button>
  <i class="upload-retry-icon cses-stratis-refresh-01"></i>
</cs-file-upload>
```
