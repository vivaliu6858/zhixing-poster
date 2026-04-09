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
  return `${p.destination}旅游主题横版海报主视觉图，3D微缩风格，打开的精致复古行李箱中展现${p.destination}地标建筑的微缩模型，建筑细节精致逼真，${style}，高品质3D渲染，构图留出天空区域、主体偏中下，适合作为旅游海报横条banner，构图3:2比例`
}

export default function Workspace() {
  const [product, setProduct] = useState<TourProduct>(DEFAULT_PRODUCT)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [fetchingPhotos, setFetchingPhotos] = useState(false)
  const [generatingHero, setGeneratingHero] = useState(false)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const posterRef = useRef<HTMLDivElement>(null)

  const handleGenerate = useCallback(async () => {
    setGenerating(true)
    await new Promise(r => setTimeout(r, 800))
    setGenerating(false)
    setGenerated(true)
  }, [])

  const handleFetchPhotos = useCallback(async () => {
    if (!product.attractions.length) return
    setFetchingPhotos(true)
    setStatusMsg('正在从 Pexels 抓取景点图...')
    try {
      const resp = await fetch('/api/photos/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queries: product.attractions.map(a => ({
            name: a.name,
            keyword: a.keyword || a.name,
          })),
        }),
      })
      const data = await resp.json()
      if (!data.success) throw new Error(data.error || '抓取失败')
      const urlMap = new Map<string, string>()
      for (const r of data.results || []) {
        if (r.url) urlMap.set(r.name, r.url)
      }
      setProduct(p => ({
        ...p,
        attractions: p.attractions.map(a => ({
          ...a,
          imageUrl: urlMap.get(a.name) || a.imageUrl,
        })),
      }))
      const ok = Array.from(urlMap.keys()).length
      setStatusMsg(`✅ 成功抓取 ${ok}/${product.attractions.length} 张景点图`)
      setTimeout(() => setStatusMsg(null), 3000)
    } catch (e: unknown) {
      setStatusMsg('❌ 抓图失败：' + (e instanceof Error ? e.message : String(e)))
      setTimeout(() => setStatusMsg(null), 5000)
    } finally {
      setFetchingPhotos(false)
    }
  }, [product.attractions])

  const handleGenerateHero = useCallback(async () => {
    setGeneratingHero(true)
    setStatusMsg('正在用即梦AI生成主视觉图，大约需要30-90秒...')
    try {
      const prompt = buildJimengPrompt(product)
      const resp = await fetch('/api/hero/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, ratio: '3:2', poll_seconds: 150 }),
      })
      const data = await resp.json()
      if (!data.success) throw new Error(data.error || '生成失败')
      setProduct(p => ({ ...p, heroImageUrl: data.url }))
      setStatusMsg('✅ 主视觉图已生成')
      setTimeout(() => setStatusMsg(null), 3000)
    } catch (e: unknown) {
      setStatusMsg('❌ 主视觉生成失败：' + (e instanceof Error ? e.message : String(e)))
      setTimeout(() => setStatusMsg(null), 5000)
    } finally {
      setGeneratingHero(false)
    }
  }, [product])

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
          onFetchPhotos={handleFetchPhotos}
          fetchingPhotos={fetchingPhotos}
          onGenerateHero={handleGenerateHero}
          generatingHero={generatingHero}
          statusMsg={statusMsg}
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
