# form-group 规则

标签：`<cs-form-group>`

表单组组件，用于组合标签、输入字段、辅助文本和错误提示。

## 数据来源

- 设计规范中的输入框/选择器页面（label + field + helper text 布局）

## 属性

| 属性 | 值 | 说明 |
|------|-----|------|
| `data-required` | 布尔 | 显示必填星号（红色 `*`，未设也保留透明占位以对齐文字） |
| `data-direction` | `vertical`(默认) / `horizontal` | 排列方向 |
| `data-error` | （布尔，无值） | 错误状态，显示错误文案并隐藏辅助文案 |

## 子元素

| 类名 | 说明 |
|------|------|
| `.form-label` | 标签文本 |
| `.form-field` | 字段容器（放置 input/select 等） |
| `.form-helper` | 辅助提示文本 |
| `.form-error` | 错误提示文本 |

## 样式规格

- **布局**：flex，默认 column（垂直），可选 row（水平）
- **标签**：`var(--typo-cn-14-regular)`，颜色 `var(--color-text-light)`
- **必填星号**：颜色 `var(--color-error)`，位于标签文字前
- **垂直间距**：标签到字段 `var(--space-xs)`
- **水平间距**：标签到字段 `var(--spacing-10)`
- **水平标签宽度**：70px（可配置）
- **辅助文本**：`var(--typo-cn-12-regular)`，颜色 `var(--color-text-light2)`
- **错误文本**：`var(--typo-cn-12-regular)`，颜色 `var(--color-error)`

## HTML 写法

```html
<!-- 垂直（默认） -->
<cs-form-group data-required>
  <span class="form-label">邮箱</span>
  <div class="form-field">
    <cs-input>
      <input class="input-field" type="email" placeholder="请输入邮箱">
    </cs-input>
  </div>
  <span class="form-helper">用于接收通知</span>
</cs-form-group>

<!-- 水平 -->
<cs-form-group data-direction="horizontal" data-required>
  <span class="form-label">姓名</span>
  <div class="form-field">
    <cs-input>
      <input class="input-field" type="text" placeholder="请输入姓名">
    </cs-input>
  </div>
</cs-form-group>

<!-- 错误状态 -->
<cs-form-group data-required data-error>
  <span class="form-label">密码</span>
  <div class="form-field">
    <cs-input data-error>
      <input class="input-field" type="password" placeholder="请输入密码">
    </cs-input>
  </div>
  <span class="form-helper">至少8个字符</span>
  <span class="form-error">密码长度不能少于8个字符</span>
</cs-form-group>
```

## 使用场景

- **表单页面**：注册、设置、信息编辑等需要 label + field + helper 组合的场景
- **筛选面板**：水平排列的筛选条件

## 依赖（2026-05-08 起）

`<cs-form-group>` 自身不实现输入框样式，**字段区直接嵌套 `<cs-input>` / `<cs-select>` / `<cs-textarea>` / `<cs-checkbox>` / `<cs-radio>` 等表单原子组件**。

预览页（`form-group.html`）必须 link 这些被嵌套组件的 css：

```html
<link rel="stylesheet" href="../input/input.css">
<link rel="stylesheet" href="../select/select.css">
<link rel="stylesheet" href="../textarea/textarea.css">
```

引用页面同理：在页面 HTML 顶部按需 link 所有被使用的表单原子组件的 css。
