// src/utils/tailwind.ts

import colors from 'tailwindcss/colors'
// Tailwind eski renk isimlerinden kaynaklı uyarıları engelle
delete (colors as any).lightBlue
delete (colors as any).warmGray
delete (colors as any).trueGray
delete (colors as any).coolGray
delete (colors as any).blueGray

// Tailwind breakpoints (px)
export const SCREENS = {
  xs: 576,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Border radius (Tailwind ile uyumlu)
export const BORDER_RADIUS = {
  none: '0px',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const

// Sıklıkla gereken spacing/height referansları (opsiyonel)
export const SPACING = {
  0: '0px',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
} as const

// Tailwind renk paleti + senin custom 'kurs' renklerin
export const TW_COLORS = {
  ...colors,
  kurs: {
    main: '#FF99C8',
    secondary: '#FCF6BD',
    active: '#D0F4DE',
    x: '#A9DEF9',
    y: '#E4C1F9',
  },
} as const

// İsteğe bağlı: "indigo-500" gibi stringten renk alan küçük yardımcı
export function pickColor(name: string, shade: number) {
  const key = name as keyof typeof TW_COLORS
  const palette = TW_COLORS[key] as any
  return palette?.[shade]
}
