export type ThemeId = 'pink' | 'orange' | 'deepblue' | 'purpleblue' | 'green' | 'dreamy'

export interface Schedule {
  date: string
  originalPrice: number
  currentPrice: number
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
