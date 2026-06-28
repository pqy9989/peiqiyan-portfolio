

## 命名约定

1. 所有组件使用 `cs-` 前缀自定义标签，目录名 = 标签名去掉 `cs-`
2. 变体和状态通过 `data-` 属性传递，禁止 BEM 修饰类
3. CSS 使用标签名 + 属性选择器
4. 颜色、字号、间距必须引用 `css/` 变量，禁止硬编码
5. 使用前须先引入 `css/base.css`

## data 属性约定

| 属性 | 用途 |
|------|------|
| `data-variant` | 外观变体 |
| `data-size` | 尺寸（sm/md/lg） |
| `data-color` | 语义颜色 |
| `data-checked` | 选中（布尔） |
| `data-disabled` | 禁用（布尔） |
| `data-active` | 激活（布尔） |

## 组件索引（61 个）

### shared（两端共用）

（待移动端组件加入后分类）

### desktop（桌面端专用）

**原子（11）：** button、avatar、checkbox、radio、switch、input、textarea、select、tag、link、segment-control、window-control、search-input

**分子（11）：** breadcrumb、status-badge、user-pill、view-switcher、form-group、tab-nav、date-separator、thumbnail、nav-item、nav-group、nav-space、nav-action-btn

**有机体（6）：** pagination、file-upload、storage-info、vote-card、read-receipt、meeting-card

**桌面端业务（8）：** tab、nav-tree、task-row、task-group-header、chat-item、message-bubble、message-input、chat-header

> 布局容器在 fragment/desktop/：layout、tabbar、navbar、sidebar、content-header、filter-bar、drawer、modal（space-switcher 已删，见 fragment.md）
