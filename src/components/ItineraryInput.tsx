import { useState, useRef } from 'react'
import type { TourProduct, ThemeId } from '../types'

interface Props {
  onParsed: (product: TourProduct) => void
}

const sectionStyle: React.CSSProperties = {
  background: 'white', borderRadius: 16, padding: 20, marginBottom: 12,
  boxShadow: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px',
}

const btnStyle: React.CSSProperties = {
  width: '100%', padding: '12px', borderRadius: 8,
  color: 'white', border: 'none', cursor: 'pointer',
  fontSize: 14, fontWeight: 600,
}

// 将后端 product_data 映射为前端 TourProduct
function mapToTourProduct(data: Record<string, unknown>): TourProduct {
  const p = (data.product || data) as Record<string, unknown>
  const pricing = (data.pricing || {}) as Record<string, unknown>
  const attractions = (data.attractions || []) as Array<Record<string, unknown>>

  // 班期映射
  const batches = (pricing.batches || []) as Array<Record<string, unknown>>
  const schedules = batches.map(b => {
    const dates = String(b.dates || b.date || '')
    const orig = Number(b.adult_original || b.original_price || 0)
    const curr = Number(b.adult_price || b.price || 0)
    return { date: dates, originalPrice: orig || curr, currentPrice: curr || orig }
  })

  // 如果没有 batches，用顶层价格造一条
  if (schedules.length === 0) {
    const base = Number(p.base_price || 2999)
    const orig = Number(p.original_price || base)
    schedules.push({ date: '待定', originalPrice: orig, currentPrice: base })
  }

  // 景点映射
  const mappedAttractions = attractions.map(a => ({
    name: String(a.name || ''),
    tagline: String(a.tagline || ''),
    keyword: String(a.keyword || a.name || ''),
  }))

  // 卖点
  const tags = (p.selling_points || p.tags || p.highlights || ['品质团']) as string[]

  return {
    name: String(p.name || p.product_name || ''),
    departureCity: String(p.departure_city || '广州'),
    destination: String(p.destination || ''),
    days: String(p.duration || p.days || '5日'),
    transport: String(p.flight_type || p.transport || '双飞'),
    subtitle: String(p.sub_title || p.subtitle || '品质之旅'),
    tags: Array.isArray(tags) ? tags : [String(tags)],
    schedules,
    attractions: mappedAttractions.length > 0 ? mappedAttractions : [
      { name: '景点1', tagline: '待补充', keyword: '' },
    ],
    theme: 'modern' as ThemeId,
  }
}

export default function ItineraryInput({ onParsed }: Props) {
  const [text, setText] = useState('')
  const [parsing, setParsing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleParseText = async () => {
    if (!text.trim()) return
    setParsing(true)
    setError(null)
    try {
      const resp = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim() }),
      })
      const data = await resp.json()
      if (!data.success && data.error) throw new Error(data.error)
      const product = mapToTourProduct(data.product_data || data)
      onParsed(product)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '解析失败')
    } finally {
      setParsing(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    setParsing(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const resp = await fetch('/api/parse', {
        method: 'POST',
        body: formData,
      })
      const data = await resp.json()
      if (!data.success && data.error) throw new Error(data.error)
      const product = mapToTourProduct(data.product_data || data)
      onParsed(product)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '解析失败')
    } finally {
      setParsing(false)
    }
  }

  return (
    <div style={sectionStyle}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 12 }}>
        行程导入
      </div>

      {/* 文字粘贴区 */}
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={'粘贴行程文字...\n例：北京5日游 广州出发 双飞\n含天安门故宫长城颐和园\n住三环丽枫酒店\n4月12日出发 原价3299 现价2699'}
        style={{
          width: '100%', height: 120, padding: '10px 12px', borderRadius: 8,
          border: '1px solid #e0e0e0', fontSize: 13, fontFamily: 'inherit',
          resize: 'vertical', outline: 'none', boxSizing: 'border-box',
          lineHeight: 1.6,
        }}
      />

      {/* 按钮区 */}
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <button
          onClick={handleParseText}
          disabled={parsing || !text.trim()}
          style={{
            ...btnStyle, flex: 2,
            background: parsing ? '#ccc' : '#4caf50',
            cursor: parsing || !text.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          {parsing ? 'AI解析中...' : '智能解析文字'}
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={parsing}
          style={{
            ...btnStyle, flex: 1,
            background: parsing ? '#ccc' : '#2196f3',
            cursor: parsing ? 'not-allowed' : 'pointer',
          }}
        >
          上传文件
        </button>
        <input
          ref={fileRef}
          type="file"
          accept=".docx,.txt,.md"
          style={{ display: 'none' }}
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) handleFileUpload(file)
            e.target.value = ''
          }}
        />
      </div>

      {/* 支持格式提示 */}
      <div style={{ fontSize: 11, color: '#999', marginTop: 6 }}>
        支持粘贴文字或上传 .docx / .txt 文件，AI自动提取产品信息、景点、价格
      </div>

      {/* 错误提示 */}
      {error && (
        <div style={{
          marginTop: 8, padding: '8px 12px', borderRadius: 8,
          background: '#ffebee', color: '#c62828', fontSize: 13,
        }}>
          {error}
        </div>
      )}
    </div>
  )
}
