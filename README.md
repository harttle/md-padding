# Markdown Padding

[![npm version](https://img.shields.io/npm/v/md-padding.svg)](https://www.npmjs.org/package/md-padding)
[![downloads](https://img.shields.io/npm/dm/md-padding.svg)](https://www.npmjs.org/package/md-padding)
[![Check](https://github.com/harttle/md-padding/actions/workflows/check.yml/badge.svg)](https://github.com/harttle/md-padding/actions/workflows/check.yml)
[![Release](https://github.com/harttle/md-padding/actions/workflows/release.yml/badge.svg)](https://github.com/harttle/md-padding/actions/workflows/release.yml)
[![Coveralls](https://img.shields.io/coveralls/harttle/md-padding.svg)](https://coveralls.io/github/harttle/md-padding?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/harttle/md-padding)
[![GitHub issues](https://img.shields.io/github/issues-closed/harttle/md-padding.svg)](https://github.com/harttle/md-padding/issues)
[![DUB license](https://img.shields.io/dub/l/vibe-d.svg)](https://github.com/harttle/md-padding/blob/master/LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)

[中文](https://github.com/harttle/md-padding/blob/master/README.zh.md)

**A tool for formatting Markdown content with padding**  

- *Ensures consistent spacing* before and after Markdown elements like *headings*, *lists*, and *code blocks*.
- *Aligns tables* by formatting column spacing properly.
- Supports formatting inside *code blocks* and recognizes *mathematical expressions*, *HTML elements*, *YAML front matter*, and *fenced code blocks* for correct formatting.
- Applies an extended AST parsing to ensure natural language structures like punctuations and latin characters are padded correctly.

Here's a change made by md-padding:

```diff
- # 如何中ArchLinux中安装X11？
+ # 如何中 ArchLinux 中安装 X11？

- 首先要安装ArchLinux，然后安装`xorg-server`软件包：
+ 首先要安装 ArchLinux，然后安装 `xorg-server` 软件包：

- 确保你的xorg-server版本已经足够高，比如>=1.20，然后安装**合适**的驱动：
+ 确保你的 xorg-server 版本已经足够高，比如 >= 1.20，然后安装 **合适** 的驱动：

- 如果你需要3D加速等新的功能，可能还需要安装*闭源驱动*。详情请参考[ArchWiki里的对应章节](https://wiki.archlinux.org/index.php/Xorg)。
+ 如果你需要 3D 加速等新的功能，可能还需要安装 *闭源驱动*。详情请参考 [ArchWiki 里的对应章节](https://wiki.archlinux.org/index.php/Xorg)。
```

## Command Line Interface

Install globally via `npm`:

```bash
npm i -g md-padding
```

Or run directly using `npx`:

```bash
# Format README.md in place
npx md-padding README.md
```

For more options:

```bash
> npx md-padding --help
md-padding [OPTION]... <FILE>

Options:
  --help, -h      Show help                  [boolean]
  --version       Show version number        [boolean]
  --in-place, -i  Edit file in place         [boolean]
  --ignore-words, -I  Ignore padding for specific words  [string]
  --ignore-patterns, -P  Ignore specific patterns using regex  [string]
  --read-files, -r    Read file list from input, one file per line  [string]

Examples:
  stdout    md-padding README.md
  in-place  md-padding -i README.md
  pipe      cat README.md | md-padding
  ignore-words  cat README.md | md-padding -I '=' '::'
  ignore-patterns  cat README.md | md-padding -P '=' ':+'
  batch format  cat list.txt | md-padding -r -i
  equivalent w/ md-padding -r list.txt -i
```

## Vim Integration

Map the `F6` key to format Markdown files:

```vim
" Hotkey for md-padding format
noremap <buffer> <F6> <Esc>:%!npx md-padding<CR>
```

## VS Code Integration

Install the [Markdown Padding](https://marketplace.visualstudio.com/items?itemName=harttle.md-padding-vscode) extension.

- Open Command Palette (`Ctrl + Shift + P` on Windows/Linux, `Cmd + Shift + P` on macOS) and run `Markdown Padding`.
- Use the default formatting shortcut:
  - `Shift + Alt + F` (Windows)
  - `Shift + Option + F` (Mac)
  - `Ctrl + Shift + I` (Linux)

### Configuration

| Setting                    | Type            | Description                                     |
| -------------------------- | --------------- | ----------------------------------------------- |
| `mdpadding.ignoreWords`    | `Array<string>` | Words to exclude from padding adjustments       |
| `mdpadding.ignorePatterns` | `Array<string>` | Regular expressions defining patterns to ignore |

## Q&A

### How to ignore a specific section

You can exclude certain sections from formatting using the `md-padding-ignore` directive:

```markdown
Some text before the ignored section.
<!--md-padding-ignore-begin-->
a*b=c, b>1 => a&lt;c
<!--md-padding-ignore-end-->
This text will be formatted as usual.
```
