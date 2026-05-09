# ASS 转 SVG 矢量

**ASS to SVG Converter · 字幕绘图指令一键还原**

> 在浏览器中将 ASS/SSA 字幕的 `\p` 绘图指令还原为 SVG 矢量图形，所有处理均在本地进行。

<div align="right">

**中文 | [English](./README.en.md)**

</div><br/>

<div align="center">

| [打开工具](https://subs.js.org/ass-to-svg/) | [提交反馈](https://github.com/MontageSubs/ass-to-svg/issues) | [参与讨论](https://github.com/MontageSubs/ass-to-svg/discussions) |
| :---: | :---: | :---: |

</div><br/>

## 概述

**ASS 转 SVG 矢量** 是由 [@NickCollect](https://github.com/NickCollect) 开发的开源浏览器工具，用于将 Aegisub ASS/SSA 字幕中的 `\p` 绘图指令反向还原为 SVG 矢量图形。

它是 [SVG 转 ASS 绘图指令](https://subs.js.org/svg-to-ass/) 的反向工具。当你需要把已有字幕中的图形提取出来用于二次编辑、归档、跨工程复用时，本工具可以一键完成 `\p` 标签解析与坐标回退，输出标准 SVG 文件。所有处理均在浏览器本地完成，输入数据不离开用户设备。

## 核心特色

- **自动识别精度** — 自动识别 `\p1` 至 `\p5` 五档精度，按对应缩放（1×/2×/4×/8×/16×）还原坐标，无需手动指定。
- **多格式输入** — 支持完整 ASS/SSA 字幕文件、单条 Dialogue 行、单个 `{\pN}...{\p0}` 标签块、纯 m/l/b 绘图数据。
- **完整颜色还原** — 默认开启，把 `\1c` / `\3c` / `\bord` / `\1a` / `\3a` / `\4a` / `\alpha` / `\blur` / `\pos` 全部还原为 SVG 的 `fill` / `stroke` / `stroke-width` / `fill-opacity` / `stroke-opacity` / Gaussian filter / 坐标偏移；正确处理 ASS alpha 反转（`(255-α)/255`）；阴影 `\4c\shad` 渲染为后置副本形状。
- **`[V4+ Styles]` 继承** — 自动读取 Style 块，`Dialogue` 行按 Style 名继承基础颜色 / 描边 / 透明度，行内 `{...}` 标签在此之上覆盖。
- **`<defs>` / `<use>` 去重** — 重复几何与重复模糊滤镜在输出 SVG 中合并到 `<defs>`，下游文件体积更小。
- **「Flat (legacy single path)」回退** — 一个勾选项即可切回老版本的纯几何输出（单 `<path>` + 黑色填充），方便 Illustrator / Inkscape 这类只关心形状的下游流程。
- **预览与下载 1:1 一致** — 右侧预览所见即下载的 SVG 所得（同样的 `<defs>` / `<use>` / 颜色 / 透明度 / 模糊），不再是早期版本的占位单色。
- **一键复制 / 下载** — 转换后立即生成标准 SVG 代码，可直接复制或下载为 `.svg` 文件。
- **浏览器中直接处理** — 100% 纯客户端，支持 PWA 离线使用，保护隐私，无需安装额外软件。

## 使用方法

1. 打开 [https://subs.js.org/ass-to-svg/](https://subs.js.org/ass-to-svg/)
2. 将 ASS 代码粘贴或上传到左侧输入框（步骤 1）
3. 点击 **转换**
4. 在右侧预览区确认效果，点击 **复制** 或 **下载 .svg**

## 输入格式参考

### 完整 Dialogue 行

```
Dialogue: 0,0:00:01.00,0:00:05.00,Default,,0,0,0,,{\fscx1000\fscy1000\p4}m 6800 2560 b 7200 2400 7600 2800 7800 3200{\p0}
```

### 单条 `\p` 块

```
{\p4}m 6800 2560 b 7200 2400 7600 2800 7800 3200 l 8000 3500{\p0}
```

### 纯绘图数据（无 `\p` 标签）

无标签时按 `\p1`（1×，原始坐标）处理：

```
m 100 100 l 200 200 b 300 300 400 400 500 500
```

### 多行 / 多块混合

工具会逐行扫描，每行内的多个 `\pN ... \p0` 区段独立解析，最终合并为同一个 SVG。

## 当前版本限制

- **暂未反向还原旋转 / 缩放 / 裁剪**：`\frz` / `\fscx` / `\fscy` / `\org` / `\clip` 在静态 SVG 中表达完全可行，但实现面积较大，目前未做；`\pos(x,y)` 已经被烘焙进坐标，多形状之间的相对位置正确。如需把缩放或旋转回灌成 `transform`，请在 Aegisub 中先「Apply Tags to All」，或在转换后手动加 SVG `transform`。
- **暂未还原时间相关标签**：`\fad` / `\t(...)` / `\move` 在静态 SVG 中没有清晰对应。
- **暂未支持 B-spline**：`s` / `p` / `c` 三次 B 样条曲线命令仍被跳过。

后续版本会逐步补齐，欢迎到 [Issues](https://github.com/MontageSubs/ass-to-svg/issues) 提建议。

## 技术栈

| 技术 | 说明 |
|------|------|
| **HTML5 & CSS3** | 页面结构与样式 |
| **Vanilla JavaScript (ES6+)** | 核心逻辑，无外部依赖 |
| **本地浏览器处理** | 100% 纯客户端，无后端服务 |

## 仓库结构

```
ass-to-svg/
├── app/                      # 工具主体
│   ├── index.html            # 工具主文件
│   ├── sw.js                 # Service Worker（缓存策略）
│   ├── manifests/            # PWA 配置（10 种语言）
│   ├── sitemap.xml           # 搜索引擎站点地图
│   └── icons/                # 应用图标
├── README.md                 # 中文说明（本文件）
├── README.en.md              # 英文说明
├── CHANGELOG.md              # 中英双语更新日志
└── LICENSE                   # MIT 许可证
```

## 配套工具

本工具是 [SVG 转 ASS 绘图指令](https://subs.js.org/svg-to-ass/) 的反向版本。两个工具配合可以实现 SVG ↔ ASS 的双向转换工作流。

## 本地化

本工具完整支持**中文和英文**，并支持西班牙语、葡萄牙语、俄语、日语、韩语、阿拉伯语、土耳其语等多种语言。

如果发现翻译错误或想帮助改进其他语言，欢迎在 [Issues](https://github.com/MontageSubs/ass-to-svg/issues) 或 [Discussions](https://github.com/MontageSubs/ass-to-svg/discussions) 中提出建议。

## 参与贡献

欢迎任何形式的贡献，包括但不限于：

- **功能开发** — 旋转 / 缩放 / 裁剪标签反向还原、B-spline 支持、bug 修复、性能优化
- **文档完善** — 改进 README、补充使用指南、编写教程
- **国际化** — 翻译改进、语言支持扩展、本地化优化
- **反馈建议** — 提交 bug 报告、功能建议、用户体验反馈

## 许可证

本项目源代码遵循 [MIT License](./LICENSE) 授权。

---

<div align="center">

**蒙太奇字幕组 (MontageSubs)**  
"用爱发电 ❤️ Powered by Love"

</div>
