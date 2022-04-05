# 自动打包某个资源为 bundle 的 demo

传入一个 fbx 文件，自动放到 creator 项目内，并打包出 bundle 文件夹

## 初始化仓库

第一步先安装 npm 依赖

```bash
npm install
```

然后编译 ts 脚本

```bash
tsc
```

## 使用参数

修改 index.js 里的 creator 路径和项目路径

然后使用:

```bash
node index.js --file=./test/test.fbx
```