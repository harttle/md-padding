# Markdown Padding
[![npm version](https://img.shields.io/npm/v/md-padding.svg)](https://www.npmjs.org/package/md-padding)
[![downloads](https://img.shields.io/npm/dm/md-padding.svg)](https://www.npmjs.org/package/md-padding)
[![Check](https://github.com/harttle/md-padding/actions/workflows/check.yml/badge.svg)](https://github.com/harttle/md-padding/actions/workflows/check.yml)
[![Release](https://github.com/harttle/md-padding/actions/workflows/release.yml/badge.svg)](https://github.com/harttle/md-padding/actions/workflows/release.yml)
[![Coveralls](https://img.shields.io/coveralls/harttle/md-padding.svg)](https://coveralls.io/github/harttle/md-padding?branch=master)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/harttle/md-padding)
[![GitHub issues](https://img.shields.io/github/issues-closed/harttle/md-padding.svg)](https://github.com/harttle/md-padding/issues)
[![DUB license](https://img.shields.io/dub/l/vibe-d.svg)](https://github.com/harttle/md-padding/blob/master/LICENSE)

[English](https://github.com/harttle/md-padding/blob/master/README.md) | 简体中文

**排版中只有空格不能忍**，修复你 Markdown 中缺少的空格：

* 中英文混排时，*中文* 与 *英文* 之间，*中文* 与 *数字* 之间添加空格。
* *特定英文标点* 后面添加空格，但 *全角标点* 前后不加空格。
* 文字和 *行内代码* 之间、文字与 *链接* 之间、文字与 *加粗*、*强调*、*删除线* 之间添加空格。
* 会解析生成 Markdown + 自然语言构成的 AST，最大限度解决问题同时避免误处理。

这是一个 md-padding 做的修复 diff：

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

## 命令行接口

```bash
npx md-padding -i README.md   # 原地修复 README.md
npx md-padding README.md      # 输出修复后的内容
```

还可以接受标准输入（用在管道中），也可以原址（in-place）更改文件。详见 `md-padding --help`。

```none
> npx md-padding --help
md-padding [OPTION]... <FILE>

Options:
  --help, -h      Show help                  [boolean]
  --version       Show version number        [boolean]
  --in-place, -i  Edit file in place         [boolean]
  --ignore-words, -I  Ignore padding within/before/after these words  [string]
  --ignore-patterns, -P  Ignore by a list of regexp  [string]
  --read-files, -r    Read a file list containing one file per line, use empty value to read from STDIN  [string]

Examples:
  stdout    md-padding README.md
  in-place  md-padding -i README.md
  pipe      cat README.md | md-padding
  ignore-words  cat README.md | md-padding -I '=' '::'
  ignore-patterns  cat README.md | md-padding -P '=' ':+'
  batch format  cat list.txt | md-padding -r -i
  equivalent w/ md-padding -r list.txt -i
```

## 在 Vim 中使用

可以绑定一个快捷键 `F6` 来修复当前文件：

```vim
" 绑一个 Vim Filter
noremap <buffer> <F6> <Esc>:%!npx md-padding<CR>
```

## 在 VS Code 中使用

从 Marketplace 安装 [Markdown Padding](https://marketplace.visualstudio.com/items?itemName=harttle.md-padding-vscode)。
打开一个 Markdown 文件后，支持这些操作：

- Command。打开 *命令面板*，输入 Markdown Padding 并回车。*命令面板* 快捷键：
  - Windows：Ctrl + Shift + P
  - Mac：Command + Shift + P
  - Linux：Ctrl + Shift + P
- Formatting。在编辑器里右键点格式化，或者：
  - Windows：Shift + Alt + F
  - Mac：Shift + Option + F
  - Linux：Ctrl + Shift + I

参数 | 类型 | 描述
--- | --- | ---
`mdpadding.ignoreWords` | `Array<string>` | 这些字词内部和前后禁止加空格
`mdpadding.ignorePatterns` | `Array<string>` | 这些正则内部和前后禁止加空格

## 常见问题

### 如何忽略一个片段

有些片段希望保持原状，这时可以用 `md-padding-ignore` 来包裹起来。
 
```markdown
下面是一段不需要格式化的文本
<!--md-padding-ignore-begin-->
a*b=c, b>1 => a<c
<!--md-padding-ignore-end-->
现在开始又可以格式化了。
```
