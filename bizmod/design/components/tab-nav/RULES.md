# tab-nav 规则

标签：`<cs-tab-nav>`

下划线式标签页导航组件，用于消息、文档库等页面的内容切换。

## 数据来源

- 消息设计稿 Figma（消息分类标签）
- 文档库设计稿 Figma（文档分类导航）

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `.tab-item` 上的 `data-active` | （布尔，无值） | 激活状态 |

## 子元素

| 类名 | 说明 |
|------|------|
| `.tab-item` | 标签项 |
| `.tab-badge` | 可选计数角标（放在 .tab-item 内） |

## 样式规格

- **容器**：flex row，底部边框 `var(--line-width) solid var(--color-border)`
- **标签项内边距**：`var(--space-xs) var(--space-md)`
- **字体**：`var(--typo-cn-14-regular)`
- **默认颜色**：`var(--color-text-light2)`
- **悬停颜色**：`var(--color-text)`
- **激活颜色**：`var(--color-primary)`，底部 2px 下划线 `var(--color-primary)`，字重 `var(--font-weight-medium)`
- **标签间距**：0（标签紧挨）
- **角标**：圆形背景 `var(--color-fill-light)`，`var(--typo-cn-12-regular)`，激活态背景 `var(--color-blue-100)`

## HTML 写法

```html
<!-- 基础 -->
<cs-tab-nav>
  <span class="tab-item" data-active>全部</span>
  <span class="tab-item">未读</span>
  <span class="tab-item">已读</span>
</cs-tab-nav>

<!-- 带计数 -->
<cs-tab-nav>
  <span class="tab-item" data-active>未读 <span class="tab-badge">2</span></span>
  <span class="tab-item">全部 <span class="tab-badge">128</span></span>
</cs-tab-nav>
```

## 使用场景

- **消息页面**：全部/未读/已读/系统通知切换
- **文档库**：最近/我的/共享/回收站切换
- **设置页面**：不同设置分类切换
