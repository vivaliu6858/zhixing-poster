import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: '"Noto Sans SC", sans-serif' }}>
      {/* 顶部导航 */}
      <nav style={{
        padding: '0 60px', height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: '#FF5A5F', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>✈</div>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#222' }}>智行海报</span>
        </div>
        <button
          onClick={() => navigate('/workspace')}
          style={{
            padding: '10px 24px', background: '#FF5A5F', color: 'white',
            border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 600,
            cursor: 'pointer',
          }}
        >立即使用</button>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '80px 40px 60px' }}>
        <div style={{
          display: 'inline-block', background: '#fff0f0', color: '#FF5A5F',
          padding: '6px 18px', borderRadius: 20, fontSize: 13, fontWeight: 700,
          marginBottom: 24,
        }}>专为旅行社打造的AI海报工具</div>
        <h1 style={{
          fontSize: 60, fontWeight: 900, color: '#222222',
          letterSpacing: -2, margin: '0 0 20px',
          lineHeight: 1.15,
        }}>上传行程，一键出海报</h1>
        <p style={{ fontSize: 20, color: '#6a6a6a', marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
          专为旅行社打造的AI海报生成器<br />填写信息、选择配色、一键生成专业海报
        </p>
        <button
          onClick={() => navigate('/workspace')}
          style={{
            padding: '18px 48px',
            background: 'linear-gradient(135deg, #FF5A5F, #e91e63)',
            color: 'white', border: 'none', borderRadius: 12,
            fontSize: 18, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(255,90,95,0.35)',
          }}
        >✨ 立即生成海报</button>
      </div>

      {/* 示例展示 */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 24,
        padding: '0 40px 80px', flexWrap: 'wrap',
      }}>
        {[
          { bg: 'linear-gradient(135deg, #fce4ec, #f8bbd0)', label: '温暖粉色', color: '#e91e63' },
          { bg: 'linear-gradient(135deg, #0a2744, #1565c0)', label: '大气深蓝', color: '#1565c0' },
          { bg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)', label: '活力橙色', color: '#ff6d00' },
        ].map(item => (
          <div key={item.label} style={{
            width: 220, height: 320, borderRadius: 20, overflow: 'hidden',
            boxShadow: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.08) 0px 4px 16px',
            cursor: 'pointer',
          }} onClick={() => navigate('/workspace')}>
            <div style={{ height: '100%', background: item.bg, display: 'flex', flexDirection: 'column', padding: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: item.color }}>示例海报</div>
              <div style={{ fontSize: 14, color: '#666', marginTop: 8 }}>{item.label}主题</div>
              <div style={{ flex: 1 }} />
              <div style={{ fontSize: 12, color: '#999' }}>点击体验 →</div>
            </div>
          </div>
        ))}
      </div>

      {/* 功能介绍 */}
      <div style={{
        background: '#f8f8f8', padding: '60px 40px',
        display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap',
      }}>
        {[
          { icon: '🤖', title: 'AI智能解析', desc: '自动解析行程，提取关键信息' },
          { icon: '🎨', title: '6套专业配色', desc: '温暖粉、深蓝、橙色等多种风格' },
          { icon: '📥', title: '一键下载高清图', desc: '导出750px宽高清PNG海报' },
        ].map(f => (
          <div key={f.title} style={{
            textAlign: 'center', maxWidth: 200,
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{f.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#222', marginBottom: 8 }}>{f.title}</div>
            <div style={{ fontSize: 14, color: '#6a6a6a' }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
