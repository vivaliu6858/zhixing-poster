import type { TourProduct, Schedule, ThemeId } from '../types'
import ThemeSelector from './ThemeSelector'

interface Props {
  product: TourProduct
  onChange: (p: TourProduct) => void
  onGenerate: () => void
  generating: boolean
  generated: boolean
  onFetchPhotos: () => void
  fetchingPhotos: boolean
  onGenerateHero: () => void
  generatingHero: boolean
  statusMsg: string | null
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px', borderRadius: 8,
  border: '1px solid #e0e0e0', fontSize: 14, fontFamily: 'inherit',
  outline: 'none', boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  fontSize: 13, fontWeight: 600, color: '#555', marginBottom: 4, display: 'block',
}

const sectionStyle: React.CSSProperties = {
  background: 'white', borderRadius: 16, padding: 20, marginBottom: 12,
  boxShadow: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px',
}

export default function FormPanel({
  product, onChange, onGenerate, generating, generated,
  onFetchPhotos, fetchingPhotos, onGenerateHero, generatingHero, statusMsg,
}: Props) {
  const set = (key: keyof TourProduct, val: unknown) =>
    onChange({ ...product, [key]: val })

  const updateSchedule = (i: number, field: keyof Schedule, val: string) => {
    const schedules = product.schedules.map((s, idx) =>
      idx === i ? { ...s, [field]: field === 'date' ? val : Number(val) } : s
    )
    set('schedules', schedules)
  }

  const addSchedule = () =>
    set('schedules', [...product.schedules, { date: '', originalPrice: 0, currentPrice: 0 }])

  const removeSchedule = (i: number) =>
    set('schedules', product.schedules.filter((_, idx) => idx !== i))

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '20px 0' }}>
      {/* 产品信息 */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 16 }}>产品信息</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={labelStyle}>产品名称</label>
            <input style={inputStyle} value={product.name} onChange={e => set('name', e.target.value)} placeholder="如：北京住三环" />
          </div>
          <div>
            <label style={labelStyle}>出发城市</label>
            <input style={inputStyle} value={product.departureCity} onChange={e => set('departureCity', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>目的地</label>
            <input style={inputStyle} value={product.destination} onChange={e => set('destination', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>行程天数</label>
            <input style={inputStyle} value={product.days} onChange={e => set('days', e.target.value)} placeholder="如：5日" />
          </div>
          <div>
            <label style={labelStyle}>交通方式</label>
            <select style={inputStyle} value={product.transport} onChange={e => set('transport', e.target.value)}>
              <option>双飞</option>
              <option>高铁</option>
              <option>大巴</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>副标题</label>
            <input style={inputStyle} value={product.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="如：探秘之旅" />
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <label style={labelStyle}>卖点标签（逗号分隔）</label>
          <input
            style={inputStyle}
            value={product.tags.join(',')}
            onChange={e => set('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
            placeholder="0购物,0自费,广东自组,纯玩团"
          />
        </div>
      </div>

      {/* 班期价格 */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 16 }}>班期价格</div>
        {product.schedules.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <input style={{ ...inputStyle, flex: 2 }} placeholder="日期" value={s.date} onChange={e => updateSchedule(i, 'date', e.target.value)} />
            <input style={{ ...inputStyle, flex: 1 }} placeholder="原价" type="number" value={s.originalPrice || ''} onChange={e => updateSchedule(i, 'originalPrice', e.target.value)} />
            <input style={{ ...inputStyle, flex: 1 }} placeholder="现价" type="number" value={s.currentPrice || ''} onChange={e => updateSchedule(i, 'currentPrice', e.target.value)} />
            <button onClick={() => removeSchedule(i)} style={{
              background: '#fee', border: 'none', color: '#e91e63',
              borderRadius: 8, padding: '8px 12px', cursor: 'pointer', flexShrink: 0,
            }}>×</button>
          </div>
        ))}
        <button onClick={addSchedule} style={{
          width: '100%', padding: '10px', borderRadius: 8,
          border: '2px dashed #e0e0e0', background: 'transparent',
          color: '#999', cursor: 'pointer', fontSize: 14, marginTop: 4,
        }}>+ 添加班期</button>
      </div>

      {/* 景点列表 */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 12 }}>景点（4个）</div>
        {product.attractions.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
            <input
              style={{ ...inputStyle, flex: 1 }}
              placeholder="景点名"
              value={a.name}
              onChange={e => {
                const next = [...product.attractions]
                next[i] = { ...next[i], name: e.target.value, imageUrl: undefined }
                set('attractions', next)
              }}
            />
            <input
              style={{ ...inputStyle, flex: 1 }}
              placeholder="一句话描述"
              value={a.tagline}
              onChange={e => {
                const next = [...product.attractions]
                next[i] = { ...next[i], tagline: e.target.value }
                set('attractions', next)
              }}
            />
            {a.imageUrl && <span style={{ fontSize: 14, color: '#4caf50' }}>✓</span>}
          </div>
        ))}
        <div style={{ fontSize: 11, color: '#999', marginBottom: 8 }}>
          提示：中文景点名可能搜不到国外图，可在景点名里直接填英文关键词
        </div>
        <button
          onClick={onFetchPhotos}
          disabled={fetchingPhotos}
          style={{
            width: '100%', padding: '10px', borderRadius: 8,
            background: fetchingPhotos ? '#ccc' : '#2196f3',
            color: 'white', border: 'none', cursor: fetchingPhotos ? 'not-allowed' : 'pointer',
            fontSize: 14, fontWeight: 600,
          }}
        >
          {fetchingPhotos ? '抓图中...' : '🖼 一键抓景点图 (Pexels)'}
        </button>
      </div>

      {/* AI 主视觉 */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 12 }}>AI 主视觉图</div>
        {product.heroImageUrl ? (
          <div style={{ marginBottom: 8 }}>
            <img src={product.heroImageUrl} alt="hero" style={{
              width: '100%', borderRadius: 8, display: 'block',
            }} />
          </div>
        ) : (
          <div style={{
            height: 80, borderRadius: 8, background: '#f5f5f5',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: '#999', marginBottom: 8,
          }}>
            尚未生成
          </div>
        )}
        <button
          onClick={onGenerateHero}
          disabled={generatingHero}
          style={{
            width: '100%', padding: '10px', borderRadius: 8,
            background: generatingHero ? '#ccc' : '#9c27b0',
            color: 'white', border: 'none', cursor: generatingHero ? 'not-allowed' : 'pointer',
            fontSize: 14, fontWeight: 600,
          }}
        >
          {generatingHero ? '即梦AI生成中（约1-2分钟）...' : '✨ AI生成主视觉图（即梦）'}
        </button>
      </div>

      {/* 状态消息 */}
      {statusMsg && (
        <div style={{
          padding: '10px 14px', borderRadius: 8, background: '#fff3cd',
          color: '#856404', fontSize: 13, marginBottom: 12,
          border: '1px solid #ffeeba',
        }}>
          {statusMsg}
        </div>
      )}

      {/* 配色风格 */}
      <div style={sectionStyle}>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#222', marginBottom: 16 }}>配色风格</div>
        <ThemeSelector value={product.theme} onChange={(id: ThemeId) => set('theme', id)} />
      </div>

      {/* 生成按钮 */}
      <div style={{ padding: '0 0 20px' }}>
        <button
          onClick={onGenerate}
          disabled={generating}
          style={{
            width: '100%', padding: '16px',
            background: generating ? '#ccc' : 'linear-gradient(135deg, #FF5A5F, #e91e63)',
            color: 'white', border: 'none', borderRadius: 12,
            fontSize: 17, fontWeight: 700, cursor: generating ? 'not-allowed' : 'pointer',
            letterSpacing: 1,
          }}
        >
          {generating ? '生成中...' : generated ? '🔄 重新生成' : '✨ 生成海报'}
        </button>
      </div>
    </div>
  )
}
