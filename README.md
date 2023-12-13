# ikuncss

## 安装

```shell
npm install ikuncss
```

## 使用

### 1. 使用 create-ikuncss 模版

```shell
npm init ikuncss@latest
```

### 2. vite 项目中使用

postcss.config.js 文件添加配置

```js
export default {
  plugins: {
    ikuncss: {
      content: "src/**/*.{html,jsx}",
    },
  },
};
```

css 入口文件引入工具类

```css
@ikuncss utilities;
```

html 或者 jsx 文件中使用

```jsx
<div className="card">
  <div className="ikun"></div>
  <div className="hover:ikun">hover me</div>
  <div className="hover:active:ikun">hover me</div>
</div>
```

编译， 如果使用 vite， 直接运行 vite dev server

```shell
vite
```

如果使用 postcss cli

```shell
postcss ./input.css -o dist/output.css
```

### 3. 使用 posstcss api

postcss 传入插件及配置

```js
postcss([
  ikun({
    content: "example/**/*.{html,jsx}",
  }),
])
  .process(`@ikuncss utilities;`, {
    from: "src/input.css",
    to: "dist/output.css",
  })
  .then((result) => {
    mkdir("dist", () => {
      writeFile("dist/output.css", result.css, (err) => {
        err ? console.error(err) : console.log("success.");
      });
    });
  });
```
