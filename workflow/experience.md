# 协作经验 / 历史踩坑

> 这份文档汇总主会话和各 agent 在迭代中踩过的坑、形成的共识。
> 作用：新成员（人 / agent）进来快速理解"为什么这条规则是这样"，避免重复掉坑。
> 维护：每次踩到新坑或形成新共识时，往里加一条；不要删历史条目（即便规则改了，过程仍有学习价值）。

---

## 一、需求采集（requirement-agent）

### 1.1 主会话凭印象编业务需求，跳过 SOP 直接派单
**现象**：用户说"做个报销中心"，主会话猜了主任务 / 字段 / 布局直接派 page-agent。
**后果**：生成的页面跟用户真实意图偏离，靠"猜得准"是侥幸；返工成本远大于走 SOP 时间。
**教训**：装配新页面前**必须**按 5 轮 SOP 跟用户对话，产出 REQ.md。例外只有 3 种：用户已经把 6 段全填了 / 单点小修改 / 复刻已存在页面（明示）。

### 1.2 一次性问用户 10 个问题
**现象**：把"主用户 / 主任务 / 字段 / 状态 / 视口 / 指标..."全堆在一个 AskUserQuestion。
**后果**：用户疲劳，回答质量下降。
**教训**：5 轮对话，每轮 1-3 题，优先用 AskUserQuestion 多选题让用户少打字。每题最多 4 个选项（AskUserQuestion 的硬限制）。

### 1.3 主会话凭印象编 cs-* 组件清单
**现象**：REQ.md 里写"复用 button / tag / drawer / skeleton..."
**后果**：skeleton 可能根本不存在；组件选型是 page-agent 装配时的工作，REQ 不该越权。
**教训**：REQ 描述业务意图和约束；组件选型由 page-agent read `design/components/INDEX.md` 评估。EDGE 段明确**禁列**具体 cs-* 清单。

### 1.4 答案冲突没识别就继续派单
**现象**：DO 轮选了"右侧抽屉填表"，SHOW 轮选了"向导页（3 步）"——两个互斥还往下走。
**后果**：PROTO 阶段才发现冲突，倒回去补；如果直接派 page-agent 会装出来一个互相打架的页面。
**教训**：每轮答完主会话主动核对前序答案，发现矛盾立即抛裁决题让用户选保留哪边。

---

## 二、PROTO 原型

### 2.1 PROTO 在 content-header 右上角画主 CTA
**现象**：原型里 `┌─ content-header ──┐ │ 标题 ... [+ 新建申请]│` 把主 CTA 画在右上角。
**后果**：主 CTA 已经被 navbar.slot-action 接住，PROTO 重复画就违反 fragment "唯一主 CTA" 强约束；下游 page-agent 看到原型会以为 content-header 要放按钮，多接一个出来。
**教训**：PROTO 只画 main-content 内容区，navbar / sidebar / tabbar 由 fragment 容器提供不画。卡片内的次级按钮（"一键领取" / "复用" / "撤回"）可以画。

### 2.2 PROTO 里 hardcode 业务文案
**现象**：标题写"申请设备"、副标题写"推荐 / 进行中 / 物流总览"、tab 名写"全部 / 草稿 / 待审批"等。
**后果**：越俎代庖了 page-agent 的装配工作；下游误以为是约束反而被锁死；具体文案应该由 page-agent 看 REQ 的 DO/SHOW 段填。
**教训**：PROTO 只标**区域名**（`content-header` / `filter-bar` / `工作台 3 卡块`）、**字段语义**（`F1·套餐识别`）、**关键交互锚点**（`[一键领取]`）。具体业务文案写 `<占位>`。
**例外**：区域**角色名**（"推荐 / 进行中 / 物流跟踪"）属于结构表达，不是 hardcode 文案，可以写。

### 2.3 多选 N 张原型只是换配色字号
**现象**：option-1 卡片墙按"岗位"分类、option-2 卡片墙按"使用场景"分类——本质都是卡片墙，只换分类维度。
**后果**：没有结构差异，并行装配 N 份本质同质方案，浪费算力；用户对比时也分辨不出差异。
**教训**：PROTO 多选必须在**结构层面**有差异（列表 vs 网格 vs 工作台；filter-bar tab 切片 vs 工作台并排切片；抽屉填表 vs 跳新页向导）。主会话发现选项同质时主动拦截重选。

### 2.4 跳过 PROTO 直接派 page-agent
**现象**：5 轮跑到 SHOW 就以为信息够了，直接派单。
**后果**：用户对内容区布局没共识，page-agent 装出来又要改。
**教训**：PROTO 是用户和主会话对内容区结构的最后对齐；多选时还触发并行派 N 个 page-agent。**单段都不能省**。

---

## 三、多方案并行装配

### 3.1 多方案并行装配时 page-agent 偷读兄弟 option
**现象**：option-2 的 page-agent 看到同目录已有 `<slug>-option-1.html`，去 read 它"参考下结构"。
**后果**：自动趋同甚至直接抄，违反 PROTO "结构差异" 硬约束。
**教训**：多方案并行装配时 page-agent 只 read 自己被分配的那张 PROTO 子段，**禁止 read 兄弟 option 文件**。已写进 page-agent.md 强约束。

### 3.2 PROTO 多选已确认，下游 page-agent 串行装配
**现象**：用户选了多选 2 个，主会话一个接一个派 page-agent。
**后果**：失去并行加速；用户对比晚 → 决策延迟。
**教训**：多选时必须用 `superpowers:dispatching-parallel-agents` 在同一 message 里 fanout N 个 Agent 调用（run_in_background=true）。

### 3.3 多个 page-agent 给同一类缺失组件起不同名字
**现象**：装配同一项目时，option-1 缺 `cs-step-tracker` / `cs-shipping-track`，option-2 缺 `cs-stepper` / `cs-timeline`——逻辑同一组件不同命名。
**后果**：如果直接派 component-agent 按 page-agent 报告新建，会出现 4 个组件实质 2 个的情况。
**教训**：主会话收到所有 page-agent 报告后，**统一命名**再派 component-agent；同类组件合并成一个命名规范。

---

## 四、page-agent 装配

### 4.1 page-agent 复用其他 pages/ 已生成页面
**现象**：装配新页面时 read `pages/business-travel-apply/` 看看怎么写的，照着改。
**后果**：所有页面长得像同一个模板的换皮版本，失去业务辨识度；用户在不同业务上看到一样的卡片排布感到突兀。
**教训**：page-agent 强约束——**严格禁止读取 / 参考 `pages/` 下其他已生成页面**的 HTML / CSS / RULES。每个新页面独立从 `design/` 下源码装配，业务结构按当前需求重新设计。

### 4.2 装配业务页面用 `<占位>` 当文案
**现象**：HTML 里字面写"<标题占位>"、"<申请人>"等。
**后果**：用户看不到真实演示效果；验收时分不清是真没文案还是占位。
**教训**：装配业务页面用**真实感的中文 demo 文案**（"研发岗标准套餐 · 适用后端/前端/测试"、"¥ 18,500"），不要字面写 `<占位>`。注意：这跟 PROTO 不一样——PROTO 是发散阶段所以用占位；page-agent 是落地阶段所以用 demo 数据。

### 4.3 在 `cs-content-header.slot-right` 放主 CTA / 视图切换 / 筛选 / 新建
**现象**：把 "+ 新建申请" 或 "导出 / 视图切换" 塞到 content-header 右上角。
**后果**：违反 fragment 三大区域职责切分：navbar.slot-action 唯一主 CTA、filter-bar 接筛选 / 视图切换、content-header.slot-right 只放搜索。
**教训**：slot-right **只允许** `cs-search-trigger` / `cs-search-input`；主 CTA → navbar.slot-action；筛选 / 视图 / 排序 → cs-filter-bar。

### 4.4 在 page 层硬编码 padding/margin/gap 改 fragment 容器几何
**现象**：`cs-navbar .slot-header { padding-bottom: 16px }` / `cs-navbar .inner { gap: 12px }`。
**后果**：fragment 间距由 fragment.css 单一持有，page 层覆盖会让多页之间间距漂移。
**教训**：fragment 容器（tabbar / sidebar / navbar / content-header）的几何参数（高度 / 宽度 / padding / margin / gap）**禁止**在 page 层改；默认间距不合用 → 反馈 fragment-agent 改 fragment.css。

### 4.5 凭印象写 cses-* 图标 class
**现象**：用了 `cses-stratis-monitor-01`，但实际 `cses-icons.css` 里根本没声明。
**后果**：浏览器渲染出方框 / 空白。
**教训**：装配前用 grep 列出 `design/fonts/cses-icons.css` 实际声明的 class 清单，只用清单内的；找不到的语义图标降级为通用图标 + 颜色区分。

### 4.6 抽屉 / 弹窗当 routable 独立页做
**现象**：把"新建申请抽屉"做成 `/apply/new` 独立路由页。
**后果**：丢失了"保留上下文"的抽屉本质；用户期望"叠加层"看到的是覆盖体验，不是页面跳转。
**教训**：抽屉 / 弹窗 / 面板是 **overlay 行为**，inline 到触发页 + JS 切显隐，不做独立 routable 页。

### 4.7 cs-drawer / cs-modal 显隐用 `setAttribute("data-open", "false")`
**现象**：JS 写 `drawer.setAttribute("data-open", "false")` 想关闭抽屉。
**后果**：属性仍然存在，CSS 选择器 `[data-open]` 仍命中，抽屉关不掉。
**教训**：cs-drawer / cs-modal 的显隐用**属性存在性**触发，默认关闭=不写属性。JS 用 `element.setAttribute("data-open", "")` 开 / `element.removeAttribute("data-open")` 关。

### 4.8 "key + value + 行内 action" 行布局把 value 给 `flex: 1`
**现象**：会议号 / 入会链接行写成 `[key 80px] [value flex:1, 截断] [复制按钮]`；value `flex:1` 吃光剩余空间，复制按钮被推到容器最右端，离 value 几百像素。
**后果**：用户看不出复制按钮跟哪个字段对应，得拖一下视线才能匹配。
**教训**：value 与紧邻 action 同行时，value 用 `flex: 0 1 auto` + `min-width: 0` + `max-width: 100%` 配合 `text-overflow: ellipsis`；action 用 `flex-shrink: 0` 紧贴 value。**只有需要把 action 钉死在行末的设计才用 `flex:1`**。

---

## 五、文件结构 / 路径

### 5.1 PROTO 单独建 `proto/` 子目录
**早期做法**：`requirements/<slug>/proto/option-1.md` + `option-2.md` 分文件。
**问题**：用户 review 要切多个文件；多文件维护成本高。
**当前做法**：PROTO 原型**直接内嵌**于 REQ 文件 PROTO 段，每方案一个 `### option-<N>` 子段（ASCII + 设计意图 + F1 落位表）。

### 5.2 多方案产出按 `pages/<slug>-option-N/` 分子文件夹
**早期做法**：`pages/employee-device-apply-option-1/index.html` + `pages/employee-device-apply-option-2/index.html`。
**问题**：同一业务模块的方案散在多个目录；浏览不直观。
**当前做法**：同模块共目录 `pages/<slug>/`，文件按 `<slug>-option-<N>.{html,css,-RULES.md}` 命名。HTML 里 `link href` 也要同步成新文件名（不能再是 `index.css`）。

### 5.3 agent md 里内嵌完整模板内容
**早期做法**：requirement-agent.md 里完整 copy 一份 REQ.md 模板 markdown 块。
**问题**：模板和 agent md 漂移，改字段时常常只改了一边。
**当前做法**：模板源在 `template/single-page.md` / `template/multi-page.md`，agent md 只**引用**不内嵌；改字段结构只改模板。

### 5.4 design/ 当作可写目录
**现象**：装配过程发现 `design/components/INDEX.md` 缺一项，直接改 INDEX.md。
**后果**：design/ 是源头规范，page-agent 改它属于越权；多个 page-agent 同时改会冲突。
**教训**：design/ **只读**。所有缺失补齐进 `requirements/<slug>/fill-X/` 由主会话评估后再决定要不要更新 design/。

### 5.5 真实越权案例：css-agent 把 14 个私有令牌直接写进 variable.css
**现象**：缺失补齐阶段，css-agent 把 14 个 `--cs-rh-*` 报销中心私有令牌直接 append 到 `design/css/variable.css`。
**后果**：design/ 被特定需求"污染"，全局令牌池里混进只属于报销场景的语义变量；后续别的模块要新增同名前缀会困惑。
**教训**：派 css-agent / component-agent / font-agent 缺失补齐时，prompt 必须**强调"不改 design/，所有新增进 fill-X/"**：
- CSS 令牌 → `fill-<X>/<slug>-new-vars.css`
- 新组件 → `fill-<X>/components/<name>/`
- 扩展现有组件 `data-*` → `fill-<X>/component-extensions.css`
- 新图标 → `fill-<X>/new-icons.css`（mask-image dataURI 法）

各 agent 各自落 1 份 `<type>-fill-report.md`。后续草稿是否合入 design/ 由独立 review 决定。

### 5.6 用户说"我把 X 删了"就立刻按物理删除处理
**现象**：用户说"fragment.md css 等 md 我都删除了"，我没 ls 确认就给所有 agent 加了"禁止读 md 规范"的反规则。后来用户主动 `Read fragment.md` 显示文件还有 783 行完整规范，才发现规则错了。
**后果**：所有 agent 的派单 prompt 都被错误地禁掉了详细规则源；执行决策依据被砍掉一半。
**教训**：用户字面话不等于实际状态。可能是临时屏蔽 / 表达"先看 agent 不靠 md"的工作模式 / 已经删过又恢复了。**下结论前 ls / Read 确认**实际状态，不要直接按字面相信。

---

## 六、SOP 维护

### 6.1 改字段结构只改 agent md 不改 template
**现象**：在 requirement-agent.md 里改了 PROTO 段的产出规则，但 `template/single-page.md` 没动。
**后果**：模板和 SOP 漂移，后续协作者读哪份都不准。
**教训**：模板是**单一源头**，改 REQ 结构只改模板；agent md 描述身份 / 职责 / 维护脚本，不复述模板细节。

### 6.2 路径约定变了不同步流程图 / 反模式表 / 派单段
**现象**：把 PROTO 从分文件改成内嵌，但流程图还画着 `proto/option-1..N.md`；派单准备段还说"prompt 只指向一张 proto/option-<N>.md"。
**后果**：未来 SOP 走老路径，新结构没真正生效。
**教训**：每次改路径约定走"全文 grep + replace"：frontmatter 描述 / 顶部介绍 / 流程图 / 派单准备 / 反模式表 / 模板示例。

---

## 七、对话规约

### 7.1 用相对日期写时间（"今天 / 昨天 / 本周"）
**现象**：REQ 里写"本周提交"、"上周需求"。
**后果**：文件归档后无法判断绝对时间，跨周阅读全错。
**教训**：所有日期写绝对值（`2026-06-26`）。文件名也用绝对日期作为版本切分。

### 7.2 用户说"差不多 / 类似 / 看着办" → 跳过 SOP
**现象**：用户说"做个员工设备申请，差不多类似差旅那个样子"，主会话直接套差旅页面装配。
**后果**：违反 [4.1 page-agent 复用]；用户的"差不多"是想偷懒不写需求，不是真要套差旅。
**教训**：模糊词（"差不多 / 类似 / 看着办 / 你自己想"）是 SOP **触发**信号，必须走 5 轮对话确认每个段；不要把"差不多"理解成"照搬"。

---

## 八、多页面模块装配（跨页一致性）

> 这一节是 2026-06-26 meeting-room 模块装配后沉淀。原 page-agent 两阶段 SOP（shell → 并行各页）只锁住了全局壳，main-area 内复用块和共享 overlay 没归口，导致每个并行 page-agent 各拍各的，事后用户要逐页对齐。改造方案是在 shell 和 fan-out 之间加 **阶段 1.5 模块合同**（shell.css 扩充 + shell.js + MODULE-CONTRACT.md）。

### 8.1 main-area 内复用块各页自己定义 → 风格漂移
**现象**：meeting-room 下 my-bookings / find-rooms / booking-detail / room-detail 各自的 CSS 里都重写了 filter-bar dropdown 圆角、列表行卡片 padding、行内"详情 / 预订"按钮——同一视觉概念漂成 4px vs 8px、有 border 无 border 多个版本。
**后果**：用户验收阶段一处一处改回，跨 N 个文件人工对齐，效率最低；这次单单"圆角 4 改 8"就要改 4 处 CSS。
**教训**：阶段 1 的 shell.html 只覆盖了全局壳（tabbar / sidebar / navbar / content-header），main-area 内的 5 类高频复用块（filter-bar dropdown / 列表行卡片 / 行内 CTA / 分组 header / 空态分隔）必须在 **阶段 1.5** 归口到 `shell.css`；page CSS 禁止再定义同名 selector。

### 8.2 共享 overlay 各页 page-agent 各自重写
**现象**：每页 `<cs-drawer id="booking-drawer">` 各起一份，触发器 `data-open` 命名漂（一页 `booking-drawer`、另一页 `newBookingDrawer`），toggle IIFE 也每页内联一份。
**后果**：合并 index.html 时 ID 冲突；跨页 / 跨场景触发不到对应 drawer；脚本绑定双倍，事件处理多遍。
**教训**：共享 overlay 的 DOM 写进 `shell.html` 单点持有，toggle 脚本下沉到 `shell.js` 单文件；命名按 `<module>-<feature>-<kind>` 登记到 `MODULE-CONTRACT.md` overlay 登记表，page-agent **不许自起名**。

### 8.3 sidebar / navbar `data-active` 在每页 HTML 里硬编码
**现象**：每页 HTML `<a class="nav-item" data-active href="./my-bookings.html">` 由 page-agent 各自写死。
**后果**：以后菜单项重排 / 改 slug 要 N 处修；用户 detach 单页跑也容易错（active 项跟实际 path 对不上）。
**教训**：active 项交给 `shell.js` 按 `location.pathname` 动态计算；page-agent 不在 HTML 里写 `data-active`。qa-checker 强制校验。

### 8.4 page HTML 内联 `<script>` 写 toggle 逻辑
**现象**：每页 HTML 尾部都内联了相同的 toggle IIFE（监听 `[data-open]` / `[data-close]` / overlay 点击 / ESC）。
**后果**：合并成单一 index.html 后多份 script 同时 listen，事件被处理多遍；任何 toggle 改动要扫 N 个文件。
**教训**：toggle 逻辑下沉到 `shell.js` 单文件，page HTML **不应再有 `<script>` 标签**（qa-checker 强制校验 5 条之一）。

### 8.5 阶段 3 收尾没有机械校验，全靠肉眼走查
**现象**：fan-out 完直接交付，跨页 href / 重复 id / 孤儿 data-open 都靠用户访问时撞出来。
**后果**：用户体验残缺；找 bug 来回反复。
**教训**：阶段 3 强制派 qa-checker 跑 5 条机械校验（重复 id / data-open 与 id 配对 / href 目标存在 / page HTML 无 `<script>` / 无硬编码 `data-active`），不通过回退 page-agent 修复。

### 8.6 阶段 2 产 main-area 片段而不是完整 HTML
**现象**：早期按"阶段 2 产 main-area 片段 → 阶段 3 整合成单 HTML + JS routing"装配。
**后果**：用户看到后明确反对——"框架装了但页面不用"，每页不能独立打开。
**教训**：阶段 2 各页 HTML 必须是**完整 HTML**：克隆 shell 整体（含 doctype / tab-bar / sidebar / navbar / content-header / main-content），只替换 sidebar active + content-header + main-area。每页应能在浏览器里**独立打开**、sidebar `<a href="<page-slug>.html">` 真实跳转、不需要 JS 路由"整合"。阶段 3 简化成"href 接通 + 入口页"。

### 8.7 全模块统一文案 / 标签靠人工 N 处对齐
**现象**：用户想把模块名"会议室 → 我的会议"、首项 nav label"我的预约 → 我的会议"。结果发现要改 4 个 HTML（my-bookings / find-rooms / booking-detail / room-detail），每个都有自己的 slot-header 文本和 nav-label 副本。
**后果**：N 处对齐成本高、容易漏；同模块文案散在 N 份 HTML 里没有单点持有。
**教训**：`MODULE-CONTRACT.md` 除了登记样式 + overlay，还应该登记**全模块统一文案**：模块标题 / 副标题 / 各 nav 项 label。装配阶段 2 时 page-agent 必须按合同填，不许自由发挥。改文案时改合同一处即可（理想情况下 shell.html 持有这些文本，各页 include；当前最低限度是合同列出来作为强约束 source-of-truth）。
