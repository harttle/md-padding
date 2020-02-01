# 如何中ArchLinux中安装X11？

首先要安装ArchLinux，
然后安装`xorg-server`软件包：

```bash
pacman -S xorg-server
```

确保你的xorg-server版本已经足够搞，
比如>=1.20，
然后安装**合适**的驱动：

```bash
pacman -Ss xf86-video-intel
```

如果你需要3D加速等新的功能，
可能还需要安装*闭源驱动*。
详情请参考[ArchWiki里的对应章节](https://wiki.archlinux.org/index.php/Xorg)。
