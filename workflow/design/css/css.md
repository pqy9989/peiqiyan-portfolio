

---

# CSS 目录

全局样式变量，供 `pages/` 和 `components/` 引用。

## 文件

| 文件 | 说明 |
|------|------|
| `base.css` | 基础重置 + 统一引入 token.css 和 variable.css，页面只需引入此文件 |
| `token.css` | 基础设计令牌（色板、字体、字号、间距、圆角、透明度、边框宽度），不直接用于业务样式 |
| `variable.css` | 语义设计变量（功能色、文字色、背景色、阴影、Figma 语义令牌等），业务样式统一引用 |
| `preview.html` | 样式变量可视化预览页 |

## 规范

1. 所有样式以 CSS 自定义属性定义，通过 `var(--变量名)` 引用。
2. 变量名变更时，必须同步更新所有引用该变量的文件。
3. 禁止硬编码颜色值、字号或间距。

# 设计变量命名规范（CSLM）

> 命名公式：`(Prefix -) Category - Semantic - Level - Status/Mode`
>
> 即 `(前缀 -) 类型 - 语义(场景-功能) - 等级 - 状态/模式`

---

## 1. 核心设计理念

| 原则 | 说明 |
| --- | --- |
| 语义优先 | 不出现"红色/蓝色"，使用 `primary / success / surface / overlay` |
| 可层级覆盖 | 组件级可覆盖全局：`--button-bg` 覆盖 `--color-bg-primary` |
| 遵循 Design Token 体系 | 与主流 UI 库一致，降低认知成本 |
| 单一职责 | `color` 只描述颜色，不混入 `opacity`、`size` |

---

## 2. 变量层级

```
Raw Tokens  →  全局语义变量      →  组件语义变量           →  模块私有变量
(token.css)    (variable.css)       (组件 CSS，--cs-{组件}-)    (页面 CSS，--{模块前缀}-)
（无前缀）      （--cs- 前缀）
```

| 层级 | 文件位置 | 前缀 | 说明 |
|------|----------|------|------|
| 基础令牌 | `token.css` | 无 | 原始值，不直接用于业务，不加任何前缀 |
| 全局语义变量 | `variable.css` | **`--cs-`** | **所有语义变量统一加 `--cs-` 前缀** |
| 组件语义变量 | 组件自身 CSS | `--cs-{组件名}-` | 组件专属，基于基础令牌或全局语义变量定义 |
| 模块私有变量 | 页面/组件自身 CSS | `--{模块前缀}-` | 仅本模块使用，值引用上层变量，前缀须注册 |

---

## 3. 前缀（Prefix）

变量前缀按层级严格划分，不同层级禁止混用。

### 3.1 全局语义变量（`--cs-`）

`variable.css` 中定义的**所有语义变量**必须以 `--cs-` 开头：

```css
/* ✅ 正确 */
--cs-color-primary: var(--color-blue-500);
--cs-color-text: #333333;
--cs-sem-bg-primary: var(--cs-color-bg);

/* ✗ 禁止 —— 语义变量不得省略 --cs- 前缀 */
--color-primary: var(--color-blue-500);
--sem-bg-primary: ...;
```

### 3.2 基础令牌（无前缀）

`token.css` 中的基础令牌**不加任何前缀**，这是项目内部的原始值，业务代码不得直接引用：

```css
/* token.css 中的原始令牌 —— 无前缀，不直接用于业务 */
--color-blue-500: #4857e2;
--font-size-md: 14px;
--space-xs: 8px;
```

### 3.3 组件语义变量（`--cs-{组件名}-`）

组件可基于基础令牌（`token.css`）或全局语义变量（`variable.css`）定义**组件专属语义变量**：

**定义位置：** 组件自身 CSS 文件（如 `components/desktop/button/button.css`），**不得写入 `variable.css`**

**命名格式：** `--cs-{组件名}-{类型}-{语义}-{状态}`

```css
/* button.css */
--cs-button-bg-primary: var(--cs-color-primary);
--cs-button-bg-primary-hover: var(--cs-color-primary-hover);
--cs-button-bg-primary-disabled: var(--cs-color-primary-disabled);
--cs-button-text-inverse: var(--cs-color-text-inverse);
--cs-button-radius: var(--radius-sm);

/* tag.css */
--cs-tag-bg-success: var(--cs-sem-bg-success);
--cs-tag-text-success: var(--cs-sem-text-success);
```

**允许直接引用基础令牌（当全局语义变量不存在精确匹配时）：**

```css
/* ✅ 允许 —— 引用 token.css 基础令牌 */
--cs-button-height-sm: var(--sem-size-interactive-sm);    /* 32px */
--cs-button-height-md: var(--sem-size-interactive-md);    /* 40px */
```

**禁止硬编码：**

```css
/* ✗ 禁止 */
--cs-button-bg-primary: #4857e2;
```

### 3.4 模块私有变量（`--{模块前缀}-`）

当页面需要定义**仅本模块使用**的变量（公共语义变量无法覆盖的值），使用模块专属前缀（1~3 个字符）：

**定义位置：** 页面自身 CSS 文件，**不得写入 `variable.css`**

**命名格式：** `--{模块前缀}-{类型}-{语义}-{等级/状态}`

```css
/* 文档库模块，前缀 --dl- */
--dl-sidebar-width: 280px;
--dl-color-folder-icon: var(--cs-color-warning);

/* 任务模块，前缀 --tk- */
--tk-column-width: 300px;
--tk-color-priority-high: var(--cs-color-error);
```

**使用流程：**

1. 开发者提出需求：需要哪些私有变量，用于什么场景
2. **前缀由负责人确认**，确认后记录到下方已注册前缀列表
3. 私有变量的值必须引用 `token.css` 或 `variable.css` 中的变量，禁止硬编码

### 3.5 已注册模块前缀

| 前缀 | 模块 | 负责人 | 备注 |
|------|------|--------|------|
| — | — | — | 待注册 |

> 新增模块前缀须在此表登记，未登记的前缀禁止使用。

---

## 4. 四大变量类型

| 类型 | 关键词 |
| --- | --- |
| 颜色 | `color` |
| 字体 | `font` |
| 尺寸 | `space`、`radius` |
| 组合式 | `motion`、`shadow`、`animation` |

---

## 5. 颜色（Color）

### 5.1 基础色（Raw Tokens）—— 不直接使用

```css
--color-gray-0
--color-gray-100
--color-blue-500
--color-red-500
```

### 5.2 功能类型（Category - Semantic）

| 语义 | 说明 |
| --- | --- |
| `primary` | 主色 |
| `success` | 成功色 |
| `error` / `danger` | 失败/危险色 |
| `warning` | 警告色 |
| `info` | 提示色 |
| `mark` | 标记色 |
| `bg` | 背景色 |
| `text` | 字体色 |

### 5.3 等级（Level）

| 等级 | 说明 |
| --- | --- |
| `default`（省略） | 正常 |
| `light` | 浅一点 |
| `lighter` | 更浅 |
| `lightest` | 最浅 |
| `light2`、`light3`… | 递增更浅 |
| `dark` | 深一点 |
| `darker` | 更深 |
| `darkest` | 最深 |
| `dark2`、`dark3`… | 递增更深 |

### 5.4 状态/模式（Status / Mode）

| 状态 | 说明 |
| --- | --- |
| `default`（省略） | 默认 |
| `hover` | 鼠标移入 |
| `active` | 激活 |
| `disabled` | 禁用 |
| `selected` | 选中 |
| `inverse` | 反色 |
| `accent` | 强调 |
| `weaken` | 弱化 |

### 5.5 示例

```css
/* variable.css —— 全局语义变量，统一加 --cs- 前缀 */

/* 功能色 */
--cs-color-primary: var(--color-blue-500);    /* 引用 token.css */
--cs-color-primary-light: #a4aeff;
--cs-color-primary-hover: #4958de;
--cs-color-primary-active: #4351cd;
--cs-color-primary-disabled: #ced3ff;

--cs-color-success: #00b42a;
--cs-color-warning: #ff7d00;
--cs-color-error: #f53f3f;
--cs-color-info: #1890ff;

/* 背景色 */
--cs-color-bg: var(--color-neutral-0);
--cs-color-bg-light: var(--color-neutral-100);
--cs-color-bg-hover: var(--cs-color-primary-a2);   /* 主色 8% 透明，2026-05-08 改自 var(--color-neutral-50) */

/* 字体色 */
--cs-color-text: #333333;
--cs-color-text-light: #666666;
--cs-color-text-light2: #999999;
--cs-color-text-inverse: var(--color-neutral-0);
```

### 5.6 透明度（Alpha）

使用 `-a` 或 `-alpha-XX` 后缀。仅在语义变量无法覆盖时使用，且**不与状态/等级同时叠加**。

| 变量 | 透明度 | 常用用途 |
| --- | --- | --- |
| `a1` | 3%~5% | hover 背景 |
| `a2` | 6%~8% | 按钮浅背景、分割线 |
| `a3` | 10%~12% | active 背景 |
| `a4` | 15% | 明显强调 |
| `a5` | 20% | badge / tag 背景 |
| `a8` | 35% | solid overlay |
| `a12` | 90%~95% | 聚焦、overlay mask |

```css
/* ✅ 正确 —— 同样加 --cs- 前缀 */
--cs-color-primary-a1: rgba(72, 87, 226, 0.05);

/* ✗ 禁止 —— 不与状态或等级同时使用 */
--cs-color-primary-hover-a1: ...;   /* X */
--cs-color-primary-light2-a1: ...;  /* X */
```

### 5.7 特殊语义（场景色）

```css
--color-overlay: rgba(0, 0, 0, 0.2);
--color-backdrop: rgba(0, 0, 0, 0.6);
--color-card: #fff;

/* 场景 + 类型：先场景，再类型 */
--color-card-bg: #fff;
```

---

## 6. 字体（Font）

```css
/* 字体族 */
--font-family: ...;

/* 字体大小 */
--font-size-xs
--font-size-sm
--font-size           /* 默认 */
--font-size-lg
--font-size-xl

/* 字体粗细 */
--font-weight-regular
--font-weight-medium
--font-weight-bold

/* 行高 */
--line-height-sm
--line-height         /* 默认 */
--line-height-lg
```

---

## 7. 尺寸

### 7.1 间距（Spacing）

```css
--space-2xs
--space-xs
--space-sm
--space-md
--space-lg
--space-xl
--space-2xl
```

### 7.2 圆角（Radius）

```css
--radius-sm: 2px;
--radius: 4px;
--radius-lg: 8px;
--radius-xl: 12px;
```

---

## 8. 组合式

### 8.1 动画（Motion）

**时长（Duration）**

```css
--motion-duration-fast2: 100ms;
--motion-duration-fast: 150ms;
--motion-duration-normal: 225ms;
--motion-duration-slow: 300ms;
--motion-duration-slow2: 500ms;
```

**缓动函数（Easing）**

```css
--motion-easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
--motion-easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);
--motion-easing-decelerate: cubic-bezier(0.0, 0, 0.2, 1);
--motion-easing-emphasized: cubic-bezier(0.2, 0.0, 0, 1);
```

**关键帧（Keyframes）**

```css
--motion-keyframe-fade-in: fade-in;
--motion-keyframe-fade-out: fade-out;
--motion-keyframe-scale-in: scale-in;
--motion-keyframe-drawer-slide: drawer-slide;
--motion-keyframe-tooltip-appear: tooltip-appear;
```

**封装动画变量（推荐日常使用）**

```css
--animation-fade-in: var(--motion-keyframe-fade-in)
                     var(--motion-duration-fast)
                     var(--motion-easing-standard);

/* 使用 */
animation: var(--animation-fade-in);
```

### 8.2 阴影（Shadow）

**按等级区分**

```css
--shadow-xs: 0 0 2px 2px;
--shadow-sm: 0 0 4px 2px;
--shadow: 0 0 4px 4px;
--shadow-lg: 0 0 6px 12px;
--shadow-xl: 0 0 8px 20px;
```

**按场景区分**

```css
--shadow-button: 0 0 2px 2px rgba(0, 0, 0, 0.1);
--shadow-dialog: 0 2px 4px 4px rgba(0, 0, 0, 0.1);
```

**场景 + 等级组合**

```css
--shadow-dialog-dark: 0 0 4px 6px rgba(0, 0, 0, 0.1);
```

**Figma 限制解决方案：** 若需主题切换，拆分子变量组合使用：

```css
--shadow-light: var(--shadow-x-light)
                var(--shadow-y-light)
                var(--shadow-blur-light)
                var(--shadow-spread-light)
                var(--color-shadow-light);
```

---

## 9. 各层级变量梳理

### 9.1 基础令牌（`token.css`，无前缀）

原始值，仅供上层变量引用，**业务代码不得直接使用**。

```css
/* token.css */
--color-blue-500: #4857e2;
--font-size-md: 14px;
--space-xs: 8px;
--radius-sm: 6px;
```

### 9.2 全局语义变量（`variable.css`，`--cs-` 前缀）

**所有定义在 `variable.css` 中的变量统一加 `--cs-` 前缀。** 值引用 `token.css` 令牌。

包含三类语义：

**功能色 / 状态色 / 文字色 / 背景色：**
```css
--cs-color-primary: var(--color-blue-500);
--cs-color-text: #333333;
--cs-color-bg: var(--color-neutral-0);
--cs-sem-bg-success: var(--color-green-100);
```

**场景语义（当语义可能独立于功能色变化时，先场景再类型）：**
```css
--cs-color-text-anchor: var(--cs-color-primary);   /* 链接文本色 */
--cs-color-bg-mark: var(--cs-color-mark);          /* 标记背景色 */
--cs-radius-card: var(--radius-lg);                /* 卡片圆角 */
```

**判断标准：** 该值被多个组件或页面引用 → 定义在 `variable.css`。

### 9.3 组件语义变量（组件自身 CSS，`--cs-{组件名}-` 前缀）

组件专属的设计变量，**不得写入 `variable.css`**，定义在组件自身 CSS 文件中。

**允许引用的来源：**
- `token.css` 中的基础令牌
- `variable.css` 中的全局语义变量（`--cs-` 前缀变量）

```css
/* button.css */
:root {
  --cs-button-bg-primary: var(--cs-color-primary);
  --cs-button-bg-primary-hover: var(--cs-color-primary-hover);
  --cs-button-bg-primary-disabled: var(--cs-color-primary-disabled);
  --cs-button-text-inverse: var(--cs-color-text-inverse);
  --cs-button-height-sm: var(--sem-size-interactive-sm);    /* 引用 token */
  --cs-button-height-md: var(--sem-size-interactive-md);
  --cs-button-radius: var(--radius-sm);
}

/* 组件内使用 */
cs-button[data-variant="primary"] {
  background: var(--cs-button-bg-primary);
  color: var(--cs-button-text-inverse);
  border-radius: var(--cs-button-radius);
}
```

**判断标准：** 该值仅在本组件内使用，其他组件不需要 → 定义为组件语义变量。

### 9.4 模块私有变量（页面自身 CSS，`--{模块前缀}-` 前缀）

页面级特有的设计变量，**不得写入 `variable.css`**，定义在页面自身 CSS 文件中。

**判断标准：** 该值仅在本页面使用，且不适合提升为公共语义 → 定义为模块私有变量。

```css
/* docs-home.css — 文档库私有变量（前缀 --dl-） */
:root {
  --dl-sidebar-width: 280px;
  --dl-card-gap: var(--cs-sem-spacing-comp-gap-md);
  --dl-color-folder-icon: var(--cs-color-warning);
}

/* 使用 */
.doc-sidebar { width: var(--dl-sidebar-width); }
.doc-card-grid { gap: var(--dl-card-gap); }
```

**前缀分配流程：** 见第 3.5 节，所有前缀须在已注册前缀列表中登记后方可使用。

### 9.5 层级决策流程

```
需要一个新变量？
  ├─ 多个组件/页面都会用到？
  │    └─ → 加入 variable.css（--cs- 前缀）
  ├─ 仅某一个组件使用？
  │    └─ → 定义在组件 CSS（--cs-{组件名}- 前缀）
  └─ 仅某一个页面使用？
       └─ → 定义在页面 CSS（--{模块前缀}- 前缀，须先登记）
```

---

## 10. 速查：全局语义变量树（`variable.css`，均带 `--cs-` 前缀）

```
--cs-color
├── primary / success / error / warning / info / mark
│   ├── (default)
│   ├── hover / active / selected / disabled
│   ├── inverse / accent / weaken
│   └── light / lighter / lightest / dark / darker / darkest
├── bg
│   ├── (default) / inverse / dark / light / hover
│   └── ...
├── text
│   ├── (default) / light / light2 / inverse
│   └── ...
├── overlay / backdrop / card
└── shadow（若归入 color 类）

--cs-font
├── family
├── size: xs / sm / (default) / lg / xl
├── weight: regular / medium / bold
└── line-height: sm / (default) / lg

--cs-spacing / --cs-radius
└── 2xs / xs / sm / md / lg / xl / 2xl

--cs-shadow
└── xs / sm / (default) / lg / xl

--cs-motion
├── duration: fast2 / fast / normal / slow / slow2
├── easing: standard / accelerate / decelerate / emphasized
└── keyframe: fade-in / fade-out / scale-in / ...

--cs-sem-*   （Figma 语义令牌，含 bg / text / border / interactive / status / spacing / size）
```

> **注意：** `token.css` 中的原始令牌（如 `--color-blue-500`、`--font-size-md`）不在此树中，不带 `--cs-` 前缀。

---

## 11. 禁止事项

1. **禁止**在 `variable.css` 中定义不带 `--cs-` 前缀的语义变量
2. **禁止**直接使用基础令牌（如 `--color-red-500`）作为业务样式
3. **禁止**硬编码颜色、间距、圆角、字号
4. **禁止**透明度后缀与状态/等级后缀同时使用（如 `--cs-color-primary-hover-a1`）
5. **禁止**将组件语义变量或模块私有变量写入 `variable.css`
6. **禁止**使用未注册的模块前缀，新前缀须先在第 3.5 节登记确认
7. **禁止**组件语义变量或模块私有变量硬编码值，必须引用上层变量
8. **禁止**在组件语义变量中直接写入业务含义不明的原始数值（如直接写 `16px`，应引用 `var(--space-md)`）

---

## 变更历史

### 2026-06-25：补齐 `--spacing-4 / 8 / 16` 别名（variable.css）

- 起因：`--spacing-*` 数字 px 阶梯在 4 的倍数中缺 `4 / 8 / 16`，page-agent 凭印象写 `var(--spacing-16)` 时 CSS 不报错但回退 `0`，导致 gap/padding 失效（expense-home 已出现 7 处失效）
- 在 variable.css "补充间距"段尾新增 3 个别名，全部引用既有 `--space-*`，禁止硬编码：
  - `--spacing-4: var(--space-2xs)` (4px)
  - `--spacing-8: var(--space-xs)` (8px)
  - `--spacing-16: var(--space-md)` (16px)
- 仅补别名，不改动 token.css 既有阶梯，也不改 7.1 节抽象命名（`--space-*` 体系仍为推荐写法）
- 现网扫描确认其他常用阶梯（12 / 20 / 24 / 28 / 32 / 40 / 48）均已定义，无其他间断

### 2026-05-09：4 大状态色降饱和（token.css）

- 将 red / green / orange / yellow 四个色相全部 11 阶替换为 Tailwind v3 色板（SaaS 友好调色板）
- 仅改 hex 值，token 命名不变，variable.css 语义层自动跟随（通过 var() 引用）
- 未改动：`--color-blue-*`（品牌色保留）/ `--color-purple-*`（饱和度接近，装饰场景，改动收益低）/ 其余所有色相
- 500 阶核心变化：red `#fb2c36 → #ef4444`，green `#00c950 → #22c55e`，orange `#ff6900 → #f97316`，yellow `#f0b100 → #eab308`

### 2026-05-08：hover 统一主色化

- `--cs-color-bg-hover` 由 `var(--color-neutral-50)`（中性灰）改为 `var(--cs-color-primary-a2)`（主色 8% 透明）
- 影响所有用 `var(--cs-color-bg-hover)` 的组件 hover 背景：button text 变体 / view-switcher / approval-item / meeting-card / task-row 等共 18 个组件
- 表单组件（input / select / textarea / checkbox / radio）的 hover 边框由 `var(--cs-color-text-light2)` 改为 `var(--cs-color-primary)`
- button secondary hover：文字 + 描边都改主色
- tag close hover bg：硬编码 rgba 改 `var(--cs-color-primary-a2)`
