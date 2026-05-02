# Changelog | 更新日志

## v1.4

<details>
<summary><strong>中文版</strong></summary>

- **颜色还原（Color Recovery）—— 用户最常请求的功能**：之前所有 `\p1...\p0` 绘图都被合并成一条 `<path>`，固定 `fill="#000"`，丢掉了 ASS 里的颜色/描边/阴影信息。现在转出的 SVG 会**还原以下视觉属性**：
  - `\1c`/`\c` 主色 → `fill`（含 BGR→RGB 字节翻转）
  - `\3c` 描边色 → `stroke`，`\bord`/`\xbord`/`\ybord` → `stroke-width`（用 `paint-order: stroke fill` 模拟 ASS 的"外侧描边"语义）
  - `\4c` 阴影色 + `\shad`/`\xshad`/`\yshad` 偏移 → 复制一个 `<use>` 元素加 `translate` 渲染在主体下方
  - `\1a`/`\3a`/`\4a`/`\alpha` 透明度 → `fill-opacity` / `stroke-opacity` / 阴影 opacity（注意 ASS 是反向：00=不透明，FF=透明）
  - `\blur`/`\be` 模糊 → SVG `<filter>` + `feGaussianBlur`
  - `\pos(x,y)` 显式位置 → 烘焙进 path 坐标，多个 drawing 会按 ASS 中定义的位置正确摆放
- **`[V4+ Styles]` 默认值解析**：新增预扫描整个输入，把 `Style: ...` 行解析成 `name → {fill, stroke, bord, shad, ...}` 字典；每条 `Dialogue:` 的第 4 字段（Style 引用）从字典取 base 值，再被行内 `{...}` 标签覆盖。这样老 typesetting 文件（带完整 Style 块）能直接出正确颜色，不需要每行都写 `\1c`
- **`\r` reset 标签支持**：遇到 `\r` 或 `\r<style>` 会重置到对应 base 后再继续应用同 block 内的其他标签
- **多 path 输出 + 几何去重**：相同的 `d` 字符串只在 `<defs>` 里写一次（`<path id="pN"/>`），其余以 `<use href="#pN">` 引用。同一 drawing 在多处出现时输出体积会显著缩小
- **新增「扁平模式（单 path）」开关**：Step 2 的 Convert 按钮旁边新增小 toggle —— 勾上后输出退化成 v1.3 的"单条黑色 path"，**保留老用户工作流**（特别是把 SVG 导入到矢量编辑器时希望干净几何）。状态写入 `localStorage`（`ass2svg-flatMode`）跨会话保留
- **bbox / viewBox 自适应描边和阴影**：`stroke-width` × 2 + 阴影 offset + blur 半径都会被算进 viewBox 的 padding，避免边缘被裁掉

### 已知不支持（取舍）

- `\frz`/`\frx`/`\fry` 旋转、`\fscx`/`\fscy` 缩放、`\org` 旋转原点 —— 静态 SVG 可表达，但实现复杂度高，本版未做（如果有用户反馈再加）
- `\fad`/`\fade`/`\t(...)`/`\move`/`\mov` —— 时间相关，静态 SVG 无对应物
- `\clip`/`\iclip` —— 暂未实现
- B-spline 命令（`\b1`...）—— v1.0 起就不支持，本版未变
- `\bord` 单位假设：直接用 ASS 数值作为 path 单位的 `stroke-width`，不做 PlayRes 缩放推算（多数情况下视觉上接近，复杂场景可能偏差）

</details>

<details>
<summary><strong>English</strong></summary>

- **Color recovery — the most-requested feature**: previously every `\p1...\p0` block was merged into a single `<path>` with fixed `fill="#000"`, throwing away all the color/outline/shadow info ASS carries. The exported SVG now **restores these visual attributes**:
  - `\1c`/`\c` primary color → `fill` (with BGR→RGB byte-swap)
  - `\3c` outline color → `stroke`, `\bord`/`\xbord`/`\ybord` → `stroke-width` (uses `paint-order: stroke fill` to mimic ASS's "border on the outside" semantics)
  - `\4c` shadow color + `\shad`/`\xshad`/`\yshad` offsets → emitted as a duplicate `<use>` element with `translate`, rendered behind the main shape via document order
  - `\1a`/`\3a`/`\4a`/`\alpha` opacity → `fill-opacity` / `stroke-opacity` / shadow opacity (ASS uses inverted alpha: 00 = opaque, FF = transparent — handled correctly)
  - `\blur`/`\be` blur → SVG `<filter>` with `feGaussianBlur`
  - `\pos(x,y)` explicit position → baked into path coordinates so multiple drawings sit at their correct locations relative to each other
- **`[V4+ Styles]` default parsing**: a new pre-pass scans the whole input and builds a `name → {fill, stroke, bord, shad, ...}` dict from `Style:` lines; each `Dialogue:` line's 4th field (style reference) pulls the base, which inline `{...}` tags then override. Existing typesetting files (with complete Style blocks) now produce correct colors without needing per-line `\1c` overrides
- **`\r` reset tag support**: encountering `\r` or `\r<style>` resets state to the corresponding base before re-applying remaining tags in the same block
- **Multi-path output + geometry de-duplication**: identical `d` strings are written once into `<defs>` (`<path id="pN"/>`), with everything else referencing them via `<use href="#pN">`. When a drawing repeats, output size shrinks substantially
- **New "Flat (legacy single path)" toggle**: a small toggle next to the Convert button — when checked, output collapses back to the v1.3 "single black path" behavior, **preserving the old workflow** (especially useful when importing SVGs into a vector editor where clean geometry beats restored color). State persists in `localStorage` (`ass2svg-flatMode`) across sessions
- **bbox / viewBox now expands for stroke and shadow**: `stroke-width` × 2 + shadow offset + blur radius are folded into viewBox padding so edges aren't clipped

### Known unsupported (deliberate scope)

- `\frz`/`\frx`/`\fry` rotation, `\fscx`/`\fscy` scale, `\org` rotation origin — expressible in static SVG but implementation complexity is high; not in this release (will add if requested)
- `\fad`/`\fade`/`\t(...)`/`\move`/`\mov` — time-based, no static SVG equivalent
- `\clip`/`\iclip` — not implemented yet
- B-spline commands (`\b1`...) — unsupported since v1.0, unchanged
- `\bord` unit assumption: ASS value used directly as `stroke-width` in path units, with no PlayRes scaling. Visually close in most cases; complex layouts may need manual tuning

</details>

## v1.3

<details>
<summary><strong>中文版</strong></summary>

- **主题切换逻辑重构 — 默认始终跟随系统**：之前点过日/月按钮的偏好会写入 `localStorage` 跨会话保留，现在改为：页面主题永远跟随用户系统设置（`prefers-color-scheme`），且**实时跟随**——使用页面期间在 macOS 系统设置切换 light/dark，页面立即响应（之前需要刷新）。日/月按钮仍可用，但仅作为**当前 session 的临时覆盖**，刷新后回到跟随系统。理由：用户系统是 dark mode 通常意味着当下就想看 dark；网页强行记住一次手动选择反而违背用户当前意图。老用户残留的 `localStorage.theme` 会在下次访问时自动清除
- **评论区主题与页面同步**：giscus 评论框现在跟随页面当前主题（之前总是直接读系统 `prefers-color-scheme`，用户手动覆盖主题后评论框颜色不一致）；浏览过程中切换主题，已加载的评论框也会通过 `postMessage` 实时跟随
- **新增：背景滑块位置持久化**：「Background」滑块的值现在保存到 `localStorage`，刷新页面后保持不变（之前每次都回默认 49.6）

</details>

<details>
<summary><strong>English</strong></summary>

- **Theme logic refactor — always follows system by default**: Previously, clicking the sun/moon button persisted the choice to `localStorage` across sessions. Now: the page theme always follows the user's system setting (`prefers-color-scheme`), and **tracks live** — switching macOS system theme while using the page applies immediately (previously required a reload). The sun/moon button still works but only as a **session-only override**; reload restores following the system. Rationale: a user with system dark mode usually wants to see dark **right now**; forcibly remembering a one-time manual choice across sessions undermines current intent. Stale `localStorage.theme` entries from older versions are automatically cleared on next visit
- **Comments theme synced with page**: The giscus comment widget now matches the page's current theme (previously read `prefers-color-scheme` directly, mismatching whenever the user manually overrode the page theme); already-loaded comment widgets also follow via `postMessage` when the user toggles theme mid-session
- **New: background slider position persisted**: The "Background" slider value is now saved to `localStorage` and survives page reloads (previously reset to default 49.6 every time)

</details>

## v1.2

<details>
<summary><strong>中文版</strong></summary>

- **修复 dark mode 下两个 slider 相关视觉问题**：
  - 「背景亮度」滑块轨道在 dark mode 下完全不可见（轨道颜色写死为深色低透明，在深色背景上隐形）；现在 dark mode 加了独立的浅色轨道样式
  - 预览区域在页面初次加载时显示亮白色覆盖层（`#previewBg` CSS 默认值是 `rgba(255,255,255,0.92)`，但 slider 的 JS 监听器只在 `input` 事件时才更新背景，导致默认状态错位）；现在 CSS 默认改为完全透明，并在页面加载时主动调用一次 slider handler，让 `value="49.6"` 的状态从首屏就正确应用

</details>

<details>
<summary><strong>English</strong></summary>

- **Fixed two dark-mode slider issues**:
  - The "Background brightness" slider track was invisible in dark mode (the track color was hard-coded to a low-opacity dark slate that blended into dark surfaces); added an independent light-tinted track style for `html[data-theme="dark"]`
  - On first paint, the preview area showed a bright white overlay (the `#previewBg` CSS default was `rgba(255,255,255,0.92)`, and the slider's `input` listener only fires on user interaction, so the default state was inconsistent with the slider's `value="49.6"`); CSS default now starts transparent, and the slider handler is invoked once on page load so the initial state matches the slider value

</details>

## v1.1

<details>
<summary><strong>中文版</strong></summary>

- **设计大改**：切换到 Liquid Glass 视觉系统的 twin variant —— 与正向工具 svg-to-ass v3.8 共用同一套设计语言，但**色温反转**做视觉区分：背景从暖奶油变冷青绿、step 头由「天空蓝/粉色/绿色」三段配色（vs 正向工具的「蓝/黄/天空」）、Convert CTA 由绿色渐变（vs 红色）、brand-mark 改为 "A/S" 蓝→绿渐变徽章。两个工具并排打开一秒可辨
- **字体升级**：Inter（UI）+ JetBrains Mono（代码）
- **Light/Dark 主题切换按钮**：header 加月亮/太阳图标，手动切换，偏好写入 `localStorage` 跨会话保留
- **预览背景默认透明度调整**：`bgSlider` 默认值 90 → 49.6（几乎透明），让多色玻璃质感透出来，与 Liquid Glass 美学协调

</details>

<details>
<summary><strong>English</strong></summary>

- **Design overhaul**: switched to a **twin variant** of the Liquid Glass system shared with the forward tool svg-to-ass v3.8 — same design language but with **color temperature rotated** for instant visual differentiation: cool sage-green background (vs warm cream), tri-color step heads in sky/pink/green (vs blue/yellow/sky), green-gradient Convert CTA (vs red), and an "A/S" blue-to-green gradient brand-mark badge. Open the two tools side by side and you can tell which is which at a glance
- **Typography upgrade**: Inter (UI) + JetBrains Mono (code)
- **Light/Dark theme toggle**: sun/moon button in the header, manual switching, preference persists in `localStorage`
- **Preview background opacity default**: `bgSlider` default value tuned from 90 to 49.6 (near-transparent) so the layered glass tones show through, matching the Liquid Glass aesthetic

</details>

## v1.0

<details>
<summary><strong>中文版</strong></summary>

- 首个公开版本
- ASS/SSA `\p` 绘图指令反向转换为 SVG 矢量图形
- 自动识别 `\p1` 至 `\p5` 五档精度，按对应缩放还原坐标
- 支持完整 ASS 字幕文件、单条 Dialogue 行、单个 `{\pN}...{\p0}` 块、纯 m/l/b 绘图数据等多种输入格式
- 一键复制 SVG 代码 / 下载为 .svg 文件
- 实时矢量预览，支持背景亮度调节
- 完整 10 种语言界面（中、英、日、韩、西、葡、俄、阿、土耳其、繁中）
- PWA 离线、纯客户端处理，输入数据不离开浏览器

**已知限制**：暂未反向还原 `\fscx/\fscy/\frz/\pos` 变换标签与 `\c` 颜色（输出固定黑色填充）；B-spline 命令（`s/p/c`）未支持。

</details>

<details>
<summary><strong>English</strong></summary>

- Initial public release
- Reverse conversion: ASS/SSA `\p` drawing commands → SVG vector paths
- Auto-detects `\p1` through `\p5` precision and rescales coordinates accordingly
- Accepts full ASS subtitle files, single Dialogue lines, single `{\pN}...{\p0}` blocks, or raw m/l/b drawing data
- One-click copy SVG source / download as .svg file
- Real-time vector preview with background brightness adjustment
- Full 10-language UI (en, zh-CN, zh-TW, ja, ko, es, pt-BR, ru, ar, tr)
- PWA offline, pure client-side processing — input data never leaves the browser

**Known limitations**: ASS transform tags (`\fscx/\fscy/\frz/\pos`) and color (`\c`) are not yet reverse-applied (output uses default black fill); B-spline drawing commands (`s/p/c`) are not yet supported.

</details>


---

<div align="center">

**Made with ❤️ 用爱打造**

</div>
