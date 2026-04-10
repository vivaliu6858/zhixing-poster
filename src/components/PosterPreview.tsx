import { forwardRef } from 'react'
import type { TourProduct } from '../types'
import { getTheme } from '../themes'

interface Props {
  product: TourProduct
}

const PosterPreview = forwardRef<HTMLDivElement, Props>(({ product }, ref) => {
  const theme = getTheme(product.theme)
  const p = theme.palette
  const f = theme.fonts
  const r = theme.borderRadius
  const ls = theme.letterSpacing

  return (
    <div
      ref={ref}
      style={{
        width: 750,
        background: p.bg,
        fontFamily: f.body,
        overflow: 'hidden',
        boxShadow: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px',
      }}
    >
      {/* 模块1：品牌栏 */}
      <div style={{
        height: 80,
        background: p.headerBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 30px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>✈</div>
          <span style={{ color: p.onHeader, fontWeight: 700, fontSize: 16, fontFamily: f.heading }}>
            品质旅行 即刻拥有
          </span>
          <span style={{
            background: p.accent, color: p.tagText,
            padding: '3px 10px', borderRadius: r.pill, fontSize: 12, fontWeight: 700,
          }}>精品团</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.2)', color: p.onHeader,
          padding: '6px 16px', borderRadius: r.pill, fontSize: 14, fontWeight: 700,
        }}>
          ✈ {product.departureCity}飞
        </div>
      </div>

      {/* 模块2：标题区 */}
      <div style={{
        background: p.sectionBg,
        padding: '40px 40px 30px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', top: -20, left: 0, right: 0,
          fontSize: 120, fontWeight: 900, color: 'rgba(0,0,0,0.04)',
          letterSpacing: -5, lineHeight: 1, userSelect: 'none',
          fontFamily: f.heading,
        }}>TRAVEL</div>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 12,
          marginBottom: 16, flexWrap: 'wrap',
        }}>
          {product.tags.map(tag => (
            <span key={tag} style={{
              background: p.tagBg, color: p.tagText,
              padding: '4px 14px', borderRadius: r.pill, fontSize: 13, fontWeight: 700,
            }}>{tag}</span>
          ))}
        </div>
        <div style={{
          fontSize: 72, fontWeight: 900, color: p.primary,
          letterSpacing: ls.heading, lineHeight: 1.1, marginBottom: 12,
          textShadow: '2px 2px 0px rgba(0,0,0,0.05)',
          fontFamily: f.heading,
        }}>{product.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: p.text, fontFamily: f.body }}>
            {product.destination}{product.transport}{product.days}
          </span>
          <span style={{
            background: p.primary, color: p.tagText,
            padding: '4px 16px', borderRadius: r.pill, fontSize: 14, fontWeight: 700,
          }}>{product.subtitle}</span>
        </div>
      </div>

      {/* 模块3：主视觉区 — 750×500 = 3:2 */}
      <div style={{
        height: 500,
        background: product.heroImageUrl ? '#000' : p.headerBg,
        backgroundImage: product.heroImageUrl ? `url(${product.heroImageUrl})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center 45%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {!product.heroImageUrl && (
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{
              fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.15)',
              letterSpacing: 8, fontFamily: f.heading,
            }}>UPGRADE</div>
            <div style={{
              color: 'white', fontSize: 22, fontWeight: 700, marginTop: 8,
              border: '2px solid rgba(255,255,255,0.5)',
              padding: '8px 24px', borderRadius: r.button, display: 'inline-block',
              fontFamily: f.heading,
            }}>全新升级 · 品质之旅</div>
            <div style={{
              color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 16,
            }}>主视觉图 · 点击左侧「AI生成主视觉」按钮</div>
          </div>
        )}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
          background: `linear-gradient(to bottom, transparent, ${p.bg})`,
        }} />
      </div>

      {/* 模块4：二维码+编号区 */}
      <div style={{
        margin: '-20px 30px 20px',
        background: p.card,
        borderRadius: r.card,
        boxShadow: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        position: 'relative',
        zIndex: 3,
      }}>
        <div style={{
          width: 80, height: 80, background: '#f0f0f0', borderRadius: r.button,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, color: '#999', flexShrink: 0,
        }}>二维码</div>
        <div>
          <div style={{ fontSize: 12, color: p.textSub }}>长按识别 查看详细行程</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: p.text, marginTop: 4 }}>
            {product.destination}{product.transport}{product.days}{product.subtitle}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <div style={{
            background: p.accent, color: p.tagText,
            padding: '8px 16px', borderRadius: r.button, fontSize: 13, fontWeight: 700,
            transform: 'rotate(-8deg)', display: 'inline-block',
          }}>已含税</div>
        </div>
      </div>

      {/* 模块5：酒店信息 */}
      <div style={{ margin: '0 30px 20px', borderRadius: r.card, overflow: 'hidden' }}>
        <div style={{
          background: p.headerBg, padding: '12px 20px',
          color: p.onHeader, fontSize: 18, fontWeight: 700, fontFamily: f.heading,
        }}>🏨 畅享{product.destination}核心商圈</div>
        <div style={{
          background: p.sectionBg, padding: '20px',
          display: 'flex', gap: 16, alignItems: 'center',
        }}>
          <div style={{
            width: 160, height: 100, background: 'rgba(0,0,0,0.1)',
            borderRadius: r.card / 2, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: p.textSub,
          }}>酒店实景图</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: p.text }}>丽枫酒店或同级</div>
            <div style={{ fontSize: 13, color: p.textSub, marginTop: 4 }}>锦江集团 · 三环内</div>
            <div style={{ fontSize: 13, color: p.textSub, marginTop: 4 }}>中高端品质 · 含早餐</div>
          </div>
        </div>
      </div>

      {/* 模块6：景点展示 */}
      <div style={{ margin: '0 30px 20px', borderRadius: r.card, overflow: 'hidden' }}>
        <div style={{
          background: p.headerBg, padding: '12px 20px',
          color: p.onHeader, fontSize: 18, fontWeight: 700, fontFamily: f.heading,
        }}>🏛 {product.destination}必游景点</div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 2, background: '#e0e0e0',
        }}>
          {product.attractions.map(site => (
            <div key={site.name} style={{
              height: 150,
              background: site.imageUrl ? '#333' : p.sectionBg,
              backgroundImage: site.imageUrl ? `url(${site.imageUrl})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'flex-end',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))',
              }} />
              <div style={{
                position: 'relative', zIndex: 1, padding: '12px 16px',
                color: 'white',
              }}>
                <div style={{ fontWeight: 700, fontSize: 16, fontFamily: f.heading }}>{site.name}</div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
                  {site.tagline}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 模块7：赏花指南 */}
      <div style={{ margin: '0 30px 20px', borderRadius: r.card, overflow: 'hidden' }}>
        <div style={{
          background: p.headerBg, padding: '12px 20px',
          color: p.onHeader, fontSize: 18, fontWeight: 700, fontFamily: f.heading,
        }}>🌸 {product.destination}精选体验</div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 12, padding: 16, background: p.card,
        }}>
          {product.attractions.map(item => (
            <div key={item.name} style={{
              background: p.sectionBg, borderRadius: r.card / 2,
              padding: '12px 16px',
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: p.primary, fontFamily: f.heading }}>
                {item.name}
              </div>
              <div style={{ fontSize: 12, color: p.textSub, marginTop: 4 }}>{item.tagline}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 模块8：美食区 */}
      <div style={{ margin: '0 30px 20px', borderRadius: r.card, overflow: 'hidden' }}>
        <div style={{
          background: p.headerBg, padding: '12px 20px',
          color: p.onHeader, fontSize: 18, fontWeight: 700, fontFamily: f.heading,
        }}>🍽 {product.destination}特色美食</div>
        <div style={{ padding: '16px 20px', background: p.card }}>
          <div style={{
            background: p.sectionBg, borderRadius: r.card / 2, padding: '12px 16px',
            fontSize: 15, fontWeight: 700, color: p.primary, marginBottom: 12,
            fontFamily: f.heading,
          }}>
            品味{product.destination}地道风味
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {product.tags.slice(0, 4).map(tag => (
              <span key={tag} style={{
                background: '#f5f5f5', color: p.textSub,
                padding: '6px 14px', borderRadius: r.pill, fontSize: 13,
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* 模块9：卖点标签条 */}
      <div style={{
        margin: '0 30px 20px',
        display: 'flex', gap: 10, flexWrap: 'wrap',
      }}>
        {product.tags.map((tag, i) => (
          <span key={tag} style={{
            background: [p.primary, p.accent, p.primary, p.accent][i % 4],
            color: p.tagText, padding: '8px 20px', borderRadius: r.pill,
            fontSize: 14, fontWeight: 700,
          }}>{tag}</span>
        ))}
      </div>

      {/* 模块10：价格表 */}
      <div style={{ margin: '0 30px 20px', borderRadius: r.card, overflow: 'hidden' }}>
        <div style={{
          background: p.headerBg, padding: '12px 20px',
          color: p.onHeader, fontSize: 18, fontWeight: 700, fontFamily: f.heading,
        }}>💰 班期价格</div>
        <div style={{ background: p.card, padding: '0 20px 16px' }}>
          <div style={{
            padding: '12px 0', borderBottom: '1px solid #f0f0f0',
            fontSize: 13, color: p.textSub, display: 'flex', gap: 8,
          }}>
            <span>✈ 南方航空</span>
            <span>{product.departureCity}→{product.destination} 06:30出发</span>
          </div>
          {product.schedules.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 0',
              borderBottom: i < product.schedules.length - 1 ? '1px solid #f5f5f5' : 'none',
            }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: p.text }}>{s.date}</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  textDecoration: 'line-through', color: '#bbb', fontSize: 13,
                }}>¥{s.originalPrice.toLocaleString()}</div>
                <div style={{
                  color: p.priceColor, fontSize: 38, fontWeight: 900,
                  lineHeight: 1.1, fontFamily: f.number,
                }}>¥{s.currentPrice.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 模块11：底部栏 */}
      <div style={{
        background: p.headerBg,
        padding: '20px 40px',
        textAlign: 'center',
        color: p.onHeader,
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: ls.heading,
        fontFamily: f.heading,
      }}>
        游{product.destination} · 品质旅行 即刻拥有
      </div>
    </div>
  )
})

PosterPreview.displayName = 'PosterPreview'
export default PosterPreview
