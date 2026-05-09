# ASS to SVG Converter

**ASS 转 SVG 矢量 · One-Click Drawing-Command Recovery**

> Browser-based reverse converter that turns ASS/SSA subtitle `\p` drawing commands back into SVG vector graphics. All processing happens locally.

<div align="right">

**[中文](./README.md) | English**

</div><br/>

<div align="center">

| [Open Tool](https://subs.js.org/ass-to-svg/) | [Report Issue](https://github.com/MontageSubs/ass-to-svg/issues) | [Discussion](https://github.com/MontageSubs/ass-to-svg/discussions) |
| :---: | :---: | :---: |

</div><br/>

## Overview

**ASS to SVG Converter** is an open-source browser tool by [@NickCollect](https://github.com/NickCollect) that reverses Aegisub ASS/SSA `\p` drawing commands back into SVG vector graphics.

It is the reverse counterpart of [SVG to ASS Draw Converter](https://subs.js.org/svg-to-ass/). When you need to extract graphics from existing typeset subtitles for further editing, archiving, or cross-project reuse, this tool parses the `\p` tag, restores the original coordinates, and emits standards-compliant SVG. All processing happens in the browser; input data never leaves the user's device.

## Core Features

- **Auto Precision Detection** — Automatically detects `\p1` through `\p5` (1×/2×/4×/8×/16× scale) and rescales coordinates accordingly. No manual selection.
- **Multiple Input Formats** — Accepts full ASS/SSA subtitle files, single `Dialogue` lines, individual `{\pN}...{\p0}` tag blocks, or raw m/l/b drawing data.
- **Full Color Recovery** — On by default. Reverses `\1c` / `\3c` / `\bord` / `\1a` / `\3a` / `\4a` / `\alpha` / `\blur` / `\pos` into SVG `fill` / `stroke` / `stroke-width` / `fill-opacity` / `stroke-opacity` / Gaussian filter / coordinate offset; ASS alpha is correctly inverted (`(255-α)/255`); shadow (`\4c\shad`) renders as a duplicate shape translated behind the main one.
- **`[V4+ Styles]` Inheritance** — The `[V4+ Styles]` block is read; each `Dialogue` line inherits color / stroke / alpha defaults from its referenced Style, and inline `{...}` overrides apply on top.
- **`<defs>` / `<use>` De-duplication** — Repeated geometry and repeated blur filters are emitted once into `<defs>` and re-referenced via `<use>`, keeping output file size down.
- **"Flat (legacy single path)" Toggle** — One checkbox restores the pre-v1.4 plain-geometry output (single `<path>`, black fill) — handy for downstream Illustrator / Inkscape workflows that only care about the shape.
- **Preview Matches Download 1:1** — The on-page preview is the exact SVG you'll download (same `<defs>` / `<use>` / colors / alphas / blur), not the placeholder solid color of earlier versions.
- **One-Click Copy / Download** — Outputs standards-compliant SVG ready to copy or download as `.svg`.
- **In-Browser, Client-Side** — 100% local processing, PWA offline support, no installation required.

## How to Use

1. Open [https://subs.js.org/ass-to-svg/](https://subs.js.org/ass-to-svg/)
2. Paste the ASS code or upload a file in Step 1 (left pane)
3. Click **Convert**
4. Verify the preview, then click **Copy** or **Download .svg**

## Input Format Examples

### Full Dialogue Line

```
Dialogue: 0,0:00:01.00,0:00:05.00,Default,,0,0,0,,{\fscx1000\fscy1000\p4}m 6800 2560 b 7200 2400 7600 2800 7800 3200{\p0}
```

### Single `\p` Block

```
{\p4}m 6800 2560 b 7200 2400 7600 2800 7800 3200 l 8000 3500{\p0}
```

### Raw Drawing Data (no `\p` tag)

When no `\p` tag is present, the tool treats input as `\p1` (1× scale, original coordinates):

```
m 100 100 l 200 200 b 300 300 400 400 500 500
```

### Multi-line / Multi-block

The tool scans line by line; multiple `\pN ... \p0` regions per line are parsed independently and merged into one final SVG.

## Current Limitations

- **Rotation / scale / clip not yet reverse-applied**: `\frz` / `\fscx` / `\fscy` / `\org` / `\clip` are expressible in static SVG but the implementation surface is large and they're not done yet. `\pos(x,y)` is already baked into coordinates so multi-shape relative layouts come out at the correct relative spots. To bake scale or rotation back into a `transform` attribute, run "Apply Tags to All" inside Aegisub first, or add SVG `transform` manually after conversion.
- **Time-based tags not reverse-applied**: `\fad` / `\t(...)` / `\move` have no clean static-SVG equivalent.
- **B-spline not yet supported**: ASS `s` / `p` / `c` cubic B-spline commands are still skipped.

These will be addressed in future releases. Suggestions welcome at [Issues](https://github.com/MontageSubs/ass-to-svg/issues).

## Tech Stack

| Tech | Description |
|------|-------------|
| **HTML5 & CSS3** | Page structure and styling |
| **Vanilla JavaScript (ES6+)** | Core logic, zero dependencies |
| **Browser-only** | 100% client-side, no backend |

## Repository Structure

```
ass-to-svg/
├── app/                      # Tool source
│   ├── index.html            # Main entry
│   ├── sw.js                 # Service worker (caching)
│   ├── manifests/            # PWA manifests (10 languages)
│   ├── sitemap.xml           # Sitemap
│   └── icons/                # App icons
├── README.md                 # Chinese documentation
├── README.en.md              # English documentation (this file)
├── CHANGELOG.md              # Bilingual changelog
└── LICENSE                   # MIT License
```

## Companion Tool

This is the reverse counterpart of [SVG to ASS Draw Converter](https://subs.js.org/svg-to-ass/). Used together they support a full SVG ↔ ASS round-trip workflow.

## Localization

The tool fully supports **English and Chinese**, plus Spanish, Portuguese, Russian, Japanese, Korean, Arabic, Turkish, and more.

To suggest translation fixes or expand language coverage, please open an issue at [Issues](https://github.com/MontageSubs/ass-to-svg/issues) or [Discussions](https://github.com/MontageSubs/ass-to-svg/discussions).

## Contributing

All contributions are welcome:

- **Feature work** — rotation / scale / clip tag restoration, B-spline support, bug fixes, perf
- **Docs** — README improvements, usage guides, tutorials
- **i18n** — translation fixes, new language support, RTL polish
- **Feedback** — bug reports, feature requests, UX suggestions

## License

This project's source code is released under the [MIT License](./LICENSE).

---

<div align="center">

**MontageSubs · 蒙太奇字幕组**  
"Powered by Love ❤️ 用爱发电"

</div>
