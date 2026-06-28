负责代理: Component Agent

# doc-item

文档列表项组件。图标 + 两行布局，用于工作台「最近文档」「分享给我的文档」等列表区域。

## 标签
`<cs-doc-item>`

## data 属性
| 属性 | 值 | 说明 |
|------|-----|------|
| `data-type` | `doc` / `sheet` / `ppt` / `pdf` / `image` / `folder` | 文件类型，决定图标配色（引用 `--cs-color-filetype-*`）。缺省为未知灰 |
| `data-new` | 布尔（存在即生效） | 标记新文件：标题加粗 + 显示未读圆点 `.doc-dot` |

## 子元素
| 类名 | 说明 |
|------|------|
| `.doc-icon` | 文件图标容器（32px 圆角方块），内放 `<i class="cses-*">` |
| `.doc-body` | 文字区（flex:1），垂直两行布局 |
| `.doc-title-row` | 第一行：未读圆点 + 标题 |
| `.doc-dot` | 未读圆点，仅 `data-new` 时显示 |
| `.doc-title` | 文件名，溢出省略；hover 变主色 |
| `.doc-meta` | 第二行：修改时间 + 修改者 |
| `.doc-date` | 最后修改时间 |
| `.doc-author` | 修改者名称 |
| `.doc-tag` | 可选状态标签，配合 `data-status` 取色 |
| `.doc-actions` | hover 时显示的操作图标区 |

### `.doc-tag` 的 `data-status`
| 值 | 文案示例 | 配色 |
|------|------|------|
| `shared` | 已分享 | 主色 |
| `pending` | 待我审批 | 警告色 |
| `done` | 已完成 | 成功色 |
| 缺省 | — | 中性灰 |

## 状态
- 默认：正常显示
- hover：整行底色变化（`--cs-color-bg-hover`），标题变主色，`.doc-actions` 淡入
- 新文件（`data-new`）：标题加粗 + 圆点显示

## 图标说明
`cses-stratis-file-text` 在图标库中不存在。统一使用速查表中已有图标：
- 文档/表格/PPT/PDF：`cses-stratis-file-01`（靠 `data-type` 区分颜色）
- 图片：`cses-stratis-image`
- 文件夹：`cses-stratis-folder`

## 用法示例
```html
<!-- 最近文档：新文件 + 操作区 -->
<cs-doc-item data-type="doc" data-new>
  <span class="doc-icon"><i class="cses-stratis-file-01"></i></span>
  <span class="doc-body">
    <span class="doc-title-row">
      <span class="doc-dot"></span>
      <span class="doc-title">Q2 季度总结.docx</span>
    </span>
    <span class="doc-meta">
      <span class="doc-date">5月28日 16:45</span>
      <span class="doc-author">张三</span>
    </span>
  </span>
  <span class="doc-actions">
    <i class="cses-stratis-dot-horizontal"></i>
  </span>
</cs-doc-item>

<!-- 分享给我：带状态标签 -->
<cs-doc-item data-type="sheet">
  <span class="doc-icon"><i class="cses-stratis-file-01"></i></span>
  <span class="doc-body">
    <span class="doc-title-row">
      <span class="doc-dot"></span>
      <span class="doc-title">销售数据汇总.xlsx</span>
    </span>
    <span class="doc-meta">
      <span class="doc-date">5月27日 17:05</span>
      <span class="doc-author">周主管</span>
    </span>
  </span>
  <span class="doc-tag" data-status="shared">已分享</span>
</cs-doc-item>
```

## 规范要点
- 根标签 `cs-doc-item`，变体/状态用 `data-*`，禁止 BEM 修饰类
- 颜色/字号/间距全部引用 `css/` 变量，零硬编码
- 底部分割线使用 `--cs-color-text-light2`（light2 颜色），`:last-child` 去除
- 使用前须先引入 `css/base.css` 与 `fonts/cses-icons.css`
