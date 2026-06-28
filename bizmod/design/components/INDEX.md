# 组件索引（自动同步，component-agent 维护）

**用法**：page-agent 装配前 read 本文件拿到全部组件清单与 data-* 变体；需要某个组件的完整 RULES、子元素结构、HTML 范例时再单点 read `design/components/<name>/RULES.md`。

**新增/修改组件时**：component-agent 必须同步更新本文件。

| 组件 | 标签 | 简介 | data-* 属性 | CSS 路径 |
|---|---|---|---|---|
| avatar | `<cs-avatar>` | 头像组件，用于用户、群组的图像展示。 | `data-color data-online data-shape data-size` | components/avatar/avatar.css |
| breadcrumb | `<cs-breadcrumb>` | 顶栏空间内导航面包屑，展示当前页面在层级中的位置。 | `data-current` | components/breadcrumb/breadcrumb.css |
| button | `<cs-button>` | 通用按钮组件，支持三种变体、三种尺寸、图标和下拉。 | `data-disabled data-dropdown data-hover data-icon data-loading data-pressed data-size data-variant` | components/button/button.css |
| checkbox | `<cs-checkbox>` | 复选框组件，用于多选场景，支持选中、半选、禁用状态及多种尺寸。 | `data-checked data-disabled data-indeterminate data-size` | components/checkbox/checkbox.css |
| file-upload | `<cs-file-upload>` | 文件上传项组件，用于展示已选择/上传中/已完成/失败的文件条目。 | `data-size data-status data-type` | components/file-upload/file-upload.css |
| form-group | `<cs-form-group>` | 表单组组件，用于组合标签、输入字段、辅助文本和错误提示。 | `data-direction data-error data-required` | components/form-group/form-group.css |
| input | `<cs-input>` | 通用输入框组件（纯输入框），支持三种尺寸、多种交互状态。搜索功能由分子组件 `cs-search-input` 负责。 | `data-disabled data-error data-focus data-size` | components/input/input.css |
| kanban-card | `<cs-kanban-card>` | 需求看板中的卡片项，用于展示需求编号、标题、标签和元信息。支持不同状态列（待审核/已确认/已归档）。 | `data-color data-dragging data-priority data-size` | components/kanban-card/kanban-card.css |
| kanban-column | `<cs-kanban-column>` | 看板视图中的列容器，包含列标题（带计数徽标）和卡片列表区域。用于需求看板的待审核/已确认/已归档等分类列。 | `data-icon data-priority data-size data-status data-variant` | components/kanban-column/kanban-column.css |
| link | `<cs-link>` | 文本链接组件，用于页面中的可点击文字链接。 | `data-disabled` | components/link/link.css |
| nav-action-btn | `<cs-nav-action-btn>` | 导航栏内全宽操作按钮，用于新建任务/文档等主要操作入口。 | `data-disabled` | components/nav-action-btn/nav-action-btn.css |
| nav-group | `<cs-nav-group>` | 侧边栏可折叠导航分组组件，用于组织"我的任务"、"空间"等导航区块。 | `data-collapsed` | components/nav-group/nav-group.css |
| nav-item | `<cs-nav-item>` | 二级侧边栏/导航栏中的导航条目，支持图标、文字和右侧徽标。 | `data-active data-color` | components/nav-item/nav-item.css |
| radio | `<cs-radio>` | 单选框组件，用于在一组选项中选择单个值。 | `data-checked data-disabled data-size` | components/radio/radio.css |
| search-input | `<cs-search-input>` | 搜索输入框组件，带搜索图标和可选清除按钮。 | `data-error data-has-value data-size data-variant` | components/search-input/search-input.css |
| search-trigger | `<cs-search-trigger>` | 数据来源：Figma 节点 82:1450 | `data-size` | components/search-trigger/search-trigger.css |
| select | `<cs-select>` | 选择器组件，模拟原生 select 外观，支持尺寸、状态变体。 | `data-disabled data-error data-open data-size` | components/select/select.css |
| status-badge | `<cs-status-badge>` | 状态徽标组件，彩色圆点 + 状态文字，用于任务/会议列表的状态展示。 | `data-status` | components/status-badge/status-badge.css |
| switch | `<cs-switch>` | 开关切换组件，用于在两种状态间切换（开/关）。 | `data-checked data-disabled data-size` | components/switch/switch.css |
| tab-nav | `<cs-tab-nav>` | 下划线式标签页导航组件，用于消息、文档库等页面的内容切换。 | `data-active` | components/tab-nav/tab-nav.css |
| tag | `<cs-tag>` | 小型标签/徽标组件，支持语义颜色、尺寸和可关闭功能。 | `data-closable data-color data-shape data-size data-variant` | components/tag/tag.css |
| task-row | `<cs-task-row>` | 任务管理列表视图中的主要重复行元素，采用两行布局：第一行为任务标题+状态标签，第二行为活动头像+活动描述。支持状态药丸、优先级、日期、空间/项目等列。 | `data-checked data-completed data-level data-size data-status data-type` | components/task-row/task-row.css |
| textarea | `<cs-textarea>` | 多行文本输入组件，支持垂直调整高度、字数统计、错误态和禁用态。 | `data-disabled data-error` | components/textarea/textarea.css |
| thumbnail | `<cs-thumbnail>` | 文件类型图标与文档预览图片缩略图组件。 | `data-filetype data-size data-type` | components/thumbnail/thumbnail.css |
| user-pill | `<cs-user-pill>` | 用户药丸组件，展示头像 + 名称的紧凑标签形式，常用于任务抽屉成员列表、会议参与人等场景。 | `data-closable data-color data-size data-type` | components/user-pill/user-pill.css |
| view-switcher | `<cs-view-switcher>` | 视图切换组件，用于在列表/卡片/网格等视图模式之间切换的图标按钮组。 | `data-active data-size` | components/view-switcher/view-switcher.css |
| window-control | `<cs-window-control>` | 客户端窗口控制按钮组（关闭、最小化、最大化），位于客户端顶栏左上角。 | `—` | components/window-control/window-control.css |
