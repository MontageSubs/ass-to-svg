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
- **One-Click Copy / Download** — Outputs standards-compliant SVG ready to copy or download as `.svg`.
- **Live Vector Preview** — Renders the parsed shape in real time on the right pane, with a brightness slider to adjust the preview background.
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

- **Transform tags not yet reverse-applied**: Output is a pure geometric path; `\fscx/\fscy/\frz/\pos` are not converted into SVG `transform` attributes. To restore exact placement, run "Apply Tags to All" inside Aegisub first, or add SVG `transform` manually after conversion.
- **Color not yet recovered**: Output SVG uses default black fill (`fill="#000"`); `\c&Hbbggrr&` tags are not parsed.
- **B-spline not yet supported**: ASS `s/p/c` cubic B-spline commands are skipped in v1.

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

- **Feature work** — color recovery, transform tag restoration, B-spline support, bug fixes, perf
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
