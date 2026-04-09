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
