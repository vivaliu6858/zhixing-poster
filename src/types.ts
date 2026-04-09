export type ThemeId = 'pink' | 'orange' | 'deepblue' | 'purpleblue' | 'green' | 'dreamy'

export interface Schedule {
  date: string
  originalPrice: number
  currentPrice: number
}

export interface Attraction {
  name: string
  tagline: string
  keyword?: string  // Pexels 搜索词，默认等于 name
  imageUrl?: string // /output/photos/xxx.jpg （由 /api/photos/search 回填）
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
  heroImageUrl?: string  // /output/hero/xxx.jpg （由 /api/hero/generate 回填）
  theme: ThemeId
}

export interface Theme {
  id: ThemeId
  name: string
  gradientFrom: string
  gradientTo: string
  primary: string
  priceColor: string
  headerBg: string
  sectionBg: string
  tagBg: string
}
