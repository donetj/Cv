# 🌧 Donet Joseph — Kerala Monsoon 3D Portfolio

A cinematic, scroll-driven 3D portfolio built with **Next.js 15**, **React Three Fiber**, **Three.js**, and **GSAP ScrollTrigger**. Styled after the viral Sebastien Lempens Instagram reel — a Mahindra Jeep journeys through misty Kerala hills in monsoon season, revealing portfolio chapters as you scroll.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

---

## 📁 Project Structure

```
kerala-portfolio/
├── app/
│   ├── layout.tsx          # Root layout with metadata & fonts
│   └── page.tsx            # Main page — orchestrates 3D + UI
├── components/
│   ├── 3d/
│   │   ├── Scene.tsx       # Canvas, camera controller, post-processing
│   │   ├── KeralaEnvironment.tsx  # Mountains, trees, road, house
│   │   ├── MahindraJeep.tsx       # Procedural jeep from primitives
│   │   └── RainSystem.tsx         # 8000-particle rain system
│   └── ui/
│       ├── LoadingScreen.tsx      # Kerala mandala loading screen
│       ├── JourneyHUD.tsx         # Side progress nav
│       ├── CustomCursor.tsx       # Lagging amber cursor
│       ├── AudioToggle.tsx        # Rain/ambient audio via Howler.js
│       ├── ScrollHint.tsx         # "Scroll to journey" hint
│       ├── HeroSection.tsx        # Hero title overlay
│       └── ContentSections.tsx    # All portfolio content panels
├── lib/
│   └── store.ts            # Zustand global state
├── styles/
│   └── globals.css         # Full design system with Kerala aesthetic
├── public/
│   ├── models/             # ← Add GLB models here (see below)
│   ├── textures/           # ← Add PBR textures here
│   └── audio/              # ← Add audio files here
└── next.config.js
```

---

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--kerala-green` | `#1a3a2a` | Deep background |
| `--kerala-amber` | `#d4820a` | Accent / lantern |
| `--kerala-amber-bright` | `#f0a030` | CTA / highlights |
| `--kerala-mist` | `#b8d4c8` | Body text |
| `--kerala-rain` | `#7ab8d4` | Rain tints |
| `--font-display` | Playfair Display | Headings |
| `--font-body` | Cormorant Garamond | Body text |
| `--font-mono` | Space Mono | Labels / tags |

---

## 🎬 Scroll Journey Map

| Section | Scroll % | Scene |
|---------|----------|-------|
| 0 Hero | 0–12% | Wide establishing shot, misty dawn |
| 1 About | 12–28% | Low side angle, jeep on village road |
| 2 Lulu Qatar | 28–44% | Three-quarter front, plantation |
| 3 Jubeerich | 44–58% | Low tracking shot through trees |
| 4 Syscon | 58–70% | Behind jeep, road stretching ahead |
| 5 Skills | 70–84% | Wide mountain vista |
| 6 Education | 84–92% | Close dramatic angle |
| 7 Contact | 92–100% | Final cinematic wide pull-back |

---

## 🚙 Adding Custom GLB Models

Replace the procedural primitives with real GLB models for maximum visual quality.

### Where to place files
```
public/
  models/
    jeep.glb          ← Old Mahindra Jeep (open-top, ~500k polys)
    palm_tree.glb     ← Coconut palm with LODs
    tea_bush.glb      ← Tea plantation bush
    kerala_house.glb  ← Colonial wooden house
    mountain.glb      ← Mountain terrain chunk
```

### How to load in Scene

In `components/3d/MahindraJeep.tsx`, replace the primitive group with:

```tsx
import { useGLTF } from '@react-three/drei'

export function MahindraJeep({ position, rotation }) {
  const { scene } = useGLTF('/models/jeep.glb')
  
  // Enable shadows on all meshes
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  
  return (
    <primitive object={scene} position={position} rotation={rotation} scale={1} />
  )
}

// Preload
useGLTF.preload('/models/jeep.glb')
```

### Recommended free GLB sources
- **Sketchfab** (search "Mahindra Jeep", "Coconut Palm", "Kerala House")
- **poly.pizza** — optimized low-poly assets
- **Quaternius** — free game-ready models
- **Clara.io** — community models

---

## 🎵 Adding Audio

Place audio files in `/public/audio/`:

```
public/audio/
  rain-ambient.mp3    ← Heavy monsoon rain (looping, ~30s)
  jeep-engine.mp3     ← Diesel engine idle (looping)
  thunder.mp3         ← Distant thunder (occasional)
  birds.mp3           ← Kerala birds between thunder
```

Free sources:
- **Freesound.org** — Rain, engine sounds
- **Zapsplat.com** — High quality ambient
- **BBC Sound Effects Archive**

---

## 🌿 Adding PBR Textures

Place in `/public/textures/` and load via `useTexture` from `@react-three/drei`:

```tsx
import { useTexture } from '@react-three/drei'

const [colorMap, normalMap, roughnessMap] = useTexture([
  '/textures/wet-road-color.jpg',
  '/textures/wet-road-normal.jpg',
  '/textures/wet-road-roughness.jpg',
])
```

Recommended texture sets:
- Wet asphalt road (4K)
- Muddy Kerala earth
- Wooden plank (for house)
- Wet leaves (for trees)

Free sources: **ambientCG.com**, **Poly Haven**

---

## ⚡ Performance Tuning

The canvas uses `dpr={[1, 1.5]}` and `performance={{ min: 0.5 }}` for auto-quality scaling.

For mobile, reduce rain count in `RainSystem.tsx`:
```tsx
const RAIN_COUNT = isMobile ? 2000 : 8000
```

Disable post-processing on mobile:
```tsx
{!isMobile && <PostEffects />}
```

---

## 📱 Mobile Notes

- The 3D canvas scales to mobile with reduced quality
- Journey HUD hidden on mobile (use scroll)
- Consider a 2.5D fallback for very low-end devices
- Test on iOS Safari (WebGL 2 support required)

---

## 🌐 Deploy

```bash
# Vercel (recommended)
vercel deploy

# Or static build
npm run build
npm start
```

Ensure `next.config.js` has the proper `transpilePackages` for Three.js on Vercel.

---

## 📧 Contact

**Donet Joseph** · Senior IT Support Specialist  
📞 +91 7558 920076 · ✉ donetj@gmail.com · 📍 Kottayam, Kerala
