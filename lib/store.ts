import { create } from 'zustand'

interface PortfolioState {
  // Loading
  loadingProgress: number
  isLoaded: boolean
  setLoadingProgress: (p: number) => void
  setIsLoaded: (v: boolean) => void

  // Scroll
  scrollProgress: number
  activeSection: number
  setScrollProgress: (p: number) => void
  setActiveSection: (s: number) => void

  // Audio
  audioEnabled: boolean
  toggleAudio: () => void

  // Cursor
  cursorX: number
  cursorY: number
  isHovering: boolean
  setCursor: (x: number, y: number) => void
  setHovering: (v: boolean) => void

  // Scene
  rainIntensity: number
  setRainIntensity: (i: number) => void
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  // Loading
  loadingProgress: 0,
  isLoaded: false,
  setLoadingProgress: (p) => set({ loadingProgress: p }),
  setIsLoaded: (v) => set({ isLoaded: v }),

  // Scroll
  scrollProgress: 0,
  activeSection: 0,
  setScrollProgress: (p) => set({ scrollProgress: p }),
  setActiveSection: (s) => set({ activeSection: s }),

  // Audio
  audioEnabled: false,
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),

  // Cursor
  cursorX: 0,
  cursorY: 0,
  isHovering: false,
  setCursor: (x, y) => set({ cursorX: x, cursorY: y }),
  setHovering: (v) => set({ isHovering: v }),

  // Scene
  rainIntensity: 0.7,
  setRainIntensity: (i) => set({ rainIntensity: i }),
}))

// Section definitions
export const SECTIONS = [
  { id: 0, label: 'Arrival', scrollStart: 0, scrollEnd: 0.12 },
  { id: 1, label: 'About', scrollStart: 0.12, scrollEnd: 0.28 },
  { id: 2, label: 'Lulu Qatar', scrollStart: 0.28, scrollEnd: 0.44 },
  { id: 3, label: 'Jubeerich', scrollStart: 0.44, scrollEnd: 0.58 },
  { id: 4, label: 'Syscon', scrollStart: 0.58, scrollEnd: 0.70 },
  { id: 5, label: 'Skills', scrollStart: 0.70, scrollEnd: 0.84 },
  { id: 6, label: 'Education', scrollStart: 0.84, scrollEnd: 0.92 },
  { id: 7, label: 'Contact', scrollStart: 0.92, scrollEnd: 1.0 },
]

// Camera keyframes along the journey path
export const CAMERA_KEYFRAMES = [
  // Section 0 - Hero: Wide establishing shot
  { position: [0, 4, 18], target: [0, 1, 0], fov: 55 },
  // Section 1 - About: Low dramatic side angle
  { position: [-6, 2, 8], target: [0, 1, 0], fov: 50 },
  // Section 2 - Lulu: Three-quarter front view
  { position: [4, 3, 10], target: [0, 1, -5], fov: 52 },
  // Section 3 - Jubeerich: Low tracking shot
  { position: [-4, 1.5, 6], target: [2, 1, -8], fov: 48 },
  // Section 4 - Syscon: Behind jeep cinematic
  { position: [0, 5, 12], target: [0, 0, -10], fov: 45 },
  // Section 5 - Skills: Wide mountain view
  { position: [8, 6, 15], target: [0, 2, 0], fov: 60 },
  // Section 6 - Education: Close dramatic
  { position: [3, 2.5, 7], target: [0, 1, -3], fov: 50 },
  // Section 7 - Contact: Final wide cinematic
  { position: [0, 8, 20], target: [0, 0, -15], fov: 55 },
]
