# Changelog | 更新日志

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
