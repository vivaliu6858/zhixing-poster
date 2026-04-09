export type ThemeId =
  | 'modern'    // 现代：Airbnb风，黑白红极简
  | 'guochao'   // 国潮：朱砂红+鎏金+毛笔字
  | 'joyful'    // 乐游：橙黄+草绿+POP字
  | 'nature'    // 自然：森林绿+米白+衬线
  | 'foodie'    // 美食：暖红+奶油+手写体
  | 'heritage'  // 人文：深靛+古铜+宋体
  | 'family'    // 亲子：粉橙+奶黄+圆润POP
  | 'roadtrip'  // 家庭游：沙漠橙+天空蓝+路线元素

export interface Schedule {
  date: string
  originalPrice: number
  currentPrice: number
}

export interface Attraction {
  name: string
  tagline: string
  keyword?: string
  imageUrl?: string
}

export interface ThemePalette {
  bg: string          // 页面底色
  card: string        // 卡片底色
  headerBg: string    // 顶栏/模块标题条渐变
  sectionBg: string   // 模块内容区渐变
  primary: string     // 品牌主色
  accent: string      // 强调色（价格、CTA）
  text: string        // 正文色
  textSub: string     // 辅助文字
  tagBg: string       // 标签背景
  tagText: string     // 标签文字
  priceColor: string  // 价格色
  onHeader: string    // headerBg 上的文字色
}

export interface ThemeFonts {
  heading: string     // 标题字体
  body: string        // 正文字体
  number: string      // 数字/价格字体
  googleImport: string // Google Fonts CSS URL (jsdelivr CDN)
}

export interface Theme {
  id: ThemeId
  name: string
  description: string
  palette: ThemePalette
  fonts: ThemeFonts
  borderRadius: {
    button: number
    card: number
    large: number
    pill: number       // 50% 胶囊
  }
  letterSpacing: {
    heading: number    // 标题字距 (px)
    body: number       // 正文字距 (px)
  }
  moodPrompt: string  // 即梦 prompt 风格关键词
}

export interface TourProduct {
  name: string
  departureCity: string
  destination: string
  days: string
  transport: string
  subtitle: string
  tags: string[]
  schedules: Schedule[]
  attractions: Attraction[]
  heroImageUrl?: string
  theme: ThemeId
}
