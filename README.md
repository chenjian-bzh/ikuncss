# ikun postcss plugin

## utilities

1. ikun

2. border

```
border-[all|top|bottom|left|right]-c[不带#的颜色 hex="fff"]-w[border-width="1"]-r[border-radius="0"]-z[z-index="auto"]-o[opacity="1"]
    例子 1：border-top-c222-w2-r10-z1000-o3 ==> 颜色为 #222，宽度为 2px，圆角为 10px，层级为 1000，透明度为 0.3 的上边框
    例子 2：border-bottom-c222 ===> 颜色为 #222，宽度为 1px，圆角为 0，层级为 auto，透明度是 1 的下边框
    例子 3：border-all-r16-c333 ===> 颜色为 #333，宽度为 1px，圆角为 16px，层级为 auto，透明度是 1 的全边框

```
