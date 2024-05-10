# [1.8.0](https://github.com/harttle/md-padding/compare/v1.7.1...v1.8.0) (2024-05-10)


### Bug Fixes

* support < as ignoreWords, [#40](https://github.com/harttle/md-padding/issues/40) ([d788a2d](https://github.com/harttle/md-padding/commit/d788a2d11621a46e5000304ce0043df030713ce7))


### Features

* md-padding-ignore ([85f9cf3](https://github.com/harttle/md-padding/commit/85f9cf38a9c1b01d425e02eed73fdd9ea9465d54))

## [1.7.1](https://github.com/harttle/md-padding/compare/v1.7.0...v1.7.1) (2024-05-07)


### Bug Fixes

* allow escape by \ ([9c89330](https://github.com/harttle/md-padding/commit/9c893307636a0825045bab4705e73d69db7e0ef9))
* re-parse when block match failed, [#39](https://github.com/harttle/md-padding/issues/39) ([3b6a233](https://github.com/harttle/md-padding/commit/3b6a2331e0221faecc07b00f9fe3565b097de843))

# [1.7.0](https://github.com/harttle/md-padding/compare/v1.6.0...v1.7.0) (2024-05-05)


### Features

* support read-files arg ([6e6952b](https://github.com/harttle/md-padding/commit/6e6952bfbc79cc0cfc004869f41ac9235c8dd199))

# [1.6.0](https://github.com/harttle/md-padding/compare/v1.5.1...v1.6.0) (2024-05-05)


### Features

* add `--ignore-words` arg, [#37](https://github.com/harttle/md-padding/issues/37) ([073c169](https://github.com/harttle/md-padding/commit/073c169032c9517e96267c81a5b9250c3b826637))
* support file list as input ([af8832e](https://github.com/harttle/md-padding/commit/af8832e291d4ecf33865616b720f3de4618f1eb4))

## [1.5.1](https://github.com/harttle/md-padding/compare/v1.5.0...v1.5.1) (2024-05-05)


### Bug Fixes

* not pad : used with numbers, treat · as full-width, [#37](https://github.com/harttle/md-padding/issues/37) ([79f15a2](https://github.com/harttle/md-padding/commit/79f15a22ea61cbc68f2a6c3fdb7df3fe8333f22d))

# [1.5.0](https://github.com/harttle/md-padding/compare/v1.4.0...v1.5.0) (2024-05-04)


### Bug Fixes

* block code parsing ([#33](https://github.com/harttle/md-padding/issues/33)) ([3ba0593](https://github.com/harttle/md-padding/commit/3ba0593857f72d4b297afcae2db133e789e4713c))


### Features

* add inline spaces only for CJK/non-CJK, [#36](https://github.com/harttle/md-padding/issues/36) ([19a6e18](https://github.com/harttle/md-padding/commit/19a6e18bc25d9fbad2f5aeb3ee019a46fbf240d7))

# [1.4.0](https://github.com/harttle/md-padding/compare/v1.3.0...v1.4.0) (2024-01-25)


### Features

* Support highlight syntax ([#31](https://github.com/harttle/md-padding/issues/31)) ([66af404](https://github.com/harttle/md-padding/commit/66af404963f010a872cbaeeaac58ff7494642b69))

# [1.3.0](https://github.com/harttle/md-padding/compare/v1.2.2...v1.3.0) (2024-01-14)


### Features

* support callout ([#28](https://github.com/harttle/md-padding/issues/28)) ([2ee118a](https://github.com/harttle/md-padding/commit/2ee118a4f401ab60c04cd602ba14aa2871c3c457))

## [1.2.2](https://github.com/harttle/md-padding/compare/v1.2.1...v1.2.2) (2024-01-07)


### Bug Fixes

* parse blockquote, allow other blocknodes in blockquote, fixes [#26](https://github.com/harttle/md-padding/issues/26) ([#27](https://github.com/harttle/md-padding/issues/27)) ([f26ad2a](https://github.com/harttle/md-padding/commit/f26ad2aa7e2a75ab0c253714edb3c6dfb142ad34))

## [1.2.1](https://github.com/harttle/md-padding/compare/v1.2.0...v1.2.1) (2023-12-28)


### Bug Fixes

* allow \t as separater ([c8f31f6](https://github.com/harttle/md-padding/commit/c8f31f68a3965af3290aa0c812abbf0dddc64b12))
* ordered-list prefix, add Math to inline structures, code block parse ([#25](https://github.com/harttle/md-padding/issues/25)) ([ef7694c](https://github.com/harttle/md-padding/commit/ef7694c073ec6036daa2c091148fb8c5a4e50d86))

# [1.2.0](https://github.com/harttle/md-padding/compare/v1.1.1...v1.2.0) (2022-08-21)


### Bug Fixes

* string in code block recognized as comment, fixes [#20](https://github.com/harttle/md-padding/issues/20) ([d9cbee7](https://github.com/harttle/md-padding/commit/d9cbee779b54e5898964d67f0cb1b7fe82cf71b9))


### Features

* support front matter, closes [#22](https://github.com/harttle/md-padding/issues/22) ([b426e96](https://github.com/harttle/md-padding/commit/b426e96ff4a22e3797b5482949717d7f562306f9))
* support ignore list, fixes [#21](https://github.com/harttle/md-padding/issues/21) ([453eee6](https://github.com/harttle/md-padding/commit/453eee6c2fef45014192a2ebfb566c0c7a42865e))
* support math block, fixes [#23](https://github.com/harttle/md-padding/issues/23) ([44bda74](https://github.com/harttle/md-padding/commit/44bda744e90a2ba91f90c05736d0ef94d1d66d11))

## [1.1.1](https://github.com/harttle/md-padding/compare/v1.1.0...v1.1.1) (2022-02-20)


### Bug Fixes

* jsdom block quote not correctly parsed ([9849569](https://github.com/harttle/md-padding/commit/984956923b9fcd25314482109e793e85e9ee5d21))

# [1.1.0](https://github.com/harttle/md-padding/compare/v1.0.3...v1.1.0) (2022-01-29)


### Bug Fixes

* allow vscode MPE plugin, see [#14](https://github.com/harttle/md-padding/issues/14) ([22e52eb](https://github.com/harttle/md-padding/commit/22e52eb4a0c80715526b0ad5c2067177c797a916))


### Features

* format text in code blocks, fixes [#14](https://github.com/harttle/md-padding/issues/14) ([d9d74f9](https://github.com/harttle/md-padding/commit/d9d74f9ee9c45cdbc20504f9a45bee9c9d68030c))

## [1.0.3](https://github.com/harttle/md-padding/compare/v1.0.2...v1.0.3) (2020-05-01)


### Bug Fixes

* recognize image attributes, fixes [#2](https://github.com/harttle/md-padding/issues/2) ([dbc091f](https://github.com/harttle/md-padding/commit/dbc091f8410ca2a5f43f54f40d39cda0700ba66f))

## [1.0.2](https://github.com/harttle/md-padding/compare/v1.0.1...v1.0.2) (2020-02-10)


### Bug Fixes

* shebang ([4530092](https://github.com/harttle/md-padding/commit/4530092a14d41ee2eff704d58dffbaebc3b85cdb))

## [1.0.1](https://github.com/harttle/md-padding/compare/v1.0.0...v1.0.1) (2020-02-01)


### Bug Fixes

* update outdated dependencies ([0eebe2e](https://github.com/harttle/md-padding/commit/0eebe2ebe5a0e21a8539813c33a26a17be3957cb))
