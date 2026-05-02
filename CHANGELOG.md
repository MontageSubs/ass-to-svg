# Changelog | 更新日志

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
