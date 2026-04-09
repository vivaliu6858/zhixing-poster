# 智行海报 · 开发计划

## 项目概述
旅行社海报自动生成SaaS，品牌名"智行海报"。
前端 React+TS+Tailwind，海报用HTML/CSS渲染，html2canvas导出PNG。

## 技术栈
- React 18 + TypeScript + Vite
- Tailwind CSS
- html2canvas（导出PNG）
- 部署：Vercel（GitHub仓库：vivaliu6858/zhixing-poster）

## 阶段进度

### ✅ 阶段0：规划（完成）

### ⏳ 阶段1：脚手架 + 基础布局
- [ ] Vite+React+TS+Tailwind 初始化
- [ ] 路由：Landing页 + 工作台页
- [ ] 基础布局：左侧面板420px + 右侧预览区

### ⏳ 阶段2：表单 + 海报渲染
- [ ] 产品信息表单（名称/城市/天数等）
- [ ] 班期价格动态增删
- [ ] 海报11个模块完整渲染（750px宽）

### ⏳ 阶段3：主题切换
- [ ] 6套配色主题数据
- [ ] 主题选择器UI
- [ ] 海报实时更新配色

### ⏳ 阶段4：导出功能
- [ ] html2canvas导出PNG（750px宽）
- [ ] 即梦Prompt自动生成+复制

## 数据结构
```typescript
interface TourProduct {
  name: string;          // 产品名称
  departureCity: string; // 出发城市
  destination: string;   // 目的地
  days: string;          // 天数
  transport: string;     // 交通方式
  subtitle: string;      // 副标题
  tags: string[];        // 卖点标签
  schedules: Schedule[]; // 班期价格
  theme: ThemeId;        // 配色主题
}

interface Schedule {
  date: string;
  originalPrice: number;
  currentPrice: number;
}
```

## 恢复指南（断点续接）
1. cd /opt/zhixing-poster
2. 读本文件确认当前阶段
3. 查看最新 git log 了解已完成内容
4. 继续未完成的阶段

## 完成记录（2026-04-09）
- 阶段1-4全部完成，推送到 github.com/vivaliu6858/zhixing-poster
- 预览服务运行在 http://43.160.235.90:5199

## 待优化项（下次会话）
- 景点图片：接入 Pexels API 替换占位色块
- 主视觉图：接入即梦AI生成后替换渐变占位
- 移动端响应式优化
- 行程文本解析（Claude API解析docx上传）
- Vercel部署

## 2026-04-09 晚 · 第二轮开发

### 架构变化
- 后端 Flask 在 /opt/zhixing-backend 已经 systemd 起服务 zhixing-backend（开机自启）
- nginx v6858.top: 80 端口 → /opt/zhixing-poster/dist 静态，/api/ 代理 127.0.0.1:5000
- 后端代码和前端代码在两个仓库，前端是纯客户端+html2canvas

### 阶段 A：后端 Pexels + 即梦 接口 ✅ 已完成
- [x] /api/photos/search 批量拉 Pexels 景点图，下载到 web_output/photos/
- [x] /api/hero/generate 调 dreamina text2image CLI 生成主视觉，同步等 120s
- [x] 端到端实测：两接口都返回 /output/xxx 同源URL，html2canvas 无 CORS 风险
- 提交：backend commit b926dd3

### 阶段 B：前端接入图片 API ✅ 已完成
- [x] types.ts 加 `heroImageUrl?: string`，`attractions: Attraction[]`（含可选 imageUrl）
- [x] defaultData 给默认景点列表（Beijing 4 attraction）
- [x] PosterPreview 模块3 用 heroImageUrl 作为背景图，无则退回渐变占位
- [x] PosterPreview 模块6 从 product.attractions 渲染（不再硬编码北京），用 imageUrl 作为背景
- [x] FormPanel 加两个按钮：「抓景点图」调 /api/photos/search，「生成主视觉」调 /api/hero/generate
- [x] 加载态 / 错误 toast
- [x] npm run build + nginx 验证
- [x] bug fix: 改景点名时清空旧 imageUrl

### 阶段 C：行程文档解析串联（下一阶段）
- [ ] 前端加 upload docx/txt 入口
- [ ] 调 /api/parse 拿结构化 JSON，映射到 TourProduct
- [ ] 让用户可在预填表单上做微调

### 阶段 D：移动端响应式 + Vercel部署（再下一阶段）

## 2026-04-10 · 第三轮开发：8主题重构

### 阶段 E：主题架构重构 + 8套主题 ✅ 已完成
- [x] types.ts 扩展 Theme 类型（ThemePalette 12色 / ThemeFonts 标题+正文+数字 / borderRadius / letterSpacing / moodPrompt）
- [x] themes.ts 重写：8套完整主题（modern/guochao/joyful/nature/foodie/heritage/family/roadtrip）
- [x] PosterPreview 全面读取新字段（palette/fonts/borderRadius/letterSpacing）
- [x] ThemeSelector 适配新结构（2列布局，显示 headerBg 预览+description）
- [x] Workspace.tsx 即梦 prompt 改用 theme.moodPrompt（删除旧 JIMENG_STYLE map）
- [x] index.html 加载 Google Fonts via jsdelivr CDN（含 ZCOOL XiaoWei/KuaiLe/QingKe、Noto Sans/Serif SC、Lilita One、Oswald、Playfair Display）
- [x] defaultData 默认主题改为 modern
- [x] npm run build 通过
