import type { TourProduct } from './types'

export const DEFAULT_PRODUCT: TourProduct = {
  name: '北京住三环',
  departureCity: '广州',
  destination: '北京',
  days: '5日',
  transport: '双飞',
  subtitle: '探秘之旅',
  tags: ['0购物', '0自费', '广东自组', '纯玩团'],
  schedules: [
    { date: '4月9.10日', originalPrice: 3099, currentPrice: 2699 },
    { date: '4月14.20.21日', originalPrice: 3299, currentPrice: 2899 },
    { date: '4月28日', originalPrice: 3499, currentPrice: 3099 },
  ],
  attractions: [
    { name: '天坛公园', tagline: '皇家祭天圣地', keyword: 'temple of heaven beijing' },
    { name: '故宫博物院', tagline: '探秘紫禁城', keyword: 'forbidden city beijing' },
    { name: '八达岭长城', tagline: '不到长城非好汉', keyword: 'great wall badaling' },
    { name: '颐和园', tagline: '皇家园林典范', keyword: 'summer palace beijing' },
  ],
  theme: 'modern',
}
