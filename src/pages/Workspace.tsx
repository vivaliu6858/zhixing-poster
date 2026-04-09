import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import type { TourProduct } from '../types'
import { DEFAULT_PRODUCT } from '../defaultData'
import FormPanel from '../components/FormPanel'
import PosterPreview from '../components/PosterPreview'
import { getTheme } from '../themes'

const JIMENG_STYLE: Record<string, string> = {
  pink: '温暖粉色调，周围飘落樱花花瓣，春日明媚阳光，浪漫柔和氛围',
  orange: '橙色暖色调，活力四射，阳光灿烂，充满生机',
  deepblue: '深蓝夜空色调，星光璀璨，庄重大气，高端感',
  purpleblue: '中国红配金色，国潮风格，大气磅礴，传统纹样装饰',
  green: '自然绿色调，清新雅致，生机盎然',
  dreamy: '粉紫渐变色调，梦幻光效，星光点缀，浪漫唯美',
}

function buildJimengPrompt(p: TourProduct) {
  const style = JIMENG_STYLE[p.theme] ?? JIMENG_STYLE.pink
  return `3D微缩${p.destination}旅游场景海报主视觉图，打开的精致复古行李箱中展现天安门广场、故宫等${p.destination}地标建筑的微缩模型，建筑细节精致逼真，${style}，高品质3D渲染效果，适合旅游海报使用，竖版构图9:16比例`
}

export default function Workspace() {
  const [product, setProduct] = useState<TourProduct>(DEFAULT_PRODUCT)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const posterRef = useRef<HTMLDivElement>(null)

  const handleGenerate = useCallback(async () => {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 800))
    setGenerating(false)
    setGenerated(true)
  }, [])

  const handleDownload = useCallback(async () => {
    if (!posterRef.current) return
    const canvas = await html2canvas(posterRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    })
    const link = document.createElement('a')
    link.download = `智行海报_${product.name}_${Date.now()}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }, [product.name])

  const handleCopyPrompt = useCallback(async () => {
    const prompt = buildJimengPrompt(product)
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [product])

  const theme = getTheme(product.theme)

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* 左侧表单面板 */}
      <div style={{
        width: 420, flexShrink: 0,
        background: '#f8f8f8',
        borderRight: '1px solid #e0e0e0',
        padding: '0 20px',
        overflowY: 'auto',
      }}>
        {/* 顶部品牌 */}
        <div style={{
          padding: '16px 0 12px', borderBottom: '1px solid #e0e0e0', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, background: '#FF5A5F',
            borderRadius: 8, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 16,
          }}>✈</div>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#222' }}>智行海报</span>
        </div>
        <FormPanel
          product={product}
          onChange={setProduct}
          onGenerate={handleGenerate}
          generating={generating}
          generated={generated}
        />
      </div>

      {/* 右侧预览区 */}
      <div style={{
        flex: 1, overflowY: 'auto',
        background: '#ebebeb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 40px',
      }}>
        {!generated ? (
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#aaa', fontSize: 16, flexDirection: 'column', gap: 12,
          }}>
            <div style={{ fontSize: 48 }}>🗺</div>
            <div>填写左侧信息，选择风格后点击生成</div>
          </div>
        ) : (
          <>
            {/* 操作按钮 */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 24, width: '100%', maxWidth: 750 }}>
              <button
                onClick={handleDownload}
                style={{
                  flex: 1, padding: '12px', borderRadius: 10,
                  background: theme.primary, color: 'white',
                  border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                }}
              >📥 下载高清图</button>
              <button
                onClick={handleCopyPrompt}
                style={{
                  flex: 1, padding: '12px', borderRadius: 10,
                  background: 'white', color: '#333',
                  border: '1px solid #ddd', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                }}
              >{copied ? '✅ 已复制！' : '📋 复制即梦Prompt'}</button>
            </div>

            {/* 海报预览 */}
            <div style={{ width: '100%', maxWidth: 750, transform: 'scale(1)', transformOrigin: 'top center' }}>
              <PosterPreview ref={posterRef} product={product} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
