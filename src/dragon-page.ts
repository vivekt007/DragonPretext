// Dragon page shell — injects the canvas + panel HTML, then loads the dragon engine

const app = document.getElementById('app')!
app.style.cursor = 'crosshair'

// Canvas
const canvas = document.createElement('canvas')
canvas.id = 'c'
app.appendChild(canvas)

// Hint
const hint = document.createElement('div')
hint.id = 'hint'
hint.style.cssText = 'position:fixed;bottom:10px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.2);font-size:12px;pointer-events:none;transition:opacity 0.8s;letter-spacing:0.04em'
hint.textContent = 'click & hold for fire — drag through text'
app.appendChild(hint)

// Works Button
const worksButton = document.createElement('button')
worksButton.id = 'works-button'
worksButton.textContent = 'Work'
worksButton.style.cssText = 'background: #ff6500;color:#fff;border:none;padding:8px 8px;border-radius:4px;cursor:pointer;font-family:"Courier New",monospace;font-size:14px;'
worksButton.onclick = () => window.location.href = 'https://next-js-portfolio-pi.vercel.app/'
app.appendChild(worksButton)

// Stats
const stats = document.createElement('div')
stats.id = 'stats'
document.body.appendChild(stats)

// Mobile Overlay
if (window.innerWidth <= 768) {
  const overlay = document.createElement('div')
  overlay.id = 'mobile-overlay'
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#fff;font-family:"Courier New",monospace;'
  
  const message = document.createElement('div')
  message.textContent = 'Please use desktop for better experience'
  message.style.cssText = 'font-size:18px;margin-bottom:20px;text-align:center;max-width:80%;'
  
  const button = document.createElement('button')
  button.textContent = 'Continue on Mobile'
  button.style.cssText = 'background:#ff6500;color:#fff;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;font-family:"Courier New",monospace;font-size:14px;'
  button.onclick = () => overlay.remove()
  
  overlay.appendChild(message)
  overlay.appendChild(button)
  document.body.appendChild(overlay)
}

// Panel — built with DOM methods (no innerHTML)
function makeSection(title: string, children: HTMLElement[]): HTMLDivElement {
  const sec = document.createElement('div')
  sec.className = 'section'
  const t = document.createElement('div')
  t.className = 'section-title'
  t.textContent = title
  sec.appendChild(t)
  for (const c of children) sec.appendChild(c)
  return sec
}

function makeSlider(label: string, key: string, min: string, max: string, step: string): HTMLDivElement {
  const row = document.createElement('div')
  row.className = 'control-row'
  const lbl = document.createElement('span')
  lbl.className = 'control-label'
  lbl.textContent = label
  const input = document.createElement('input')
  input.type = 'range'
  input.dataset.key = key
  input.min = min; input.max = max; input.step = step
  const val = document.createElement('span')
  val.className = 'control-value'
  val.dataset.val = key
  row.append(lbl, input, val)
  return row
}

function makeToggle(label: string, key: string): HTMLDivElement {
  const row = document.createElement('div')
  row.className = 'toggle-row'
  const lbl = document.createElement('span')
  lbl.className = 'control-label'
  lbl.textContent = label
  const toggle = document.createElement('label')
  toggle.className = 'toggle'
  const cb = document.createElement('input')
  cb.type = 'checkbox'
  cb.dataset.key = key
  const track = document.createElement('span')
  track.className = 'toggle-track'
  const thumb = document.createElement('span')
  thumb.className = 'toggle-thumb'
  toggle.append(cb, track, thumb)
  row.append(lbl, toggle)
  return row
}

// Load the dragon engine
import('./dragon.ts')
