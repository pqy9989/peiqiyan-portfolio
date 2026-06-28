# window-control 规则

标签：`<cs-window-control>`

客户端窗口控制按钮组（关闭、最小化、最大化），位于客户端顶栏左上角。

## 数据来源

Figma 设计规范导出版 节点 15-61498

## Figma 精确数据

- 容器：64×16，三个圆点横排
- 圆点尺寸：16×16
- 圆角：全圆 9999px
- 间距：6px → `var(--spacing-6)`

### 颜色

| 按钮 | Figma 原值 | 项目变量 |
|------|-----------|---------|
| 关闭 | #FF6E5C | `var(--cs-color-window-close)` |
| 最小化 | #F4BE4F | `var(--cs-color-window-minimize)` |
| 最大化 | #61C654 | `var(--cs-color-window-maximize)` |

## 子元素

| 类名 | 标签 | 说明 |
|------|------|------|
| `.ctrl-close` | `<span>` | 关闭按钮（红色） |
| `.ctrl-minimize` | `<span>` | 最小化按钮（黄色） |
| `.ctrl-maximize` | `<span>` | 最大化按钮（绿色） |

## HTML 写法

```html
<cs-window-control>
  <span class="ctrl-close"></span>
  <span class="ctrl-minimize"></span>
  <span class="ctrl-maximize"></span>
</cs-window-control>
```
