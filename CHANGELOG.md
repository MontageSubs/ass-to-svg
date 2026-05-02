# Changelog | 更新日志

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
