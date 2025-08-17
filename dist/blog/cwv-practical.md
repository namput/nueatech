# Core Web Vitals in Practice — ทำจริง วัดจริง ปรับจนผ่าน

> TL;DR: โฟกัส 3 ตัวหลัก **LCP ≤ 2.5s**, **INP ≤ 200ms**, **CLS ≤ 0.1**. เริ่มจากวัดด้วย Lighthouse/CrUX → เก็บ RUM ด้วย web-vitals → แก้ 80/20: LCP รูป/ฟอนต์/บล็อคเรนเดอร์, INP ตัด Long Task/ลด re-render, CLS จองพื้นที่สื่อ & ฟอนต์. ทำซ้ำเป็นวงรอบจนเสถียร.

---

## 1) Core Web Vitals คืออะไร (อัปเดต 2025)

* **LCP — Largest Contentful Paint**: เวลาที่คอนเทนต์หลัก (เช่นรูป Hero/หัวข้อใหญ่) แสดงผลเสร็จครั้งแรก
* **INP — Interaction to Next Paint** *(มาแทน FID ตั้งแต่ 2024)*: เวลาตอบสนองโดยรวมต่อการโต้ตอบ (คลิก/แตะ/ป้อนข้อมูล) ทั้งเพจ
* **CLS — Cumulative Layout Shift**: คะแนนความสั่น/เขย่าของเลย์เอาต์จากคอนเทนต์ขยับโดยไม่คาดคิด

**เกณฑ์ดี**

* LCP ≤ **2.5 วินาที**
* INP ≤ **200 มิลลิวินาที**
* CLS ≤ **0.1**

> คิดแบบนักผลิตภัณฑ์: ทำเกณฑ์ดีให้ได้ **อย่างน้อย 75th percentile ของผู้ใช้จริง** (CrUX/RUM) ไม่ใช่เฉพาะเครื่อง dev เรา

---

## 2) วัดก่อน แก้ทีหลัง (Measurement First)

### 2.1 Lighthouse (Lab)

* เปิด DevTools → Lighthouse → Mobile → “Performance”.
* รันหลายครั้งเพื่อดูความแปรผัน (network/cold cache).

### 2.2 PageSpeed Insights (Field + Lab)

* ใส่ URL → ดู “Core Web Vitals assessment” + กราฟ Distribution ของ LCP/INP/CLS

### 2.3 CrUX (Field Data)

* ใช้ PageSpeed หรือ BigQuery (ขั้นสูง) เพื่อดู 28 วันย้อนหลัง, เปรียบเทียบอุปกรณ์/ประเทศ

### 2.4 RUM ด้วย `web-vitals` (ผู้ใช้จริงแบบ Realtime)

ฝังสคริปต์บนโปรดักชันเพื่อส่งค่ากลับเซิร์ฟเวอร์ของเรา

```html
<script type="module">
  import { onLCP, onINP, onCLS } from 'https://unpkg.com/web-vitals@4?module';
  const send = (m) => navigator.sendBeacon?.('/rum', JSON.stringify(m))
                    || fetch('/rum', {method:'POST', keepalive:true, body:JSON.stringify(m)});
  const base = { path: location.pathname, ua: navigator.userAgent };
  onLCP((v)=>send({ metric:'LCP', value:v.value, id:v.id, ...base }));
  onINP((v)=>send({ metric:'INP', value:v.value, id:v.id, interaction:v.eventType, ...base }));
  onCLS((v)=>send({ metric:'CLS', value:v.value, id:v.id, ...base }));
</script>
```

ฝั่งเซิร์ฟเวอร์ เก็บลงฐานข้อมูลง่าย ๆ (ตัวอย่าง Express)

```js
// /api/rum
app.post('/rum', express.text({ type:'*/*' }), (req,res)=>{
  const row = JSON.parse(req.body||'{}');
  // TODO: ใส่ queue/db ตามถนัด (ClickHouse/BigQuery/Supabase)
  console.log('RUM', row);
  res.status(204).end();
});
```

---

## 3) Playbook แก้ทีละ Vital

### 3.1 ทำ LCP ให้ ≤ 2.5s

1. **อย่า lazy-load องค์ประกอบ LCP** (เช่นรูป Hero) — ใส่ `fetchpriority="high"`, `rel="preload"`, `as="image"`
2. **ลด Render‑blocking**: รวม/มินิไฟล์ CSS ที่สำคัญ, ใช้ `media`/`defer` กับสคริปต์ที่ไม่จำเป็น
3. **รูปภาพ**: ใช้ `width/height`, `srcset/sizes`, บีบอัด (AVIF/WebP), CDN ใกล้ผู้ใช้
4. **ฟอนต์**: `preconnect` แหล่งฟอนต์, `font-display: swap`, preload เฉพาะตัวที่ใช้จริง
5. **TTFB**: ตรวจ backend & cache; เปิด HTTP/2/3; เปิด gzip/br

ตัวอย่าง Hero image ที่ถูกต้อง

```html
<link rel="preload" as="image" href="/images/hero.avif" imagesrcset="/images/hero.avif 1x, /images/hero@2x.avif 2x" imagesizes="100vw" />
<img src="/images/hero.avif" alt="Product" width="1600" height="900" fetchpriority="high" decoding="async" />
```

React/Next.js (ใช้ component รูป)

```tsx
// Next.js
import Image from 'next/image';
<Image src="/hero.avif" alt="Hero" width={1600} height={900} priority placeholder="blur" />
```

### 3.2 ทำ INP ให้ ≤ 200ms

* ตัด **Long Task** (>50ms) ด้วยการ

  * แยกงานหนักไป **Web Worker**
  * แตก chunk: dynamic import ส่วนที่ไม่ได้ใช้
  * ใช้ `requestIdleCallback` สำหรับงานเบาๆ หลัง paint
* ลด re-render:

  * ใช้ `memo`, `useMemo`, `useCallback`; เลี่ยงการสร้าง object/array ใหม่โดยไม่จำเป็น
  * ใช้ **`startTransition`** สำหรับอัปเดตที่ไม่ต้องตอบสนองทันที
* Event handler ควรเบาและ **passive** เพื่อไม่บล็อกสกอลล์

ตัวอย่าง React บริเวณที่คลิกแล้วเบา

```tsx
function SearchBox(){
  const [q, setQ] = React.useState('');
  const onChange = React.useMemo(() => debounce((v:string)=> setQ(v), 150), []);
  return <input onChange={(e)=>onChange(e.target.value)} className="input" />
}
```

แตก bundle แบบฉลาด

```tsx
const HeavyChart = React.lazy(()=> import('./Chart')); // โหลดเมื่อถึง
```

### 3.3 ทำ CLS ให้ ≤ 0.1

* **จองพื้นที่สื่อเสมอ**: ใส่ `width/height` หรือ `aspect-ratio`
* อย่าโหลดฟอนต์แบบ flash — ใช้ `font-display: swap` หรือระบบฟอนต์ใกล้เคียง
* หลีกเลี่ยงแบนเนอร์/โฆษณา/คุกกี้แจ้งเตือนที่ดันคอนเทนต์ลงโดยไม่จองพื้นที่

ตัวอย่าง CSS ให้รูปนิ่ง

```css
.hero img { aspect-ratio: 16/9; width: 100%; height: auto; display: block; }
```

---

## 4) 80/20 Fixes (ได้ผลไวแทบทุกเว็บ)

* เปลี่ยนภาพ Hero เป็น **AVIF/WebP** + **preload + fetchpriority**
* Inline/critical CSS 3–5KB แรก, ที่เหลือโหลดแบบ `media` หรือ `rel="preload" as="style"`
* ตัดสคริปต์ที่ไม่จำเป็นออกจากหน้าแรก (แท็กวิเคราะห์/วิดเจ็ต)
* Lazy-load รูป/วิดีโอที่อยู่นอกจอ (`loading="lazy"`, `decoding="async"`)
* เปิด **HTTP caching** ให้แรง (immutable assets), ใช้ CDN และ compress

---

## 5) Workflow ทำงานจริง (ทีม/องค์กร)

### 5.1 ตั้ง SLI/SLO

* **SLI**: p75 LCP/INP/CLS ต่อ device (Mobile/Desk) และต่อประเทศหลัก
* **SLO**: p75 LCP ≤ 2.3s, INP ≤ 180ms, CLS ≤ 0.08 (กำหนดเข้มกว่ามาตรฐานนิดหน่อย)

### 5.2 CI สำหรับ Performance Budget (Lighthouse CI)

```json
// lighthouserc.json
{ "ci": { "collect": { "url": ["http://localhost:4173/"], "settings": { "preset": "mobile" } },
  "assert": { "assertions": { "categories:performance": ["error", {"minScore": 0.9}] } } } }
```

GitHub Actions (ตัวอย่าง)

```yaml
name: perf-ci
on: [push]
jobs:
  lhci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build && npm run preview &
      - run: npx lhci autorun
```

### 5.3 Dashboard RUM

* เก็บ RUM ลง ClickHouse/BigQuery → ทำ Chart p75 รายวัน, ผังค่าผิดปกติ, แยกตาม path/device/country.

---

## 6) Debug Playbook แบบเร็ว

* LCP ช้า: ดู **Coverage** (DevTools) หา CSS/JS ส่วนเกิน, ตรวจ Network waterfall → ใครคิวแรก ๆ ช้า, ลอง Preload/Preconnect
* INP แย่: เปิด **Performance** แท็บ → หา Long Task, ดู flame chart ช่วงคลิก; ใช้ React Profiler หา component ที่ re-render หนัก
* CLS สะบัด: เปิด **Rendering → Layout Shift Regions** จะไฮไลต์พื้นที่ที่ขยับ

---

## 7) เช็กลิสต์ก่อนปล่อยจริง

* [ ] รูป LCP: มี `preload` + `fetchpriority="high"` + ขนาดถูกต้อง
* [ ] ไม่มีสคริปต์บล็อกเรนเดอร์ที่ไม่จำเป็นบนหน้าแรก
* [ ] ฟอนต์: `preconnect` และ `font-display: swap`
* [ ] Lazy-load ทุกสื่อที่อยู่นอกจอ
* [ ] จองพื้นที่รูป/วิดีโอ/แบนเนอร์ทุกชิ้น
* [ ] ติดตั้ง RUM (`web-vitals`) + Dashboard ค่า p75
* [ ] ตั้ง CI budget (Lighthouse) ไม่ให้ถอยหลัง

---

## 8) สรุป

เริ่มจากวัด → แก้ 80/20 → วนซ้ำด้วยข้อมูลจริง. ทำถูกลำดับงานจะเบาและได้ผลไว: **LCP ด้วยรูป/ฟอนต์, INP ด้วยการตัด Long Task, CLS ด้วยการจองพื้นที่**. ตั้งเป้า p75 ให้ผ่านและรักษาไว้ด้วย CI + RUM — เท่านี้ก็ดันประสบการณ์ผู้ใช้และ SEO ขึ้นได้อย่างยั่งยืน.
