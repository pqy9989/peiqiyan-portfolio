
## 文件清单

| 文件 / 目录 | 说明 |
|------|------|
| `cses-icons.css` | 唯一入口 CSS：`@font-face` 声明（CSES）+ 71 个面性 class + 817 个 stratis 线性 class（含内嵌 base64 SVG dataURI） |
| `cses-icons.ttf` / `.woff` / `.woff2` | CSES 业务图标字体（71 个面性，如 cses-shenpizhongxin / cses-tongzhi 等） |
| `stratis-svgs/` | Stratis 线性 SVG 源（817 个，已 stroke / fill 规范化），CSS 已内嵌它们的 base64，目录保留作为可读源 |
| `icons.html` | 图标库预览页 + 待删管理 + 线/面性分类 tab |
| `RULES.md` | 本文件 |

## 命名空间

| 前缀 | 数量 | 风格 | 实现 | 例 |
|------|------|------|------|-----|
| `.cses-XXX`（不含 stratis） | 71 | 面性（filled） | webfont（cses-icons.ttf） | `cses-shenpizhongxin` `cses-completed03` |
| `.cses-stratis-XXX` | 817 | 线性（outline） | CSS mask-image + base64 dataURI | `cses-stratis-arrow-curve-left-down` `cses-stratis-bell-01` |

## 用法

```html
<link rel="stylesheet" href="../fonts/cses-icons.css">

<!-- 面性业务图标（webfont 渲染） -->
<i class="cses-shenpizhongxin"></i>

<!-- 线性 Stratis 图标（mask-image dataURI 渲染） -->
<i class="cses-stratis-bell-01"></i>
```

**统一行为**：大小用 `font-size`，颜色用 `color`，类名前缀 `cses-`。两套图标在尺寸 / 颜色继承上完全一致。

## 协议兼容性

`cses-icons.css` 内嵌 base64 dataURI 后，Stratis 图标在 **`file://` 协议**下也能正常渲染（不再依赖外部 SVG 文件 fetch）。`mask-image` 属性带 `-webkit-` 前缀兼容 Safari。

## 新增图标

### 新增 CSES 业务面性图标（webfont 法 — **当前已停用**）

> ⚠️ 历史 webfont 源 + build 脚本已不在仓库，**原 71 个 webfont class 不可再扩**。新增面性图标统一走「mask-image 法 · 面性变体」。

### 新增面性图标（mask-image dataURI 法 · 推荐路径）

适用：从 Figma 等外部源导入面性 SVG（如团队空间、业务对象图标）。

1. 拿到 SVG 源，规范化：viewBox 保持原始（如 `0 0 34 30`）即可（`mask-size: contain` 自适配），所有 path 用 `fill="currentColor"`，无 stroke
2. 拷贝到 `stratis-svgs/{name}.svg`（命名不带 `stratis-` 前缀，强调它是面性而非线性）
3. base64 编码：`B64=$(base64 -i fonts/stratis-svgs/{name}.svg | tr -d '\n')`
4. 在 `cses-icons.css` 末尾追加**自包含规则**（不复用 stratis 的 selector 主规则，避免命名空间污染）：
   ```css
   .cses-{name}::before {
     content: ''; display: inline-block; width: 1em; height: 1em;
     background-color: currentColor;
     -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
     -webkit-mask-position: center; mask-position: center;
     -webkit-mask-size: contain; mask-size: contain;
     -webkit-mask-image: url('data:image/svg+xml;base64,<BASE64>');
     mask-image: url('data:image/svg+xml;base64,<BASE64>');
   }
   ```
5. 在 `icon-cheatsheet.md` 业务面性表中登记 class + 来源（Figma node-id）

**示例**：`cses-folder-team`（Figma 292:80946，团队空间云形面性）— 2026-05-08 入库。

### 新增 Stratis 线性图标（mask-image dataURI 法）

1. 拿到 outline SVG 源（推荐 `https://github.com/RaymondHolm26/stratis-ui-icons` 的 `*-outline/` 目录），**严禁从 `*-filled/` 目录取**
2. 规范化（strict 必须）：
   - 删除 `<svg>` 根上的 `fill="currentColor"`（避免继承到 path）
   - 给所有 `<path>` 显式加 `fill="none"`（防默认 fill 把闭合 path 填成黑团）
   - 检查 `stroke` 属性：若为 `""` 空值，改成 `stroke="currentColor"`
3. 拷贝到 `stratis-svgs/stratis-{name}.svg`
4. 在 `cses-icons.css` 末尾追加规则（base64 dataURI 内嵌）：
   ```css
   .cses-stratis-{name}::before {
     -webkit-mask-image: url('data:image/svg+xml;base64,<BASE64>');
     mask-image: url('data:image/svg+xml;base64,<BASE64>');
   }
   ```
5. `::before` 公共样式（display / mask-size / background:currentColor）已由 `cses-icons.css` 顶部声明，**勿重复**：
   ```css
   [class^="cses-stratis-"]::before, [class*=" cses-stratis-"]::before { ... }
   ```

## 强约束

- **禁止 `<svg>` 内联标签** — 破坏统一管理
- **禁止自创第三套图标命名**（如 `.icon-xxx` / `.tabler-xxx`），所有图标 class 必须以 `cses-` 开头
- **禁止使用未在 `cses-icons.css` 中声明的 `cses-XXX` class** — 会渲染空白
- **CSES 面性 vs Stratis 线性混用建议**：业务对象（审批 / 任务 / 会议等）优先用 CSES 业务图标；通用工具 / 操作 / 导航 / 箭头 / 状态等用 Stratis 线性图标
- 修改 SVG 后必须**同步重新生成 base64**并更新 `cses-icons.css`，否则页面渲染老版本

## 相关文档

- `Claude.md` — 顶层规则（"页面 shell 类名严禁自创"）
- `fragment/RULES.md` — page shell 写法清单 + 桥接铁律
- `pages/approval-home/approval-home.css` — baseline 业务 chrome（含两套图标混合使用范例）

---

**变更历史**

| 日期 | 内容 |
|---|---|
| 2026-05-08 | 引入 Stratis UI 线性图标（817 个），从 webfont 切换到 CSS mask-image + base64 dataURI（解决 file:// CORS + stroke 渲染问题） |
