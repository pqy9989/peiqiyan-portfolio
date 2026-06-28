# link 规则

标签：`<cs-link>`

文本链接组件，用于页面中的可点击文字链接。

## 数据来源

- 各页面文本链接设计（登录页、帮助文档、用户协议等）

## Figma 精确数据

- 颜色：#4757e2 → `var(--sem-text-link)`（Figma 值 #4757e2，最接近 --color-primary/#4857e2，差距 1）
- 悬停：深蓝 → `var(--sem-text-link-hover)`
- 激活：→ `var(--color-primary-active)`
- 禁用：→ `var(--sem-text-disabled)`
- 字体：继承父级，或 `var(--typo-cn-14-regular)`

### Figma 颜色映射

| Figma 原值 | 项目变量 | 用途 |
|-----------|---------|------|
| #4757e2 | `var(--sem-text-link)` | 链接默认色（Figma 值无精确匹配，取语义变量，差距 1） |

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-disabled` | （布尔，无值） | 禁用状态 |

## 子元素

| 类名 | 说明 |
|------|------|
| `.link-icon` | 链接前置图标 |

## HTML 写法

```html
<!-- 基础链接 -->
<cs-link>查看详情</cs-link>

<!-- 禁用链接 -->
<cs-link data-disabled>查看详情</cs-link>

<!-- 带图标链接 -->
<cs-link>
  <i class="cses-stratis-link link-icon"></i>
  打开链接
</cs-link>

<!-- 行内使用 -->
<p>请 <cs-link>联系管理员</cs-link> 获取帮助。</p>
```

## 使用场景

- **页面正文**：行内文字链接跳转
- **表单底部**：忘记密码、注册链接
- **协议**：用户协议、隐私政策链接
- **帮助提示**：查看文档、联系支持链接
