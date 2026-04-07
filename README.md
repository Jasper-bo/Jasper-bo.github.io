# Jasper-bo.github.io

一个以 `AIPM / AI 原生产品探索者` 为核心叙事的个人博客，基于 Next.js 15 + TypeScript + Tailwind CSS 构建。

## 技术栈

- **框架**: [Next.js 15](https://nextjs.org/) (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 3
- **UI 图标**: Lucide React
- **国际化**: 支持中英文切换

## 功能特性

- 📱 响应式设计，支持移动端和桌面端
- 🌐 中英文双语支持，自动根据浏览器语言切换
- 🧭 单页主站信息架构，首页 1 分钟内讲清“我是谁、我在做什么、我怎么做”
- 🏋️ 首页聚焦 `Fitness App`、AI 原生工作流和最近思考的问题
- 📚 保留低优先级的读书归档页与项目详情页
- ⚡ 基于 Next.js 的静态导出，加载快速
- 🔍 SEO 优化，自动生成 sitemap 和 robots.txt
- ✅ 使用 Vitest + React Testing Library 锁定首页结构与路由面

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # 国际化路由
│   ├── books/             # 读书归档
│   ├── projects/[slug]/   # 项目详情页
│   └── ...
├── components/             # 可复用组件与首页区块
├── lib/                    # 工具函数
├── types/                  # TypeScript 类型定义
└── views/                  # 页面视图组件

public/                     # 静态资源
├── images/
│   ├── avatar-junbo.svg
│   ├── books/
│   └── projects/
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行类型检查
npm run typecheck

# 运行测试
npm run test
```

访问 http://localhost:3000 查看效果。

## 部署

本项目使用 GitHub Pages / Vercel 兼容的静态部署方式，可通过 GitHub Actions 自动构建和发布。

主要配置：
- 静态导出模式
- 自定义域名支持
- 自动 sitemap 生成

## 作者

**Junbo He** - [@Jasper-bo](https://github.com/Jasper-bo)

## 许可证

MIT License
