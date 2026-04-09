import { forwardRef } from 'react'
import type { TourProduct } from '../types'
import { getTheme } from '../themes'

interface Props {
  product: TourProduct
}

const PosterPreview = forwardRef<HTMLDivElement, Props>(({ product }, ref) => {
  const theme = getTheme(product.theme)
  const isDark = ['deepblue', 'purpleblue'].includes(product.theme)
  const textOnGrad = isDark ? '#ffffff' : '#222222'
  const subtextOnGrad = isDark ? 'rgba(255,255,255,0.8)' : '#6a6a6a'

  return (
    <div
      ref={ref}
      style={{
        width: 750,
        background: '#ffffff',
        fontFamily: '"Noto Sans SC", sans-serif',
        overflow: 'hidden',
        boxShadow: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px',
      }}
    >
      {/* 模块1：品牌栏 */}
      <div style={{
        height: 80,
        background: theme.headerBg,
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
          <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>品质旅行 即刻拥有</span>
          <span style={{
            background: '#FF5A5F', color: 'white',
            padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 700,
          }}>精品团</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.2)', color: 'white',
          padding: '6px 16px', borderRadius: 20, fontSize: 14, fontWeight: 700,
        }}>
          ✈ {product.departureCity}飞
        </div>
      </div>

      {/* 模块2：标题区 */}
      <div style={{
        background: theme.sectionBg,
        padding: '40px 40px 30px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', top: -20, left: 0, right: 0,
          fontSize: 120, fontWeight: 900, color: 'rgba(0,0,0,0.04)',
          letterSpacing: -5, lineHeight: 1, userSelect: 'none',
        }}>TRAVEL</div>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 12,
          marginBottom: 16, flexWrap: 'wrap',
        }}>
          {product.tags.map(tag => (
            <span key={tag} style={{
              background: theme.tagBg, color: 'white',
              padding: '4px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700,
            }}>{tag}</span>
          ))}
        </div>
        <div style={{
          fontSize: 72, fontWeight: 900, color: theme.primary,
          letterSpacing: -2, lineHeight: 1.1, marginBottom: 12,
          textShadow: '2px 2px 0px rgba(0,0,0,0.05)',
        }}>{product.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#222' }}>
            {product.destination}{product.transport}{product.days}
          </span>
          <span style={{
            background: theme.primary, color: 'white',
            padding: '4px 16px', borderRadius: 20, fontSize: 14, fontWeight: 700,
          }}>{product.subtitle}</span>
        </div>
      </div>

      {/* 模块3：主视觉区 */}
      <div style={{
        height: 320,
        background: theme.headerBg,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{
            fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.15)',
            letterSpacing: 8,
          }}>UPGRADE</div>
          <div style={{
            color: 'white', fontSize: 22, fontWeight: 700, marginTop: 8,
            border: '2px solid rgba(255,255,255,0.5)',
            padding: '8px 24px', borderRadius: 8, display: 'inline-block',
          }}>全新升级 · 品质之旅</div>
          <div style={{
            color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 16,
          }}>主视觉图 · 即梦AI生成后替换</div>
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
          background: 'linear-gradient(to bottom, transparent, #ffffff)',
        }} />
      </div>

      {/* 模块4：二维码+编号区 */}
      <div style={{
        margin: '-20px 30px 20px',
        background: 'white',
        borderRadius: 20,
        boxShadow: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        position: 'relative',
        zIndex: 3,
      }}>
        <div style={{
          width: 80, height: 80, background: '#f0f0f0', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, color: '#999', flexShrink: 0,
        }}>二维码</div>
        <div>
          <div style={{ fontSize: 12, color: '#999' }}>长按识别 查看详细行程</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#222', marginTop: 4 }}>
            {product.destination}{product.transport}{product.days}{product.subtitle}
          </div>
        </div>
        <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <div style={{
            background: '#FF5A5F', color: 'white',
            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700,
            transform: 'rotate(-8deg)', display: 'inline-block',
          }}>已含税</div>
        </div>
      </div>

      {/* 模块5：酒店信息 */}
      <div style={{ margin: '0 30px 20px', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{
          background: theme.headerBg, padding: '12px 20px',
          color: 'white', fontSize: 18, fontWeight: 700,
        }}>🏨 畅享首都核心商圈</div>
        <div style={{
          background: theme.sectionBg, padding: '20px',
          display: 'flex', gap: 16, alignItems: 'center',
        }}>
          <div style={{
            width: 160, height: 100, background: 'rgba(0,0,0,0.1)',
            borderRadius: 12, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, color: subtextOnGrad,
          }}>酒店实景图</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: textOnGrad }}>丽枫酒店或同级</div>
            <div style={{ fontSize: 13, color: subtextOnGrad, marginTop: 4 }}>锦江集团 · 三环内</div>
            <div style={{ fontSize: 13, color: subtextOnGrad, marginTop: 4 }}>中高端品质 · 含早餐</div>
          </div>
        </div>
      </div>

      {/* 模块6：景点展示 */}
      <div style={{ margin: '0 30px 20px', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{
          background: theme.headerBg, padding: '12px 20px',
          color: 'white', fontSize: 18, fontWeight: 700,
        }}>🏛 京华礼赞</div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 2, background: '#e0e0e0',
        }}>
          {['天坛公园', '故宫博物院', '八达岭长城', '颐和园'].map((site, i) => (
            <div key={site} style={{
              height: 150, background: theme.sectionBg,
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'flex-end',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6))`,
              }} />
              <div style={{
                position: 'relative', zIndex: 1, padding: '12px 16px',
                color: 'white',
              }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{site}</div>
                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>
                  {['皇家祭天圣地', '探秘紫禁城', '不到长城非好汉', '皇家园林典范'][i]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 模块7：赏花指南 */}
      <div style={{ margin: '0 30px 20px', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{
          background: theme.headerBg, padding: '12px 20px',
          color: 'white', fontSize: 18, fontWeight: 700,
        }}>🌸 春日赏花指南</div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 12, padding: 16, background: '#fff',
        }}>
          {[
            { name: '玉渊潭公园', desc: '樱花盛开，粉色浪漫' },
            { name: '北京植物园', desc: '桃花满园，春意盎然' },
            { name: '圆明园', desc: '荷花盛放，清幽雅致' },
            { name: '香山公园', desc: '红叶成林，层林尽染' },
          ].map(item => (
            <div key={item.name} style={{
              background: theme.sectionBg, borderRadius: 12,
              padding: '12px 16px',
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: theme.primary }}>{item.name}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 模块8：美食区 */}
      <div style={{ margin: '0 30px 20px', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{
          background: theme.headerBg, padding: '12px 20px',
          color: 'white', fontSize: 18, fontWeight: 700,
        }}>🍽 京味美食</div>
        <div style={{ padding: '16px 20px', background: '#fff' }}>
          <div style={{
            background: theme.sectionBg, borderRadius: 12, padding: '12px 16px',
            fontSize: 15, fontWeight: 700, color: theme.primary, marginBottom: 12,
          }}>
            满清景泰蓝自助火锅 不限量 30-60元/餐
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['北京烤鸭', '老北京炸酱面', '爆肚涮羊肉', '驴打滚'].map(food => (
              <span key={food} style={{
                background: '#f5f5f5', color: '#555',
                padding: '6px 14px', borderRadius: 20, fontSize: 13,
              }}>{food}</span>
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
            background: [theme.primary, '#ff6d00', '#2e7d32', '#1565c0'][i % 4],
            color: 'white', padding: '8px 20px', borderRadius: 20,
            fontSize: 14, fontWeight: 700,
          }}>{tag}</span>
        ))}
      </div>

      {/* 模块10：价格表 */}
      <div style={{ margin: '0 30px 20px', borderRadius: 20, overflow: 'hidden' }}>
        <div style={{
          background: theme.headerBg, padding: '12px 20px',
          color: 'white', fontSize: 18, fontWeight: 700,
        }}>💰 班期价格</div>
        <div style={{ background: 'white', padding: '0 20px 16px' }}>
          <div style={{
            padding: '12px 0', borderBottom: '1px solid #f0f0f0',
            fontSize: 13, color: '#999', display: 'flex', gap: 8,
          }}>
            <span>✈ 南方航空</span>
            <span>广州→北京 06:30出发</span>
          </div>
          {product.schedules.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 0',
              borderBottom: i < product.schedules.length - 1 ? '1px solid #f5f5f5' : 'none',
            }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#222' }}>{s.date}</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  textDecoration: 'line-through', color: '#bbb', fontSize: 13,
                }}>¥{s.originalPrice.toLocaleString()}</div>
                <div style={{
                  color: theme.priceColor, fontSize: 38, fontWeight: 900,
                  lineHeight: 1.1,
                }}>¥{s.currentPrice.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 模块11：底部栏 */}
      <div style={{
        background: theme.headerBg,
        padding: '20px 40px',
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: 2,
      }}>
        游{product.destination} · 品质旅行 即刻拥有
      </div>
    </div>
  )
})

PosterPreview.displayName = 'PosterPreview'
export default PosterPreview
